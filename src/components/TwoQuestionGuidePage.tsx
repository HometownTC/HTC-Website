import React, { useEffect, useState } from 'react';
import { CheckCircle2, Download, FileSpreadsheet, Lock, Send, AlertCircle, ArrowRight } from 'lucide-react';
import type { Language } from '../types';
import { usePageSeo } from '../hooks/usePageSeo';
import { trackHtcEvent } from '../utils/analytics';

interface Props {
  language?: Language;
  onGoHome: () => void;
  onNavigate?: (path: string) => void;
}

// The 2-Question Advantage field guide (EN) / La Ventaja de las 2 Preguntas (ES). Publication Ready, Nov 22, 2026.
// Gated with name, email and phone, like the short sale guide. Sign-ups go to Hunter as kind "two_question_guide"
// (until Hunter adds that branch, the server files them as Free Toolkit leads). Do not edit the PDFs.
const HUNTER_SIGNUP_URL = 'https://gagsnnrakqbtuyystfkr.supabase.co/functions/v1/hunter-signup';
const TRACKER_COPY_URL = 'https://docs.google.com/spreadsheets/d/1MGwFiB1GHGM_9_NODSpKc2JQMyCPOlqy-VV1RgBzS3s/copy';
const UNLOCK_KEY = 'htc_two_question_guide_v1';

export const TWO_Q_PATHS = {
  en: '/resources/free-guides-downloads/2-question-advantage-field-guide/',
  es: '/es/guia-2-preguntas/',
};

const COPY = {
  en: {
    home: 'Home', hub: 'Free Agent Toolkit', crumb: 'The 2-Question Advantage',
    eyebrow: 'Free download · 12-page field guide + Google Sheets tracker',
    h1: 'The 2-Question Advantage',
    lede: 'A practical field guide for listing agents: get real showing feedback with two simple questions, report it to your seller with confidence, and turn activity into smarter listing decisions. Comes with a free Google Sheets tracker.',
    seoTitle: 'The 2-Question Advantage: Free Showing Feedback Guide + Tracker | Hometown TC',
    seoDesc: 'Free 12-page field guide for listing agents: the two showing-feedback questions, copy-and-send scripts, a weekly seller report and a free Google Sheets tracker.',
    canonical: 'https://hometowntc.com/resources/free-guides-downloads/2-question-advantage-field-guide/',
    pdf: '/downloads/htc-2-question-advantage-field-guide-en.pdf',
    cover: '/images/resources/2-question-advantage-cover-en.webp', coverAlt: 'Cover of The 2-Question Advantage field guide',
    insideH: 'What\'s inside',
    inside: [
      'Why showing feedback matters', 'Why "How did it go?" falls short', 'The two questions and the exact scripts',
      'Positive and constructive feedback', 'From comments to patterns', 'Your weekly seller report',
      'The free Google Sheets tracker', 'Three ways to use the Advantage', 'Your five-minute field checklist',
    ],
    formTitle: 'Get the free guide + tracker', name: 'Name *', email: 'Email *', phone: 'Phone *', brokerage: 'Brokerage (optional)',
    role: 'I am a… *', choose: 'Choose one', roles: [['Agent', 'Real estate agent'], ['Team Lead', 'Team lead or broker'], ['Transaction Coordinator', 'Transaction coordinator'], ['Other', 'Other']],
    sms: 'Optional: OK to text me about these resources. Msg & data rates may apply. Reply STOP to opt out.',
    button: 'Send me the guide', sending: 'Unlocking…',
    fine: 'You\'ll get the guide and the tracker right away, plus a few follow-up emails and our monthly newsletter. Unsubscribe anytime. We never sell your information.',
    preview: 'Preview site: nothing was sent. Downloads are unlocked for testing.',
    error: 'We couldn\'t confirm your request went through. Please try again, or email hello@hometowntc.com.',
    dl: 'Download the guide (PDF)', copy: 'Make your copy of the tracker', copyNote: 'Opens Google Sheets and saves your own copy. You need a Google account.',
    nextH: 'Want help with it?',
    lit: ['Run it yourself with LIT', 'An editable Grok bot template that asks the 2 Questions for you. $299 one-time.', '/lit/'],
    lamp: ['Let us handle it with L.A.M.P.', 'HTC prepares your weekly seller report. $99 per active listing for 4 weekly reports.', '/lamp/'],
    disc: 'This guide is educational. It is not legal, tax or financial advice.',
    other: 'Español', otherPath: '/es/guia-2-preguntas/',
  },
  es: {
    home: 'Inicio', hub: 'Herramientas gratuitas', crumb: 'La Ventaja de las 2 Preguntas',
    eyebrow: 'Descarga gratuita · Guía de campo de 12 páginas + tracker de Google Sheets',
    h1: 'La Ventaja de las 2 Preguntas',
    lede: 'Una guía práctica para agentes de listado: obtén comentarios reales de cada visita con dos preguntas sencillas, repórtalos a tu vendedor con confianza y convierte la actividad en mejores decisiones para tu listado. Incluye un tracker gratuito de Google Sheets.',
    seoTitle: 'La Ventaja de las 2 Preguntas: guía gratuita de comentarios de visitas + tracker | Hometown TC',
    seoDesc: 'Guía gratuita de 12 páginas para agentes de listado: las dos preguntas, guiones listos para enviar, un reporte semanal para el vendedor y un tracker gratuito de Google Sheets.',
    canonical: 'https://hometowntc.com/es/guia-2-preguntas/',
    pdf: '/downloads/htc-la-ventaja-de-las-2-preguntas-guia-es.pdf',
    cover: '/images/resources/2-question-advantage-cover-es.webp', coverAlt: 'Portada de la guía de campo La Ventaja de las 2 Preguntas',
    insideH: 'Qué incluye',
    inside: [
      'Por qué importan los comentarios de las visitas', 'Por qué "¿Cómo te fue?" no es suficiente', 'Las dos preguntas y los guiones exactos',
      'Comentarios positivos y constructivos', 'De comentarios a patrones', 'Tu reporte semanal para el vendedor',
      'El tracker gratuito de Google Sheets', 'Tres formas de usar la Ventaja', 'Tu lista de cinco minutos',
    ],
    formTitle: 'Recibe la guía + el tracker gratis', name: 'Nombre *', email: 'Correo *', phone: 'Teléfono *', brokerage: 'Corredora (opcional)',
    role: 'Soy… *', choose: 'Elige una opción', roles: [['Agent', 'Agente de bienes raíces'], ['Team Lead', 'Líder de equipo o broker'], ['Transaction Coordinator', 'Coordinador de transacciones'], ['Other', 'Otro']],
    sms: 'Opcional: pueden enviarme mensajes de texto sobre estos recursos. Pueden aplicar tarifas de mensajes y datos. Responde STOP para cancelar.',
    button: 'Envíenme la guía', sending: 'Desbloqueando…',
    fine: 'Recibirás la guía y el tracker de inmediato, además de algunos correos de seguimiento y nuestro boletín mensual. Puedes darte de baja cuando quieras. Nunca vendemos tu información.',
    preview: 'Sitio de vista previa: no se envió nada. Las descargas están desbloqueadas para pruebas.',
    error: 'No pudimos confirmar tu solicitud. Inténtalo de nuevo o escribe a hello@hometowntc.com.',
    dl: 'Descargar la guía (PDF)', copy: 'Haz tu copia del tracker', copyNote: 'Abre Google Sheets y guarda tu propia copia. Necesitas una cuenta de Google.',
    nextH: '¿Quieres ayuda?',
    lit: ['Hazlo tú mismo con LIT', 'Una plantilla editable de bot de Grok que hace las 2 Preguntas por ti. $299 pago único.', '/es/lit/'],
    lamp: ['Deja que nosotros lo hagamos con L.A.M.P.', 'HTC prepara tu reporte semanal para el vendedor. $99 por listado activo por 4 reportes semanales.', '/es/lamp/'],
    disc: 'Esta guía es educativa. No es asesoría legal, fiscal ni financiera.',
    other: 'English', otherPath: '/resources/free-guides-downloads/2-question-advantage-field-guide/',
  },
} as const;

function readUnlocked(): boolean {
  try { return typeof window !== 'undefined' && window.localStorage.getItem(UNLOCK_KEY) === '1'; } catch { return false; }
}
function saveUnlocked(): void {
  try { window.localStorage.setItem(UNLOCK_KEY, '1'); } catch { /* storage blocked: unlock lasts for this visit only */ }
}

export const TwoQuestionGuidePage: React.FC<Props> = ({ language = 'en', onGoHome, onNavigate }) => {
  const lang: Language = language === 'es' ? 'es' : 'en';
  const t = COPY[lang];
  const source = lang === 'es' ? 'Two-Question Guide (ES)' : 'Two-Question Guide (EN)';
  const [unlocked, setUnlocked] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', brokerage: '', role: '' });
  const [smsOk, setSmsOk] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'preview' | 'error'>('idle');

  useEffect(() => { setUnlocked(readUnlocked()); }, []);

  usePageSeo({
    title: t.seoTitle,
    description: t.seoDesc,
    canonicalUrl: t.canonical,
    breadcrumbs: [
      { name: t.home, url: lang === 'es' ? 'https://hometowntc.com/es/' : 'https://hometowntc.com/' },
      { name: t.hub, url: 'https://hometowntc.com/resources/free-guides-downloads/' },
      { name: t.crumb, url: t.canonical },
    ],
  });

  const go = (path: string) => (e: React.MouseEvent) => {
    if (onNavigate) { e.preventDefault(); onNavigate(path); }
  };
  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value });
  const unlock = () => {
    saveUnlocked();
    trackHtcEvent('guide_download', { source, status: 'unlocked' });
    setUnlocked(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const prod = typeof window !== 'undefined' && (window.location.hostname === 'hometowntc.com' || window.location.hostname === 'www.hometowntc.com');
    if (!prod) { setStatus('preview'); unlock(); return; }
    const payload = {
      name: form.name, email: form.email, phone: form.phone, brokerage: form.brokerage, role: form.role,
      sms_ok: smsOk, source, kind: 'two_question_guide', language: lang,
      page: typeof window !== 'undefined' ? window.location.pathname : '',
    };
    // 1) Hunter (system of record).
    const toHunter = fetch(HUNTER_SIGNUP_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, keepalive: true, body: JSON.stringify(payload) })
      .then(async (r) => r.ok && ((await r.json().catch(() => null)) as { ok?: boolean } | null)?.ok === true)
      .catch(() => false);
    // 2) Backup copy to hello@ (CC Christian), same as the other free guides; never blocks the unlock once Hunter has it.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const toEmail = fetch('https://formsubmit.co/ajax/hello@hometowntc.com', {
      method: 'POST', signal: controller.signal,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `[${source}] ${form.name}${form.brokerage ? ' - ' + form.brokerage : ''}`,
        _cc: 'christian.hernandez@hometowntc.com', _replyto: form.email, _template: 'table',
        Name: form.name, Email: form.email, Phone: form.phone, 'Brokerage / Team': form.brokerage || 'Not provided',
        'I am a': form.role, 'OK to text': smsOk ? 'Yes' : 'No', Language: lang.toUpperCase(), 'Unlocked From': source,
        'Submitted (ET)': new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
      }),
    })
      .then(async (r) => {
        const j = (await r.json().catch(() => null)) as { success?: boolean | string } | null;
        return r.ok && !!j && (j.success === true || j.success === 'true');
      })
      .catch(() => false)
      .finally(() => clearTimeout(timer));
    if (await toHunter) { unlock(); return; }
    if (await toEmail) { unlock(); return; }
    setStatus('error');
  };

  const input = 'w-full rounded-lg border border-[#D8D2D4] bg-white px-4 py-3 text-base text-[#1A1412] focus:outline-none focus:ring-2 focus:ring-[#0D9BA3] mt-1';

  return (
    <main className="bg-white" lang={lang}>
      <header className="border-b border-[#D8D2D4] bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500 mb-6">
            <button onClick={onGoHome} className="hover:text-[#0D9BA3] cursor-pointer">{t.home}</button>
            <span aria-hidden="true">→</span>
            <a href="/resources/free-guides-downloads/" onClick={go('/resources/free-guides-downloads/')} className="hover:text-[#0D9BA3]">{t.hub}</a>
            <span aria-hidden="true">→</span>
            <span className="text-[#3A2E29]">{t.crumb}</span>
            <span className="ml-auto"><a href={t.otherPath} onClick={go(t.otherPath)} className="text-[#075960] underline underline-offset-4">{t.other}</a></span>
          </nav>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8 items-start">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#0D9BA3]">{t.eyebrow}</p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#3A2E29] font-serif tracking-tight">{t.h1}</h1>
              <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">{t.lede}</p>
              <div className="mt-6">
                {unlocked ? (
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a href={t.pdf} download="" onClick={() => trackHtcEvent('field_guide_download', { source, label: 'Guide PDF' })}
                        className="inline-flex items-center justify-center gap-2 bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider">
                        <Download className="w-4 h-4" aria-hidden="true" /><span>{t.dl}</span>
                      </a>
                      <a href={TRACKER_COPY_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackHtcEvent('field_guide_download', { source, label: 'Tracker copy' })}
                        className="inline-flex items-center justify-center gap-2 border-2 border-[#3A2E29] text-[#3A2E29] hover:bg-[#3A2E29] hover:text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider">
                        <FileSpreadsheet className="w-4 h-4" aria-hidden="true" /><span>{t.copy}</span>
                      </a>
                    </div>
                    <p className="text-xs text-slate-600">{t.copyNote}</p>
                    {status === 'preview' && <p className="text-xs font-semibold text-[#075960]" role="status">{t.preview}</p>}
                  </div>
                ) : (
                  <form onSubmit={submit} className="rounded-2xl border border-[#D8D2D4] bg-white p-6 sm:p-8 space-y-4" aria-label={t.formTitle}>
                    <div className="flex items-center gap-2 text-[#075960] font-bold text-sm uppercase tracking-wider">
                      <Lock className="w-4 h-4" aria-hidden="true" /><span>{t.formTitle}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="block text-sm font-semibold text-[#3A2E29]">{t.name}<input required autoComplete="name" value={form.name} onChange={update('name')} className={input} /></label>
                      <label className="block text-sm font-semibold text-[#3A2E29]">{t.email}<input required type="email" autoComplete="email" value={form.email} onChange={update('email')} className={input} /></label>
                      <label className="block text-sm font-semibold text-[#3A2E29]">{t.phone}<input required type="tel" autoComplete="tel" value={form.phone} onChange={update('phone')} className={input} /></label>
                      <label className="block text-sm font-semibold text-[#3A2E29]">{t.brokerage}<input autoComplete="organization" value={form.brokerage} onChange={update('brokerage')} className={input} /></label>
                      <label className="block text-sm font-semibold text-[#3A2E29] sm:col-span-2">{t.role}
                        <select required value={form.role} onChange={update('role')} className={input}>
                          <option value="" disabled>{t.choose}</option>
                          {t.roles.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                        </select>
                      </label>
                    </div>
                    <label className="flex items-start gap-3 text-xs text-[#3A2E29] cursor-pointer">
                      <input type="checkbox" checked={smsOk} onChange={(e) => setSmsOk(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#075960]" />
                      <span>{t.sms}</span>
                    </label>
                    <button type="submit" disabled={status === 'sending'}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FE7311] hover:bg-[#e05f03] disabled:opacity-60 text-[#1A1412] px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider shadow-md cursor-pointer">
                      <Send className="w-4 h-4" aria-hidden="true" /><span>{status === 'sending' ? t.sending : t.button}</span>
                    </button>
                    <p className="text-xs text-slate-600">{t.fine}</p>
                    {status === 'error' && (
                      <p className="flex items-start gap-2 text-sm text-[#B42318]" role="alert"><AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" /><span>{t.error}</span></p>
                    )}
                  </form>
                )}
              </div>
            </div>
            <img src={t.cover} alt={t.coverAlt} width={640} height={828} className="w-full max-w-[260px] mx-auto rounded-xl shadow-xl border border-[#D8D2D4]" />
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <section aria-labelledby="inside-title">
          <h2 id="inside-title" className="text-2xl font-bold text-[#3A2E29] font-serif">{t.insideH}</h2>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {t.inside.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[#1A1412]">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#075960] shrink-0" aria-hidden="true" /><span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="next-title" className="rounded-2xl border border-[#D8D2D4] bg-[#FAF8F5] p-6">
          <h2 id="next-title" className="text-xl font-bold text-[#3A2E29] font-serif">{t.nextH}</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[t.lit, t.lamp].map(([h, p, path]) => (
              <a key={path} href={path} onClick={go(path)} className="block rounded-xl bg-white border border-[#D8D2D4] p-5 hover:border-[#0D9BA3]">
                <span className="font-bold text-[#075960]">{h}</span>
                <span className="block text-sm text-slate-700 mt-1">{p}</span>
                <ArrowRight className="w-4 h-4 mt-2 text-[#075960]" aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <p className="text-xs text-slate-500">{t.disc}</p>
      </div>
    </main>
  );
};
