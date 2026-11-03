import React, { useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  BookOpen,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  Globe,
  GraduationCap,
  Handshake,
  Link2,
  Mail,
  Megaphone,
  Send,
  Users
} from 'lucide-react';
import type { Language } from '../types';

interface Props {
  language?: Language;
  onGoHome: () => void;
  onOpenWorkshop: () => void;
}

// My TC Workshop affiliate program: /tcworkshop/affiliates/
// Applications go to the edu-affiliate-apply Supabase function, which saves them and emails
// support@hometowntc.com plus a confirmation to the applicant. It only accepts this website.
const APPLY_URL = 'https://gagsnnrakqbtuyystfkr.supabase.co/functions/v1/edu-affiliate-apply';
const SUPPORT_EMAIL = 'support@hometowntc.com';
const BROCHURE_URL = '/downloads/my-tc-workshop-affiliate-brochure-en-es.pdf';
const PAGE_URL = { en: 'https://hometowntc.com/tcworkshop/affiliates/', es: 'https://hometowntc.com/es/tcworkshop/afiliados/' };
const PAGE_PATH = { en: '/tcworkshop/affiliates/', es: '/es/tcworkshop/afiliados/' };

type Faq = { q: string; a: string };
type Copy = {
  back: string; questions: string;
  badge: string; h1: string; sub: string; apply: string; brochure: string; brochureNote: string;
  stats: { v: string; l: string }[];
  whoTag: string; whoH: string; whoP: string; who: string[]; noPurchase: string;
  courseTag: string; courseH: string; courseP: string; glance: string[]; modsH: string; mods: [string, string][]; seeCourse: string;
  earnTag: string; earnH: string; colPrice: string; colEarn: string;
  earn: { price: string; label: string; note?: string; amount: string }[];
  earnNote: string; preNote: string;
  stepsTag: string; stepsH: string; steps: [string, string][];
  getTag: string; getH: string; get: [string, string][];
  formTag: string; formH: string; formP: string;
  f: Record<string, string>; types: string[]; promote: [string, string][];
  sending: string; sent: string; sentP: string; errName: string; errEmail: string; errAgree: string; errBusy: string; errGeneric: string;
  faqTag: string; faqH: string; faqs: Faq[];
  discH: string; disc: string; rights: string;
};

const EN: Copy = {
  back: 'Back to My TC Workshop',
  questions: 'Questions?',
  badge: 'Affiliate Partnership Program · English & Español',
  h1: 'Become a My TC Workshop affiliate',
  sub: 'Share Guardian of the File 2026, the Florida transaction coordinator course taught by Michelle Martinez, and earn 20% on every eligible referral — in English or in Spanish.',
  apply: 'Apply to become an affiliate',
  brochure: 'Download the brochure (PDF)',
  brochureNote: 'English and Spanish · 8 pages',
  stats: [
    { v: '20%', l: 'Commission on eligible referrals' },
    { v: '60 days', l: 'Referral tracking window' },
    { v: '1st & 15th', l: 'Commission payout dates' },
    { v: 'EN + ES', l: 'Promote in English, Spanish or both' }
  ],
  whoTag: 'Who it\'s for',
  whoH: 'Partners who already help people build a real estate career',
  whoP: 'If your audience includes future transaction coordinators, real estate assistants, agents or career changers in Florida, this program lets you recommend training you can stand behind.',
  who: ['Real estate schools & instructors', 'Industry influencers & creators', 'TC business owners', 'Coaches & mentors', 'Brokerage educators', 'Team leaders', 'English, Spanish, or both'],
  noPurchase: 'You do not need to buy the course to become an affiliate. If you want all nine modules for yourself, you can enroll as a student through the regular checkout.',
  courseTag: 'What you\'ll promote',
  courseH: 'Guardian of the File 2026: Florida transaction coordination, start to finish',
  courseP: 'My TC Workshop is a Florida real estate education platform founded by Michelle Martinez, whose real estate experience dates back to 1995. The course teaches the fundamentals of Florida transaction coordination through practical, structured lessons for beginners and working professionals, with a focus on Florida Realtors® / Florida Bar (FAR/BAR) contracts.',
  glance: ['Nine modules · online and self-paced', 'English or Spanish instruction', '24 months of access', 'Quizzes after every lesson', 'Templates, checklists and the Guardian of the File reference library', 'Coach\'s Corner: students ask questions in their portal'],
  modsH: 'Nine modules, one complete file',
  mods: [
    ['The role of the TC', 'Responsibilities, scope and professional boundaries.'],
    ['The Field Dictionary', 'The language of real estate, and every participant at the table.'],
    ['Mission Control', 'An overview of the eight workflows behind every file.'],
    ['The AS IS contract · Part 1', 'The Florida Realtors® / Florida Bar contract, clause by clause.'],
    ['The AS IS contract · Part 2', 'The rest of the contract, and what each part asks of the TC.'],
    ['Riders & disclosures · Part 1', 'Paragraph 19 riders, including the 2026 condo rider updates.'],
    ['Riders & disclosures · Part 2', 'Addenda, compensation agreements, CASB and Rider GG.'],
    ['Contract review', 'Review a training contract and catch the errors before closing does.'],
    ['Compliance & close-out', 'FREC, brokerage close-out, and the full toolkit.']
  ],
  seeCourse: 'See the full course page',
  earnTag: 'Pricing & commission',
  earnH: 'What students pay, and what you earn',
  colPrice: 'Enrollment',
  colEarn: 'Your 20% commission',
  earn: [
    { price: '$399', label: 'Pre-launch, paid in full', note: 'Through December 15, 2026', amount: '$79.80' },
    { price: '$499', label: 'Paid in full (save $100)', note: 'Starting December 16, 2026', amount: '$99.80' },
    { price: '$599', label: 'Payment plan', note: '$199 down, then $200 two weeks later and $200 two weeks after that', amount: '$119.80' }
  ],
  earnNote: 'Commission is 20% of what the student actually pays for their first course. On the payment plan, you earn on each payment as it comes in. Each payment is held for 30 days, then paid on the next 1st or 15th once your signed affiliate packet is on file.',
  preNote: 'Pre-launch students start with Modules 1–3, and new modules open every week. Students register and pay on the official My TC Workshop checkout — affiliates never handle payments, registrations or course delivery.',
  stepsTag: 'How it works',
  stepsH: 'Become an affiliate in five steps',
  steps: [
    ['Apply', 'Fill out the short application below. We review every application and reply by email.'],
    ['Sign your packet', 'Your affiliate agreement, W-9 and payout form arrive through DocuSign. Never send tax IDs or bank details by email.'],
    ['Experience the training', 'Sign in to your portal. You get all of Module 1 in English and in Spanish, so you can take the course as a student before you recommend it.'],
    ['Get your marketing materials', 'English and Spanish promotional resources, editable Canva templates, and your personal link, code and QR code.'],
    ['Share and earn', 'Introduce the course to your audience. When an eligible referral buys through your link or code, you earn a commission.']
  ],
  getTag: 'Your affiliate portal',
  getH: 'Everything you need in one place',
  get: [
    ['Module 1 in English and Spanish', 'Experience the lessons, quizzes and exam exactly as a student does.'],
    ['Your link, code and QR code', 'Every sale through your link or code within 60 days is credited to you.'],
    ['Marketing kit', 'Story graphics, flyers and social posts as editable Canva templates, in both languages.'],
    ['Students and payouts', 'See your referred students, each payment, when it becomes eligible and when it was paid.']
  ],
  formTag: 'Apply now',
  formH: 'Apply to the affiliate program',
  formP: 'Takes about two minutes. We\'ll email you after we review your application.',
  f: {
    first: 'First name', last: 'Last name', email: 'Email', type: 'Which best describes you?', choose: 'Choose one',
    org: 'School, business or brokerage (optional)', web: 'Website or social media link (optional)',
    audience: 'Who would you share the course with? (optional)', audienceHint: 'For example: my pre-licensing students, my Instagram followers, agents on my team.',
    promote: 'I would promote the course in', message: 'Anything else we should know? (optional)',
    agree: 'I understand that affiliate participation is governed by the affiliate agreement and that HTC communicates by email only.',
    submit: 'Send my application', privacy: 'We use your information only to review your application and contact you about the program.'
  },
  types: ['Real estate school or instructor', 'Influencer or content creator', 'TC business owner', 'Coach or mentor', 'Brokerage educator', 'Team leader', 'Other'],
  promote: [['en', 'English'], ['es', 'Spanish'], ['both', 'Both']],
  sending: 'Sending…',
  sent: 'Application received — thank you!',
  sentP: 'We sent a confirmation to your email. Our team will review your application and reply with next steps. Questions? Write to support@hometowntc.com.',
  errName: 'Please enter your first name.',
  errEmail: 'Please enter a valid email address.',
  errAgree: 'Please check the box to continue.',
  errBusy: 'We\'re receiving a lot of applications right now. Please try again in a few minutes.',
  errGeneric: 'Something went wrong. Please try again, or email support@hometowntc.com.',
  faqTag: 'Questions, answered',
  faqH: 'Affiliate program FAQ',
  faqs: [
    { q: 'How much do My TC Workshop affiliates earn?', a: 'Affiliates earn 20% of what a referred student actually pays for their first course: $79.80 on a $399 pre-launch enrollment, $99.80 on a $499 paid-in-full enrollment, and $119.80 in total on the $599 payment plan, paid as each payment comes in.' },
    { q: 'How are referrals tracked?', a: 'Each affiliate gets a personal link and a promo code. Any student who buys through your link, or types your code at checkout, within 60 days is credited to you.' },
    { q: 'When are commissions paid?', a: 'On the 1st and 15th of each month. Each student payment is held for 30 days first, and payouts start once your signed affiliate packet (agreement, W-9 and payout form) is on file.' },
    { q: 'Do I have to buy the course to become an affiliate?', a: 'No. Affiliates get all of Module 1 in English and Spanish in their portal at no cost, so they can experience the course before recommending it.' },
    { q: 'Do I collect payments from students?', a: 'No. Students enroll and pay directly on the official My TC Workshop checkout. Affiliates never handle payments, registrations or course delivery.' },
    { q: 'Can I promote the course in Spanish?', a: 'Yes. Guardian of the File 2026 is a complete course in English and a complete course in Spanish, and the marketing kit comes in both languages.' },
    { q: 'How do I contact HTC about the affiliate program?', a: 'Email support@hometowntc.com. We handle everything by email — no calls or texts, please.' },
    { q: 'What does a transaction coordinator do in Florida?', a: 'A transaction coordinator (TC) manages the administrative side of a real estate deal from contract to closing: tracking contract deadlines, collecting and organizing documents, and keeping agents, lenders, title companies and clients on the same page. A TC does not negotiate, give advice or make decisions for the parties.' },
    { q: 'How do I become a transaction coordinator in Florida?', a: 'Most people start by learning the Florida contract, the deadlines it creates and where a TC\'s role begins and ends. My TC Workshop\'s Guardian of the File 2026 course teaches exactly that, in English or Spanish, built around the Florida Realtors® / Florida Bar (FAR/BAR) contract.' },
    { q: 'Do you need a real estate license to be a transaction coordinator in Florida?', a: 'No license is required for administrative transaction coordination. Unlicensed professionals can perform TC duties under Florida\'s unlicensed assistant guidelines, and the course covers what is and isn\'t allowed so you know exactly where your boundaries are.' }
  ],
  discH: 'Program terms',
  disc: 'Affiliate participation is governed by the applicable affiliate agreement, including commission eligibility, attribution rules and the payment schedule. Final website terms and policies are being incorporated into the platform. Commission figures reflect 20% of the listed course prices; earnings depend on the referrals you generate, and no income is guaranteed. My TC Workshop is educational and does not guarantee employment, income or job placement.',
  rights: 'Hometown Transaction Coordinators. All rights reserved.'
};

const ES: Copy = {
  back: 'Volver a My TC Workshop',
  questions: '¿Preguntas?',
  badge: 'Programa de Afiliados · English & Español',
  h1: 'Hazte afiliado de My TC Workshop',
  sub: 'Comparte Guardian of the File 2026, el curso para coordinadores de transacciones en Florida de Michelle Martinez, y gana el 20% por cada referido elegible — en inglés o en español.',
  apply: 'Aplica para ser afiliado',
  brochure: 'Descarga el folleto (PDF)',
  brochureNote: 'Inglés y español · 8 páginas',
  stats: [
    { v: '20%', l: 'Comisión por referidos elegibles' },
    { v: '60 días', l: 'Ventana de seguimiento de referidos' },
    { v: '1 y 15', l: 'Fechas de pago de comisiones' },
    { v: 'EN + ES', l: 'Promociona en inglés, español o ambos' }
  ],
  whoTag: 'Para quién es',
  whoH: 'Socios que ya ayudan a otros a construir una carrera en bienes raíces',
  whoP: 'Si tu audiencia incluye futuros coordinadores de transacciones, asistentes, agentes o personas que cambian de carrera en Florida, este programa te permite recomendar una formación en la que puedes confiar.',
  who: ['Escuelas e instructores de bienes raíces', 'Influencers y creadores', 'Dueños de negocios de TC', 'Coaches y mentores', 'Educadores de brokerage', 'Líderes de equipo', 'Inglés, español o ambos'],
  noPurchase: 'No necesitas comprar el curso para ser afiliado. Si quieres los nueve módulos para ti, puedes inscribirte como estudiante con el proceso de compra regular.',
  courseTag: 'Lo que vas a promocionar',
  courseH: 'Guardian of the File 2026: coordinación de transacciones en Florida, de principio a fin',
  courseP: 'My TC Workshop es una plataforma de educación inmobiliaria de Florida fundada por Michelle Martinez, con experiencia en bienes raíces desde 1995. El curso enseña los fundamentos de la coordinación de transacciones en Florida con lecciones prácticas y estructuradas, para principiantes y profesionales en activo, con enfoque en los contratos Florida Realtors® / Florida Bar (FAR/BAR).',
  glance: ['Nueve módulos · en línea y a tu ritmo', 'En inglés o en español', '24 meses de acceso', 'Quizzes después de cada lección', 'Plantillas, listas de verificación y la biblioteca de referencia Guardian of the File', 'Coach\'s Corner: los estudiantes preguntan en su portal'],
  modsH: 'Nueve módulos, un expediente completo',
  mods: [
    ['El rol del TC', 'Responsabilidades, alcance y límites profesionales.'],
    ['El Diccionario del Campo', 'El idioma de bienes raíces y cada participante en la mesa.'],
    ['Centro de Control', 'Un vistazo a los ocho flujos de trabajo detrás de cada expediente.'],
    ['El contrato AS IS · Parte 1', 'El contrato de Florida Realtors® / Florida Bar, cláusula por cláusula.'],
    ['El contrato AS IS · Parte 2', 'El resto del contrato, y lo que cada parte le pide al TC.'],
    ['Riders y divulgaciones · Parte 1', 'Riders del párrafo 19, incluidas las actualizaciones 2026 del rider de condominio.'],
    ['Riders y divulgaciones · Parte 2', 'Addenda, acuerdos de compensación, CASB y Rider GG.'],
    ['Revisión de contrato', 'Revisa un contrato de práctica y encuentra los errores antes del cierre.'],
    ['Cumplimiento y cierre administrativo', 'FREC, cierre con la brokerage y la caja de herramientas completa.']
  ],
  seeCourse: 'Ver la página completa del curso',
  earnTag: 'Precios y comisión',
  earnH: 'Lo que paga el estudiante y lo que ganas tú',
  colPrice: 'Matrícula',
  colEarn: 'Tu comisión del 20%',
  earn: [
    { price: '$399', label: 'Preventa, pago completo', note: 'Hasta el 15 de diciembre de 2026', amount: '$79.80' },
    { price: '$499', label: 'Pago completo (ahorra $100)', note: 'A partir del 16 de diciembre de 2026', amount: '$99.80' },
    { price: '$599', label: 'Plan de pagos', note: '$199 de entrada, luego $200 a las dos semanas y $200 dos semanas después', amount: '$119.80' }
  ],
  earnNote: 'La comisión es el 20% de lo que el estudiante realmente paga por su primer curso. En el plan de pagos, ganas sobre cada pago a medida que entra. Cada pago se retiene 30 días y luego se paga el siguiente 1 o 15 del mes, una vez que tu paquete de afiliado firmado esté en archivo.',
  preNote: 'Los estudiantes de preventa empiezan con los Módulos 1–3 y cada semana se abren módulos nuevos. Los estudiantes se registran y pagan en el pago oficial de My TC Workshop — los afiliados nunca gestionan pagos, matrículas ni la entrega del curso.',
  stepsTag: 'Cómo funciona',
  stepsH: 'Tu afiliación en cinco pasos',
  steps: [
    ['Aplica', 'Llena la solicitud corta de abajo. Revisamos cada solicitud y respondemos por correo.'],
    ['Firma tu paquete', 'Tu acuerdo de afiliado, el W-9 y el formulario de pago llegan por DocuSign. Nunca envíes números de impuestos ni datos bancarios por correo.'],
    ['Conoce la formación', 'Inicia sesión en tu portal. Recibes todo el Módulo 1 en inglés y en español, para que tomes el curso como estudiante antes de recomendarlo.'],
    ['Obtén tus materiales', 'Recursos promocionales en inglés y español, plantillas editables de Canva y tu enlace, código y código QR personales.'],
    ['Comparte y gana', 'Presenta el curso a tu audiencia. Cuando un referido elegible compra con tu enlace o código, ganas una comisión.']
  ],
  getTag: 'Tu portal de afiliado',
  getH: 'Todo lo que necesitas en un solo lugar',
  get: [
    ['El Módulo 1 en inglés y español', 'Vive las lecciones, los quizzes y el examen igual que un estudiante.'],
    ['Tu enlace, código y código QR', 'Cada venta con tu enlace o código dentro de 60 días se te acredita.'],
    ['Kit de marketing', 'Gráficos para historias, flyers y publicaciones como plantillas editables de Canva, en ambos idiomas.'],
    ['Estudiantes y pagos', 'Ve tus estudiantes referidos, cada pago, cuándo es elegible y cuándo se pagó.']
  ],
  formTag: 'Aplica ahora',
  formH: 'Solicitud para el programa de afiliados',
  formP: 'Toma unos dos minutos. Te escribiremos por correo después de revisar tu solicitud.',
  f: {
    first: 'Nombre', last: 'Apellido', email: 'Correo electrónico', type: '¿Qué te describe mejor?', choose: 'Elige una opción',
    org: 'Escuela, negocio o brokerage (opcional)', web: 'Sitio web o red social (opcional)',
    audience: '¿Con quién compartirías el curso? (opcional)', audienceHint: 'Por ejemplo: mis estudiantes de pre-licencia, mis seguidores de Instagram, los agentes de mi equipo.',
    promote: 'Promocionaría el curso en', message: '¿Algo más que debamos saber? (opcional)',
    agree: 'Entiendo que la participación como afiliado se rige por el acuerdo de afiliado y que HTC se comunica solo por correo electrónico.',
    submit: 'Enviar mi solicitud', privacy: 'Usamos tu información solo para revisar tu solicitud y contactarte sobre el programa.'
  },
  types: ['Escuela o instructor de bienes raíces', 'Influencer o creador de contenido', 'Dueño de negocio de TC', 'Coach o mentor', 'Educador de brokerage', 'Líder de equipo', 'Otro'],
  promote: [['en', 'Inglés'], ['es', 'Español'], ['both', 'Ambos']],
  sending: 'Enviando…',
  sent: '¡Solicitud recibida — gracias!',
  sentP: 'Te enviamos una confirmación por correo. Nuestro equipo revisará tu solicitud y te responderá con los próximos pasos. ¿Preguntas? Escribe a support@hometowntc.com.',
  errName: 'Escribe tu nombre.',
  errEmail: 'Escribe un correo electrónico válido.',
  errAgree: 'Marca la casilla para continuar.',
  errBusy: 'Estamos recibiendo muchas solicitudes ahora. Inténtalo de nuevo en unos minutos.',
  errGeneric: 'Algo salió mal. Inténtalo de nuevo o escribe a support@hometowntc.com.',
  faqTag: 'Preguntas frecuentes',
  faqH: 'Preguntas sobre el programa de afiliados',
  faqs: [
    { q: '¿Cuánto ganan los afiliados de My TC Workshop?', a: 'Los afiliados ganan el 20% de lo que el estudiante referido realmente paga por su primer curso: $79.80 en una matrícula de preventa de $399, $99.80 en un pago completo de $499 y $119.80 en total en el plan de pagos de $599, pagado a medida que entra cada pago.' },
    { q: '¿Cómo se rastrean los referidos?', a: 'Cada afiliado recibe un enlace personal y un código promocional. Todo estudiante que compre con tu enlace, o escriba tu código al pagar, dentro de 60 días se te acredita.' },
    { q: '¿Cuándo se pagan las comisiones?', a: 'El 1 y el 15 de cada mes. Cada pago de un estudiante se retiene 30 días, y los pagos empiezan cuando tu paquete de afiliado firmado (acuerdo, W-9 y formulario de pago) está en archivo.' },
    { q: '¿Tengo que comprar el curso para ser afiliado?', a: 'No. Los afiliados reciben todo el Módulo 1 en inglés y español en su portal sin costo, para conocer el curso antes de recomendarlo.' },
    { q: '¿Yo cobro los pagos de los estudiantes?', a: 'No. Los estudiantes se inscriben y pagan directamente en el pago oficial de My TC Workshop. Los afiliados nunca gestionan pagos, matrículas ni la entrega del curso.' },
    { q: '¿Puedo promocionar el curso en español?', a: 'Sí. Guardian of the File 2026 es un curso completo en inglés y un curso completo en español, y el kit de marketing viene en ambos idiomas.' },
    { q: '¿Cómo me comunico con HTC sobre el programa?', a: 'Escribe a support@hometowntc.com. Atendemos todo por correo — por favor, sin llamadas ni mensajes de texto.' },
    { q: '¿Qué hace un coordinador de transacciones en Florida?', a: 'Un coordinador de transacciones (TC) maneja la parte administrativa de una operación inmobiliaria, del contrato al cierre: da seguimiento a los plazos del contrato, reúne y organiza documentos y mantiene a agentes, lenders, compañías de título y clientes informados. Un TC no negocia, no da consejos y no toma decisiones por las partes.' },
    { q: '¿Cómo me convierto en coordinador de transacciones en Florida?', a: 'La mayoría empieza aprendiendo el contrato de Florida, los plazos que crea y dónde empieza y termina el rol del TC. El curso Guardian of the File 2026 de My TC Workshop enseña exactamente eso, en inglés o en español, con base en el contrato Florida Realtors® / Florida Bar (FAR/BAR).' },
    { q: '¿Se necesita licencia de bienes raíces para ser coordinador de transacciones en Florida?', a: 'No se requiere licencia para la coordinación administrativa de transacciones. Los profesionales sin licencia pueden hacer funciones de TC bajo las pautas de Florida para asistentes sin licencia, y el curso explica lo que está y no está permitido.' }
  ],
  discH: 'Términos del programa',
  disc: 'La participación como afiliado se rige por el acuerdo de afiliado aplicable, incluidos la elegibilidad de comisiones, las reglas de atribución y el calendario de pagos. Los términos y políticas finales del sitio web se están incorporando a la plataforma. Las cifras de comisión corresponden al 20% de los precios indicados; las ganancias dependen de los referidos que generes y no están garantizadas. My TC Workshop es educativo y no garantiza empleo, ingresos ni colocación laboral.',
  rights: 'Hometown Transaction Coordinators. Todos los derechos reservados.'
};

const STEP_ICONS = [Send, Handshake, GraduationCap, Megaphone, BadgeDollarSign];
const GET_ICONS = [BookOpen, Link2, Megaphone, CalendarClock];

const inputCls = 'w-full rounded-xl border border-[#D8D2D4] bg-white px-4 py-3 text-sm text-[#3A2E29] focus:outline-none focus:ring-2 focus:ring-[#0D9BA3] focus:border-[#0D9BA3]';
const labelCls = 'block text-xs font-bold text-[#3A2E29] mb-1.5';

export const AffiliateProgramPage: React.FC<Props> = ({ language = 'en', onGoHome, onOpenWorkshop }) => {
  const c = language === 'es' ? ES : EN;
  const lang: 'en' | 'es' = language === 'es' ? 'es' : 'en';
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');
  const startedAt = useRef<number>(Date.now());

  // Structured data (rendered into the HTML at build time) for search and answer engines.
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Hometown TC', item: 'https://hometowntc.com/' },
        { '@type': 'ListItem', position: 2, name: 'My TC Workshop', item: 'https://hometowntc.com/tcworkshop/' },
        { '@type': 'ListItem', position: 3, name: lang === 'es' ? 'Programa de Afiliados' : 'Affiliate Program', item: PAGE_URL[lang] }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: lang,
      mainEntity: c.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: lang === 'es' ? 'Programa de Afiliados de My TC Workshop' : 'My TC Workshop Affiliate Program',
      url: PAGE_URL[lang],
      inLanguage: lang,
      description: c.sub,
      about: {
        '@type': 'Course',
        name: 'Guardian of the File 2026 — My TC Workshop',
        description: 'Online, self-paced Florida transaction coordinator course on FAR/BAR contracts, deadlines, documents and compliance, in English or Spanish.',
        url: 'https://hometowntc.com/tcworkshop/',
        inLanguage: ['en', 'es'],
        provider: { '@type': 'Organization', name: 'Hometown Transaction Coordinators', url: 'https://hometowntc.com/' },
        instructor: { '@type': 'Person', name: 'Michelle Martinez' }
      },
      publisher: { '@type': 'Organization', name: 'Hometown Transaction Coordinators', url: 'https://hometowntc.com/', email: SUPPORT_EMAIL }
    }
  ];

  const scrollToApply = () => {
    const el = document.getElementById('apply');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const fd = new FormData(e.currentTarget);
    const v = (k: string) => String(fd.get(k) || '').trim();
    if (!v('first_name')) return setError(c.errName);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v('email'))) return setError(c.errEmail);
    if (!fd.get('agree')) return setError(c.errAgree);
    // Bots fill the hidden field or submit instantly; quietly treat both as done.
    if (v('company_url') || Date.now() - startedAt.current < 2500) { setState('sent'); return; }
    setState('sending');
    try {
      const res = await fetch(APPLY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: v('first_name'), last_name: v('last_name'), email: v('email'), language,
          partner_type: v('partner_type'), organization: v('organization'), website: v('website'),
          audience: v('audience'), promote_language: v('promote_language'), message: v('message'),
          company_url: v('company_url'), page: PAGE_PATH[lang]
        })
      });
      const d = await res.json().catch(() => ({}));
      if (res.ok && d.ok) {
        setState('sent');
        try { (window as any).gtag?.('event', 'generate_lead', { form: 'affiliate_application', language }); } catch { /* analytics optional */ }
        return;
      }
      setState('idle');
      setError(d.error === 'email' ? c.errEmail : d.error === 'name' ? c.errName : d.error === 'busy' ? c.errBusy : c.errGeneric);
    } catch {
      setState('idle');
      setError(c.errGeneric);
    }
  };

  const Tag = ({ icon: Icon, text, orange }: { icon: React.ElementType; text: string; orange?: boolean }) => (
    <div className={`inline-flex items-center space-x-2 ${orange ? 'bg-[#FE7311]/10 text-[#C2560A]' : 'bg-[#0D9BA3]/10 text-[#075960]'} px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{text}</span>
    </div>
  );

  return (
    <main className="bg-[#EEEAEB] min-h-screen text-[#3A2E29]" lang={language}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Breadcrumb bar */}
      <div className="bg-[#3A2E29] text-white py-3 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-slate-300">
            <a href="/" onClick={(e) => { e.preventDefault(); onGoHome(); }} className="hover:text-white hidden sm:inline">Hometown TC</a>
            <span className="hidden sm:inline">/</span>
            <a href="/tcworkshop/" onClick={(e) => { e.preventDefault(); onOpenWorkshop(); }} className="hover:text-white inline-flex items-center space-x-1.5">
              <ArrowLeft className="w-3.5 h-3.5 sm:hidden" />
              <span className="sm:hidden">{c.back}</span>
              <span className="hidden sm:inline">My TC Workshop</span>
            </a>
            <span className="hidden sm:inline">/</span>
            <span className="text-white hidden sm:inline" aria-current="page">{language === 'es' ? 'Afiliados' : 'Affiliates'}</span>
          </nav>
          <div className="flex items-center space-x-3">
            <span className="text-slate-400 hidden sm:inline">{c.questions}</span>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#3FC1C9] hover:underline font-medium">{SUPPORT_EMAIL}</a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#3A2E29] via-[#332824] to-[#2B211E] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0D9BA3]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FE7311]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-[#0D9BA3]/20 text-[#3FC1C9] border border-[#0D9BA3]/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Handshake className="w-4 h-4" />
            <span>{c.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif text-white max-w-4xl mx-auto leading-tight">{c.h1}</h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">{c.sub}</p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={scrollToApply} className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] font-black px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition shadow-xl cursor-pointer group">
              <span>{c.apply}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href={BROCHURE_URL} download className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-4 rounded-xl font-bold text-sm tracking-wide transition">
              <Download className="w-4 h-4 text-[#3FC1C9]" />
              <span>{c.brochure}</span>
            </a>
          </div>
          <p className="text-xs text-slate-300">{c.brochureNote}</p>
          <div className="pt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {c.stats.map((s) => (
              <div key={s.l} className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <div className="text-2xl sm:text-3xl font-black text-[#FE7311] font-serif">{s.v}</div>
                <div className="text-[11px] sm:text-xs text-slate-300 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <Tag icon={Users} text={c.whoTag} />
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif">{c.whoH}</h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{c.whoP}</p>
        </div>
        <ul className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {c.who.map((w) => (
            <li key={w} className="bg-white border border-[#D8D2D4] rounded-full px-4 py-2 text-sm font-medium flex items-center space-x-2">
              <Check className="w-4 h-4 text-[#0D9BA3]" /><span>{w}</span>
            </li>
          ))}
        </ul>
        <p className="text-center text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto mt-6">{c.noPurchase}</p>
      </section>

      {/* The course */}
      <section className="py-16 sm:py-20 bg-white border-y border-[#D8D2D4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-3 space-y-4">
              <Tag icon={BookOpen} text={c.courseTag} orange />
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif">{c.courseH}</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{c.courseP}</p>
              <a href="/tcworkshop/" onClick={(e) => { e.preventDefault(); onOpenWorkshop(); }} className="inline-flex items-center space-x-1.5 text-sm font-bold text-[#075960] hover:underline">
                <span>{c.seeCourse}</span><ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <ul className="lg:col-span-2 bg-[#EEEAEB] rounded-2xl border border-[#D8D2D4] p-6 space-y-3">
              {c.glance.map((g) => (
                <li key={g} className="flex items-start space-x-3 text-sm"><CheckCircle2 className="w-5 h-5 text-[#0D9BA3] flex-shrink-0" /><span>{g}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold font-serif mb-4">{c.modsH}</h3>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {c.mods.map(([t, d], i) => (
                <li key={t} className="bg-[#EEEAEB] rounded-xl border border-[#D8D2D4] p-4 flex space-x-3">
                  <span className="text-lg font-black text-[#0D9BA3] font-serif">{String(i + 1).padStart(2, '0')}</span>
                  <div><div className="font-bold text-sm">{t}</div><div className="text-xs text-slate-600 mt-0.5">{d}</div></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Pricing & commission */}
      <section className="py-16 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <Tag icon={BadgeDollarSign} text={c.earnTag} orange />
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif">{c.earnH}</h2>
        </div>
        <div className="bg-white rounded-3xl border border-[#D8D2D4] shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#3A2E29] text-white text-xs uppercase tracking-wider">
              <tr><th scope="col" className="px-5 sm:px-8 py-4">{c.colPrice}</th><th scope="col" className="px-5 sm:px-8 py-4 text-right">{c.colEarn}</th></tr>
            </thead>
            <tbody>
              {c.earn.map((r, i) => (
                <tr key={r.price} className={i ? 'border-t border-[#EEEAEB]' : ''}>
                  <td className="px-5 sm:px-8 py-5">
                    <div className="flex items-baseline gap-3 flex-wrap"><span className="text-2xl font-black font-serif">{r.price}</span><span className="font-bold">{r.label}</span></div>
                    {r.note && <div className="text-xs text-slate-500 mt-1">{r.note}</div>}
                  </td>
                  <td className="px-5 sm:px-8 py-5 text-right text-2xl font-black text-[#075960] font-serif">{r.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 bg-[#0D9BA3]/5 border-l-4 border-[#0D9BA3] rounded-r-xl p-5 text-sm text-slate-700 leading-relaxed space-y-2">
          <p>{c.earnNote}</p>
          <p className="text-slate-600 text-xs sm:text-sm">{c.preNote}</p>
        </div>
      </section>

      {/* Steps + portal */}
      <section className="py-16 sm:py-20 bg-white border-y border-[#D8D2D4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <Tag icon={Send} text={c.stepsTag} />
            <h2 className="text-3xl font-extrabold font-serif">{c.stepsH}</h2>
            <ol className="space-y-4">
              {c.steps.map(([t, d], i) => {
                const Icon = STEP_ICONS[i];
                return (
                  <li key={t} className="flex space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FE7311]/10 text-[#C2560A] flex items-center justify-center flex-shrink-0"><Icon className="w-5 h-5" /></div>
                    <div><div className="font-bold">{String(i + 1).padStart(2, '0')} · {t}</div><p className="text-sm text-slate-600 leading-relaxed">{d}</p></div>
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="space-y-6">
            <Tag icon={Globe} text={c.getTag} />
            <h2 className="text-3xl font-extrabold font-serif">{c.getH}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {c.get.map(([t, d], i) => {
                const Icon = GET_ICONS[i];
                return (
                  <div key={t} className="bg-[#EEEAEB] rounded-2xl border border-[#D8D2D4] p-5 space-y-2">
                    <Icon className="w-5 h-5 text-[#0D9BA3]" />
                    <h3 className="font-bold text-sm">{t}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{d}</p>
                  </div>
                );
              })}
            </div>
            <a href={BROCHURE_URL} download className="inline-flex items-center space-x-2 text-sm font-bold text-[#075960] hover:underline">
              <Download className="w-4 h-4" /><span>{c.brochure}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="py-16 sm:py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#FE7311] shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <Tag icon={Handshake} text={c.formTag} orange />
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif">{c.formH}</h2>
            <p className="text-sm text-slate-600">{c.formP}</p>
          </div>
          {state === 'sent' ? (
            <div role="status" className="text-center space-y-3 py-6">
              <CheckCircle2 className="w-12 h-12 text-[#0D9BA3] mx-auto" />
              <h3 className="text-2xl font-bold font-serif">{c.sent}</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">{c.sentP}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label htmlFor="af_first" className={labelCls}>{c.f.first} *</label><input id="af_first" name="first_name" autoComplete="given-name" required className={inputCls} /></div>
                <div><label htmlFor="af_last" className={labelCls}>{c.f.last}</label><input id="af_last" name="last_name" autoComplete="family-name" className={inputCls} /></div>
              </div>
              <div><label htmlFor="af_email" className={labelCls}>{c.f.email} *</label><input id="af_email" name="email" type="email" autoComplete="email" required className={inputCls} /></div>
              <div>
                <label htmlFor="af_type" className={labelCls}>{c.f.type}</label>
                <select id="af_type" name="partner_type" className={inputCls} defaultValue="">
                  <option value="">{c.f.choose}</option>
                  {c.types.map((t, i) => <option key={t} value={EN.types[i]}>{t}</option>)}
                </select>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label htmlFor="af_org" className={labelCls}>{c.f.org}</label><input id="af_org" name="organization" autoComplete="organization" className={inputCls} /></div>
                <div><label htmlFor="af_web" className={labelCls}>{c.f.web}</label><input id="af_web" name="website" inputMode="url" className={inputCls} /></div>
              </div>
              <div>
                <label htmlFor="af_aud" className={labelCls}>{c.f.audience}</label>
                <textarea id="af_aud" name="audience" rows={2} aria-describedby="af_aud_hint" className={inputCls} />
                <p id="af_aud_hint" className="text-[11px] text-slate-500 mt-1">{c.f.audienceHint}</p>
              </div>
              <fieldset>
                <legend className={labelCls}>{c.f.promote}</legend>
                <div className="flex flex-wrap gap-3">
                  {c.promote.map(([val, lab]) => (
                    <label key={val} className="inline-flex items-center space-x-2 bg-[#EEEAEB] border border-[#D8D2D4] rounded-full px-4 py-2 text-sm cursor-pointer">
                      <input type="radio" name="promote_language" value={val} defaultChecked={val === (language === 'es' ? 'es' : 'en')} className="accent-[#0D9BA3]" />
                      <span>{lab}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div><label htmlFor="af_msg" className={labelCls}>{c.f.message}</label><textarea id="af_msg" name="message" rows={3} className={inputCls} /></div>
              {/* Hidden from people; bots tend to fill it in. */}
              <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                <label htmlFor="af_company_url">Company URL</label>
                <input id="af_company_url" name="company_url" tabIndex={-1} autoComplete="off" />
              </div>
              <label className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" name="agree" value="1" className="mt-1 accent-[#0D9BA3]" />
                <span>{c.f.agree}</span>
              </label>
              {error && <div role="alert" className="text-sm font-semibold text-[#B42318] bg-[#B42318]/5 border border-[#B42318]/20 rounded-xl px-4 py-3">{error}</div>}
              <button type="submit" disabled={state === 'sending'} className="w-full inline-flex items-center justify-center space-x-2 bg-[#FE7311] hover:bg-[#e05f03] disabled:opacity-60 text-[#1A1412] font-black px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition shadow-lg cursor-pointer">
                <span>{state === 'sending' ? c.sending : c.f.submit}</span>
                {state !== 'sending' && <ArrowRight className="w-4 h-4" />}
              </button>
              <p className="text-[11px] text-slate-500 text-center">{c.f.privacy}</p>
            </form>
          )}
          <p className="text-center text-xs text-slate-500 flex items-center justify-center space-x-1.5">
            <Mail className="w-3.5 h-3.5" />
            <span>{c.questions}</span>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#075960] underline font-medium">{SUPPORT_EMAIL}</a>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-white border-y border-[#D8D2D4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-3">
            <Tag icon={Users} text={c.faqTag} />
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif">{c.faqH}</h2>
          </div>
          <div className="space-y-3">
            {c.faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="bg-[#EEEAEB] rounded-2xl border border-[#D8D2D4] overflow-hidden">
                  <h3>
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={`aff-faq-${i}`}
                      className="w-full flex items-center justify-between text-left px-5 py-4 font-bold text-sm sm:text-base cursor-pointer"
                    >
                      <span>{f.q}</span>
                      {open ? <ChevronUp className="w-5 h-5 flex-shrink-0 text-[#0D9BA3]" /> : <ChevronDown className="w-5 h-5 flex-shrink-0 text-[#0D9BA3]" />}
                    </button>
                  </h3>
                  {/* Answers stay in the HTML (hidden when closed) so search engines can read them. */}
                  <div id={`aff-faq-${i}`} hidden={!open} className="px-5 pb-5 text-sm text-slate-700 leading-relaxed">{f.a}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA + terms */}
      <section className="py-16 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-[#3A2E29] text-white rounded-3xl p-8 sm:p-12 text-center space-y-5">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif">{language === 'es' ? 'Ayuda a otros a dominar el expediente. Gana mientras compartes.' : 'Help others learn the file. Earn while you share.'}</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={scrollToApply} className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] font-black px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition cursor-pointer">
              <span>{c.apply}</span><ArrowRight className="w-4 h-4" />
            </button>
            <a href={BROCHURE_URL} download className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-4 rounded-xl font-bold text-sm">
              <Download className="w-4 h-4 text-[#3FC1C9]" /><span>{c.brochure}</span>
            </a>
          </div>
        </div>
        <div className="text-xs text-slate-500 leading-relaxed space-y-2">
          <p><strong className="text-[#3A2E29]">{c.discH}.</strong> {c.disc}</p>
          <p>© {new Date().getFullYear()} {c.rights}</p>
        </div>
      </section>
    </main>
  );
};

export default AffiliateProgramPage;
