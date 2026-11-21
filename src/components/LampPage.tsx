import React, { useEffect, useRef, useState } from 'react';
import { CalendarCheck, CheckCircle2, ClipboardList, Eye, MessageSquareQuote, Route } from 'lucide-react';
import type { Language } from '../types';

interface Props {
  language?: Language;
  onNavigate: (path: string) => void;
}

// L.A.M.P. (Listing Activity, Monitoring & Progress) sales page + checkout: /lamp/ and /es/lamp/ (Nov 21, 2026).
// Open to any agent and any listing; no registration (Michelle, Nov 21). First $99 is charged at checkout.
// Renewal: notice after the 3rd weekly report, charge the day after the 4th unless cancelled; stops when the listing goes Pending.
// Checkout goes to the lamp-checkout Supabase function (USAePay Pay.js; HTC never sees the card number).
const FN = 'https://gagsnnrakqbtuyystfkr.supabase.co/functions/v1/lamp-checkout';
const TERMS_URL = 'https://docs.google.com/document/d/1_d5pJYpIKIB9WtUb4KbGyK2DlJOLTt0BJurvsg-X5fY/view';
const PRIVACY_URL = 'https://docs.google.com/document/d/10_5VpAS8_nYBp9SWSp5RU98UWsFK7jNmxsIus-ICV5Q/view';
const SUPPORT = 'support@hometowntc.com';
const C = { brown: '#3A2E29', orange: '#FE7311', amber: '#FF8C13', gold: '#FDBB16', teal: '#0D9BA3', cream: '#FFF8EE', cream2: '#FBEFDD', line: '#EADBC4' };

type Copy = {
  eyebrow: string; h1: string; lede: string; cta: string; ctaNote: string;
  getH: string; get: [string, string][]; approve: string;
  billH: string; bill: string[];
  whoH: string; who: string; diy: string; litWord: string;
  price: string; per: string; priceNote: string; buy: string;
  practice: string; coH: string; you: string; listing: string;
  first: string; last: string; email: string; phone: string; brokerage: string; address: string; mls: string; notes: string; card: string;
  loadingCard: string; cardNote: string; termsA: string; termsLink: string; termsB: string; pay: string; paying: string;
  errLoad: string; errTerms: string; errCard: string; ok: (code: string, email: string) => string;
  questions: string; terms: string; privacy: string;
};

const EN: Copy = {
  eyebrow: 'L.A.M.P. · Listing Activity, Monitoring & Progress',
  h1: 'Weekly seller reports, done for you.',
  lede: 'L.A.M.P. is HTC\'s done-for-you service for listing agents. Our team prepares a weekly seller report for your listing. You approve it before it goes to your sellers.',
  cta: 'Start L.A.M.P. · $99/month per listing', ctaNote: 'Open to any agent and any active listing. No registration needed.',
  getH: 'What\'s in every weekly report',
  get: [
    ['Every showing', 'Each showing for the week, in one place.'],
    ['Buyer feedback, word for word', 'What buyer agents actually said, not a summary.'],
    ['The plan for next week', 'What happens next on the listing.'],
  ],
  approve: 'We prepare it; you approve it before it goes to your sellers.',
  billH: 'How billing works',
  bill: [
    'Your first $99 is charged at checkout.',
    'After your third weekly report, we email you a renewal notice with a Cancel button.',
    'If you don\'t cancel, your card is charged $99 the day after your fourth weekly report, and the next cycle starts.',
    'L.A.M.P. stops when your listing goes Pending. Tell us with one click from any renewal email, or email support@hometowntc.com.',
    'You can cancel any time before a renewal charge. Charges already made are not refunded.',
  ],
  whoH: 'Who L.A.M.P. is for',
  who: 'Listing agents who want consistent, professional seller updates without chasing feedback and writing reports themselves.',
  diy: 'Prefer to run it yourself?', litWord: 'See LIT, the Grok bot template',
  price: '$99', per: '/month per listing', priceNote: 'One listing per checkout. Need more than one? Check out once for each listing.', buy: 'Start L.A.M.P.',
  practice: 'Practice checkout: no card will be charged.', coH: 'Checkout · $99 today', you: 'You', listing: 'The listing',
  first: 'First name', last: 'Last name', email: 'Email', phone: 'Phone', brokerage: 'Brokerage',
  address: 'Listing address', mls: 'MLS number (optional)', notes: 'Anything we should know? (optional)', card: 'Card',
  loadingCard: 'Loading the secure card box…', cardNote: 'Your card goes straight to our payment company (USAePay). HTC never sees your card number. Your card is saved securely for renewals.',
  termsA: 'I agree to ', termsLink: 'HTC\'s Terms and Conditions',
  termsB: '. I authorize $99 today and $99 the day after every fourth weekly report until I cancel or my listing goes Pending.',
  pay: 'Pay $99 and start', paying: 'Processing…',
  errLoad: 'We couldn\'t load secure checkout. Please refresh the page or email support@hometowntc.com.',
  errTerms: 'Please check the box to agree to the Terms.', errCard: 'Please check your card details.',
  ok: (c, e) => `You're all set! Order ${c}. We emailed your receipt and next steps to ${e}.`,
  questions: 'Questions?', terms: 'Terms and Conditions', privacy: 'Privacy Policy',
};

const ES: Copy = {
  eyebrow: 'L.A.M.P. · Listing Activity, Monitoring & Progress',
  h1: 'Reportes semanales para el vendedor, hechos por nosotros.',
  lede: 'L.A.M.P. es el servicio de HTC hecho por nuestro equipo para agentes de listados. Preparamos un reporte semanal para el vendedor de tu listado. Tú lo apruebas antes de que llegue a tus vendedores.',
  cta: 'Empieza L.A.M.P. · $99/mes por listado', ctaNote: 'Abierto a cualquier agente y cualquier listado activo. No necesitas registrarte.',
  getH: 'Qué incluye cada reporte semanal',
  get: [
    ['Cada visita', 'Todas las visitas de la semana, en un solo lugar.'],
    ['Comentarios de los compradores, palabra por palabra', 'Lo que dijeron los agentes compradores, no un resumen.'],
    ['El plan para la próxima semana', 'Lo que sigue para el listado.'],
  ],
  approve: 'Nosotros lo preparamos; tú lo apruebas antes de que llegue a tus vendedores.',
  billH: 'Cómo funciona el cobro',
  bill: [
    'Tu primer pago de $99 se cobra al pagar.',
    'Después de tu tercer reporte semanal, te enviamos un aviso de renovación con un botón para Cancelar.',
    'Si no cancelas, se cobran $99 a tu tarjeta el día después de tu cuarto reporte semanal y empieza el siguiente ciclo.',
    'L.A.M.P. se detiene cuando tu listado pasa a Pendiente. Avísanos con un clic desde cualquier correo de renovación, o escribe a support@hometowntc.com.',
    'Puedes cancelar en cualquier momento antes de un cobro de renovación. Los cobros ya hechos no se reembolsan.',
  ],
  whoH: 'Para quién es L.A.M.P.',
  who: 'Agentes de listados que quieren actualizaciones constantes y profesionales para sus vendedores sin perseguir comentarios ni escribir reportes.',
  diy: '¿Prefieres hacerlo tú mismo?', litWord: 'Mira LIT, la plantilla de bot de Grok',
  price: '$99', per: '/mes por listado', priceNote: 'Un listado por pago. ¿Tienes más de uno? Haz un pago por cada listado.', buy: 'Empezar L.A.M.P.',
  practice: 'Pago de práctica: no se cobrará ninguna tarjeta.', coH: 'Pago · $99 hoy', you: 'Tus datos', listing: 'El listado',
  first: 'Nombre', last: 'Apellido', email: 'Correo', phone: 'Teléfono', brokerage: 'Corredora (brokerage)',
  address: 'Dirección del listado', mls: 'Número de MLS (opcional)', notes: '¿Algo que debamos saber? (opcional)', card: 'Tarjeta',
  loadingCard: 'Cargando el formulario seguro de la tarjeta…', cardNote: 'Tu tarjeta va directo a nuestra compañía de pagos (USAePay). HTC nunca ve el número de tu tarjeta. Tu tarjeta se guarda de forma segura para las renovaciones.',
  termsA: 'Acepto los ', termsLink: 'Términos y Condiciones de HTC',
  termsB: '. Autorizo $99 hoy y $99 el día después de cada cuarto reporte semanal hasta que cancele o mi listado pase a Pendiente.',
  pay: 'Pagar $99 y empezar', paying: 'Procesando…',
  errLoad: 'No pudimos cargar el pago seguro. Por favor recarga la página o escribe a support@hometowntc.com.',
  errTerms: 'Por favor marca la casilla para aceptar los Términos.', errCard: 'Revisa los datos de la tarjeta.',
  ok: (c, e) => `¡Listo! Pedido ${c}. Enviamos tu recibo y los próximos pasos a ${e}.`,
  questions: '¿Preguntas?', terms: 'Términos y Condiciones', privacy: 'Política de Privacidad',
};

declare global { interface Window { usaepay?: any } }

export const LampPage: React.FC<Props> = ({ language = 'en', onNavigate }) => {
  const lang: Language = language === 'es' ? 'es' : 'en';
  const t = lang === 'es' ? ES : EN;
  const [open, setOpen] = useState(false);
  const [practice, setPractice] = useState(false);
  const [cardMsg, setCardMsg] = useState(t.loadingCard);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [agree, setAgree] = useState(false);
  const [f, setF] = useState({ first: '', last: '', email: '', phone: '', brokerage: '', address: '', mls: '', notes: '' });
  // One id per checkout: the server never charges the same id twice (double-click / retry safe).
  const checkoutId = useRef<string>(crypto.randomUUID());
  const cfg = useRef<any>(null), client = useRef<any>(null), cardEntry = useRef<any>(null);

  const call = async (body: unknown) => {
    const r = await fetch(FN, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || j.error) { const e: any = new Error(j.error || t.errLoad); e.status = r.status; throw e; }
    return j;
  };

  useEffect(() => {
    if (!open || cfg.current) return;
    (async () => {
      try {
        cfg.current = await call({ op: 'config' });
        if (cfg.current.mode !== 'live') setPractice(true);
        await new Promise<void>((res, rej) => {
          const s = document.createElement('script'); s.src = cfg.current.payjs; s.onload = () => res(); s.onerror = () => rej(); document.head.appendChild(s);
        });
        client.current = new window.usaepay.Client(cfg.current.public_key);
        cardEntry.current = client.current.createPaymentCardEntry();
        cardEntry.current.generateHTML({ base: `font-size:16px;color:${C.brown};`, invalid: 'color:#b3261e;' });
        setCardMsg('');
        cardEntry.current.addHTML('lampCardBox');
      } catch {
        cfg.current = null; setCardMsg(t.errLoad);
      }
    })();
  }, [open]);

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (busy || done) return;
    if (!agree) return setMsg({ text: t.errTerms, ok: false });
    if (!client.current) return setMsg({ text: t.errLoad, ok: false });
    setBusy(true); setMsg(null);
    try {
      let pk: any;
      try { pk = await client.current.getPaymentKey(cardEntry.current); } catch { throw new Error(t.errCard); }
      const payment_key = typeof pk === 'string' ? pk : pk && (pk.key || pk.payment_key);
      if (!payment_key) throw new Error(t.errCard);
      const r = await call({
        op: 'purchase', lang, checkout_id: checkoutId.current, payment_key,
        first_name: f.first, last_name: f.last, email: f.email, phone: f.phone, brokerage: f.brokerage,
        listing_address: f.address, mls_number: f.mls, notes: f.notes,
        terms_accepted: true, terms_version: cfg.current.terms_version,
      });
      setMsg({ text: t.ok(r.code, r.email), ok: true }); setDone(true);
    } catch (e: any) {
      if (e.status === 402) checkoutId.current = crypto.randomUUID(); // declined: nothing charged, a new try is safe
      setMsg({ text: e.message, ok: false });
    } finally { setBusy(false); }
  };

  const wrap = 'max-w-3xl mx-auto px-5';
  const sec = 'py-12 border-t';
  const btn = { background: `linear-gradient(90deg, ${C.orange}, ${C.amber})` };
  const field = (k: keyof typeof f, label: string, type = 'text', ac = '', required = true) => (
    <div>
      <label htmlFor={`lamp-${k}`} className="block text-sm font-bold mt-3 mb-1">{label}</label>
      {k === 'notes' ? (
        <textarea id={`lamp-${k}`} rows={3} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} className="w-full rounded-lg border px-3 py-3 text-base" style={{ borderColor: '#cdb89c' }} />
      ) : (
        <input id={`lamp-${k}`} type={type} autoComplete={ac} required={required} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })}
          className="w-full rounded-lg border px-3 py-3 text-base" style={{ borderColor: '#cdb89c' }} />
      )}
    </div>
  );
  const litPath = lang === 'es' ? '/es/lit/' : '/lit/';
  const icons = [Eye, MessageSquareQuote, Route];

  return (
    <div style={{ background: C.cream, color: C.brown }} className="text-[17px] leading-relaxed">
      <div className={`${wrap} text-center pt-14 pb-10`}>
        <ClipboardList className="w-16 h-16 mx-auto mb-4" style={{ color: C.teal }} />
        <div className="uppercase tracking-widest text-xs font-bold" style={{ color: C.teal }}>{t.eyebrow}</div>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight my-3">{t.h1}</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">{t.lede}</p>
        <a href="#buy" className="inline-block rounded-full px-8 py-4 font-extrabold text-white" style={btn}>{t.cta}</a>
        <p className="mt-3 text-sm font-semibold" style={{ color: '#6b5a50' }}>{t.ctaNote}</p>
      </div>

      <section className={sec} style={{ borderColor: C.line, background: C.cream2 }}>
        <div className={wrap}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.getH}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {t.get.map(([h, p], i) => {
              const Icon = icons[i];
              return (
                <div key={h} className="bg-white rounded-xl p-5 border" style={{ borderColor: C.line }}>
                  <Icon className="w-6 h-6 mb-2" style={{ color: C.teal }} />
                  <h3 className="font-bold text-lg mb-1">{h}</h3>
                  <p>{p}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-5 font-bold">{t.approve}</p>
        </div>
      </section>

      <section className={sec} style={{ borderColor: C.line }}>
        <div className={wrap}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.billH}</h2>
          <ol className="space-y-3">
            {t.bill.map((b, i) => (
              <li key={b} className="flex gap-3">
                <span className="w-7 h-7 rounded-full text-white text-center font-extrabold leading-7 text-sm shrink-0" style={{ background: C.teal }}>{i + 1}</span>
                <span>{b}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={sec} style={{ borderColor: C.line, background: C.cream2 }}>
        <div className={wrap}>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{t.whoH}</h2>
          <p className="mb-3">{t.who}</p>
          <p>{t.diy} <a href={litPath} onClick={(e) => { e.preventDefault(); onNavigate(litPath); }} className="font-bold underline" style={{ color: C.teal }}>{t.litWord}</a>.</p>
        </div>
      </section>

      <section id="buy" className={sec} style={{ borderColor: C.line }}>
        <div className={`${wrap} text-center`}>
          <div className="uppercase tracking-widest text-xs font-bold" style={{ color: C.teal }}>L.A.M.P.</div>
          <div className="text-5xl font-extrabold my-2">{t.price} <span className="text-lg font-semibold" style={{ color: '#6b5a50' }}>{t.per}</span></div>
          <p className="mb-5">{t.priceNote}</p>
          {!open && (
            <button type="button" onClick={() => setOpen(true)} className="rounded-full px-8 py-4 font-extrabold text-white" style={btn}>
              <CalendarCheck className="inline w-5 h-5 mr-2 -mt-1" />{t.buy}
            </button>
          )}
          {open && (
            <form onSubmit={submit} noValidate className="bg-white rounded-2xl p-6 mt-6 text-left border-2" style={{ borderColor: C.gold }}>
              {practice && <div className="rounded-lg px-3 py-2 font-bold text-sm mb-3" style={{ background: C.gold }}>{t.practice}</div>}
              <h3 className="text-xl font-bold">{t.coH}</h3>
              <h4 className="font-bold mt-4" style={{ color: C.teal }}>{t.you}</h4>
              <div className="grid md:grid-cols-2 gap-x-3">
                {field('first', t.first, 'text', 'given-name')}
                {field('last', t.last, 'text', 'family-name')}
                {field('email', t.email, 'email', 'email')}
                {field('phone', t.phone, 'tel', 'tel')}
              </div>
              {field('brokerage', t.brokerage, 'text', 'organization')}
              <h4 className="font-bold mt-5" style={{ color: C.teal }}>{t.listing}</h4>
              {field('address', t.address, 'text', 'street-address')}
              {field('mls', t.mls, 'text', 'off', false)}
              {field('notes', t.notes, 'text', 'off', false)}
              <label className="block text-sm font-bold mt-4 mb-1">{t.card}</label>
              <div className="min-h-[90px] rounded-lg border p-3" style={{ borderColor: '#cdb89c', background: '#fffdf9' }}>
                {cardMsg && <span className="text-sm" style={{ color: '#6b5a50' }}>{cardMsg}</span>}
                {/* Pay.js draws the secure card fields here; React never renders inside it. */}
                <div id="lampCardBox" />
              </div>
              <p className="text-sm mt-2" style={{ color: '#6b5a50' }}>{t.cardNote}</p>
              <label className="flex gap-3 items-start my-4 text-[15px]">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 w-5 h-5" />
                <span>{t.termsA}<a href={TERMS_URL} target="_blank" rel="noopener noreferrer" style={{ color: C.teal }} className="underline">{t.termsLink}</a>{t.termsB}</span>
              </label>
              {!done && (
                <button type="submit" disabled={busy} className="rounded-full px-8 py-4 font-extrabold text-white disabled:opacity-60" style={btn}>
                  {busy ? t.paying : t.pay}
                </button>
              )}
              {msg && (
                <div role="status" aria-live="polite" className="mt-3 font-bold flex gap-2" style={{ color: msg.ok ? C.teal : '#b3261e' }}>
                  {msg.ok && <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />}{msg.text}
                </div>
              )}
            </form>
          )}
        </div>
      </section>

      <div className="py-8 text-center text-sm border-t" style={{ color: '#6b5a50', borderColor: C.line }}>
        {t.questions} <a href={`mailto:${SUPPORT}`} style={{ color: C.teal }}>{SUPPORT}</a> ·{' '}
        <a href={TERMS_URL} target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>{t.terms}</a> ·{' '}
        <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>{t.privacy}</a>
      </div>
    </div>
  );
};

// Private "Manage or cancel" page from L.A.M.P. emails: /lamp/manage/?t=TOKEN (and /es/lamp/manage/).
// Opening the link changes nothing; the agent has to press a button (email scanners can't cancel by accident).
const M = {
  en: { h: 'Manage L.A.M.P.', loading: 'Loading…', listing: 'Listing', next: 'Next charge', status: 'Status',
        cancel: 'Cancel L.A.M.P.', pending: 'My listing went Pending', keep: 'To keep going, you don\'t need to do anything.',
        confirmCancel: 'Stop L.A.M.P. for this listing? There will be no more charges.', confirmPending: 'Mark this listing Pending and stop L.A.M.P.? There will be no more charges.',
        doneCancel: 'Done. L.A.M.P. is cancelled and there will be no more charges. We emailed you a confirmation.',
        donePending: 'Congratulations! L.A.M.P. is stopped and there will be no more charges. We emailed you a confirmation.',
        ended: 'L.A.M.P. is already stopped for this listing. There will be no more charges.', bad: 'This link isn\'t valid. Please email support@hometowntc.com.',
        st: { active: 'Active', past_due: 'Payment past due', paid_needs_setup: 'Active', cancelled: 'Cancelled', ended_pending: 'Ended (Pending)' } as Record<string, string> },
  es: { h: 'Administrar L.A.M.P.', loading: 'Cargando…', listing: 'Listado', next: 'Próximo cobro', status: 'Estado',
        cancel: 'Cancelar L.A.M.P.', pending: 'Mi listado pasó a Pendiente', keep: 'Para continuar, no tienes que hacer nada.',
        confirmCancel: '¿Detener L.A.M.P. para este listado? No habrá más cobros.', confirmPending: '¿Marcar este listado como Pendiente y detener L.A.M.P.? No habrá más cobros.',
        doneCancel: 'Listo. L.A.M.P. está cancelado y no habrá más cobros. Te enviamos una confirmación por correo.',
        donePending: '¡Felicidades! L.A.M.P. está detenido y no habrá más cobros. Te enviamos una confirmación por correo.',
        ended: 'L.A.M.P. ya está detenido para este listado. No habrá más cobros.', bad: 'Este enlace no es válido. Escribe a support@hometowntc.com.',
        st: { active: 'Activo', past_due: 'Pago vencido', paid_needs_setup: 'Activo', cancelled: 'Cancelado', ended_pending: 'Terminado (Pendiente)' } as Record<string, string> },
};

export const LampManage: React.FC<{ language?: Language }> = ({ language = 'en' }) => {
  const lang: Language = language === 'es' ? 'es' : 'en';
  const t = M[lang];
  const [tok, setTok] = useState('');
  const [info, setInfo] = useState<any>(null);
  const [err, setErr] = useState('');
  const [ask, setAsk] = useState<'' | 'cancel' | 'pending'>('');
  const [done, setDone] = useState('');
  const [busy, setBusy] = useState(false);
  const post = async (body: unknown) => {
    const r = await fetch(FN, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || j.error) throw new Error(j.error || t.bad);
    return j;
  };
  useEffect(() => {
    const k = new URLSearchParams(window.location.search).get('t') || '';
    setTok(k);
    if (!k) { setErr(t.bad); return; }
    post({ op: 'manage_view', t: k, lang }).then(setInfo).catch((e) => setErr(e.message));
  }, []);
  const act = async () => {
    if (!ask || busy) return;
    setBusy(true);
    try {
      const r = await post({ op: 'manage_action', t: tok, action: ask, lang });
      setDone(r.already ? t.ended : ask === 'pending' ? t.donePending : t.doneCancel);
    } catch (e: any) { setErr(e.message); } finally { setBusy(false); setAsk(''); }
  };
  const ended = info && ['cancelled', 'ended_pending'].includes(info.status);
  const nice = (d: string | null) => d ? new Date(d + 'T12:00:00Z').toLocaleDateString(lang === 'es' ? 'es-US' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : '—';
  const btn = { background: `linear-gradient(90deg, ${C.orange}, ${C.amber})` };
  return (
    <div style={{ background: C.cream, color: C.brown }} className="min-h-[60vh] py-14 px-5">
      <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 border" style={{ borderColor: C.line }}>
        <ClipboardList className="w-10 h-10 mb-2" style={{ color: C.teal }} />
        <h1 className="text-2xl font-extrabold mb-4">{t.h}</h1>
        {!info && !err && <p>{t.loading}</p>}
        {err && <p className="font-bold" style={{ color: '#b3261e' }}>{err}</p>}
        {info && (
          <>
            <p><b>{t.listing}:</b> {info.listing_address}<br /><b>{t.status}:</b> {t.st[info.status] || info.status}
              {!ended && <><br /><b>{t.next}:</b> {nice(info.next_charge_on)} (${Number(info.amount).toFixed(2)})</>}</p>
            {done ? <p className="mt-4 font-bold flex gap-2" style={{ color: C.teal }}><CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />{done}</p>
              : ended ? <p className="mt-4 font-bold">{t.ended}</p>
              : ask ? (
                <div className="mt-5">
                  <p className="font-bold mb-3">{ask === 'pending' ? t.confirmPending : t.confirmCancel}</p>
                  <button type="button" disabled={busy} onClick={act} className="rounded-full px-6 py-3 font-extrabold text-white mr-3 disabled:opacity-60" style={btn}>{ask === 'pending' ? t.pending : t.cancel}</button>
                  <button type="button" onClick={() => setAsk('')} className="underline" style={{ color: C.teal }}>{lang === 'es' ? 'Volver' : 'Go back'}</button>
                </div>
              ) : (
                <div className="mt-5 flex flex-wrap gap-3">
                  <button type="button" onClick={() => setAsk('pending')} className="rounded-full px-6 py-3 font-extrabold text-white" style={btn}>{t.pending}</button>
                  <button type="button" onClick={() => setAsk('cancel')} className="rounded-full px-6 py-3 font-extrabold border-2" style={{ borderColor: C.orange, color: C.brown }}>{t.cancel}</button>
                  <p className="w-full text-sm mt-2" style={{ color: '#6b5a50' }}>{t.keep}</p>
                </div>
              )}
          </>
        )}
        <p className="text-sm mt-6" style={{ color: '#6b5a50' }}>{lang === 'es' ? '¿Preguntas?' : 'Questions?'} <a href={`mailto:${SUPPORT}`} style={{ color: C.teal }}>{SUPPORT}</a></p>
      </div>
    </div>
  );
};
