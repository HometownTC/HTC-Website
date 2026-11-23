import React, { useEffect, useRef, useState } from 'react';

// Shared pieces for the Winnie + N.E.S.T. checkout pages (Nov 23, 2026). Same pattern as LitPage:
// USAePay Pay.js card box (the card never touches HTC), one checkout id per page load, practice banner.
// Price, terms version and choice lists always come from the function's `config` reply, never from this file.
export const FN_BASE = 'https://gagsnnrakqbtuyystfkr.supabase.co/functions/v1/';
export const TERMS_URL = 'https://docs.google.com/document/d/1_d5pJYpIKIB9WtUb4KbGyK2DlJOLTt0BJurvsg-X5fY/view';
export const PRIVACY_URL = 'https://docs.google.com/document/d/10_5VpAS8_nYBp9SWSp5RU98UWsFK7jNmxsIus-ICV5Q/view';
export const SUPPORT = 'support@hometowntc.com';

export const C = {
  brown: '#3A2E29', orange: '#FE7311', amber: '#FF8C13', gold: '#FDBB16', teal: '#0D9BA3', cream: '#FFF8EE', cream2: '#FBEFDD', line: '#EADBC4',
};
export const MUTED = '#6b5a50';
export const BORDER = '#cdb89c';
export const RED = '#b3261e';
export const BTN = { background: `linear-gradient(90deg, ${C.orange}, ${C.amber})` };
export const inputCls = 'w-full rounded-lg border px-3 py-3 text-base min-h-[48px] bg-white';

export type Choice = { code: string; en: string; es: string };
export type Cfg = {
  mode: string; env?: string; public_key: string | null; payjs: string; terms_version: string;
  terms_url?: string; privacy_url?: string; price: number | null; available: boolean;
  closing_min?: string; closing_max?: string;
  sides?: Choice[]; occupancy?: Choice[]; journey?: Choice[]; languages?: Choice[];
};

/** 299 → "$299", 29.5 → "$29.50", null → "" */
export const fmtPrice = (n: number | null | undefined) =>
  n == null ? '' : '$' + Number(n).toLocaleString('en-US', Number.isInteger(Number(n)) ? {} : { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export class CheckoutError extends Error {
  status: number;
  constructor(m: string, s = 0) { super(m); this.status = s; }
}

const callFn = async (fn: string, body: unknown, errLoad: string) => {
  let r: Response;
  try { r = await fetch(FN_BASE + fn, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }); }
  catch { throw new CheckoutError(errLoad); }
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.error) throw new CheckoutError(j.error || errLoad, r.status);
  return j;
};

declare global { interface Window { usaepay?: any } }

async function mountCard(cfg: Cfg, boxId: string) {
  if (!cfg.public_key) throw new Error('no key');
  if (!window.usaepay) {
    await new Promise<void>((res, rej) => {
      const s = document.createElement('script'); s.src = cfg.payjs; s.onload = () => res(); s.onerror = () => rej(new Error('payjs'));
      document.head.appendChild(s);
    });
  }
  const client = new window.usaepay.Client(cfg.public_key);
  const card = client.createPaymentCardEntry();
  card.generateHTML({ base: `font-size:16px;color:${C.brown};`, invalid: `color:${RED};` });
  const box = document.getElementById(boxId);
  if (box) box.innerHTML = '';
  card.addHTML(boxId);
  return { client, card };
}

/**
 * Loads config on page load, then the secure card box. `purchase` adds checkout_id, payment_key and the
 * terms fields. A 402 (declined, nothing charged) makes a new checkout id; 409/429 are shown as-is, no retry.
 */
export function useExtrasCheckout(fn: string, boxId: string, t: { errLoad: string; errCard: string; loadingCard: string }) {
  const [cfg, setCfg] = useState<Cfg | null>(null);
  const [cfgErr, setCfgErr] = useState(false);
  const [cardMsg, setCardMsg] = useState(t.loadingCard);
  const checkoutId = useRef<string>(crypto.randomUUID());
  const pay = useRef<{ client: any; card: any } | null>(null);

  useEffect(() => {
    let live = true;
    callFn(fn, { op: 'config' }, t.errLoad).then((c) => { if (live) setCfg(c); }).catch(() => { if (live) setCfgErr(true); });
    return () => { live = false; };
  }, [fn]);

  useEffect(() => {
    if (!cfg || !cfg.available || pay.current) return;
    mountCard(cfg, boxId).then((p) => { pay.current = p; setCardMsg(''); }).catch(() => setCardMsg(t.errLoad));
  }, [cfg]);

  const purchase = async (fields: Record<string, unknown>) => {
    if (!pay.current || !cfg) throw new CheckoutError(t.errLoad);
    let payment_key: string | undefined;
    try {
      const pk = await pay.current.client.getPaymentKey(pay.current.card);
      payment_key = typeof pk === 'string' ? pk : pk && (pk.key || pk.payment_key);
    } catch { /* handled below */ }
    if (!payment_key) throw new CheckoutError(t.errCard);
    try {
      return await callFn(fn, {
        op: 'purchase', ...fields, checkout_id: checkoutId.current, payment_key,
        terms_accepted: true, terms_version: cfg.terms_version,
      }, t.errLoad);
    } catch (e: any) {
      if (e?.status === 402) checkoutId.current = crypto.randomUUID(); // declined: nothing charged, a new try is safe
      throw e;
    }
  };

  return { cfg, cfgErr, cardMsg, purchase };
}

// ---------- small UI pieces (16px inputs, 44px+ tap targets) ----------
export const Label: React.FC<{ htmlFor?: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-bold mt-4 mb-1">{children}</label>
);

export const SectionH: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-lg font-extrabold mt-6 pt-4 border-t" style={{ borderColor: C.line, color: C.teal }}>{children}</h3>
);

export const PracticeBanner: React.FC<{ text: string }> = ({ text }) => (
  <div role="note" className="rounded-lg px-3 py-2 font-bold text-sm mb-3" style={{ background: C.gold, color: C.brown }}>{text}</div>
);

export const CardBox: React.FC<{ id: string; label: string; msg: string; note: string }> = ({ id, label, msg, note }) => (
  <>
    <Label>{label}</Label>
    <div className="min-h-[90px] rounded-lg border p-3" style={{ borderColor: BORDER, background: '#fffdf9' }}>
      {msg && <span className="text-sm" style={{ color: MUTED }}>{msg}</span>}
      {/* Pay.js draws the secure card fields here; React never renders inside it. */}
      <div id={id} />
    </div>
    <p className="text-sm mt-2" style={{ color: MUTED }}>{note}</p>
  </>
);

export const CheckRow: React.FC<{ checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode }> = ({ checked, onChange, children }) => (
  <label className="flex gap-3 items-start my-3 text-[15px] min-h-[44px] cursor-pointer">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 w-6 h-6 shrink-0" style={{ accentColor: C.teal }} />
    <span>{children}</span>
  </label>
);

export const PayButton: React.FC<{ busy: boolean; label: string; busyLabel: string }> = ({ busy, label, busyLabel }) => (
  <button type="submit" disabled={busy} aria-busy={busy}
    className="w-full md:w-auto rounded-full px-8 py-4 min-h-[52px] font-extrabold text-white disabled:opacity-60" style={BTN}>
    {busy ? busyLabel : label}
  </button>
);

export const ErrorLine: React.FC<{ text: string | null }> = ({ text }) =>
  text ? <div role="alert" className="mb-3 font-bold rounded-lg px-3 py-2" style={{ color: RED, background: '#fdecea' }}>{text}</div> : null;

export const SuccessPanel: React.FC<{ title: string; text: string; practice: boolean; practiceText: string }> = ({ title, text, practice, practiceText }) => (
  <div role="status" aria-live="polite" className="bg-white rounded-2xl p-6 mt-6 text-left border-2" style={{ borderColor: C.teal }}>
    {practice && <PracticeBanner text={practiceText} />}
    <div className="text-2xl font-extrabold mb-2" style={{ color: C.teal }}>✓ {title}</div>
    <p className="text-lg">{text}</p>
  </div>
);

export const Footer: React.FC<{ cfg: Cfg | null; questions: string; terms: string; privacy: string }> = ({ cfg, questions, terms, privacy }) => (
  <div className="py-8 px-5 text-center text-sm" style={{ color: MUTED }}>
    {questions} <a href={`mailto:${SUPPORT}`} style={{ color: C.teal }}>{SUPPORT}</a> ·{' '}
    <a href={cfg?.terms_url || TERMS_URL} target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>{terms}</a> ·{' '}
    <a href={cfg?.privacy_url || PRIVACY_URL} target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>{privacy}</a>
  </div>
);
