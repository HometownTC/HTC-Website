import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileText,
  Award,
  Users,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Star,
  Sparkles,
  BookOpen,
  MessageSquare,
  Globe,
  HelpCircle,
  GraduationCap,
  ArrowLeft
} from 'lucide-react';
import { EMAIL_ADDRESS } from '../data/content';
import type { Language } from '../types';

interface Props {
  language?: Language;
  onGoHome: () => void;
  onBookCall: () => void;
}

// My TC Workshop 2026 (Guardian of the File 2026), pre-launch.
// Checkout and the student's login happen in the portal: the account is created at checkout,
// and the receipt + sign-in email goes out automatically, any hour.
const PRICE = '$399';
const REGULAR_PRICE = '$499';
const portalJoinUrl = (lang: Language) => `https://portal.hometowntc.com/?lang=${lang}#/join`;

type Copy = {
  back: string; questions: string;
  badge: string; h1: string; sub: string; cta: string; ctaNote: string; askFirst: string;
  pills: string[];
  forYouTag: string; forYouH: string; forYou: string[];
  valueTag: string; valueH: string; value: { icon: string; h: string; p: string }[];
  learnTag: string; learnH: string; learn: { b: string; t: string }[]; learnNote: string;
  incTag: string; incH: string; inc: { h: string; p: string }[];
  resultsTag: string; resultsH: string; resultsNote: string;
  enrollTag: string; enrollH: string; enrollSub: string; enrollTerms: string; enrollList: string[]; regular: string;
  guaranteeH: string; guarantee: string; questionsFirst: string;
  instructorTag: string; instructorH: string; founder: string; bio1a: string; bio1b: string; bio2: string;
  faqTag: string; faqH: string; faqs: { q: string; a: string }[];
  disclosureH: string; disclosure: string; rights: string;
};

const EN: Copy = {
  back: 'Back to Hometown TC',
  questions: 'Questions?',
  badge: '2026 Edition · English or Spanish · Pre-launch',
  h1: 'The TC who knows the contract protects everyone at the table.',
  sub: 'Guardian of the File 2026 is the practical Florida TC course: the documents, the deadlines and the compliance framework, so you can monitor, track and report with confidence on every file.',
  cta: `Enroll now — ${PRICE} pre-launch`,
  ctaNote: `Pre-launch price through December 15, 2026. Then ${REGULAR_PRICE}.`,
  askFirst: 'Questions First? Book a Call',
  pills: ['Guardian of the File 2026', 'English or Spanish', 'FAR/BAR Focus', 'New Modules Every Week', '30 Years of Experience'],
  forYouTag: 'Is this for you?',
  forYouH: 'Built for Florida. Built for real work.',
  forYou: [
    'Aspiring or active Florida TCs who want real command of FAR/BAR contracts, compliance requirements, and deadline management.',
    'Professionals moving into a structured real estate support role — without holding a sales license.',
    'Admin and operations professionals ready to build a career around process, compliance, and precision.',
    'Working TCs who want to sharpen their risk management approach and close gaps in their current workflow.'
  ],
  valueTag: 'The real value',
  valueH: 'What changes when you take this course',
  value: [
    { icon: '🛡️', h: 'Protect the Broker', p: 'Understand Florida compliance and FREC guidelines so you can flag exposure before it becomes a problem — not after the fact.' },
    { icon: '📋', h: 'Support the Agent', p: 'Keep agents focused on clients and production while you own the file — every deadline tracked, every document accounted for.' },
    { icon: '🤝', h: 'Serve the Client', p: 'A clean, organized transaction is the best client experience. You create that by knowing the contract cold and managing every step with precision.' },
    { icon: '⚠️', h: 'Manage Risk Proactively', p: 'Approach every file through a risk management lens — the right documentation, the right questions, the right checklists at the right time.' }
  ],
  learnTag: 'Curriculum',
  learnH: 'What you\'ll learn',
  learn: [
    { b: 'Your role as a Florida TC', t: ' — the responsibilities and compliance protocols within FREC guidelines: what you can do, what you can\'t, and why it matters.' },
    { b: 'The Field Dictionary:', t: ' the real estate terms you need to search, understand and apply on every file.' },
    { b: 'Contracts and documents:', t: ' FAR/BAR contracts, addenda, required forms, and the common errors that create liability.' },
    { b: 'Deadlines and closing:', t: ' systems for tracking critical dates and keeping every file moving from contract to close.' },
    { b: 'Communication:', t: ' working with brokers, agents, clients, lenders and title — what to say, when, and how to document it.' }
  ],
  learnNote: 'Florida uses multiple contract types. This workshop emphasizes FAR/BAR forms and related workflows as its primary focus.',
  incTag: 'What\'s included',
  incH: 'Everything in the program',
  inc: [
    { h: 'The full 2026 course, in your language', p: 'Video lessons in English or Spanish inside My TC Workshop. Pick your language at checkout.' },
    { h: 'New modules every week', p: 'Pre-launch students start now. New modules open each week as they\'re released.' },
    { h: 'Templates and resources', p: 'Checklists, forms and templates attached to the lessons, ready for your next file.' },
    { h: 'Field Guide included', p: 'A quick reference you can keep open while you work a file.' },
    { h: '7 days of Coach\'s Corner', p: 'Ask Michelle your questions while you put the material into practice — real questions, real answers.' },
    { h: 'Lifetime access + community', p: 'Come back to any lesson anytime, and talk it through with other students in each module\'s discussion.' }
  ],
  resultsTag: 'Student results',
  resultsH: 'What students are saying',
  resultsNote: 'From students of our earlier Florida TC Workshop.',
  enrollTag: 'Enroll today',
  enrollH: 'Pre-launch. Start right away.',
  enrollSub: 'My TC Workshop 2026 · Guardian of the File 2026',
  enrollTerms: 'Paid in full · Your login is ready the moment you pay',
  enrollList: [
    'The 2026 course in English or Spanish',
    'New modules released every week',
    'Templates, resources and the Field Guide',
    '7 days of Coach\'s Corner with Michelle',
    'Lifetime access'
  ],
  regular: `Pre-launch price through December 15, 2026. Regular price ${REGULAR_PRICE}.`,
  guaranteeH: 'Our Guarantee',
  guarantee: 'If any template or form is outdated, we\'ll update it and send you a corrected version within 48 hours. All sales are final.',
  questionsFirst: 'Questions first?',
  instructorTag: 'Your instructor',
  instructorH: 'Taught by someone who has worked every side of the table.',
  founder: 'Founder, Hometown Transaction Coordinators',
  bio1a: 'Since 1995, Michelle has processed over 15,000 transactions across Miami-Dade, Broward, and Palm Beach counties — and she brings every one of those files into the classroom. With a background in loan processing and three decades of hands-on Florida real estate experience, she built HTC around one core belief: ',
  bio1b: 'transaction coordination done right is risk management, not just paperwork.',
  bio2: 'She is a compliance authority for the agents and brokers she serves — and that\'s exactly the lens she teaches through. Direct, comprehensive, no fluff. Questions before enrolling?',
  faqTag: 'Common questions',
  faqH: 'Before you enroll',
  faqs: [
    { q: 'Do I need a real estate license to take this course or work as a TC in Florida?', a: "No license required. Transaction coordination is an administrative role in Florida, and unlicensed professionals can perform TC duties under the state's unlicensed assistant guidelines. The course covers exactly what is and isn't allowable in Florida for both unlicensed TCs and licensed agents performing coordination duties — so you'll know precisely where your boundaries are and how to operate with confidence." },
    { q: 'Can I take the course in Spanish?', a: 'Yes. The 2026 course is available in English and in Spanish. You choose your language at checkout, and the whole portal follows that language.' },
    { q: 'What does "pre-launch" mean?', a: `You enroll now at the pre-launch price of ${PRICE} (paid in full) and start right away. New modules open every week as they're released. The pre-launch price ends December 15, 2026; after that the course is ${REGULAR_PRICE}.` },
    { q: 'How do I get in after I pay?', a: 'You create your password at checkout, so your login works the moment your payment goes through — day or night. You also get an email receipt with the link to sign in.' },
    { q: 'How long do I have access to the course materials?', a: 'Lifetime. Your lessons, templates and resources stay in your My TC Workshop portal, so you can come back to any module before a tricky file.' },
    { q: "What is Coach's Corner and how does it work?", a: "Coach's Corner is 7 days of direct access to Michelle. Send your questions as you work through the material and Michelle answers them. It's real support from the person who built the course." },
    { q: "I'm not based in Florida — is this still worth it?", a: "Several students have enrolled from Virginia, New Jersey, and other states specifically to understand Florida contracts before working with Florida-based agents or relocating clients. The FAR/BAR framework and compliance approach taught in this course is Florida-specific, but the risk management mindset, communication systems, and workflow structure translate to any market. That said, this course is built for Florida — if you're working Florida files, it's exactly what you need." },
    { q: "I've been doing TC work for a while. Is this too basic for me?", a: "Probably not — and one of our students found that out the hard way. She had been working as a TC for a year before enrolling and described finding significant gaps she didn't know she had. If you've never had formal training on FAR/BAR compliance, FREC guidelines, or the unlicensed assistant framework in Florida, this course will fill in things you didn't know were missing." },
    { q: 'What is your refund policy?', a: 'All sales are final. This is a digital educational program — once you have access to the portal, the lessons and the templates, the material has been delivered. What we do guarantee: if any template or form is outdated, we\'ll update it and send you a corrected version within 48 hours.' }
  ],
  disclosureH: 'Disclosure',
  disclosure: "Hometown Transaction Coordinators' training programs are for educational purposes only and do not guarantee employment, income, or job placement. Any references to earning capacity or hiring potential reflect general industry trends and should not be interpreted as a promise or guarantee. Your results depend on your skills, effort, and market conditions.",
  rights: 'Hometown Transaction Coordinators. All rights reserved.'
};

const ES: Copy = {
  back: 'Volver a Hometown TC',
  questions: '¿Preguntas?',
  badge: 'Edición 2026 · En español o inglés · Pre-lanzamiento',
  h1: 'El TC que conoce el contrato protege a todos en la mesa.',
  sub: 'Guardianes del Expediente 2026 es el curso práctico para TCs en Florida: los documentos, los plazos y el marco de cumplimiento, para que puedas supervisar, dar seguimiento y reportar con confianza en cada expediente.',
  cta: `Inscríbete ahora — ${PRICE} pre-lanzamiento`,
  ctaNote: `Precio de pre-lanzamiento hasta el 15 de diciembre de 2026. Después, ${REGULAR_PRICE}.`,
  askFirst: '¿Preguntas primero? Agenda una llamada',
  pills: ['Guardianes del Expediente 2026', 'En español o inglés', 'Enfoque FAR/BAR', 'Módulos nuevos cada semana', '30 años de experiencia'],
  forYouTag: '¿Es para ti?',
  forYouH: 'Hecho para Florida. Hecho para el trabajo real.',
  forYou: [
    'TCs en Florida, nuevos o con experiencia, que quieren dominar los contratos FAR/BAR, los requisitos de cumplimiento y el manejo de plazos.',
    'Profesionales que pasan a un rol de apoyo estructurado en bienes raíces, sin licencia de ventas.',
    'Profesionales de administración y operaciones listos para construir una carrera basada en procesos, cumplimiento y precisión.',
    'TCs activos que quieren afinar su manejo de riesgos y cerrar las brechas en su flujo de trabajo.'
  ],
  valueTag: 'El valor real',
  valueH: 'Lo que cambia cuando tomas este curso',
  value: [
    { icon: '🛡️', h: 'Protege al Broker', p: 'Entiende el cumplimiento en Florida y las pautas de FREC para señalar riesgos antes de que se conviertan en un problema, no después.' },
    { icon: '📋', h: 'Apoya al Agente', p: 'Mantén a los agentes enfocados en sus clientes y su producción mientras tú te encargas del expediente: cada plazo controlado, cada documento en su lugar.' },
    { icon: '🤝', h: 'Sirve al Cliente', p: 'Una transacción limpia y organizada es la mejor experiencia para el cliente. La logras conociendo el contrato a fondo y manejando cada paso con precisión.' },
    { icon: '⚠️', h: 'Maneja el riesgo a tiempo', p: 'Trabaja cada expediente con mentalidad de manejo de riesgos: la documentación correcta, las preguntas correctas y las listas de verificación correctas en el momento correcto.' }
  ],
  learnTag: 'Contenido',
  learnH: 'Lo que vas a aprender',
  learn: [
    { b: 'Tu rol como TC en Florida', t: ': las responsabilidades y los protocolos de cumplimiento dentro de las pautas de FREC — lo que puedes hacer, lo que no, y por qué importa.' },
    { b: 'El Diccionario del Campo:', t: ' los términos de bienes raíces que necesitas buscar, entender y aplicar en cada expediente.' },
    { b: 'Contratos y documentos:', t: ' contratos FAR/BAR, adendas, formularios requeridos y los errores comunes que crean responsabilidad.' },
    { b: 'Plazos y cierre:', t: ' sistemas para controlar las fechas críticas y mantener cada expediente avanzando del contrato al cierre.' },
    { b: 'Comunicación:', t: ' cómo trabajar con brokers, agentes, clientes, prestamistas y la compañía de título — qué decir, cuándo y cómo documentarlo.' }
  ],
  learnNote: 'En Florida se usan varios tipos de contrato. Este taller se enfoca principalmente en los formularios FAR/BAR y sus flujos de trabajo.',
  incTag: 'Qué incluye',
  incH: 'Todo lo que trae el programa',
  inc: [
    { h: 'El curso 2026 completo, en tu idioma', p: 'Lecciones en video en español o inglés dentro de My TC Workshop. Eliges tu idioma al pagar.' },
    { h: 'Módulos nuevos cada semana', p: 'Los estudiantes de pre-lanzamiento empiezan ya. Cada semana se abren módulos nuevos a medida que se publican.' },
    { h: 'Plantillas y recursos', p: 'Listas de verificación, formularios y plantillas en cada lección, listos para tu próximo expediente.' },
    { h: 'Field Guide incluido', p: 'Una guía de referencia rápida para tener a mano mientras trabajas un expediente.' },
    { h: '7 días de Rincón del Coach', p: 'Hazle tus preguntas a Michelle mientras pones el material en práctica — preguntas reales, respuestas reales.' },
    { h: 'Acceso de por vida + comunidad', p: 'Vuelve a cualquier lección cuando quieras y conversa con otros estudiantes en la discusión de cada módulo.' }
  ],
  resultsTag: 'Resultados',
  resultsH: 'Lo que dicen los estudiantes',
  resultsNote: 'Testimonios originales en inglés de estudiantes de nuestro taller anterior.',
  enrollTag: 'Inscríbete hoy',
  enrollH: 'Pre-lanzamiento. Empieza ya.',
  enrollSub: 'My TC Workshop 2026 · Guardianes del Expediente 2026',
  enrollTerms: 'Pago completo · Tu acceso está listo en cuanto pagas',
  enrollList: [
    'El curso 2026 en español o inglés',
    'Módulos nuevos cada semana',
    'Plantillas, recursos y el Field Guide',
    '7 días de Rincón del Coach con Michelle',
    'Acceso de por vida'
  ],
  regular: `Precio de pre-lanzamiento hasta el 15 de diciembre de 2026. Precio regular ${REGULAR_PRICE}.`,
  guaranteeH: 'Nuestra garantía',
  guarantee: 'Si alguna plantilla o formulario está desactualizado, lo actualizamos y te enviamos la versión corregida en 48 horas. Todas las ventas son finales.',
  questionsFirst: '¿Preguntas primero?',
  instructorTag: 'Tu instructora',
  instructorH: 'Enseñado por alguien que ha trabajado en todos los lados de la mesa.',
  founder: 'Fundadora, Hometown Transaction Coordinators',
  bio1a: 'Desde 1995, Michelle ha procesado más de 15,000 transacciones en los condados de Miami-Dade, Broward y Palm Beach, y lleva cada uno de esos expedientes al salón de clases. Con experiencia en procesamiento de préstamos y tres décadas de práctica en bienes raíces en Florida, construyó HTC sobre una convicción: ',
  bio1b: 'la coordinación de transacciones bien hecha es manejo de riesgos, no solo papeleo.',
  bio2: 'Es una autoridad en cumplimiento para los agentes y brokers a quienes sirve, y desde ese enfoque enseña. Directa, completa, sin rodeos. ¿Preguntas antes de inscribirte?',
  faqTag: 'Preguntas frecuentes',
  faqH: 'Antes de inscribirte',
  faqs: [
    { q: '¿Necesito licencia de bienes raíces para tomar este curso o trabajar como TC en Florida?', a: 'No se requiere licencia. La coordinación de transacciones es un rol administrativo en Florida, y los profesionales sin licencia pueden hacer las tareas de TC bajo las pautas del estado para asistentes sin licencia. El curso explica exactamente qué está permitido en Florida, tanto para TCs sin licencia como para agentes con licencia que hacen tareas de coordinación, para que sepas dónde están tus límites y trabajes con confianza.' },
    { q: '¿Puedo tomar el curso en español?', a: 'Sí. El curso 2026 está disponible en español y en inglés. Eliges tu idioma al pagar, y todo el portal se muestra en ese idioma.' },
    { q: '¿Qué significa "pre-lanzamiento"?', a: `Te inscribes ahora al precio de pre-lanzamiento de ${PRICE} (pago completo) y empiezas de inmediato. Cada semana se abren módulos nuevos a medida que se publican. El precio de pre-lanzamiento termina el 15 de diciembre de 2026; después, el curso cuesta ${REGULAR_PRICE}.` },
    { q: '¿Cómo entro después de pagar?', a: 'Creas tu contraseña al pagar, así que tu acceso funciona en cuanto se aprueba el pago, a cualquier hora. También recibes un recibo por correo con el enlace para entrar.' },
    { q: '¿Por cuánto tiempo tengo acceso al material?', a: 'De por vida. Tus lecciones, plantillas y recursos se quedan en tu portal de My TC Workshop, para que vuelvas a cualquier módulo antes de un expediente complicado.' },
    { q: '¿Qué es el Rincón del Coach y cómo funciona?', a: 'El Rincón del Coach son 7 días de acceso directo a Michelle. Envía tus preguntas mientras avanzas en el material y Michelle te las responde. Es apoyo real de la persona que creó el curso.' },
    { q: 'No estoy en Florida, ¿vale la pena?', a: 'Varios estudiantes se han inscrito desde Virginia, Nueva Jersey y otros estados para entender los contratos de Florida antes de trabajar con agentes de Florida o con clientes que se mudan. El marco FAR/BAR y el enfoque de cumplimiento del curso son específicos de Florida, pero la mentalidad de manejo de riesgos, los sistemas de comunicación y la estructura de trabajo sirven en cualquier mercado. Dicho esto, el curso está hecho para Florida: si trabajas expedientes de Florida, es exactamente lo que necesitas.' },
    { q: 'Ya tengo tiempo trabajando como TC. ¿Es muy básico para mí?', a: 'Probablemente no. Una de nuestras estudiantes llevaba un año como TC antes de inscribirse y encontró brechas importantes que no sabía que tenía. Si nunca has tenido formación sobre cumplimiento FAR/BAR, las pautas de FREC o el marco de asistentes sin licencia en Florida, este curso te va a llenar vacíos que no sabías que tenías.' },
    { q: '¿Cuál es la política de reembolsos?', a: 'Todas las ventas son finales. Es un programa educativo digital: una vez que tienes acceso al portal, las lecciones y las plantillas, el material está entregado. Lo que sí garantizamos: si alguna plantilla o formulario está desactualizado, lo actualizamos y te enviamos la versión corregida en 48 horas.' }
  ],
  disclosureH: 'Aviso',
  disclosure: 'Los programas de formación de Hometown Transaction Coordinators son solo para fines educativos y no garantizan empleo, ingresos ni colocación laboral. Cualquier referencia a ingresos o posibilidades de contratación refleja tendencias generales de la industria y no debe interpretarse como una promesa o garantía. Tus resultados dependen de tus habilidades, tu esfuerzo y las condiciones del mercado.',
  rights: 'Hometown Transaction Coordinators. Todos los derechos reservados.'
};

// Real student quotes (2024 workshop), kept in their original English.
const TESTIMONIALS = [
  { quote: "This course completely prepared me for Florida transactions. Michelle's knowledge of FAR/BAR contracts is the real deal — and her Coaches Corner was invaluable for understanding exactly how Florida differs from my home state. Honestly one of the best professional courses I've ever taken.", initials: 'GC', name: 'Gio C.', role: 'Real Estate TC · New Jersey' },
  { quote: "The templates and cheat sheets alone are worth it — it's an incredible volume of usable material. Michelle teaches direct and without fluff, answers every nuance, and responds fast. You can tell she knows this inside and out.", initials: 'GB', name: 'Gaby B.', role: 'TC · Virginia' },
  { quote: 'I came from wholesale and had no idea how much I was missing on the retail side. Being able to revisit the material as I prepare to enter the workforce has been huge. Really great class — highly recommend.', initials: 'CB', name: 'Chris B.', role: 'Aspiring TC · Florida' },
  { quote: 'I had been in this role for a year and thought I knew enough. This course showed me exactly where my gaps were. The checklists are gold. The HOA and condo module was a revelation — Michelle went into Florida legislation my own Realtor had never mentioned. 10/10.', initials: 'JM', name: 'Jennifer M.', role: 'VA · Miami' }
];

const PILL_ICONS = [Award, Globe, FileText, Clock, Award];

export const TcWorkshopPage: React.FC<Props> = ({ language = 'en', onGoHome, onBookCall }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const c = language === 'es' ? ES : EN;
  const joinUrl = portalJoinUrl(language);

  const EnrollButton = ({ big }: { big?: boolean }) => (
    <a
      href={joinUrl}
      className={`w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] font-black ${big ? 'px-10 py-5' : 'px-8 py-4'} rounded-xl text-sm uppercase tracking-wider transition shadow-xl cursor-pointer group`}
    >
      <span>{c.cta}</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </a>
  );

  return (
    <div className="bg-[#EEEAEB] min-h-screen text-[#3A2E29]" lang={language}>

      {/* Top Breadcrumb Nav */}
      <div className="bg-[#3A2E29] text-white py-3 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <button
            onClick={onGoHome}
            className="flex items-center space-x-2 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{c.back}</span>
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400 hidden sm:inline">{c.questions}</span>
            <a href={`mailto:${EMAIL_ADDRESS}`} className="text-[#0D9BA3] hover:underline font-medium">
              {EMAIL_ADDRESS}
            </a>
          </div>
        </div>
      </div>

      {/* 1. HERO */}
      <section className="bg-gradient-to-b from-[#3A2E29] via-[#332824] to-[#2B211E] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0D9BA3]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FE7311]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-[#0D9BA3]/20 text-[#0D9BA3] border border-[#0D9BA3]/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>{c.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif text-white max-w-4xl mx-auto leading-tight">
            {c.h1}
          </h1>

          <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            {c.sub}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <EnrollButton />
            <button
              onClick={onBookCall}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-4 rounded-xl font-bold text-sm tracking-wide transition cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#0D9BA3]" />
              <span>{c.askFirst}</span>
            </button>
          </div>
          <p className="text-xs sm:text-sm text-[#FDBB16] font-semibold">{c.ctaNote}</p>

          <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto text-xs text-slate-200">
            {c.pills.map((pill, i) => {
              const Icon = PILL_ICONS[i] || Award;
              return (
                <div key={pill} className={`bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-center text-center ${i === c.pills.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}>
                  <Icon className={`w-3.5 h-3.5 ${i % 2 ? 'text-[#FE7311]' : 'text-[#0D9BA3]'} mr-1.5 flex-shrink-0`} />
                  <span>{pill}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. IS THIS FOR YOU? */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-[#0D9BA3]/10 text-[#0D9BA3] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>{c.forYouTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3A2E29] font-serif">{c.forYouH}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {c.forYou.map((t) => (
            <div key={t} className="bg-white rounded-2xl p-6 border border-[#D8D2D4] shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[#0D9BA3]/10 text-[#0D9BA3] flex items-center justify-center font-bold flex-shrink-0 mt-1">
                <Check className="w-5 h-5" />
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. THE REAL VALUE */}
      <section className="py-16 sm:py-20 bg-white border-y border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center space-x-2 bg-[#FE7311]/10 text-[#FE7311] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{c.valueTag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3A2E29] font-serif">{c.valueH}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.value.map((v) => (
              <div key={v.h} className="bg-[#EEEAEB] rounded-2xl p-6 border border-[#D8D2D4] space-y-3">
                <div className="text-3xl">{v.icon}</div>
                <h3 className="font-bold text-lg text-[#3A2E29]">{v.h}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{v.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CURRICULUM */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D8D2D4] shadow-sm space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 bg-[#0D9BA3]/10 text-[#0D9BA3] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{c.learnTag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3A2E29] font-serif">{c.learnH}</h2>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {c.learn.map((l, i) => (
              <div key={l.b} className="flex items-start space-x-4 p-4 rounded-xl bg-[#EEEAEB] border border-[#D8D2D4]">
                <CheckCircle2 className={`w-5 h-5 ${i === 1 ? 'text-[#FE7311]' : 'text-[#0D9BA3]'} mt-0.5 flex-shrink-0`} />
                <span className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  <strong>{l.b}</strong>{l.t}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 bg-[#0D9BA3]/5 rounded-xl border border-[#0D9BA3]/20 max-w-4xl mx-auto text-xs text-slate-600 text-center">
            {c.learnNote}
          </div>
        </div>
      </section>

      {/* 5. WHAT'S INCLUDED */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-[#0D9BA3]/10 text-[#0D9BA3] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{c.incTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3A2E29] font-serif">{c.incH}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {c.inc.map((it, i) => (
            <div key={it.h} className={`bg-white rounded-2xl p-6 shadow-sm space-y-3 ${i === 0 ? 'border-2 border-[#FE7311]' : 'border border-[#D8D2D4]'}`}>
              <div className={`text-2xl font-black ${i === 0 ? 'text-[#FE7311]' : 'text-[#0D9BA3]'}`}>{String(i + 1).padStart(2, '0')}</div>
              <h3 className="font-bold text-lg text-[#3A2E29]">{it.h}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{it.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. STUDENT RESULTS */}
      <section className="py-16 sm:py-20 bg-white border-y border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center space-x-2 bg-[#FE7311]/10 text-[#FE7311] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-[#FE7311]" />
              <span>{c.resultsTag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3A2E29] font-serif">{c.resultsH}</h2>
            <p className="text-xs sm:text-sm text-slate-500">{c.resultsNote}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((tm) => (
              <div key={tm.name} className="bg-[#EEEAEB] rounded-2xl p-6 border border-[#D8D2D4] space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex text-[#FE7311]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FE7311]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic" lang="en">"{tm.quote}"</p>
                </div>
                <div className="flex items-center space-x-3 pt-2 border-t border-[#D8D2D4]">
                  <div className="w-9 h-9 rounded-full bg-[#0D9BA3] text-white flex items-center justify-center font-bold text-xs">{tm.initials}</div>
                  <div>
                    <div className="font-bold text-xs text-[#3A2E29]">{tm.name}</div>
                    <div className="text-[11px] text-slate-500">{tm.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ENROLL */}
      <section id="enroll" className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#FE7311] shadow-2xl space-y-8 text-center relative overflow-hidden">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-[#FE7311]/10 text-[#FE7311] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>{c.enrollTag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3A2E29] font-serif">{c.enrollH}</h2>
            <p className="text-xs sm:text-sm text-slate-500">{c.enrollSub}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline justify-center gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-slate-400 line-through">{REGULAR_PRICE}</span>
              <span className="text-5xl sm:text-6xl font-black text-[#FE7311]">{PRICE}</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 font-medium">{c.enrollTerms}</div>
          </div>

          <div className="max-w-md mx-auto space-y-3 text-left">
            {c.enrollList.map((t) => (
              <div key={t} className="flex items-center space-x-3 text-xs sm:text-sm text-slate-700">
                <Check className="w-4 h-4 text-[#0D9BA3] flex-shrink-0" />
                <span>{t}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 space-y-3">
            <EnrollButton big />
            <p className="text-xs text-slate-500">{c.regular}</p>
          </div>

          <div className="pt-4 border-t border-[#D8D2D4] text-xs text-slate-600 space-y-2">
            <div className="font-bold text-[#3A2E29] flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0D9BA3]" />
              <span>{c.guaranteeH}</span>
            </div>
            <p className="max-w-xl mx-auto leading-relaxed">{c.guarantee}</p>
            <p className="text-slate-500">
              {c.questionsFirst}{' '}
              <a href={`mailto:${EMAIL_ADDRESS}`} className="text-[#0D9BA3] underline font-medium">{EMAIL_ADDRESS}</a>
            </p>
          </div>
        </div>
      </section>

      {/* 8. INSTRUCTOR */}
      <section className="py-16 sm:py-20 bg-white border-y border-[#D8D2D4]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center space-x-2 bg-[#0D9BA3]/10 text-[#0D9BA3] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>{c.instructorTag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3A2E29] font-serif">{c.instructorH}</h2>
          </div>
          <div className="bg-[#EEEAEB] rounded-3xl p-6 sm:p-10 border border-[#D8D2D4] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-full max-w-[280px] rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-white">
                <img
                  src="/images/speaking.webp"
                  alt="Michelle Martinez Speaking & Teaching Florida Transaction Coordination"
                  className="w-full h-auto object-cover aspect-4/3"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="md:col-span-8 space-y-4">
              <div>
                <h3 className="text-2xl font-black text-[#3A2E29] font-serif">Michelle Martinez</h3>
                <div className="text-xs font-bold text-[#075960] uppercase tracking-wider">{c.founder}</div>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {c.bio1a}<strong>{c.bio1b}</strong>
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {c.bio2}{' '}
                <a href={`mailto:${EMAIL_ADDRESS}`} className="text-[#075960] font-bold hover:underline">{EMAIL_ADDRESS}</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-[#0D9BA3]/10 text-[#0D9BA3] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{c.faqTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3A2E29] font-serif">{c.faqH}</h2>
        </div>
        <div className="space-y-4">
          {c.faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div key={faq.q} className="bg-white rounded-2xl border border-[#D8D2D4] overflow-hidden transition shadow-sm">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full p-6 text-left flex items-center justify-between space-x-4 cursor-pointer hover:bg-slate-50 transition"
                >
                  <span className="font-bold text-sm sm:text-base text-[#3A2E29]">{index + 1}. {faq.q}</span>
                  <div className="w-8 h-8 rounded-full bg-[#EEEAEB] flex items-center justify-center flex-shrink-0 text-slate-500">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-[#D8D2D4] pt-4">{faq.a}</div>
                )}
              </div>
            );
          })}
        </div>
        <div className="pt-10 text-center">
          <EnrollButton />
        </div>
      </section>

      {/* 10. DISCLOSURE */}
      <section className="py-10 bg-[#3A2E29] text-white border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="text-xs uppercase tracking-wider font-bold text-slate-400">{c.disclosureH}</div>
          <p className="text-xs text-slate-400 leading-relaxed">{c.disclosure}</p>
          <div className="pt-2 text-xs text-slate-500">© {new Date().getFullYear()} {c.rights}</div>
        </div>
      </section>

    </div>
  );
};
