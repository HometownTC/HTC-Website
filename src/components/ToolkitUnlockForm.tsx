import React, { useState } from 'react';
import { Lock, Send, AlertCircle } from 'lucide-react';
import { saveToolkitUnlocked } from '../data/agentToolkit';
import { trackHtcEvent } from '../utils/analytics';

interface Props {
  source: string; // where the form was used, e.g. "Toolkit page"
  onUnlocked: () => void;
}

type Status = 'idle' | 'sending' | 'preview' | 'error';

// Hunter sign-up endpoint (Supabase). It only accepts requests from www.hometowntc.com.
const HUNTER_SIGNUP_URL = 'https://gagsnnrakqbtuyystfkr.supabase.co/functions/v1/hunter-signup';

// Sends the visitor's details to hello@ (CC Christian) through FormSubmit, the
// same relay the SCALE waitlist uses. Downloads unlock only after FormSubmit
// confirms delivery. On preview sites nothing is sent.
export const ToolkitUnlockForm: React.FC<Props> = ({ source, onUnlocked }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', brokerage: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
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

    // Also add the visitor to Hunter (HTC's CRM) as a "Free Toolkit" lead. This runs alongside the
    // email below and never blocks the unlock: if it fails, the hello@ email still has the details.
    fetch(HUNTER_SIGNUP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        brokerage: form.brokerage,
        source,
        page: typeof window !== 'undefined' ? window.location.pathname : '',
      }),
    }).catch(() => undefined);

    try {
      const response = await fetch('https://formsubmit.co/ajax/hello@hometowntc.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `[Free Toolkit] ${form.name}${form.brokerage ? ' - ' + form.brokerage : ''}`,
          _cc: 'christian.hernandez@hometowntc.com',
          _replyto: form.email,
          _template: 'table',
          Name: form.name,
          Email: form.email,
          Phone: form.phone,
          'Brokerage / Team': form.brokerage || 'Not provided',
          'Unlocked From': source,
          'Submitted (ET)': new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
        }),
      });
      const result = await response.json().catch(() => null);
      const ok =
        response.ok && result && typeof result === 'object' && (result.success === true || result.success === 'true');
      if (ok) {
        unlock();
      } else {
        setStatus('error');
        setErrorMessage("We couldn't confirm your request went through. Please try again, or email hello@hometowntc.com.");
      }
    } catch {
      setStatus('error');
      setErrorMessage('Connection problem. Please try again, or email hello@hometowntc.com.');
    }
  };

  const inputClass =
    'w-full rounded-lg border border-[#D8D2D4] bg-white px-4 py-3 text-sm text-[#1A1412] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D9BA3]';

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-[#D8D2D4] bg-[#FAF8F5] p-6 sm:p-8 space-y-4" aria-label="Unlock the free toolkit">
      <div className="flex items-center gap-2 text-[#075960] font-bold text-sm uppercase tracking-wider">
        <Lock className="w-4 h-4" aria-hidden="true" />
        <span>Unlock the free downloads</span>
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
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FE7311] hover:bg-[#e05f03] disabled:opacity-60 text-[#1A1412] px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider shadow-md transition cursor-pointer"
      >
        <Send className="w-4 h-4" aria-hidden="true" />
        <span>{status === 'sending' ? 'Unlocking…' : 'Unlock the toolkit'}</span>
      </button>
      <p className="text-xs text-slate-600">
        We use your details only to follow up about these resources. We never sell your information.
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
