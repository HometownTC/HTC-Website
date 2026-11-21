import React, { useState } from 'react';
import { Lock, Send, AlertCircle } from 'lucide-react';
import { saveToolkitUnlocked } from '../data/agentToolkit';
import { trackHtcEvent } from '../utils/analytics';

interface Props {
  source: string; // where the form was used, e.g. "Toolkit page"
  onUnlocked: () => void;
  // Optional: Hunter sign-up kind. Unknown kinds fall back to the Free Toolkit sign-up on the
  // server, so a new kind is safe to send before Hunter adds its own branch for it.
  kind?: string;
  emailTag?: string; // subject tag on the backup email (default "Free Toolkit")
  title?: string; // form heading (default "Unlock the free downloads")
  buttonLabel?: string; // submit button (default "Unlock the toolkit")
  itemName?: string; // what they get, for the fine print (default "the toolkit")
  // Short sale mode: asks one stage question and asks for email-series permission separately
  // from text consent. The resource unlocks either way; only the email series needs permission.
  shortSale?: boolean;
}

type Status = 'idle' | 'sending' | 'preview' | 'error';

// Hunter sign-up endpoint (Supabase). It only accepts requests from www.hometowntc.com.
const HUNTER_SIGNUP_URL = 'https://gagsnnrakqbtuyystfkr.supabase.co/functions/v1/hunter-signup';

// Saves the visitor to Hunter as a "Free Toolkit" lead (starts the Free Toolkit campaign)
// and emails a backup copy to hello@ (CC Christian). Downloads unlock as soon as Hunter
// confirms; the email is only needed if Hunter is down. On preview sites nothing is sent.
export const ToolkitUnlockForm: React.FC<Props> = ({ source, onUnlocked, kind, emailTag = 'Free Toolkit', title = 'Unlock the free downloads', buttonLabel = 'Unlock the toolkit', itemName = 'the toolkit', shortSale = false }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', brokerage: '', role: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [smsOk, setSmsOk] = useState(false);
  const [emailOk, setEmailOk] = useState(false);
  const [stage, setStage] = useState('');

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [field]: e.target.value });

  const unlock = () => {
    saveToolkitUnlocked();
    trackHtcEvent('guide_download', { source, status: 'unlocked' });
    onUnlocked();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const isProductionHost =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'hometowntc.com' || window.location.hostname === 'www.hometowntc.com');

    if (!isProductionHost) {
      // Preview site: nothing is sent. Unlock so reviewers can test the links.
      setStatus('preview');
      saveToolkitUnlocked();
      onUnlocked();
      return;
    }

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      brokerage: form.brokerage,
      role: form.role,
      sms_ok: smsOk,
      source,
      ...(shortSale
        ? {
            need: stage, // short_sale_researching | short_sale_pending
            email_ok: emailOk,
            notes: `Stage: ${stage === 'short_sale_pending' ? 'Has a short sale pending approval' : 'Researching short sales'} | Email series: ${emailOk ? 'yes' : 'no'} | Text: ${smsOk ? 'yes' : 'no'}`,
          }
        : {}),
      ...(kind ? { kind } : {}),
      page: typeof window !== 'undefined' ? window.location.pathname : '',
    };

    // 1) Hunter (HTC's CRM) is the system of record: every sign-up becomes a "Free Toolkit" lead.
    const toHunter = fetch(HUNTER_SIGNUP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify(payload),
    })
      .then(async (r) => r.ok && ((await r.json().catch(() => null)) as { ok?: boolean } | null)?.ok === true)
      .catch(() => false);

    // 2) Backup copy to hello@ (CC Christian) through FormSubmit. It is slow at times, so it gets
    //    8 seconds and never blocks the unlock once Hunter has the lead.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const toEmail = fetch('https://formsubmit.co/ajax/hello@hometowntc.com', {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `[${emailTag}] ${form.name}${form.brokerage ? ' - ' + form.brokerage : ''}`,
        _cc: 'christian.hernandez@hometowntc.com',
        _replyto: form.email,
        _template: 'table',
        Name: form.name,
        Email: form.email,
        Phone: form.phone,
        'Brokerage / Team': form.brokerage || 'Not provided',
        'I am a': form.role,
        'OK to text': smsOk ? 'Yes' : 'No',
        ...(shortSale
          ? {
              'Short sale stage': stage === 'short_sale_pending' ? 'Has one pending approval' : 'Researching',
              'OK to email the series': emailOk ? 'Yes' : 'No',
            }
          : {}),
        'Unlocked From': source,
        'Submitted (ET)': new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
      }),
    })
      .then(async (r) => {
        const result = (await r.json().catch(() => null)) as { success?: boolean | string } | null;
        return r.ok && !!result && (result.success === true || result.success === 'true');
      })
      .catch(() => false)
      .finally(() => clearTimeout(timer));

    // Unlock as soon as Hunter confirms; if Hunter is down, the emailed copy is enough.
    const hunterOk = await toHunter;
    if (hunterOk) {
      unlock();
      return;
    }
    if (await toEmail) {
      unlock();
      return;
    }
    setStatus('error');
    setErrorMessage("We couldn't confirm your request went through. Please try again, or email hello@hometowntc.com.");
  };

  const inputClass =
    'w-full rounded-lg border border-[#D8D2D4] bg-white px-4 py-3 text-sm text-[#1A1412] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D9BA3]';

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-[#D8D2D4] bg-[#FAF8F5] p-6 sm:p-8 space-y-4" aria-label={title}>
      <div className="flex items-center gap-2 text-[#075960] font-bold text-sm uppercase tracking-wider">
        <Lock className="w-4 h-4" aria-hidden="true" />
        <span>{title}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block text-sm font-semibold text-[#3A2E29]">
          Name *
          <input required autoComplete="name" value={form.name} onChange={update('name')} className={`${inputClass} mt-1`} />
        </label>
        <label className="block text-sm font-semibold text-[#3A2E29]">
          Email *
          <input required type="email" autoComplete="email" value={form.email} onChange={update('email')} className={`${inputClass} mt-1`} />
        </label>
        <label className="block text-sm font-semibold text-[#3A2E29]">
          Phone *
          <input required type="tel" autoComplete="tel" value={form.phone} onChange={update('phone')} className={`${inputClass} mt-1`} />
        </label>
        <label className="block text-sm font-semibold text-[#3A2E29]">
          Brokerage (optional)
          <input autoComplete="organization" value={form.brokerage} onChange={update('brokerage')} className={`${inputClass} mt-1`} />
        </label>
        <label className="block text-sm font-semibold text-[#3A2E29] sm:col-span-2">
          I am a… *
          <select required value={form.role} onChange={update('role')} className={`${inputClass} mt-1`}>
            <option value="" disabled>Choose one</option>
            <option value="Agent">Real estate agent</option>
            <option value="Team Lead">Team lead or broker</option>
            <option value="Transaction Coordinator">Transaction coordinator</option>
            <option value="Other">Other</option>
          </select>
        </label>
      </div>
      {shortSale && (
        <fieldset className="text-sm text-[#3A2E29]">
          <legend className="font-semibold">Where are you with short sales? *</legend>
          <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="ss-stage" required value="short_sale_researching" checked={stage === 'short_sale_researching'} onChange={(e) => setStage(e.target.value)} className="h-4 w-4 accent-[#075960]" />
              <span>Researching short sales</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="ss-stage" required value="short_sale_pending" checked={stage === 'short_sale_pending'} onChange={(e) => setStage(e.target.value)} className="h-4 w-4 accent-[#075960]" />
              <span>I have one pending approval now</span>
            </label>
          </div>
        </fieldset>
      )}
      {shortSale && (
        <label className="flex items-start gap-3 text-xs text-[#3A2E29] cursor-pointer">
          <input
            type="checkbox"
            checked={emailOk}
            onChange={(e) => setEmailOk(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#075960]"
          />
          <span>Optional: email me HTC's short sale tips (six short emails over three weeks) and The Home Front, our monthly newsletter. Unsubscribe anytime.</span>
        </label>
      )}
      <label className="flex items-start gap-3 text-xs text-[#3A2E29] cursor-pointer">
        <input
          type="checkbox"
          checked={smsOk}
          onChange={(e) => setSmsOk(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#075960]"
        />
        <span>
          Optional: OK to text me about these resources. Msg &amp; data rates may apply. Reply STOP to opt out.
        </span>
      </label>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FE7311] hover:bg-[#e05f03] disabled:opacity-60 text-[#1A1412] px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider shadow-md transition cursor-pointer"
      >
        <Send className="w-4 h-4" aria-hidden="true" />
        <span>{status === 'sending' ? 'Unlocking…' : buttonLabel}</span>
      </button>
      <p className="text-xs text-slate-600">
        {shortSale
          ? `You'll get ${itemName} right away, plus one email with your download links. We never sell your information.`
          : `You'll get ${itemName}, a few follow-up emails and our monthly newsletter. Unsubscribe anytime. We never sell your information.`}
      </p>
      {status === 'preview' && (
        <p className="text-xs font-semibold text-[#075960]" role="status">
          Preview site: nothing was sent. Downloads are unlocked for testing.
        </p>
      )}
      {status === 'error' && (
        <p className="flex items-start gap-2 text-sm text-[#B42318]" role="alert">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </p>
      )}
    </form>
  );
};
