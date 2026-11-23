import React, { useRef, useState } from 'react';
import { HeartHandshake, CheckCircle2, Plus, X, Bot, Layers } from 'lucide-react';
import type { Language } from '../types';
import {
  C, MUTED, BORDER, BTN, inputCls, TERMS_URL, fmtPrice, useExtrasCheckout, type Choice,
  Label, SectionH, PracticeBanner, CardBox, CheckRow, PayButton, ErrorLine, SuccessPanel, Footer,
} from './ExtrasCheckoutKit';

interface Props {
  language?: Language;
  onNavigate: (path: string) => void;
}

// N.E.S.T. by HTC sales page + one-form checkout: /nest/ and /es/nest/ (Nov 23, 2026). Function: nest-checkout.
// Every drop-down is built from the config lists (sides, occupancy, journey, languages), never hard-coded.
// Michelle's form rules (Nov 22, 11:45 PM): customer type = ONE drop-down sent as a one-item array; side = Seller
// pre-selects "Seller" (seller_only); the personal notes box is ALWAYS visible (a gray line explains "No" clears it).
const FN = 'nest-checkout';
const BOX = 'nestCardBox';
const MAX_EMAILS = 4;

type Copy = {
  eyebrow: string; h1: string; sub: string; priceTail: string;
  incH: string; inc: [string, string][];
  howH: string; how: [string, string][];
  scaleH: string; scaleP: string; diyH: string; diyA: string; winnieWord: string; diyB: string;
  smallH: string; small: string;
  formH: string; practice: string;
  sYou: string; first: string; last: string; email: string; phone: string; brokerage: string;
  sClosing: string; address: string; city: string; zip: string; closing: string; side: string;
  sClient: string; cnames: string; cnamesPh: string; cemail: string; addEmail: string; remove: string;
  sQ: string; q1: string; q1Ph: string; q2: string; yes: string; no: string;
  notes: string; notesPh: string; notesNo: string; q3: string; q4: string; q5: string; note: string;
  choose: string; sPay: string; card: string; loadingCard: string; cardNote: string;
  termsA: string; termsLink: string; termsB: (p: string) => string;
  btn: (p: string) => string; paying: string; unavailable: string;
  missing: (label: string) => string; errQ2: string; errLoad: string; errCard: string; errTerms: string;
  okH: string; ok: (first: string, email: string, code: string) => string;
  questions: string; terms: string; privacy: string;
};

const EN: Copy = {
  eyebrow: 'N.E.S.T. BY HTC · Nurture • Engage • Stay Top-of-Mind',
  h1: 'The closing may be complete. The relationship isn\'t.',
  sub: 'Personalized, first-year post-closing care for your client — sent in your name, with your branding. We do it for you.',
  priceTail: 'per closing · One closed sale, one client · Not a subscription · No registration needed.',
  incH: 'What\'s included',
  inc: [
    ['', 'Seven thoughtful touches on Days 7, 30, 60, 90, 180, 240 and 365 (the houseversary).'],
    ['', 'Written for your client\'s type — first-time buyer, move-up, investor, seller, second home, or empty nester/downsizer.'],
    ['', 'English or Spanish.'],
    ['', 'Branded to you: your name, photo and brokerage. Your client never sees HTC\'s name.'],
    ['KEYS', ' — reminders for you to call and connect personally. The system can send the email. Only you can build the relationship.'],
    ['PORCH', ' — your monthly relationship report: what happened, who needs you, what to do next.'],
  ],
  howH: 'How it works',
  how: [
    ['Fill in one form', 'About 2 minutes.'],
    ['Pay', 'One closing, one payment.'],
    ['We take it from here', 'You get a confirmation email with everything you sent us.'],
  ],
  scaleH: 'Already on Scale?', scaleP: 'N.E.S.T. is included — no need to buy it here.',
  diyH: 'Doing it yourself?', diyA: 'Try ', winnieWord: 'Winnie', diyB: ', the Grok bot version — $299 one time.',
  smallH: 'Small print',
  small: 'One N.E.S.T. per closing. No physical gifts. We never guarantee referrals or repeat business. Clients can unsubscribe anytime.',
  formH: 'Enroll your client', practice: 'Practice mode — no card will be charged.',
  sYou: 'You (the agent)', first: 'First name', last: 'Last name', email: 'Email', phone: 'Mobile phone', brokerage: 'Brokerage',
  sClosing: 'The closing', address: 'Street address', city: 'City', zip: 'ZIP code', closing: 'Closing date', side: 'Which side did you represent?',
  sClient: 'Your client', cnames: 'Client name(s)', cnamesPh: 'e.g. Maria and José Rivera', cemail: 'Client email', addEmail: 'Add another email', remove: 'Remove',
  sQ: 'The 5 questions',
  q1: '1. How should we greet them?', q1Ph: 'e.g. "Maria and José"',
  q2: '2. May we use personal details they shared in the emails?', yes: 'Yes', no: 'No',
  notes: 'Anything personal? (pets, hobbies, birthdays…)',
  notesPh: 'Anything personal they shared: pets, hobbies, birthdays, kids, favorite places.',
  notesNo: 'If you answer No, we won\'t keep these notes.',
  q3: '3. How will the home be used?', q4: '4. Which one is closest to your customer?', q5: '5. Which language should the emails be in?',
  note: 'Anything else we should know? (optional)',
  choose: 'Choose one…', sPay: 'Pay', card: 'Card',
  loadingCard: 'Loading the secure card box…', cardNote: 'Your card goes straight to our payment company (USAePay). HTC never sees your card number.',
  termsA: 'I agree to ', termsLink: 'HTC\'s Terms and Conditions',
  termsB: (p) => ` and I authorize this one-time charge of ${p} for this closing.`,
  btn: (p) => `Enroll my client — ${p}`, paying: 'Processing…',
  unavailable: 'Not available right now. Email support@hometowntc.com.',
  missing: (l) => `Please fill in: ${l.replace(/^\d\.\s*/, '')}`,
  errQ2: 'Question 2: please answer yes or no.',
  errLoad: 'We couldn\'t load secure checkout. Please refresh the page or email support@hometowntc.com.',
  errCard: 'Please check your card details.', errTerms: 'Please check the box to agree to the Terms.',
  okH: 'Order received',
  ok: (f, e, c) => `Your client is enrolled, ${f}! A confirmation is on its way to ${e}. Order ${c}. Something not right? Reply to that email or write to support@hometowntc.com.`,
  questions: 'Questions?', terms: 'Terms and Conditions', privacy: 'Privacy Policy',
};

const ES: Copy = {
  eyebrow: 'N.E.S.T. DE HTC · Nurture • Engage • Stay Top-of-Mind',
  h1: 'El cierre terminó. La relación no.',
  sub: 'Cuidado personalizado para tu cliente durante el primer año después del cierre — enviado a tu nombre, con tu marca. Lo hacemos por ti.',
  priceTail: 'por cierre · Una venta cerrada, un cliente · Sin suscripción · No necesitas registrarte.',
  incH: 'Lo que incluye',
  inc: [
    ['', 'Siete contactos especiales en los días 7, 30, 60, 90, 180, 240 y 365 (el aniversario de la casa).'],
    ['', 'Escritos según el tipo de cliente — comprador de primera vivienda, sube de casa, inversionista, vendedor, segunda vivienda, o nido vacío/reduce de casa.'],
    ['', 'En inglés o en español.'],
    ['', 'Con tu marca: tu nombre, foto y corredora. Tu cliente nunca ve el nombre de HTC.'],
    ['KEYS', ' — recordatorios para que llames y conectes en persona. El sistema puede enviar el correo. Solo tú puedes construir la relación.'],
    ['PORCH', ' — tu reporte mensual de relaciones: qué pasó, quién te necesita, qué hacer después.'],
  ],
  howH: 'Cómo funciona',
  how: [
    ['Llena un solo formulario', 'Unos 2 minutos.'],
    ['Paga', 'Un cierre, un pago.'],
    ['Nosotros nos encargamos', 'Recibes un correo de confirmación con todo lo que nos enviaste.'],
  ],
  scaleH: '¿Ya estás en Scale?', scaleP: 'N.E.S.T. está incluido — no necesitas comprarlo aquí.',
  diyH: '¿Prefieres hacerlo tú?', diyA: 'Prueba ', winnieWord: 'Winnie', diyB: ', la versión con bot de Grok — $299 un solo pago.',
  smallH: 'Letra pequeña',
  small: 'Un N.E.S.T. por cierre. No incluye regalos físicos. Nunca garantizamos referidos ni negocios repetidos. Los clientes pueden darse de baja cuando quieran.',
  formH: 'Inscribe a tu cliente', practice: 'Modo de práctica — no se cobrará ninguna tarjeta.',
  sYou: 'Tú (el agente)', first: 'Nombre', last: 'Apellido', email: 'Correo', phone: 'Celular', brokerage: 'Corredora (brokerage)',
  sClosing: 'El cierre', address: 'Dirección de la propiedad', city: 'Ciudad', zip: 'Código postal', closing: 'Fecha de cierre', side: '¿A qué lado representaste?',
  sClient: 'Tu cliente', cnames: 'Nombre(s) del cliente', cnamesPh: 'ej. María y José Rivera', cemail: 'Correo del cliente', addEmail: 'Agregar otro correo', remove: 'Quitar',
  sQ: 'Las 5 preguntas',
  q1: '1. ¿Cómo los saludamos?', q1Ph: 'ej. "María y José"',
  q2: '2. ¿Podemos usar en los correos detalles personales que compartieron?', yes: 'Sí', no: 'No',
  notes: '¿Algo personal? (mascotas, pasatiempos, cumpleaños…)',
  notesPh: 'Algo personal que compartieron: mascotas, pasatiempos, cumpleaños, hijos, lugares favoritos.',
  notesNo: 'Si respondes No, no guardaremos estas notas.',
  q3: '3. ¿Cómo se usará la casa?', q4: '4. ¿Cuál se parece más a tu cliente?', q5: '5. ¿En qué idioma deben ir los correos?',
  note: '¿Algo más que debamos saber? (opcional)',
  choose: 'Elige una opción…', sPay: 'Pago', card: 'Tarjeta',
  loadingCard: 'Cargando el formulario seguro de la tarjeta…', cardNote: 'Tu tarjeta va directo a nuestra compañía de pagos (USAePay). HTC nunca ve el número de tu tarjeta.',
  termsA: 'Acepto los ', termsLink: 'Términos y Condiciones de HTC',
  termsB: (p) => ` y autorizo este cargo único de ${p} por este cierre.`,
  btn: (p) => `Inscribir a mi cliente — ${p}`, paying: 'Procesando…',
  unavailable: 'No está disponible en este momento. Escribe a support@hometowntc.com.',
  missing: (l) => `Por favor completa: ${l.replace(/^\d\.\s*/, '')}`,
  errQ2: 'Pregunta 2: por favor responde sí o no.',
  errLoad: 'No pudimos cargar el pago seguro. Por favor recarga la página o escribe a support@hometowntc.com.',
  errCard: 'Revisa los datos de la tarjeta.', errTerms: 'Por favor marca la casilla para aceptar los Términos.',
  okH: 'Pedido recibido',
  ok: (f, e, c) => `¡Tu cliente está inscrito, ${f}! La confirmación va camino a ${e}. Pedido ${c}. ¿Algo no está bien? Responde a ese correo o escribe a support@hometowntc.com.`,
  questions: '¿Preguntas?', terms: 'Términos y Condiciones', privacy: 'Política de Privacidad',
};

type F = {
  first: string; last: string; email: string; phone: string; brokerage: string;
  address: string; city: string; zip: string; closing: string; side: string;
  cnames: string; greeting: string; notes: string; occupancy: string; journey: string; language: string; note: string;
};

export const NestPage: React.FC<Props> = ({ language = 'en', onNavigate }) => {
  const lang: Language = language === 'es' ? 'es' : 'en';
  const t = lang === 'es' ? ES : EN;
  const { cfg, cfgErr, cardMsg, purchase } = useExtrasCheckout(FN, BOX, t);
  const price = fmtPrice(cfg?.price) || '…';
  const [f, setF] = useState<F>({
    first: '', last: '', email: '', phone: '', brokerage: '', address: '', city: '', zip: '', closing: '', side: '',
    cnames: '', greeting: '', notes: '', occupancy: '', journey: '', language: lang, note: '',
  });
  const [emails, setEmails] = useState<string[]>(['']);
  const [personalOk, setPersonalOk] = useState<boolean | null>(null);
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState<{ text: string; practice: boolean } | null>(null);
  const winniePath = lang === 'es' ? '/es/winnie/' : '/winnie/';

  const set = (k: keyof F, v: string) => setF((p) => ({ ...p, [k]: v }));
  const onSide = (v: string) => setF((p) => ({
    ...p, side: v,
    // Seller side pre-selects the "Seller" customer type; the agent can still change it.
    journey: v === 'seller' && cfg?.journey?.some((j) => j.code === 'seller_only') ? 'seller_only' : p.journey,
  }));

  const opts = (list?: Choice[]) => (list || []).map((c) => <option key={c.code} value={c.code}>{c[lang]}</option>);

  // Quick check before asking Pay.js for a card key, so a missing field is named first (the server re-checks everything).
  const required: [keyof F, string][] = [
    ['first', t.first], ['last', t.last], ['email', t.email], ['phone', t.phone], ['brokerage', t.brokerage],
    ['address', t.address], ['city', t.city], ['zip', t.zip], ['closing', t.closing], ['side', t.side],
    ['cnames', t.cnames], ['greeting', t.q1], ['occupancy', t.q3], ['journey', t.q4], ['language', t.q5],
  ];

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (busyRef.current || done) return;
    const miss = required.find(([k]) => !f[k].trim());
    if (miss) { document.getElementById(`nest-${miss[0]}`)?.focus(); return setErr(t.missing(miss[1])); }
    const cem = emails.map((e) => e.trim()).filter(Boolean);
    if (!cem.length) { document.getElementById('nest-cemail-0')?.focus(); return setErr(t.missing(t.cemail)); }
    if (personalOk === null) return setErr(t.errQ2);
    if (!agree) return setErr(t.errTerms);
    busyRef.current = true; setBusy(true); setErr(null);
    try {
      const r = await purchase({
        lang, first_name: f.first.trim(), last_name: f.last.trim(), email: f.email.trim(), phone: f.phone.trim(), brokerage: f.brokerage.trim(),
        property_address: f.address.trim(), property_city: f.city.trim(), property_zip: f.zip.trim(), closing_date: f.closing, side: f.side,
        customer_names: f.cnames.trim(), customer_emails: cem,
        greeting: f.greeting.trim(), personal_ok: personalOk, personal_notes: f.notes.trim(),
        occupancy: f.occupancy, journey: [f.journey], language: f.language, agent_note: f.note.trim(),
      });
      setDone({ text: t.ok(f.first.trim(), r.email, r.code), practice: !!r.practice });
      document.getElementById('buy')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (e: any) {
      setErr(e?.message || t.errLoad);
    } finally { busyRef.current = false; setBusy(false); }
  };

  const text = (k: keyof F, label: string, o: { type?: string; ac?: string; im?: React.HTMLAttributes<HTMLInputElement>['inputMode']; ph?: string; max?: number; pattern?: string } = {}) => (
    <div>
      <Label htmlFor={`nest-${k}`}>{label}</Label>
      <input id={`nest-${k}`} type={o.type || 'text'} autoComplete={o.ac} inputMode={o.im} placeholder={o.ph} maxLength={o.max} pattern={o.pattern}
        required value={f[k]} onChange={(e) => set(k, k === 'zip' ? e.target.value.replace(/\D/g, '').slice(0, 5) : e.target.value)}
        className={inputCls} style={{ borderColor: BORDER }} />
    </div>
  );
  const select = (k: keyof F, label: string, list?: Choice[], onChange?: (v: string) => void) => (
    <div>
      <Label htmlFor={`nest-${k}`}>{label}</Label>
      <select id={`nest-${k}`} required value={f[k]} onChange={(e) => (onChange ? onChange(e.target.value) : set(k, e.target.value))}
        className={inputCls} style={{ borderColor: BORDER }}>
        <option value="" disabled>{t.choose}</option>
        {opts(list)}
      </select>
    </div>
  );
  const yn = (v: boolean, label: string) => {
    const on = personalOk === v;
    return (
      <button type="button" aria-pressed={on} onClick={() => setPersonalOk(v)}
        className="flex-1 min-h-[52px] rounded-xl border-2 font-extrabold text-lg"
        style={{ borderColor: on ? C.teal : BORDER, background: on ? C.teal : '#fff', color: on ? '#fff' : C.brown }}>
        {label}
      </button>
    );
  };

  const wrap = 'max-w-3xl mx-auto px-5';
  const sec = 'py-12 border-t';

  return (
    <div style={{ background: C.cream, color: C.brown }} className="text-[17px] leading-relaxed">
      <div className={`${wrap} text-center pt-14 pb-10`}>
        <HeartHandshake className="w-16 h-16 mx-auto mb-4" style={{ color: C.orange }} aria-hidden="true" />
        <div className="uppercase tracking-widest text-xs font-bold" style={{ color: C.teal }}>{t.eyebrow}</div>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight my-3">{t.h1}</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">{t.sub}</p>
        <div className="text-4xl font-extrabold">{price}</div>
        <p className="mt-1 mb-6 text-sm font-semibold max-w-xl mx-auto" style={{ color: MUTED }}>{t.priceTail}</p>
        <a href="#buy" className="inline-flex items-center min-h-[52px] rounded-full px-8 py-4 font-extrabold text-white" style={BTN}>{t.btn(price)}</a>
      </div>

      <section className={sec} style={{ borderColor: C.line }}>
        <div className={wrap}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.incH}</h2>
          <ul className="space-y-3">
            {t.inc.map(([b, rest]) => (
              <li key={rest} className="flex gap-2"><CheckCircle2 className="w-5 h-5 mt-1 shrink-0" style={{ color: C.gold }} aria-hidden="true" />
                <span>{b && <b style={{ color: C.teal }}>{b}</b>}{rest}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className={sec} style={{ borderColor: C.line, background: C.cream2 }}>
        <div className={wrap}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.howH}</h2>
          <ol className="grid md:grid-cols-3 gap-4">
            {t.how.map(([h, p], i) => (
              <li key={h} className="bg-white rounded-xl p-5 border" style={{ borderColor: C.line }}>
                <span className="inline-block w-9 h-9 rounded-full text-white text-center font-extrabold leading-9 mb-2" style={{ background: C.teal }}>{i + 1}</span>
                <h3 className="font-bold text-lg">{i === 1 ? `${h} ${price}` : h}</h3><p>{p}</p>
              </li>
            ))}
          </ol>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white rounded-xl p-5 border" style={{ borderColor: C.line }}>
              <h3 className="font-bold flex items-center gap-2" style={{ color: C.teal }}><Layers className="w-5 h-5" aria-hidden="true" />{t.scaleH}</h3>
              <p>{t.scaleP}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border" style={{ borderColor: C.line }}>
              <h3 className="font-bold flex items-center gap-2" style={{ color: C.teal }}><Bot className="w-5 h-5" aria-hidden="true" />{t.diyH}</h3>
              <p>{t.diyA}<a href={winniePath} onClick={(e) => { e.preventDefault(); onNavigate(winniePath); }} className="font-bold underline" style={{ color: C.teal }}>{t.winnieWord}</a>{t.diyB}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="buy" className={sec} style={{ borderColor: C.line }}>
        <div className={wrap}>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">{t.formH}</h2>
          <p className="text-[14.5px] rounded-xl p-4 border border-dashed" style={{ borderColor: BORDER, background: '#fffdf9' }}><b>{t.smallH}:</b> {t.small}</p>

          {done ? (
            <SuccessPanel title={t.okH} text={done.text} practice={done.practice} practiceText={t.practice} />
          ) : cfgErr ? (
            <p className="mt-6 font-bold text-center">{t.errLoad}</p>
          ) : !cfg ? (
            // Form renders only in the browser, after config loads (nothing typed can be lost while the page wakes up).
            <p className="mt-6 text-center" style={{ color: MUTED }}>{t.loadingCard}</p>
          ) : !cfg.available ? (
            <p className="mt-6 font-bold text-center">{t.unavailable}</p>
          ) : (
            <form onSubmit={submit} noValidate className="bg-white rounded-2xl p-5 md:p-6 mt-4 text-left border-2" style={{ borderColor: C.gold }}>
              {cfg.mode !== 'live' && <PracticeBanner text={t.practice} />}

              <SectionH>{t.sYou}</SectionH>
              <div className="grid md:grid-cols-2 gap-x-3">
                {text('first', t.first, { ac: 'given-name' })}
                {text('last', t.last, { ac: 'family-name' })}
                {text('email', t.email, { type: 'email', ac: 'email', im: 'email' })}
                {text('phone', t.phone, { type: 'tel', ac: 'tel', im: 'tel' })}
              </div>
              {text('brokerage', t.brokerage, { ac: 'organization' })}

              <SectionH>{t.sClosing}</SectionH>
              {text('address', t.address, { ac: 'off' })}
              <div className="grid grid-cols-[1fr_8rem] gap-x-3">
                {text('city', t.city, { ac: 'off' })}
                {text('zip', t.zip, { im: 'numeric', ac: 'off', max: 5, pattern: '[0-9]{5}' })}
              </div>
              <div className="grid md:grid-cols-2 gap-x-3">
                <div>
                  <Label htmlFor="nest-closing">{t.closing}</Label>
                  <input id="nest-closing" type="date" required value={f.closing} min={cfg?.closing_min} max={cfg?.closing_max}
                    onChange={(e) => set('closing', e.target.value)} className={inputCls} style={{ borderColor: BORDER }} />
                </div>
                {select('side', t.side, cfg?.sides, onSide)}
              </div>

              <SectionH>{t.sClient}</SectionH>
              {text('cnames', t.cnames, { ph: t.cnamesPh, ac: 'off' })}
              <Label htmlFor="nest-cemail-0">{t.cemail}</Label>
              {emails.map((em, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input id={`nest-cemail-${i}`} type="email" inputMode="email" autoComplete="off" value={em}
                    aria-label={i ? `${t.cemail} ${i + 1}` : undefined}
                    onChange={(e) => setEmails(emails.map((x, j) => (j === i ? e.target.value : x)))}
                    className={inputCls} style={{ borderColor: BORDER }} />
                  {i > 0 && (
                    <button type="button" onClick={() => setEmails(emails.filter((_, j) => j !== i))} aria-label={t.remove}
                      className="shrink-0 w-12 min-h-[48px] rounded-lg border flex items-center justify-center" style={{ borderColor: BORDER }}>
                      <X className="w-5 h-5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              ))}
              {emails.length < MAX_EMAILS && (
                <button type="button" onClick={() => setEmails([...emails, ''])}
                  className="inline-flex items-center gap-1 min-h-[44px] font-bold" style={{ color: C.teal }}>
                  <Plus className="w-5 h-5" aria-hidden="true" />{t.addEmail}
                </button>
              )}

              <SectionH>{t.sQ}</SectionH>
              {text('greeting', t.q1, { ph: t.q1Ph, ac: 'off' })}
              <div role="group" aria-labelledby="nest-q2">
                <p id="nest-q2" className="text-sm font-bold mt-4 mb-2">{t.q2}</p>
                <div className="flex gap-3">{yn(true, t.yes)}{yn(false, t.no)}</div>
              </div>
              <Label htmlFor="nest-notes">{t.notes}</Label>
              <textarea id="nest-notes" rows={3} value={f.notes} placeholder={t.notesPh} onChange={(e) => set('notes', e.target.value)}
                className={`${inputCls} min-h-[96px]`} style={{ borderColor: BORDER }} />
              {personalOk === false && <p className="text-sm mt-1" style={{ color: MUTED }}>{t.notesNo}</p>}
              {select('occupancy', t.q3, cfg?.occupancy)}
              {select('journey', t.q4, cfg?.journey)}
              {select('language', t.q5, cfg?.languages)}
              <Label htmlFor="nest-note">{t.note}</Label>
              <textarea id="nest-note" rows={3} value={f.note} onChange={(e) => set('note', e.target.value)}
                className={`${inputCls} min-h-[96px]`} style={{ borderColor: BORDER }} />

              <SectionH>{t.sPay}</SectionH>
              <CardBox id={BOX} label={t.card} msg={cardMsg} note={t.cardNote} />
              <CheckRow checked={agree} onChange={setAgree}>
                {t.termsA}<a href={cfg.terms_url || TERMS_URL} target="_blank" rel="noopener noreferrer" style={{ color: C.teal }} className="underline">{t.termsLink}</a>{t.termsB(price)}
              </CheckRow>
              <ErrorLine text={err} />
              <PayButton busy={busy} label={t.btn(price)} busyLabel={busy ? t.paying : t.btn(price)} />
            </form>
          )}
        </div>
      </section>

      <Footer cfg={cfg} questions={t.questions} terms={t.terms} privacy={t.privacy} />
    </div>
  );
};
