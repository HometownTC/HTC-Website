import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, MessageSquareText, ClipboardList, FileCheck2 } from 'lucide-react';
import type { Language } from '../types';

interface Props {
  language?: Language;
  onNavigate: (path: string) => void;
}

// LIT by HTC sales page + checkout: /lit/ and /es/lit/ (Nov 21, 2026).
// Checkout goes to the lit-checkout Supabase function (USAePay Pay.js; the card never touches HTC).
// The private Grok bot link is NOT on this page: it is a server secret and only goes into the delivery email.
const FN = 'https://gagsnnrakqbtuyystfkr.supabase.co/functions/v1/lit-checkout';
const TERMS_URL = 'https://docs.google.com/document/d/1_d5pJYpIKIB9WtUb4KbGyK2DlJOLTt0BJurvsg-X5fY/view';
const PRIVACY_URL = 'https://docs.google.com/document/d/10_5VpAS8_nYBp9SWSp5RU98UWsFK7jNmxsIus-ICV5Q/view';
const SUPPORT = 'support@hometowntc.com';

const C = {
  brown: '#3A2E29', orange: '#FE7311', amber: '#FF8C13', gold: '#FDBB16', teal: '#0D9BA3', cream: '#FFF8EE', cream2: '#FBEFDD', line: '#EADBC4',
};

type Copy = {
  eyebrow: string; h1: string; lede: string; cta: string; ctaNote: string;
  probH: string; prob: string[];
  qH: string; qP: string; q1: string; q1n: string; q2: string; q2n: string; qEnd: string;
  doesH: string; does: [string, string][]; approve: string;
  whoH: string; who: string; notFit: string; lampWord: string;
  getH: string; get: string[];
  fineH: string; fine: string[];
  price: string; once: string; noSub: string; buy: string;
  practice: string; coH: string; first: string; last: string; email: string; phone: string; brokerage: string; card: string;
  loadingCard: string; cardNote: string; termsA: string; termsLink: string; termsB: string; pay: string; paying: string;
  errLoad: string; errTerms: string; errCard: string; ok: (code: string, email: string) => string;
  lampH: string; lampP: string; freeH: string; freeP: string;
  questions: string; terms: string; privacy: string;
};

const EN: Copy = {
  eyebrow: 'LIT by HTC · Built on the 2-Question method',
  h1: 'Turn showing feedback into something a seller can use.',
  lede: 'LIT is an editable Grok bot template for listing agents. It tracks your showings and open houses, asks buyer agents two simple questions by text, and prepares agent and seller reports as drafts for you to approve.',
  cta: 'Get LIT · $299 one-time',
  ctaNote: 'One-time purchase · Your own editable Grok bot.',
  probH: 'The problem: "They liked it."',
  prob: [
    'You chase buyer agents for feedback after every showing. When it comes back, it\'s often vague: "Nice home." "They\'re thinking about it." "Not for them."',
    'That\'s hard to put in front of a seller. It doesn\'t say whether anyone is close to an offer, and it doesn\'t say what would change a buyer\'s mind.',
  ],
  qH: 'The fix: ask 2 questions, every time', qP: 'HTC\'s 2-Question method keeps feedback short and useful.',
  q1: '"Is your buyer considering making an offer?"', q1n: 'Answer: Yes / No / Pending',
  q2: '"What would have made it a YES for your buyer?"', q2n: 'Asked only when the answer to Question 1 is No.',
  qEnd: 'Two questions are quick for a buyer agent to answer by text. Over a few weeks, the answers show your seller a clear picture of how the market sees their home.',
  doesH: 'What LIT does',
  does: [
    ['Tracks showings and open houses', 'Keeps track of every private showing and every open house.'],
    ['Asks for feedback by text', 'Asks buyer agents the 2 Questions by text.'],
    ['Drafts agent and seller reports', 'Prepares your agent report and your weekly seller report as drafts.'],
  ],
  approve: 'You review and approve both before anything goes to your seller.',
  whoH: 'Who LIT is for',
  who: 'LIT is for do-it-yourself listing agents who are comfortable using Grok. You set it up, train it, run it and keep it up to date. You are responsible for how it\'s used and what it produces.',
  notFit: 'Not a fit if you\'d rather have someone handle this for you. See', lampWord: 'L.A.M.P.',
  getH: 'What you get and how delivery works',
  get: [
    'The LIT Grok bot template: downloadable and editable, built on the 2-Question method.',
    'Right after you pay, we email you a private link to add LIT, with step-by-step "Add to Grok Bot" instructions.',
  ],
  fineH: 'The honest fine print',
  fine: [
    'A Grok/AI subscription or other third-party costs may apply.',
    'You configure, train, operate and maintain LIT, and you are responsible for its use and output.',
    'HTC does not manage the bot.',
    'Platforms change. There is no guarantee of future compatibility, ongoing support, permanent availability or results.',
    'License and product terms apply.',
    'All sales are final.',
  ],
  price: '$299', once: 'one-time', noSub: 'No subscription from HTC. No registration needed.', buy: 'Buy LIT',
  practice: 'Practice checkout: no card will be charged.', coH: 'Checkout · $299 one-time',
  first: 'First name', last: 'Last name', email: 'Email (your LIT link goes here)', phone: 'Phone', brokerage: 'Brokerage', card: 'Card',
  loadingCard: 'Loading the secure card box…', cardNote: 'Your card goes straight to our payment company (USAePay). HTC never sees your card number.',
  termsA: 'I agree to ', termsLink: 'HTC\'s Terms and Conditions',
  termsB: ', I understand a Grok/AI subscription may be needed, all sales are final, and I authorize this one-time charge of $299.',
  pay: 'Pay $299', paying: 'Processing…',
  errLoad: 'We couldn\'t load secure checkout. Please refresh the page or email support@hometowntc.com.',
  errTerms: 'Please check the box to agree to the Terms.', errCard: 'Please check your card details.',
  ok: (c, e) => `You're all set! Order ${c}. We emailed your LIT link to ${e}. Check your inbox (and spam).`,
  lampH: 'Prefer us to handle it? L.A.M.P.',
  lampP: 'Listing Activity, Monitoring & Progress is HTC\'s done-for-you service: our team does the work. $99 per active listing for 4 weekly reports.',
  freeH: 'Start free: the field guide + Google Sheets tracker', freeP: 'Learn the 2-Question method and try it with a free showing feedback tracker before you buy anything.',
  questions: 'Questions?', terms: 'Terms and Conditions', privacy: 'Privacy Policy',
};

const ES: Copy = {
  eyebrow: 'LIT de HTC · Basado en el método de las 2 Preguntas',
  h1: 'Convierte los comentarios de las visitas en algo que tu vendedor pueda usar.',
  lede: 'LIT es una plantilla editable de bot de Grok para agentes de listados. Lleva el registro de tus visitas y casas abiertas, les hace dos preguntas sencillas por texto a los agentes compradores y prepara reportes para el agente y para el vendedor como borradores que tú apruebas.',
  cta: 'Obtén LIT · $299 pago único',
  ctaNote: 'Compra única · Tu propio bot de Grok editable.',
  probH: 'El problema: "Les gustó."',
  prob: [
    'Después de cada visita persigues a los agentes compradores para pedir comentarios. Cuando responden, casi siempre es algo vago: "Linda casa." "Lo están pensando." "No es para ellos."',
    'Eso es difícil de presentarle a un vendedor. No dice si alguien está cerca de hacer una oferta ni qué haría cambiar de opinión a un comprador.',
  ],
  qH: 'La solución: haz 2 preguntas, siempre', qP: 'El método de las 2 Preguntas de HTC mantiene los comentarios cortos y útiles.',
  q1: '"¿Tu comprador está considerando hacer una oferta?"', q1n: 'Respuesta: Sí / No / Pendiente',
  q2: '"¿Qué habría hecho que fuera un SÍ para tu comprador?"', q2n: 'Solo se pregunta cuando la respuesta a la Pregunta 1 es No.',
  qEnd: 'Dos preguntas se contestan rápido por texto. En pocas semanas, las respuestas le dan a tu vendedor una imagen clara de cómo ve el mercado su propiedad.',
  doesH: 'Qué hace LIT',
  does: [
    ['Registra visitas y casas abiertas', 'Lleva el registro de cada visita privada y cada casa abierta.'],
    ['Pide comentarios por texto', 'Les hace las 2 Preguntas por texto a los agentes compradores.'],
    ['Prepara reportes para el agente y el vendedor', 'Prepara tu reporte de agente y tu reporte semanal para el vendedor como borradores.'],
  ],
  approve: 'Tú revisas y apruebas ambos antes de que algo llegue a tu vendedor.',
  whoH: 'Para quién es LIT',
  who: 'LIT es para agentes de listados que prefieren hacerlo ellos mismos y se sienten cómodos usando Grok. Tú lo configuras, lo entrenas, lo operas y lo mantienes al día. Tú eres responsable de cómo se usa y de lo que produce.',
  notFit: 'Si prefieres que alguien se encargue por ti, no es para ti. Mira', lampWord: 'L.A.M.P.',
  getH: 'Qué recibes y cómo se entrega',
  get: [
    'La plantilla de bot de Grok LIT: descargable y editable, basada en el método de las 2 Preguntas.',
    'Justo después de pagar, te enviamos por correo un enlace privado para agregar LIT, con instrucciones paso a paso de "Add to Grok Bot".',
  ],
  fineH: 'La letra pequeña, con honestidad',
  fine: [
    'Puede requerirse una suscripción a Grok/IA u otros costos de terceros.',
    'Tú configuras, entrenas, operas y mantienes LIT, y eres responsable de su uso y de lo que produce.',
    'HTC no administra el bot.',
    'Las plataformas cambian. No hay garantía de compatibilidad futura, soporte continuo, disponibilidad permanente ni resultados.',
    'Aplican la licencia y los términos del producto.',
    'Todas las ventas son finales.',
  ],
  price: '$299', once: 'pago único', noSub: 'Sin suscripción con HTC. No necesitas registrarte.', buy: 'Comprar LIT',
  practice: 'Pago de práctica: no se cobrará ninguna tarjeta.', coH: 'Pago · $299 pago único',
  first: 'Nombre', last: 'Apellido', email: 'Correo (aquí llega tu enlace de LIT)', phone: 'Teléfono', brokerage: 'Corredora (brokerage)', card: 'Tarjeta',
  loadingCard: 'Cargando el formulario seguro de la tarjeta…', cardNote: 'Tu tarjeta va directo a nuestra compañía de pagos (USAePay). HTC nunca ve el número de tu tarjeta.',
  termsA: 'Acepto los ', termsLink: 'Términos y Condiciones de HTC',
  termsB: ', entiendo que puede requerirse una suscripción a Grok/IA, que todas las ventas son finales, y autorizo este cargo único de $299.',
  pay: 'Pagar $299', paying: 'Procesando…',
  errLoad: 'No pudimos cargar el pago seguro. Por favor recarga la página o escribe a support@hometowntc.com.',
  errTerms: 'Por favor marca la casilla para aceptar los Términos.', errCard: 'Revisa los datos de la tarjeta.',
  ok: (c, e) => `¡Listo! Pedido ${c}. Enviamos tu enlace de LIT a ${e}. Revisa tu bandeja de entrada (y spam).`,
  lampH: '¿Prefieres que nosotros nos encarguemos? L.A.M.P.',
  lampP: 'Listing Activity, Monitoring & Progress es el servicio de HTC hecho por nuestro equipo: nosotros hacemos el trabajo. $99 por listado activo por 4 reportes semanales.',
  freeH: 'Empieza gratis: la guía de campo + el tracker de Google Sheets', freeP: 'Aprende el método de las 2 Preguntas y pruébalo con un tracker gratuito de comentarios de visitas antes de comprar nada.',
  questions: '¿Preguntas?', terms: 'Términos y Condiciones', privacy: 'Política de Privacidad',
};

const Flame = ({ size = 84 }: { size?: number }) => (
  <svg width={size} height={size * 110 / 84} viewBox="0 0 84 110" aria-hidden="true" className="mx-auto mb-4 block">
    <defs><linearGradient id="litFlame" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor={C.orange} /><stop offset=".55" stopColor={C.amber} /><stop offset="1" stopColor={C.gold} /></linearGradient></defs>
    <path d="M42 4C48 26 72 40 72 70a30 30 0 0 1-60 0c0-16 8-26 16-34 0 12 6 20 12 22-4-18 2-38 2-54z" fill="url(#litFlame)" />
    <path d="M42 56c4 10 14 14 14 26a14 14 0 0 1-28 0c0-8 6-12 8-18 2 6 4 8 6 8-2-6 0-12 0-16z" fill={C.cream} opacity=".85" />
  </svg>
);

declare global { interface Window { usaepay?: any } }

export const LitPage: React.FC<Props> = ({ language = 'en', onNavigate }) => {
  const lang: Language = language === 'es' ? 'es' : 'en';
  const t = lang === 'es' ? ES : EN;
  const [open, setOpen] = useState(false);
  const [practice, setPractice] = useState(false);
  const [cardMsg, setCardMsg] = useState(t.loadingCard);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [agree, setAgree] = useState(false);
  const [f, setF] = useState({ first: '', last: '', email: '', phone: '', brokerage: '' });
  // One id per checkout: the server never charges the same id twice (double-click / retry safe).
  const checkoutId = useRef<string>(crypto.randomUUID());
  const cfg = useRef<any>(null), client = useRef<any>(null), cardEntry = useRef<any>(null);

  const call = async (body: unknown) => {
    let r: Response;
    try { r = await fetch(FN, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }); }
    catch { throw new Error(t.errLoad); }
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
        cardEntry.current.addHTML('litCardBox');
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
        op: 'purchase', product: 'lit', lang, checkout_id: checkoutId.current, payment_key,
        first_name: f.first, last_name: f.last, email: f.email, phone: f.phone, brokerage: f.brokerage,
        terms_accepted: true, terms_version: cfg.current.terms_version,
      });
      setMsg({ text: t.ok(r.code, r.email), ok: true }); setDone(true);
    } catch (e: any) {
      if (e.status === 402) checkoutId.current = crypto.randomUUID(); // declined: nothing charged, a new try is safe
      setMsg({ text: e.message, ok: false });
    } finally { setBusy(false); }
  };

  const section = (_alt: boolean) => 'py-12 border-t';
  const wrap = 'max-w-3xl mx-auto px-5';
  const input = 'w-full rounded-lg border px-3 py-3 text-base';
  const field = (k: keyof typeof f, label: string, type = 'text', ac = '') => (
    <div>
      <label htmlFor={`lit-${k}`} className="block text-sm font-bold mt-3 mb-1">{label}</label>
      <input id={`lit-${k}`} type={type} autoComplete={ac} required value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })}
        className={input} style={{ borderColor: '#cdb89c' }} />
    </div>
  );
  const lampPath = lang === 'es' ? '/es/lamp/' : '/lamp/';
  const freePath = lang === 'es' ? '/es/guia-2-preguntas/' : '/resources/free-guides-downloads/2-question-advantage-field-guide/';

  return (
    <div style={{ background: C.cream, color: C.brown }} className="text-[17px] leading-relaxed">
      <div className={`${wrap} text-center pt-14 pb-10`}>
        <Flame />
        <div className="uppercase tracking-widest text-xs font-bold" style={{ color: C.teal }}>{t.eyebrow}</div>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight my-3">{t.h1}</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">{t.lede}</p>
        <a href="#buy" className="inline-block rounded-full px-8 py-4 font-extrabold text-white" style={{ background: `linear-gradient(90deg, ${C.orange}, ${C.amber})` }}>{t.cta}</a>
        <p className="mt-3 text-sm font-semibold" style={{ color: '#6b5a50' }}>{t.ctaNote}</p>
      </div>

      <section className={section(false)} style={{ borderColor: C.line }}>
        <div className={wrap}><h2 className="text-2xl md:text-3xl font-bold mb-4">{t.probH}</h2>{t.prob.map((p) => <p key={p} className="mb-3">{p}</p>)}</div>
      </section>

      <section className={section(true)} style={{ borderColor: C.line, background: C.cream2 }}>
        <div className={wrap}>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{t.qH}</h2>
          <p>{t.qP}</p>
          {[[t.q1, t.q1n], [t.q2, t.q2n]].map(([q, n], i) => (
            <div key={q} className="bg-white rounded-xl p-5 my-4 border" style={{ borderColor: C.line, borderLeft: `6px solid ${C.orange}` }}>
              <span className="inline-block w-8 h-8 rounded-full text-white text-center font-extrabold leading-8 mr-2 text-sm" style={{ background: C.teal }}>{i + 1}</span>
              <b className="text-lg">{q}</b>
              <div className="text-sm mt-1" style={{ color: '#6b5a50' }}>{n}</div>
            </div>
          ))}
          <p>{t.qEnd}</p>
        </div>
      </section>

      <section className={section(false)} style={{ borderColor: C.line }}>
        <div className={wrap}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.doesH}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {t.does.map(([h, p], i) => {
              const Icon = [ClipboardList, MessageSquareText, FileCheck2][i];
              return (
                <div key={h} className="bg-white rounded-xl p-5 border" style={{ borderColor: C.line }}>
                  <Icon className="w-6 h-6 mb-2" style={{ color: C.orange }} />
                  <h3 className="font-bold text-lg mb-1">{h}</h3>
                  <p>{p}{i === 2 && <> <b>{t.approve}</b></>}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={section(true)} style={{ borderColor: C.line, background: C.cream2 }}>
        <div className={wrap}>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{t.whoH}</h2>
          <p className="mb-3">{t.who}</p>
          <p>{t.notFit} <a href="#more" style={{ color: C.teal }} className="font-bold underline">{t.lampWord}</a>.</p>
        </div>
      </section>

      <section className={section(false)} style={{ borderColor: C.line }}>
        <div className={wrap}>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{t.getH}</h2>
          <ul className="space-y-2">
            {t.get.map((g) => <li key={g} className="flex gap-2"><CheckCircle2 className="w-5 h-5 mt-1 shrink-0" style={{ color: C.gold }} />{g}</li>)}
            <li className="flex gap-2"><Mail className="w-5 h-5 mt-1 shrink-0" style={{ color: C.gold }} />{t.questions} <a href={`mailto:${SUPPORT}`} style={{ color: C.teal }}>{SUPPORT}</a></li>
          </ul>
        </div>
      </section>

      <section className={section(true)} style={{ borderColor: C.line, background: C.cream2 }}>
        <div className={wrap}>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{t.fineH}</h2>
          <ul className="bg-white rounded-xl p-5 border border-dashed space-y-2 text-[15.5px]" style={{ borderColor: '#cdb89c' }}>
            {t.fine.map((x) => <li key={x} className="flex gap-2"><span className="w-3 h-3 rounded-full mt-2 shrink-0" style={{ background: C.gold }} />{x}</li>)}
          </ul>
        </div>
      </section>

      <section id="buy" className={section(false)} style={{ borderColor: C.line }}>
        <div className={`${wrap} text-center`}>
          <div className="uppercase tracking-widest text-xs font-bold" style={{ color: C.teal }}>LIT {lang === 'es' ? 'de' : 'by'} HTC</div>
          <div className="text-5xl font-extrabold my-2">{t.price} <span className="text-lg font-semibold" style={{ color: '#6b5a50' }}>{t.once}</span></div>
          <p className="mb-5">{t.noSub}</p>
          {!open && (
            <button type="button" onClick={() => setOpen(true)} className="rounded-full px-8 py-4 font-extrabold text-white" style={{ background: `linear-gradient(90deg, ${C.orange}, ${C.amber})` }}>
              {t.buy}
            </button>
          )}
          {open && (
            <form onSubmit={submit} noValidate className="bg-white rounded-2xl p-6 mt-6 text-left border-2" style={{ borderColor: C.gold }}>
              {practice && <div className="rounded-lg px-3 py-2 font-bold text-sm mb-3" style={{ background: C.gold }}>{t.practice}</div>}
              <h3 className="text-xl font-bold">{t.coH}</h3>
              <div className="grid md:grid-cols-2 gap-x-3">
                {field('first', t.first, 'text', 'given-name')}
                {field('last', t.last, 'text', 'family-name')}
                {field('email', t.email, 'email', 'email')}
                {field('phone', t.phone, 'tel', 'tel')}
              </div>
              {field('brokerage', t.brokerage, 'text', 'organization')}
              <label className="block text-sm font-bold mt-3 mb-1">{t.card}</label>
              <div className="min-h-[90px] rounded-lg border p-3" style={{ borderColor: '#cdb89c', background: '#fffdf9' }}>
                {cardMsg && <span className="text-sm" style={{ color: '#6b5a50' }}>{cardMsg}</span>}
                {/* Pay.js draws the secure card fields here; React never renders inside it. */}
                <div id="litCardBox" />
              </div>
              <p className="text-sm mt-2" style={{ color: '#6b5a50' }}>{t.cardNote}</p>
              <label className="flex gap-3 items-start my-4 text-[15px]">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 w-5 h-5" />
                <span>{t.termsA}<a href={TERMS_URL} target="_blank" rel="noopener noreferrer" style={{ color: C.teal }} className="underline">{t.termsLink}</a>{t.termsB}</span>
              </label>
              {!done && (
                <button type="submit" disabled={busy} className="rounded-full px-8 py-4 font-extrabold text-white disabled:opacity-60" style={{ background: `linear-gradient(90deg, ${C.orange}, ${C.amber})` }}>
                  {busy ? t.paying : t.pay}
                </button>
              )}
              {msg && <div role="status" aria-live="polite" className="mt-3 font-bold" style={{ color: msg.ok ? C.teal : '#b3261e' }}>{msg.text}</div>}
            </form>
          )}
        </div>
      </section>

      <section id="more" className={section(true)} style={{ borderColor: C.line, background: C.cream2 }}>
        <div className={`${wrap} grid md:grid-cols-2 gap-4`}>
          <a href={lampPath} onClick={(e) => { e.preventDefault(); onNavigate(lampPath); }} className="block bg-white rounded-xl p-5 border" style={{ borderColor: C.line }}>
            <b style={{ color: C.teal }}>{t.lampH}</b><br />{t.lampP}<ArrowRight className="inline w-4 h-4 ml-1" />
          </a>
          <a href={freePath} onClick={(e) => { e.preventDefault(); onNavigate(freePath); }} className="block bg-white rounded-xl p-5 border" style={{ borderColor: C.line }}>
            <b style={{ color: C.teal }}>{t.freeH}</b><br />{t.freeP}<ArrowRight className="inline w-4 h-4 ml-1" />
          </a>
        </div>
      </section>

      <div className="py-8 text-center text-sm" style={{ color: '#6b5a50' }}>
        {t.questions} <a href={`mailto:${SUPPORT}`} style={{ color: C.teal }}>{SUPPORT}</a> ·{' '}
        <a href={TERMS_URL} target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>{t.terms}</a> ·{' '}
        <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>{t.privacy}</a>
      </div>
    </div>
  );
};
