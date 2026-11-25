import React, { useEffect, useState } from 'react';
import { CheckCircle2, Download, FileText, Lock, Send, AlertCircle, ArrowRight } from 'lucide-react';
import type { Language } from '../types';
import { usePageSeo } from '../hooks/usePageSeo';
import { trackHtcEvent } from '../utils/analytics';

interface Props {
  language?: Language;
  onGoHome: () => void;
  onNavigate?: (path: string) => void;
}

// The 365-Day Advantage (EN) / La Ventaja de los 365 Días (ES) + 3 bonus printables. Approved by Michelle, Nov 25, 2026.
// Same gate as the 2-Question Advantage: name, email and phone. Sign-ups go to Hunter as kind "365_day_guide"
// (until Hunter adds that branch, the server files them as Free Toolkit leads). Do not edit the PDFs:
// the links printed inside them (/nest, /winnie, /es/nest, /es/winnie and the QR codes) must stay as they are.
const HUNTER_SIGNUP_URL = 'https://gagsnnrakqbtuyystfkr.supabase.co/functions/v1/hunter-signup';
const UNLOCK_KEY = 'htc_365_day_guide_v1';

export const THREE_SIXTY_FIVE_PATHS = {
  en: '/resources/free-guides-downloads/365-day-advantage/',
  es: '/es/guia-365-dias/',
};

const COPY = {
  en: {
    home: 'Home', hub: 'Free Agent Toolkit', crumb: 'The 365-Day Advantage',
    eyebrow: 'Free download · 18-page PDF + 3 printable bonuses',
    h1: 'The 365-Day Advantage',
    sub: 'How to Stay Remembered Long After Closing',
    lede: 'A practical first-year plan for Florida agents covering the 7 moments to reach out, how to personalize by customer type, and how to ask for referrals without being "that" agent.',
    seoTitle: 'The 365-Day Advantage: Free Post-Closing Follow-Up Guide for Florida Agents | Hometown TC',
    seoDesc: 'Free 18-page guide + 3 printable bonuses: a first-year plan with the 7 moments to reach out after closing, personalizing by customer type, and asking for referrals without being "that" agent.',
    canonical: 'https://hometowntc.com/resources/free-guides-downloads/365-day-advantage/',
    pdf: '/downloads/htc-365-day-advantage-guide-en-2027.pdf',
    cover: '/images/resources/htc-365-day-advantage-cover-en.webp', coverAlt: 'Cover of The 365-Day Advantage field guide',
    insideH: 'What\'s inside',
    inside: [
      'The relationship you already earned', 'What today\'s customers actually value', 'The psychology of being remembered',
      'The first 365 days', 'Personalizing by customer type', 'Unreasonable hospitality on a real estate budget',
      'How to ask for referrals without being "that" agent', 'The 12 moments that matter', 'Worksheet: My 365-Day Calendar',
    ],
    bonusH: 'Your 3 printable bonuses',
    bonuses: [
      ['Bonus 1: 365-Day Relationship Checklist', '1 page', '/downloads/htc-365-bonus-1-relationship-checklist-en.pdf'],
      ['Bonus 2: Referral Conversation Cheat Sheet', '2 pages', '/downloads/htc-365-bonus-2-referral-cheat-sheet-en.pdf'],
      ['Bonus 3: The 12 Moments That Matter', '1 page', '/downloads/htc-365-bonus-3-12-moments-en.pdf'],
    ],
    bonusLocked: 'Unlocks with the guide.',
    formTitle: 'Get the free guide + 3 bonuses', name: 'Name *', email: 'Email *', phone: 'Phone *', brokerage: 'Brokerage (optional)',
    role: 'I am a… *', choose: 'Choose one', roles: [['Agent', 'Real estate agent'], ['Team Lead', 'Team lead or broker'], ['Transaction Coordinator', 'Transaction coordinator'], ['Other', 'Other']],
    sms: 'Optional: OK to text me about these resources. Msg & data rates may apply. Reply STOP to opt out.',
    button: 'Send me the guide', sending: 'Unlocking…',
    fine: 'You\'ll get the guide and the 3 bonuses right away, plus a few follow-up emails and our monthly newsletter. Unsubscribe anytime. We never sell your information.',
    preview: 'Preview site: nothing was sent. Downloads are unlocked for testing.',
    error: 'We couldn\'t confirm your request went through. Please try again, or email hello@hometowntc.com.',
    dl: 'Download the guide (PDF)',
    nextH: 'Want help keeping it going?',
    nest: ['Let us handle it with N.E.S.T.', 'Hometown sends seven first-year touches for each client you enroll, personalized and branded to you.', '/nest/'],
    winnie: ['Run it yourself with Winnie', 'A ready-made Grok bot that plans your touches and drafts messages in your voice.', '/winnie/'],
    disc: 'This guide is educational. It is not legal, tax or financial advice.',
    other: 'Español', otherPath: '/es/guia-365-dias/',
  },
  es: {
    home: 'Inicio', hub: 'Herramientas gratuitas', crumb: 'La Ventaja de los 365 Días',
    eyebrow: 'Descarga gratuita · PDF de 18 páginas + 3 bonos imprimibles',
    h1: 'La Ventaja de los 365 Días',
    sub: 'Cómo seguir presente mucho después del cierre',
    lede: 'Un plan práctico para el primer año después del cierre, para agentes en Florida: los 7 momentos para comunicarte, cómo personalizar según el tipo de cliente y cómo pedir referidos sin ser "ese" agente.',
    seoTitle: 'La Ventaja de los 365 Días: guía gratuita de seguimiento después del cierre | Hometown TC',
    seoDesc: 'Guía gratuita de 18 páginas + 3 bonos imprimibles: un plan para el primer año con los 7 momentos para comunicarte, cómo personalizar según el tipo de cliente y cómo pedir referidos sin ser "ese" agente.',
    canonical: 'https://hometowntc.com/es/guia-365-dias/',
    pdf: '/downloads/htc-la-ventaja-de-los-365-dias-guia-es-2027.pdf',
    cover: '/images/resources/htc-365-dias-portada-es.webp', coverAlt: 'Portada de la guía La Ventaja de los 365 Días',
    insideH: 'Qué incluye',
    inside: [
      'La relación que ya te ganaste', 'Lo que realmente valoran los clientes hoy', 'La psicología de ser recordado',
      'Los primeros 365 días', 'Cómo personalizar según el tipo de cliente', 'Hospitalidad extraordinaria con presupuesto de agente',
      'Cómo pedir referidos sin ser "ese" agente', 'Los 12 momentos que importan', 'Hoja de trabajo: Mi calendario de 365 días',
    ],
    bonusH: 'Tus 3 bonos imprimibles',
    bonuses: [
      ['Bono 1: Lista de los 365 Días de Relación', '1 página', '/downloads/htc-365-bono-1-lista-de-relacion-es.pdf'],
      ['Bono 2: Guía Rápida para Conversaciones de Referidos', '2 páginas', '/downloads/htc-365-bono-2-guia-de-referidos-es.pdf'],
      ['Bono 3: Los 12 Momentos que Importan', '1 página', '/downloads/htc-365-bono-3-12-momentos-es.pdf'],
    ],
    bonusLocked: 'Se desbloquean con la guía.',
    formTitle: 'Recibe la guía + 3 bonos gratis', name: 'Nombre *', email: 'Correo *', phone: 'Teléfono *', brokerage: 'Corredora (opcional)',
    role: 'Soy… *', choose: 'Elige una opción', roles: [['Agent', 'Agente de bienes raíces'], ['Team Lead', 'Líder de equipo o broker'], ['Transaction Coordinator', 'Coordinador de transacciones'], ['Other', 'Otro']],
    sms: 'Opcional: pueden enviarme mensajes de texto sobre estos recursos. Pueden aplicar tarifas de mensajes y datos. Responde STOP para cancelar.',
    button: 'Envíenme la guía', sending: 'Desbloqueando…',
    fine: 'Recibirás la guía y los 3 bonos de inmediato, además de algunos correos de seguimiento y nuestro boletín mensual. Puedes darte de baja cuando quieras. Nunca vendemos tu información.',
    preview: 'Sitio de vista previa: no se envió nada. Las descargas están desbloqueadas para pruebas.',
    error: 'No pudimos confirmar tu solicitud. Inténtalo de nuevo o escribe a hello@hometowntc.com.',
    dl: 'Descargar la guía (PDF)',
    nextH: '¿Quieres ayuda para mantenerlo?',
    nest: ['Deja que lo hagamos con N.E.S.T.', 'Hometown envía siete contactos durante el primer año por cada cliente que inscribas, personalizados y con tu marca.', '/es/nest/'],
    winnie: ['Hazlo tú mismo con Winnie', 'Un bot de Grok listo para usar que planea tus contactos y redacta mensajes con tu estilo.', '/es/winnie/'],
    disc: 'Esta guía es educativa. No es asesoría legal, fiscal ni financiera.',
    other: 'English', otherPath: '/resources/free-guides-downloads/365-day-advantage/',
  },
} as const;

function readUnlocked(): boolean {
  try { return typeof window !== 'undefined' && window.localStorage.getItem(UNLOCK_KEY) === '1'; } catch { return false; }
}
function saveUnlocked(): void {
  try { window.localStorage.setItem(UNLOCK_KEY, '1'); } catch { /* storage blocked: unlock lasts for this visit only */ }
}

export const ThreeSixtyFiveGuidePage: React.FC<Props> = ({ language = 'en', onGoHome, onNavigate }) => {
  const lang: Language = language === 'es' ? 'es' : 'en';
  const t = COPY[lang];
  const source = lang === 'es' ? '365-Day Guide (ES)' : '365-Day Guide (EN)';
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
      sms_ok: smsOk, source, kind: '365_day_guide', language: lang,
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
              <p className="mt-2 text-lg sm:text-xl font-semibold text-[#3A2E29] font-serif">{t.sub}</p>
              <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">{t.lede}</p>
              <div className="mt-6">
                {unlocked ? (
                  <div className="space-y-3">
                    <a href={t.pdf} download="" onClick={() => trackHtcEvent('field_guide_download', { source, label: 'Guide PDF' })}
                      className="inline-flex items-center justify-center gap-2 bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider">
                      <Download className="w-4 h-4" aria-hidden="true" /><span>{t.dl}</span>
                    </a>
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
        <section id="bonuses" aria-labelledby="bonus-title" className="rounded-2xl border border-[#D8D2D4] p-6">
          <h2 id="bonus-title" className="text-2xl font-bold text-[#3A2E29] font-serif">{t.bonusH}</h2>
          <ul className="mt-4 space-y-3">
            {t.bonuses.map(([label, pages, href]) => (
              <li key={href} className="flex items-start gap-3">
                {unlocked ? (
                  <a href={href} download="" onClick={() => trackHtcEvent('field_guide_download', { source, label })}
                    className="inline-flex items-start gap-2 text-sm font-bold text-[#075960] hover:text-[#053d42] underline underline-offset-4">
                    <Download className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" /><span>{label} <span className="font-normal text-slate-500 no-underline">(PDF, {pages})</span></span>
                  </a>
                ) : (
                  <span className="inline-flex items-start gap-2 text-sm text-slate-500">
                    <Lock className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" /><span>{label} <span className="text-slate-400">(PDF, {pages})</span></span>
                  </span>
                )}
              </li>
            ))}
          </ul>
          {!unlocked && <p className="mt-3 text-xs text-slate-500 flex items-center gap-1"><FileText className="w-3.5 h-3.5" aria-hidden="true" />{t.bonusLocked}</p>}
        </section>

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
            {[t.nest, t.winnie].map(([h, p, path]) => (
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
