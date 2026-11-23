import React, { useRef, useState } from 'react';
import { CalendarHeart, CheckCircle2, XCircle, PenLine, BellRing, Sparkles } from 'lucide-react';
import type { Language } from '../types';
import {
  C, MUTED, BORDER, BTN, inputCls, TERMS_URL, fmtPrice, useExtrasCheckout,
  Label, PracticeBanner, CardBox, CheckRow, PayButton, ErrorLine, SuccessPanel, Footer,
} from './ExtrasCheckoutKit';

interface Props {
  language?: Language;
  onNavigate: (path: string) => void;
}

// Winnie by HTC sales page + checkout: /winnie/ and /es/winnie/ (Nov 23, 2026). Function: winnie-checkout.
// The private Grok bot link is NOT on this page: it is a server secret and only goes into the delivery email.
const FN = 'winnie-checkout';
const BOX = 'winnieCardBox';

type Copy = {
  eyebrow: string; h1: string; sub: string; once: string; delivered: string;
  doesH: string; does: string[];
  fitH: string; fitYesH: string; fitYes: string[]; fitNoH: string; fitNo: string; nestWord: string; nestTail: string;
  howH: string; how: [string, string][];
  fineH: string; fine: string[];
  buyH: string; practice: string; first: string; last: string; email: string; phone: string; brokerage: string; card: string;
  loadingCard: string; cardNote: string; grok: string; termsA: string; termsLink: string; termsB: (p: string) => string;
  btn: (p: string) => string; paying: string; unavailable: string;
  missing: (label: string) => string; errLoad: string; errCard: string; errTerms: string; errGrok: string;
  okH: string; ok: (first: string, email: string, code: string) => string;
  questions: string; terms: string; privacy: string;
};

const EN: Copy = {
  eyebrow: 'WINNIE BY HTC',
  h1: 'The first year after closing — remembered for you.',
  sub: 'Winnie is a ready-made Grok bot that runs the Hometown TC relationship-care playbook for your past clients. One price. No per-closing fee.',
  once: 'one time', delivered: 'Delivered by email right after checkout.',
  doesH: 'What Winnie does',
  does: [
    'Plans your client touches for the whole first year after closing.',
    'Drafts warm, personal messages in your voice — you approve and send every one.',
    'Reminds you when it\'s time to call, text or check in.',
    'Learns your tone, your buyers and sellers, and your tools on day one.',
  ],
  fitH: 'Is Winnie right for me?',
  fitYesH: 'Great fit', fitYes: ['You already use Grok on a paid plan.', 'You like doing it yourself with a smart helper.'],
  fitNoH: 'Not a fit', fitNo: 'You don\'t have Grok, or you\'re not comfortable with AI bots →', nestWord: 'choose N.E.S.T. instead',
  nestTail: ' — we do it for you, $29 per closing.',
  howH: 'How it works',
  how: [
    ['Check out', 'One short form and your card.'],
    ['Get your private link by email', 'It arrives right after you pay.'],
    ['Tap Add to Grok Bot', 'In Grok, Winnie shows up as Post-Closing Care Supervisor.'],
  ],
  fineH: 'The fine print',
  fine: [
    'Requires your own Grok account with a paid plan; other third-party costs may apply.',
    'Winnie is a template that only works in Grok.',
    'You set up, run and maintain Winnie, and you\'re responsible for its use and output. You approve and send every message.',
    'HTC doesn\'t manage the bot or see your data.',
    'Platforms change: no guarantee of future compatibility, ongoing support, permanent availability or results.',
    'All sales final. License and product terms apply.',
  ],
  buyH: 'Get Winnie',
  practice: 'Practice mode — no card will be charged.',
  first: 'First name', last: 'Last name', email: 'Email (your Winnie link goes here)', phone: 'Mobile phone', brokerage: 'Brokerage', card: 'Card',
  loadingCard: 'Loading the secure card box…', cardNote: 'Your card goes straight to our payment company (USAePay). HTC never sees your card number.',
  grok: 'I have my own Grok account with a paid plan.',
  termsA: 'I agree to ', termsLink: 'HTC\'s Terms and Conditions',
  termsB: (p) => `, I understand all sales are final, and I authorize this one-time charge of ${p}.`,
  btn: (p) => `Get Winnie — ${p}`, paying: 'Processing…',
  unavailable: 'Not available right now. Email support@hometowntc.com.',
  missing: (l) => `Please fill in: ${l.replace(/ \(.*\)$/, '')}`,
  errLoad: 'We couldn\'t load secure checkout. Please refresh the page or email support@hometowntc.com.',
  errCard: 'Please check your card details.',
  errTerms: 'Please check the box to agree to the Terms.',
  errGrok: 'Please check the box to confirm you have your own paid Grok plan.',
  okH: 'Order received',
  ok: (f, e, c) => `You're all set, ${f}! Your Winnie link is on its way to ${e}. Order ${c}. Don't see it in 10 minutes? Check spam or email support@hometowntc.com.`,
  questions: 'Questions?', terms: 'Terms and Conditions', privacy: 'Privacy Policy',
};

const ES: Copy = {
  eyebrow: 'WINNIE DE HTC',
  h1: 'El primer año después del cierre — recordado por ti.',
  sub: 'Winnie es un bot de Grok listo para usar con el método de cuidado de relaciones de Hometown TC para tus clientes pasados. Un solo precio. Sin cargo por cada cierre.',
  once: 'un solo pago', delivered: 'Te llega por correo justo después de pagar.',
  doesH: 'Lo que hace Winnie',
  does: [
    'Planea tus contactos con cada cliente durante todo el primer año después del cierre.',
    'Redacta mensajes cálidos y personales con tu estilo — tú apruebas y envías cada uno.',
    'Te recuerda cuándo llamar, escribir o saludar.',
    'El primer día aprende tu tono, tus compradores y vendedores, y tus herramientas.',
  ],
  fitH: '¿Winnie es para mí?',
  fitYesH: 'Sí', fitYes: ['Ya usas Grok con un plan pagado.', 'Te gusta hacerlo tú con un buen ayudante.'],
  fitNoH: 'No', fitNo: 'No tienes Grok o no te sientes cómodo con bots de IA →', nestWord: 'elige N.E.S.T.',
  nestTail: ' — lo hacemos por ti, $29 por cierre.',
  howH: 'Cómo funciona',
  how: [
    ['Paga', 'Un formulario corto y tu tarjeta.'],
    ['Recibe tu enlace privado por correo', 'Llega justo después de pagar.'],
    ['Toca Add to Grok Bot', 'En Grok, Winnie aparece como Post-Closing Care Supervisor.'],
  ],
  fineH: 'La letra pequeña',
  fine: [
    'Se requiere tu propia cuenta de Grok con un plan pagado; pueden aplicar otros costos de terceros.',
    'Winnie es una plantilla que solo funciona en Grok.',
    'Tú configuras, operas y mantienes Winnie, y eres responsable de su uso y de lo que produce. Tú apruebas y envías cada mensaje.',
    'HTC no administra el bot ni tiene acceso a tus datos.',
    'Las plataformas cambian. No hay garantía de compatibilidad futura, soporte continuo, disponibilidad permanente ni resultados.',
    'Aplican la licencia y los términos del producto.',
    'Todas las ventas son finales.',
  ],
  buyH: 'Obtener Winnie',
  practice: 'Modo de práctica — no se cobrará ninguna tarjeta.',
  first: 'Nombre', last: 'Apellido', email: 'Correo (aquí llega tu enlace de Winnie)', phone: 'Celular', brokerage: 'Corredora (brokerage)', card: 'Tarjeta',
  loadingCard: 'Cargando el formulario seguro de la tarjeta…', cardNote: 'Tu tarjeta va directo a nuestra compañía de pagos (USAePay). HTC nunca ve el número de tu tarjeta.',
  grok: 'Tengo mi propia cuenta de Grok con un plan pagado.',
  termsA: 'Acepto los ', termsLink: 'Términos y Condiciones de HTC',
  termsB: (p) => `, entiendo que todas las ventas son finales, y autorizo este cargo único de ${p}.`,
  btn: (p) => `Obtener Winnie — ${p}`, paying: 'Procesando…',
  unavailable: 'No está disponible en este momento. Escribe a support@hometowntc.com.',
  missing: (l) => `Por favor completa: ${l.replace(/ \(.*\)$/, '')}`,
  errLoad: 'No pudimos cargar el pago seguro. Por favor recarga la página o escribe a support@hometowntc.com.',
  errCard: 'Revisa los datos de la tarjeta.',
  errTerms: 'Por favor marca la casilla para aceptar los Términos.',
  errGrok: 'Por favor marca la casilla para confirmar que tienes tu propio plan pagado de Grok.',
  okH: 'Pedido recibido',
  ok: (f, e, c) => `¡Listo, ${f}! Tu enlace de Winnie va camino a ${e}. Pedido ${c}. ¿No lo ves en 10 minutos? Revisa spam o escribe a support@hometowntc.com.`,
  questions: '¿Preguntas?', terms: 'Términos y Condiciones', privacy: 'Política de Privacidad',
};

export const WinniePage: React.FC<Props> = ({ language = 'en', onNavigate }) => {
  const lang: Language = language === 'es' ? 'es' : 'en';
  const t = lang === 'es' ? ES : EN;
  const { cfg, cfgErr, cardMsg, purchase } = useExtrasCheckout(FN, BOX, t);
  const price = fmtPrice(cfg?.price) || '…';
  const [f, setF] = useState({ first: '', last: '', email: '', phone: '', brokerage: '' });
  const [grok, setGrok] = useState(false);
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false); // blocks a double tap before React re-renders
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState<{ text: string; practice: boolean } | null>(null);
  const nestPath = lang === 'es' ? '/es/nest/' : '/nest/';

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (busyRef.current || done) return;
    const miss = ([['first', t.first], ['last', t.last], ['email', t.email], ['phone', t.phone], ['brokerage', t.brokerage]] as [keyof typeof f, string][])
      .find(([k]) => !f[k].trim());
    if (miss) { document.getElementById(`win-${miss[0]}`)?.focus(); return setErr(t.missing(miss[1])); }
    if (!grok) return setErr(t.errGrok);
    if (!agree) return setErr(t.errTerms);
    busyRef.current = true; setBusy(true); setErr(null);
    try {
      const r = await purchase({
        lang, first_name: f.first.trim(), last_name: f.last.trim(), email: f.email.trim(), phone: f.phone.trim(), brokerage: f.brokerage.trim(),
        grok_paid_plan: true,
      });
      setDone({ text: t.ok(f.first.trim(), r.email, r.code), practice: !!r.practice });
    } catch (e: any) {
      setErr(e?.message || t.errLoad);
    } finally { busyRef.current = false; setBusy(false); }
  };

  const field = (k: keyof typeof f, label: string, type = 'text', ac = '', inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']) => (
    <div>
      <Label htmlFor={`win-${k}`}>{label}</Label>
      <input id={`win-${k}`} type={type} autoComplete={ac} inputMode={inputMode} required value={f[k]}
        onChange={(e) => setF({ ...f, [k]: e.target.value })} className={inputCls} style={{ borderColor: BORDER }} />
    </div>
  );
  const wrap = 'max-w-3xl mx-auto px-5';
  const sec = 'py-12 border-t';

  return (
    <div style={{ background: C.cream, color: C.brown }} className="text-[17px] leading-relaxed">
      <div className={`${wrap} text-center pt-14 pb-10`}>
        <CalendarHeart className="w-16 h-16 mx-auto mb-4" style={{ color: C.orange }} aria-hidden="true" />
        <div className="uppercase tracking-widest text-xs font-bold" style={{ color: C.teal }}>{t.eyebrow}</div>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight my-3">{t.h1}</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">{t.sub}</p>
        <div className="text-4xl font-extrabold">{price} <span className="text-lg font-semibold" style={{ color: MUTED }}>{t.once}</span></div>
        <p className="mt-1 mb-6 text-sm font-semibold" style={{ color: MUTED }}>{t.delivered}</p>
        <a href="#buy" className="inline-flex items-center min-h-[52px] rounded-full px-8 py-4 font-extrabold text-white" style={BTN}>{t.btn(price)}</a>
      </div>

      <section className={sec} style={{ borderColor: C.line }}>
        <div className={wrap}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.doesH}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {t.does.map((d, i) => {
              const Icon = [CalendarHeart, PenLine, BellRing, Sparkles][i];
              return (
                <div key={d} className="bg-white rounded-xl p-5 border flex gap-3" style={{ borderColor: C.line }}>
                  <Icon className="w-6 h-6 shrink-0 mt-1" style={{ color: C.orange }} aria-hidden="true" /><p>{d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={sec} style={{ borderColor: C.line, background: C.cream2 }}>
        <div className={wrap}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.fitH}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-5 border" style={{ borderColor: C.line, borderTop: `6px solid ${C.teal}` }}>
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><CheckCircle2 className="w-6 h-6" style={{ color: C.teal }} aria-hidden="true" />{t.fitYesH}</h3>
              <ul className="space-y-1">{t.fitYes.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="bg-white rounded-xl p-5 border" style={{ borderColor: C.line, borderTop: `6px solid ${C.orange}` }}>
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><XCircle className="w-6 h-6" style={{ color: C.orange }} aria-hidden="true" />{t.fitNoH}</h3>
              <p>{t.fitNo}{' '}
                <a href={nestPath} onClick={(e) => { e.preventDefault(); onNavigate(nestPath); }} className="font-bold underline" style={{ color: C.teal }}>{t.nestWord}</a>
                {t.nestTail}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={sec} style={{ borderColor: C.line }}>
        <div className={wrap}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.howH}</h2>
          <ol className="grid md:grid-cols-3 gap-4">
            {t.how.map(([h, p], i) => (
              <li key={h} className="bg-white rounded-xl p-5 border" style={{ borderColor: C.line }}>
                <span className="inline-block w-9 h-9 rounded-full text-white text-center font-extrabold leading-9 mb-2" style={{ background: C.teal }}>{i + 1}</span>
                <h3 className="font-bold text-lg">{h}</h3><p>{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="buy" className={sec} style={{ borderColor: C.line, background: C.cream2 }}>
        <div className={wrap}>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">{t.buyH}</h2>
          <div className="rounded-xl p-4 border border-dashed text-[14.5px] mb-2" style={{ borderColor: BORDER, background: '#fffdf9' }}>
            <b className="block mb-1">{t.fineH}</b>
            <ul className="space-y-1">
              {t.fine.map((x) => <li key={x} className="flex gap-2"><span className="w-2.5 h-2.5 rounded-full mt-2 shrink-0" style={{ background: C.gold }} />{x}</li>)}
            </ul>
          </div>

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
              <div className="grid md:grid-cols-2 gap-x-3">
                {field('first', t.first, 'text', 'given-name')}
                {field('last', t.last, 'text', 'family-name')}
                {field('email', t.email, 'email', 'email', 'email')}
                {field('phone', t.phone, 'tel', 'tel', 'tel')}
              </div>
              {field('brokerage', t.brokerage, 'text', 'organization')}
              <CardBox id={BOX} label={t.card} msg={cardMsg} note={t.cardNote} />
              <CheckRow checked={grok} onChange={setGrok}><b>{t.grok}</b></CheckRow>
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
