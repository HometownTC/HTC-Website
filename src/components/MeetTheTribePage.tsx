import React, { useState, useEffect } from 'react';
import type { Language } from '../types';

const COPY = {
  "en": {
    "k0": "Home",
    "k1": "Meet the Tribe",
    "k2": "MEET THE TRIBE",
    "k3": "You’ll know who is handling your files.",
    "k4": "Hometown Transaction Coordinators is a boutique Florida real estate support agency. Each agent works with an experienced Lead Transaction Coordinator who serves as their primary day-to-day contact. That Lead TC is backed by a Dedicated Hometown Team that uses people, systems, and technology to support the work behind the scenes and help keep files moving.",
    "k5": "BOOK A 15-MINUTE FIT CALL",
    "k6": "SEE HOW HTC WORKS",
    "k7": "1 Lead TC",
    "k8": "Main Point of Contact",
    "k9": "Dedicated Team",
    "k10": "Shared Support",
    "k11": "Tech-Enabled",
    "k12": "People + Systems + Technology",
    "k13": "Bilingual",
    "k14": "English + Spanish",
    "k15": "THE HTC PUBLIC MODEL",
    "k16": "Lead TC + Dedicated Hometown Team",
    "k17": "You get the personalized, high-touch care of a dedicated relationship coordinator combined with the operational stability of a Florida boutique agency.",
    "k18": "Your Lead Transaction Coordinator",
    "k19": "Direct phone, text, and email partner. Coordinates the communication and follow-up included in the service you selected.",
    "k20": "Dedicated Hometown Team",
    "k21": "People, systems, and technology working together through shared processes and cross-coverage to support the work behind your files.",
    "k22": "Founder Standards & Oversight",
    "k23": "Est. 2018",
    "k24": "Michelle Martinez sets operational standards and remains accessible whenever an agent or file requires escalation perspective.",
    "k25": "HTC OPERATIONS TEAM",
    "k26": "The people behind Hometown.",
    "k27": "Who they are and why you might see or hear from them across your account, training, and files.",
    "k28": "Hometown Team Synergy",
    "k29": "Dedicated Florida Transaction Coordinators & Operations Staff",
    "k30": "Boutique Agency Standards · English & Spanish Bilingual Support",
    "k31": "Founder + Owner",
    "k32": "Michelle founded HTC and sets the standard for how our team supports agents and their files.",
    "k33": "MEET MICHELLE",
    "k34": "Trainer",
    "k35": "Mary trains the HTC team on the H.O.M.E. standard and how we support our agents and their files.",
    "k36": "Operational Excellence & Team Training",
    "k37": "Bookkeeper",
    "k38": "Angela handles HTC’s accounts payable and receivable, managing accounting for the company.",
    "k39": "Accounts Payable & Receivable · Company Accounting",
    "k40": "Executive Assistant to Owner / Founder",
    "k41": "Christian assists Michelle Martinez in operational workflows, executive coordination, technology systems, and seamless project execution across HTC files.",
    "k42": "Operations, Systems & Executive Coordination",
    "k43": "HOW YOUR SUPPORT WORKS",
    "k44": "One point of contact. A Dedicated Hometown Team working the file.",
    "k45": "You’ll meet your Lead TC during Setup. They are your main point of contact, learn how you do business, and keep you connected to what is happening across your files.",
    "k46": "Behind that relationship is a tech-enabled HTC team working together to keep the administrative work organized and moving throughout the work you hire us to handle.",
    "k47": "LEAD TC",
    "k48": "THE RELATIONSHIP & EXECUTION MODEL",
    "k49": "How work moves between you and Hometown",
    "k50": "The Agent",
    "k51": "Client & File Owner",
    "k52": "Focus on clients, showings, negotiations, and growing your pipeline.",
    "k53": "Your Lead TC",
    "k54": "Learns your business and preferences, communicates with you, oversees the work, and surfaces items needing your attention.",
    "k55": "Dedicated Hometown Team + Systems",
    "k56": "Supporting The File",
    "k57": "People, systems, and technology working together with shared processes and cross-coverage.",
    "k58": "YOUR LEAD TC",
    "k59": "Your main day-to-day point of contact.",
    "k60": "Your Lead TC learns your business and preferences, communicates directly with you, oversees the work, and surfaces items needing your attention.",
    "k61": "Main day-to-day point of contact",
    "k62": "Learns your business and preferences",
    "k63": "Communicates with the agent and oversees the work",
    "k64": "Surfaces items needing the agent's attention",
    "k65": "YOUR DEDICATED HOMETOWN TEAM",
    "k66": "The team working behind the file.",
    "k67": "People + systems + technology supporting the work",
    "k68": "Built-in cross-coverage so another team member can step in when needed.",
    "k69": "Structured milestone tracking supported by shared HTC systems.",
    "k70": "SEE THE H.O.M.E. CLOSE METHOD",
    "k71": "YOUR DAY-TO-DAY",
    "k72": "You always know who to call.",
    "k73": "Your Lead TC is your main point of contact. You do not need to figure out who inside HTC handles which part of the file. Start with your Lead TC, and the HTC team takes it from there.",
    "k74": "“One relationship for you. A team behind it.”",
    "k75": "OUR PROMISE",
    "k76": "Collaborative. Predictable. Transparent.",
    "k77": "Every file we support is built around the same promise: work together, follow a clear process, and make it easy to see where things stand.",
    "k78": "Collaborative",
    "k79": "We work alongside you and the people involved in the transaction to keep the administrative pieces moving.",
    "k80": "True partnership with you & your partners",
    "k81": "Predictable",
    "k82": "Your file follows a structured HTC process, so you know how the work will move from one stage to the next.",
    "k83": "Repeatable, reliable stage progression",
    "k84": "Transparent",
    "k85": "You can see what is moving, what is outstanding, and when something needs your attention.",
    "k86": "Full visibility into timeline and action items",
    "k87": "Communication Standard",
    "k88": "Most requests are answered within one business hour. During high-volume days and peak season, please allow up to two business hours.",
    "k89": "FOUNDER-LED",
    "k90": "Experience is built into the team.",
    "k91": "Michelle Martinez founded HTC and sets the standards behind how our team supports agents and their files. Your Lead TC is your main point of contact, backed by the systems, team, and experience behind HTC.",
    "k92": "If something unusual comes up and the team needs a second set of experienced eyes, or you want to share feedback about your HTC experience, Michelle is available.",
    "k93": "Bilingual Transaction Support in English & Spanish",
    "k94": "HTC provides English + Spanish support for agents and transaction communication.",
    "k95": "VER HTC EN ESPAÑOL",
    "k96": "WORKING WITH YOUR HTC TEAM",
    "k97": "What agents usually want to know.",
    "k98": "Meet the people who will know your business.",
    "k99": "Start with a 15-Minute Fit Call. If HTC is the right fit, Setup is where we learn how you work and introduce you to the Lead TC who will become your day-to-day contact.",
    "k100": "Direct Office Line:",
    "k101": "· Monday–Friday · 9:00 AM–6:00 PM EST",
    "k102": "Meet the HTC Team",
    "k103": "Meet the HTC Team | Florida Transaction Coordinators",
    "k104": "Meet the team behind Hometown Transaction Coordinators and learn how Florida Realtors work with one experienced Lead TC backed by a Dedicated Hometown Team.",
    "k105": "Boutique Florida real estate support agency. Each agent works with an experienced Lead Transaction Coordinator who serves as their primary day-to-day contact, backed by a Dedicated Hometown Team.",
    "k106": "Who will I communicate with day to day?",
    "k107": "Your Lead TC. You’ll meet them during Setup, and they become your main HTC contact.",
    "k108": "What is a Dedicated Hometown Team?",
    "k109": "It’s the tech-enabled HTC team supporting the work behind your Lead TC to help keep your files organized and moving.",
    "k110": "Do I have to communicate with the whole team?",
    "k111": "No. Your Lead TC is your main point of contact. We coordinate the rest internally.",
    "k112": "What happens if my Lead TC is unavailable?",
    "k113": "Your Dedicated Hometown Team already supports the work, so if your Lead TC is temporarily unavailable, another team member familiar with the file can step in and help keep things moving without you starting over.",
    "k114": "Can I talk to Michelle?",
    "k115": "Yes. Your Lead TC handles the day-to-day, but Michelle is available if you want to share feedback or if something unusual needs her perspective.",
    "k116": "When do I meet my Lead TC?",
    "k117": "During Setup. Once we learn how you do business, we’ll introduce you to the Lead TC who will be your day-to-day HTC contact.",
    "k118": "Hometown Transaction Coordinators Dedicated Team",
    "k119": "Michelle Martinez — Founder + Owner",
    "k120": "Mary Martinez — Trainer",
    "k121": "Angela Paniagua — Bookkeeper",
    "k122": "Christian Hernandez — Executive Assistant to Owner / Founder"
  },
  "es": {
    "k0": "Inicio",
    "k1": "Conozca al Equipo",
    "k2": "CONOZCA AL EQUIPO",
    "k3": "Sabrá quién está manejando sus expedientes.",
    "k4": "Hometown Transaction Coordinators es una agencia boutique de apoyo inmobiliario en Florida. Cada agente trabaja con un Lead Transaction Coordinator con experiencia, que es su contacto principal en el día a día. Ese Lead TC cuenta con el respaldo de un equipo Hometown dedicado que usa personas, sistemas y tecnología para apoyar el trabajo detrás de escena y mantener los expedientes en marcha.",
    "k5": "AGENDAR LLAMADA DE 15 MINUTOS",
    "k6": "VEA CÓMO FUNCIONA HTC",
    "k7": "1 Lead TC",
    "k8": "Contacto principal",
    "k9": "Equipo dedicado",
    "k10": "Apoyo compartido",
    "k11": "Apoyado por tecnología",
    "k12": "Personas + sistemas + tecnología",
    "k13": "Bilingüe",
    "k14": "Inglés + Español",
    "k15": "EL MODELO HTC",
    "k16": "Lead TC + Equipo Hometown dedicado",
    "k17": "Recibe la atención personalizada y cercana de una coordinadora dedicada, con la estabilidad operativa de una agencia boutique en Florida.",
    "k18": "Su Lead Transaction Coordinator",
    "k19": "Su contacto directo por teléfono, texto y correo. Coordina la comunicación y el seguimiento incluidos en el servicio que eligió.",
    "k20": "Equipo Hometown dedicado",
    "k21": "Personas, sistemas y tecnología que trabajan juntos con procesos compartidos y cobertura cruzada para apoyar el trabajo detrás de sus expedientes.",
    "k22": "Estándares y supervisión de la fundadora",
    "k23": "Fundada en 2018",
    "k24": "Michelle Martinez establece los estándares operativos y está disponible cuando un agente o un expediente necesita su perspectiva.",
    "k25": "EQUIPO DE OPERACIONES HTC",
    "k26": "Las personas detrás de Hometown.",
    "k27": "Quiénes son y por qué podría verlos o saber de ellos en su cuenta, su capacitación y sus expedientes.",
    "k28": "La sinergia del equipo Hometown",
    "k29": "Transaction Coordinators y personal de operaciones dedicados en Florida",
    "k30": "Estándares de agencia boutique · Apoyo bilingüe en inglés y español",
    "k31": "Fundadora + Propietaria",
    "k32": "Michelle fundó HTC y establece el estándar de cómo nuestro equipo apoya a los agentes y sus expedientes.",
    "k33": "CONOZCA A MICHELLE",
    "k34": "Capacitadora",
    "k35": "Mary capacita al equipo HTC en el estándar H.O.M.E. y en cómo apoyamos a nuestros agentes y sus expedientes.",
    "k36": "Excelencia operativa y capacitación del equipo",
    "k37": "Contadora",
    "k38": "Angela maneja las cuentas por pagar y por cobrar de HTC y lleva la contabilidad de la empresa.",
    "k39": "Cuentas por pagar y por cobrar · Contabilidad de la empresa",
    "k40": "Asistente Ejecutivo de la Propietaria / Fundadora",
    "k41": "Christian apoya a Michelle Martinez en los flujos de trabajo operativos, la coordinación ejecutiva, los sistemas tecnológicos y la ejecución de proyectos en los expedientes de HTC.",
    "k42": "Operaciones, sistemas y coordinación ejecutiva",
    "k43": "CÓMO FUNCIONA SU APOYO",
    "k44": "Un solo punto de contacto. Un equipo Hometown dedicado trabajando el expediente.",
    "k45": "Conocerá a su Lead TC durante la configuración. Es su contacto principal, aprende cómo trabaja y lo mantiene al tanto de lo que pasa en sus expedientes.",
    "k46": "Detrás de esa relación hay un equipo HTC apoyado por tecnología que trabaja en conjunto para mantener el trabajo administrativo organizado y en marcha en todo lo que nos contrata.",
    "k47": "LEAD TC",
    "k48": "EL MODELO DE RELACIÓN Y EJECUCIÓN",
    "k49": "Cómo avanza el trabajo entre usted y Hometown",
    "k50": "El agente",
    "k51": "Dueño del cliente y del expediente",
    "k52": "Se enfoca en clientes, visitas, negociaciones y en hacer crecer su cartera.",
    "k53": "Su Lead TC",
    "k54": "Aprende su negocio y sus preferencias, se comunica con usted, supervisa el trabajo y le trae lo que requiere su atención.",
    "k55": "Equipo Hometown dedicado + sistemas",
    "k56": "Apoyando el expediente",
    "k57": "Personas, sistemas y tecnología trabajando juntos con procesos compartidos y cobertura cruzada.",
    "k58": "SU LEAD TC",
    "k59": "Su contacto principal en el día a día.",
    "k60": "Su Lead TC aprende su negocio y sus preferencias, se comunica directamente con usted, supervisa el trabajo y le trae lo que requiere su atención.",
    "k61": "Contacto principal en el día a día",
    "k62": "Aprende su negocio y sus preferencias",
    "k63": "Se comunica con el agente y supervisa el trabajo",
    "k64": "Le trae al agente lo que requiere su atención",
    "k65": "SU EQUIPO HOMETOWN DEDICADO",
    "k66": "El equipo que trabaja detrás del expediente.",
    "k67": "Personas + sistemas + tecnología apoyando el trabajo",
    "k68": "Cobertura cruzada para que otro miembro del equipo pueda intervenir cuando haga falta.",
    "k69": "Seguimiento estructurado de hitos con los sistemas compartidos de HTC.",
    "k70": "VER EL MÉTODO DE CIERRE H.O.M.E.",
    "k71": "SU DÍA A DÍA",
    "k72": "Siempre sabe a quién llamar.",
    "k73": "Su Lead TC es su contacto principal. No tiene que averiguar quién dentro de HTC maneja cada parte del expediente. Empiece con su Lead TC y el equipo HTC se encarga del resto.",
    "k74": "“Una sola relación para usted. Un equipo detrás.”",
    "k75": "NUESTRA PROMESA",
    "k76": "Colaborativos. Predecibles. Transparentes.",
    "k77": "Cada expediente que apoyamos se basa en la misma promesa: trabajar en equipo, seguir un proceso claro y facilitar que vea en qué punto está todo.",
    "k78": "Colaborativos",
    "k79": "Trabajamos junto a usted y a las personas involucradas en la transacción para mantener en marcha las piezas administrativas.",
    "k80": "Una verdadera alianza con usted y sus aliados",
    "k81": "Predecibles",
    "k82": "Su expediente sigue un proceso estructurado de HTC, así sabe cómo avanzará el trabajo de una etapa a la siguiente.",
    "k83": "Avance por etapas repetible y confiable",
    "k84": "Transparentes",
    "k85": "Puede ver qué está avanzando, qué está pendiente y cuándo algo necesita su atención.",
    "k86": "Visibilidad total del cronograma y los pendientes",
    "k87": "Estándar de comunicación",
    "k88": "La mayoría de las solicitudes se responden en una hora hábil. En días de mucho volumen y en temporada alta, permita hasta dos horas hábiles.",
    "k89": "LIDERADO POR LA FUNDADORA",
    "k90": "La experiencia está integrada en el equipo.",
    "k91": "Michelle Martinez fundó HTC y establece los estándares de cómo nuestro equipo apoya a los agentes y sus expedientes. Su Lead TC es su contacto principal, con el respaldo de los sistemas, el equipo y la experiencia de HTC.",
    "k92": "Si surge algo inusual y el equipo necesita una segunda mirada con experiencia, o si quiere compartir comentarios sobre su experiencia con HTC, Michelle está disponible.",
    "k93": "Apoyo bilingüe de transacciones en inglés y español",
    "k94": "HTC brinda apoyo en inglés + español para agentes y para la comunicación de la transacción.",
    "k95": "ESTÁ VIENDO HTC EN ESPAÑOL",
    "k96": "TRABAJANDO CON SU EQUIPO HTC",
    "k97": "Lo que los agentes suelen querer saber.",
    "k98": "Conozca a las personas que conocerán su negocio.",
    "k99": "Comience con una llamada de compatibilidad de 15 minutos. Si HTC es la opción adecuada, en la configuración aprendemos cómo trabaja y le presentamos al Lead TC que será su contacto diario.",
    "k100": "Línea directa de la oficina:",
    "k101": "· Lunes a Viernes · 9:00 AM–6:00 PM EST",
    "k102": "Conozca al equipo HTC",
    "k103": "Conozca al Equipo HTC | Transaction Coordinators en Florida",
    "k104": "Conozca al equipo detrás de Hometown Transaction Coordinators y cómo los Realtors en Florida trabajan con un Lead TC con experiencia, respaldado por un equipo Hometown dedicado.",
    "k105": "Agencia boutique de apoyo inmobiliario en Florida. Cada agente trabaja con un Lead Transaction Coordinator con experiencia, que es su contacto principal en el día a día, respaldado por un equipo Hometown dedicado.",
    "k106": "¿Con quién me comunico en el día a día?",
    "k107": "Con su Lead TC. Lo conocerá durante la configuración y será su contacto principal en HTC.",
    "k108": "¿Qué es un equipo Hometown dedicado?",
    "k109": "Es el equipo HTC, apoyado por tecnología, que respalda el trabajo detrás de su Lead TC para mantener sus expedientes organizados y en marcha.",
    "k110": "¿Tengo que comunicarme con todo el equipo?",
    "k111": "No. Su Lead TC es su contacto principal. Nosotros coordinamos el resto internamente.",
    "k112": "¿Qué pasa si mi Lead TC no está disponible?",
    "k113": "Su equipo Hometown dedicado ya apoya el trabajo, así que si su Lead TC no está disponible por un tiempo, otro miembro del equipo que conoce el expediente puede intervenir y mantener todo en marcha sin que usted tenga que empezar de nuevo.",
    "k114": "¿Puedo hablar con Michelle?",
    "k115": "Sí. Su Lead TC maneja el día a día, pero Michelle está disponible si quiere compartir comentarios o si algo inusual necesita su perspectiva.",
    "k116": "¿Cuándo conozco a mi Lead TC?",
    "k117": "Durante la configuración. Cuando conocemos cómo trabaja, le presentamos al Lead TC que será su contacto diario en HTC.",
    "k118": "Equipo dedicado de Hometown Transaction Coordinators",
    "k119": "Michelle Martinez, Fundadora + Propietaria",
    "k120": "Mary Martinez, Capacitadora",
    "k121": "Angela Paniagua, Contadora",
    "k122": "Christian Hernandez, Asistente Ejecutivo de la Propietaria / Fundadora"
  }
} as const;

import {
  ArrowRight,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  Sparkles,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Clock,
  Heart,
  Globe2,
  Star,
  FileCheck2,
  User
} from 'lucide-react';
import {
  PHONE_NUMBER,
  MEET_MICHELLE_IMAGE,
  MICHELLE_TEAM_PROFILE_IMAGE,
  TEAM_PHOTO_IMAGE,
  CHRISTIAN_HERNANDEZ_IMAGE,
  ANGELA_PANIAGUA_IMAGE,
  MARY_MARTINEZ_IMAGE,
  FOUNDER_IMAGE
} from '../data/content';

interface Props {
  onBookCall: () => void;
  onSubmitDeal?: () => void;
  onExploreServices?: () => void;
  onOpenPricing?: () => void;
  onOpenTransactionCoordination?: () => void;
  onOpenListingCoordination?: () => void;
  onOpenFaq?: () => void;
  onGoHome: () => void;
  onOpenHowItWorks: () => void;
  onOpenAboutMichelle: () => void;
  onOpenWhyHtc: () => void;
  onOpenSpanish?: () => void;
  language?: Language;
  onOpenReviews?: () => void;
}

export const MeetTheTribePage: React.FC<Props> = ({
  onBookCall,
  onSubmitDeal,
  onExploreServices,
  onOpenPricing,
  onOpenTransactionCoordination,
  onOpenListingCoordination,
  onOpenFaq,
  onGoHome,
  onOpenHowItWorks,
  onOpenAboutMichelle,
  onOpenWhyHtc,
  onOpenSpanish,
  onOpenReviews,
  language = 'en'
}) => {
  const t = COPY[language];
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // SEO & AEO title and description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = t.k103;

    let metaDesc = document.querySelector('meta[name="description"]');
    const originalMetaContent = metaDesc ? metaDesc.getAttribute('content') : '';
    const targetMetaContent =
      t.k104;

    if (metaDesc) {
      metaDesc.setAttribute('content', targetMetaContent);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('content', targetMetaContent);
      document.head.appendChild(metaDesc);
    }

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalMetaContent) {
        metaDesc.setAttribute('content', originalMetaContent);
      }
    };
  }, [language]);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t.k0,
        item: 'https://hometowntc.com/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t.k102,
        item: 'https://hometowntc.com/team/'
      }
    ]
  };

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: t.k103,
    description:
      t.k104,
    url: 'https://hometowntc.com/team/'
  };

  const teamOrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hometown Transaction Coordinators',
    alternateName: 'HTC',
    url: 'https://hometowntc.com',
    description:
      t.k105,
    member: [
      {
        '@type': 'Person',
        name: 'Michelle Martinez',
        jobTitle: t.k31,
        worksFor: {
          '@type': 'Organization',
          name: 'Hometown Transaction Coordinators'
        }
      },
      {
        '@type': 'Person',
        name: 'Mary Martinez',
        jobTitle: t.k34,
        worksFor: {
          '@type': 'Organization',
          name: 'Hometown Transaction Coordinators'
        }
      },
      {
        '@type': 'Person',
        name: 'Angela Paniagua',
        jobTitle: t.k37,
        worksFor: {
          '@type': 'Organization',
          name: 'Hometown Transaction Coordinators'
        }
      },
      {
        '@type': 'Person',
        name: 'Christian Hernandez',
        jobTitle: t.k40,
        worksFor: {
          '@type': 'Organization',
          name: 'Hometown Transaction Coordinators'
        }
      }
    ]
  };

  const teamFaqs = [
    {
      id: 'who-communicate',
      q: t.k106,
      a: t.k107
    },
    {
      id: 'what-is-dedicated-team',
      q: t.k108,
      a: t.k109
    },
    {
      id: 'communicate-whole-team',
      q: t.k110,
      a: t.k111
    },
    {
      id: 'lead-tc-unavailable',
      q: t.k112,
      a: t.k113
    },
    {
      id: 'talk-to-michelle',
      q: t.k114,
      a: t.k115,
      linkText: 'MEET MICHELLE →',
      linkAction: 'about'
    },
    {
      id: 'when-meet-lead-tc',
      q: t.k116,
      a: t.k117,
      linkText: 'SEE HOW SETUP WORKS →',
      linkAction: 'how-it-works-setup'
    }
  ];

  return (
    <main className="bg-[#EEEAEB] text-[#3A2E29] min-h-screen">
      {/* Schema.org Breadcrumb, AboutPage, Organization/Person, and FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamOrganizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: teamFaqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a
              }
            }))
          })
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 1 — HERO */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-white border-b border-[#D8D2D4] pt-12 pb-16 sm:pt-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-semibold text-[#075960] tracking-widest uppercase">
            <button
              onClick={onGoHome}
              className="hover:text-[#3A2E29] transition cursor-pointer"
            >
              {t.k0}
            </button>
            <span className="text-[#D8D2D4]">/</span>
            <span className="text-[#3A2E29]">{t.k1}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Core Headline & Intro */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Category Pill */}
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-[#EEEAEB] px-3.5 py-1.5 rounded-full border border-[#D8D2D4]">
                <Users className="w-3.5 h-3.5 text-[#C84600]" />
                <span>{t.k2}</span>
              </div>

              {/* H1 Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight leading-[1.15]">
                {t.k3}
              </h1>

              {/* Subheading Body / Primary AEO Answer */}
              <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed max-w-2xl">
                {t.k4}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onBookCall}
                  className="bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition flex items-center justify-center space-x-2 cursor-pointer group"
                >
                  <PhoneCall className="w-4 h-4 text-[#1A1412]" />
                  <span>{t.k5}</span>
                  <ArrowRight className="w-4 h-4 text-[#1A1412] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onOpenHowItWorks}
                  className="inline-flex items-center justify-center space-x-1.5 text-[#075960] hover:text-[#053d42] font-bold text-sm uppercase tracking-wider transition py-2 cursor-pointer group underline underline-offset-4"
                >
                  <span>{t.k6}</span>
                  <ArrowRight className="w-4 h-4 text-[#075960] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* 4 Fast Facts Badges */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-[#D8D2D4]/60 text-xs">
                <div className="space-y-0.5">
                  <div className="font-extrabold text-[#3A2E29]">{t.k7}</div>
                  <div className="text-slate-500 text-[11px]">{t.k8}</div>
                </div>
                <div className="space-y-0.5">
                  <div className="font-extrabold text-[#075960]">{t.k9}</div>
                  <div className="text-slate-500 text-[11px]">{t.k10}</div>
                </div>
                <div className="space-y-0.5">
                  <div className="font-extrabold text-[#3A2E29]">{t.k11}</div>
                  <div className="text-slate-500 text-[11px]">{t.k12}</div>
                </div>
                <div className="space-y-0.5">
                  <div className="font-extrabold text-[#C84600]">{t.k13}</div>
                  <div className="text-slate-500 text-[11px]">{t.k14}</div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="bg-[#EEEAEB] rounded-3xl p-6 sm:p-8 border border-[#D8D2D4] space-y-6">
                
                <div className="space-y-2">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#075960]">
                    {t.k15}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#3A2E29] font-serif">
                    {t.k16}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {t.k17}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {/* Lead TC Card */}
                  <div className="bg-white p-4 rounded-2xl border border-[#075960]/40 space-y-1.5">
                    <div className="flex items-center space-x-2 text-xs font-bold text-[#075960] uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-[#C84600]" />
                      <span>{t.k18}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-normal">
                      {t.k19}
                    </p>
                  </div>

                  {/* Hometown Team Card */}
                  <div className="bg-white p-4 rounded-2xl border border-[#D8D2D4] space-y-1.5">
                    <div className="flex items-center space-x-2 text-xs font-bold text-[#3A2E29] uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4 text-[#075960]" />
                      <span>{t.k20}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-normal">
                      {t.k21}
                    </p>
                  </div>

                  {/* Leadership Card */}
                  <div className="bg-[#3A2E29] text-white p-4 rounded-2xl border border-white/10 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs font-bold text-[#20C5D2] uppercase tracking-wider">
                        <Award className="w-4 h-4 text-[#FE7311]" />
                        <span>{t.k22}</span>
                      </div>
                      <span className="text-[10px] text-slate-300">{t.k23}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-normal">
                      {t.k24}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 2 — THE PEOPLE BEHIND HOMETOWN (OPERATIONS TEAM) */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-[#EEEAEB] border-b border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-white px-3.5 py-1.5 rounded-full border border-[#D8D2D4]">
              <Users className="w-3.5 h-3.5 text-[#C84600]" />
              <span>{t.k25}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3A2E29] font-serif leading-tight">
              {t.k26}
            </h2>
            <p className="text-base text-slate-700 font-normal leading-relaxed">
              {t.k27}
            </p>
          </div>

          {/* Full Hometown Team Photo Banner */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#D8D2D4] shadow-lg bg-[#1A1412]">
            <img
              src={TEAM_PHOTO_IMAGE}
              alt={t.k118}
              className="w-full h-auto block object-contain mx-auto"
              loading="eager"
            />
            <div className="p-4 sm:p-6 bg-white border-t border-[#D8D2D4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="text-xs font-extrabold text-[#075960] uppercase tracking-wider">{t.k28}</div>
                <div className="text-sm font-bold text-[#3A2E29] font-serif">{t.k29}</div>
              </div>
              <span className="text-xs text-slate-600 font-medium">{t.k30}</span>
            </div>
          </div>

          {/* 4 Operations Profiles: 4 across desktop, 2x2 tablet, stacked on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Profile 1: Michelle Martinez */}
            <div className="bg-white rounded-3xl p-6 border border-[#D8D2D4] shadow-sm flex flex-col justify-between space-y-4 transition hover:shadow-md hover:border-[#075960]/40">
              <div className="space-y-4">
                <div className="relative w-full aspect-[4/5] max-w-[220px] mx-auto overflow-hidden rounded-2xl border-2 border-[#D8D2D4] bg-[#1A1412]">
                  <img
                    src={MICHELLE_TEAM_PROFILE_IMAGE}
                    alt={t.k119}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-[#3A2E29] font-serif">
                    Michelle Martinez
                  </h3>
                  <div className="text-xs font-extrabold text-[#075960] uppercase tracking-wider">
                    {t.k31}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal pt-1">
                    {t.k32}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#D8D2D4]/60">
                <button
                  onClick={onOpenAboutMichelle}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#075960] hover:text-[#053d42] transition cursor-pointer group"
                >
                  <span>{t.k33}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Profile 2: Mary Martinez */}
            <div className="bg-white rounded-3xl p-6 border border-[#D8D2D4] shadow-sm flex flex-col justify-between space-y-4 transition hover:shadow-md hover:border-[#075960]/40">
              <div className="space-y-4">
                <div className="relative w-full aspect-[4/5] max-w-[220px] mx-auto overflow-hidden rounded-2xl border-2 border-[#D8D2D4] bg-[#1A1412]">
                  <img
                    src={MARY_MARTINEZ_IMAGE}
                    alt={t.k120}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-[#3A2E29] font-serif">
                    Mary Martinez
                  </h3>
                  <div className="text-xs font-extrabold text-[#075960] uppercase tracking-wider">
                    {t.k34}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal pt-1">
                    {t.k35}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#D8D2D4]/60 text-[11px] font-semibold text-slate-500">
                {t.k36}
              </div>
            </div>

            {/* Profile 3: Angela Paniagua */}
            <div className="bg-white rounded-3xl p-6 border border-[#D8D2D4] shadow-sm flex flex-col justify-between space-y-4 transition hover:shadow-md hover:border-[#075960]/40">
              <div className="space-y-4">
                <div className="relative w-full aspect-[4/5] max-w-[220px] mx-auto overflow-hidden rounded-2xl border-2 border-[#D8D2D4] bg-[#1A1412]">
                  <img
                    src={ANGELA_PANIAGUA_IMAGE}
                    alt={t.k121}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-[#3A2E29] font-serif">
                    Angela Paniagua
                  </h3>
                  <div className="text-xs font-extrabold text-[#075960] uppercase tracking-wider">
                    {t.k37}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal pt-1">
                    {t.k38}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#D8D2D4]/60 text-[11px] font-semibold text-slate-500">
                {t.k39}
              </div>
            </div>

            {/* Profile 4: Christian Hernandez */}
            <div className="bg-white rounded-3xl p-6 border border-[#D8D2D4] shadow-sm flex flex-col justify-between space-y-4 transition hover:shadow-md hover:border-[#075960]/40">
              <div className="space-y-4">
                <div className="relative w-full aspect-[4/5] max-w-[220px] mx-auto overflow-hidden rounded-2xl border-2 border-[#D8D2D4] bg-[#1A1412]">
                  <img
                    src={CHRISTIAN_HERNANDEZ_IMAGE}
                    alt={t.k122}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-[#3A2E29] font-serif">
                    Christian Hernandez
                  </h3>
                  <div className="text-xs font-extrabold text-[#075960] uppercase tracking-wider">
                    {t.k40}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal pt-1">
                    {t.k41}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#D8D2D4]/60 text-[11px] font-semibold text-slate-500">
                {t.k42}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 3 — YOUR DEDICATED HOMETOWN TEAM */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-[#EEEAEB] px-3.5 py-1.5 rounded-full border border-[#D8D2D4]">
              <Layers className="w-3.5 h-3.5 text-[#C84600]" />
              <span>{t.k43}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3A2E29] font-serif leading-tight">
              {t.k44}
            </h2>
            <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
              {t.k45}
            </p>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              {t.k46}
            </p>
          </div>

          {/* VISUAL ARCHITECTURE DIAGRAM: YOU <-> {t.k47} <-> HTC TEAM + SYSTEMS */}
          <div className="bg-[#EEEAEB] rounded-3xl p-6 sm:p-10 border border-[#D8D2D4] shadow-xs space-y-8">
            <div className="text-center space-y-1">
              <div className="text-xs font-extrabold uppercase tracking-widest text-[#075960]">
                {t.k48}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#3A2E29] font-serif">
                {t.k49}
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 lg:gap-2 items-center">
              
              {/* Box 1: The Agent */}
              <div className="lg:col-span-3 bg-white rounded-2xl p-6 border-2 border-[#D8D2D4] text-center space-y-3 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-[#075960]/10 text-[#075960] mx-auto flex items-center justify-center">
                  <User className="w-6 h-6 text-[#075960]" />
                </div>
                <div className="space-y-1">
                  <div className="text-base font-bold text-[#3A2E29] font-serif">{t.k50}</div>
                  <div className="text-xs text-[#075960] font-extrabold uppercase tracking-wider">{t.k51}</div>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  {t.k52}
                </p>
              </div>

              {/* Connector 1: Bi-directional Arrow */}
              <div className="lg:col-span-1 flex items-center justify-center py-2 lg:py-0">
                <div className="flex lg:flex-row flex-col items-center justify-center gap-1 text-[#075960] font-extrabold text-xs">
                  <div className="hidden lg:flex items-center space-x-1">
                    <span className="text-lg">◀</span>
                    <div className="h-0.5 w-6 bg-[#075960]"></div>
                    <span className="text-lg">▶</span>
                  </div>
                  <div className="flex lg:hidden flex-col items-center">
                    <span className="text-sm">▲</span>
                    <div className="w-0.5 h-6 bg-[#075960]"></div>
                    <span className="text-sm">▼</span>
                  </div>
                </div>
              </div>

              {/* Box 2: YOUR LEAD TC */}
              <div className="lg:col-span-3 bg-white rounded-2xl p-6 border-2 border-[#075960] text-center space-y-3 shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#075960]"></div>
                <div className="w-12 h-12 rounded-xl bg-[#075960]/10 text-[#075960] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#075960]" />
                </div>
                <div className="space-y-1">
                  <div className="text-base font-bold text-[#3A2E29] font-serif">{t.k53}</div>
                  <div className="text-xs text-[#075960] font-extrabold uppercase tracking-wider">{t.k8}</div>
                </div>
                <p className="text-xs text-slate-700 leading-normal font-medium">
                  {t.k54}
                </p>
              </div>

              {/* Connector 2: Bi-directional Arrow */}
              <div className="lg:col-span-1 flex items-center justify-center py-2 lg:py-0">
                <div className="flex lg:flex-row flex-col items-center justify-center gap-1 text-[#075960] font-extrabold text-xs">
                  <div className="hidden lg:flex items-center space-x-1">
                    <span className="text-lg">◀</span>
                    <div className="h-0.5 w-6 bg-[#075960]"></div>
                    <span className="text-lg">▶</span>
                  </div>
                  <div className="flex lg:hidden flex-col items-center">
                    <span className="text-sm">▲</span>
                    <div className="w-0.5 h-6 bg-[#075960]"></div>
                    <span className="text-sm">▼</span>
                  </div>
                </div>
              </div>

              {/* Box 3: DEDICATED HOMETOWN TEAM + SYSTEMS */}
              <div className="lg:col-span-3 bg-white rounded-2xl p-6 border-2 border-[#D8D2D4] text-center space-y-3 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-[#C84600]/10 text-[#C84600] mx-auto flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-[#C84600]" />
                </div>
                <div className="space-y-1">
                  <div className="text-base font-bold text-[#3A2E29] font-serif">{t.k55}</div>
                  <div className="text-xs text-[#C84600] font-extrabold uppercase tracking-wider">{t.k56}</div>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  {t.k57}
                </p>
              </div>

            </div>
          </div>

          {/* TWO MAIN COLUMN CARDS: YOUR LEAD TC vs YOUR DEDICATED HOMETOWN TEAM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: YOUR LEAD TC */}
            <div className="bg-[#EEEAEB] rounded-3xl p-8 border border-[#D8D2D4] space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-[#075960] bg-white px-3 py-1 rounded-full border border-[#D8D2D4]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C84600]" />
                  <span>{t.k58}</span>
                </div>
                <h3 className="text-2xl font-bold text-[#3A2E29] font-serif">
                  {t.k59}
                </h3>
                <p className="text-sm text-slate-700 font-normal leading-relaxed">
                  {t.k60}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D8D2D4] space-y-2 text-xs text-slate-700">
                <div className="flex items-center space-x-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#075960] flex-shrink-0" />
                  <span>{t.k61}</span>
                </div>
                <div className="flex items-center space-x-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#075960] flex-shrink-0" />
                  <span>{t.k62}</span>
                </div>
                <div className="flex items-center space-x-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#075960] flex-shrink-0" />
                  <span>{t.k63}</span>
                </div>
                <div className="flex items-center space-x-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#075960] flex-shrink-0" />
                  <span>{t.k64}</span>
                </div>
              </div>
            </div>

            {/* Card 2: YOUR DEDICATED HOMETOWN TEAM */}
            <div className="bg-[#EEEAEB] rounded-3xl p-8 border border-[#D8D2D4] space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-[#075960] bg-white px-3 py-1 rounded-full border border-[#D8D2D4]">
                  <Users className="w-3.5 h-3.5 text-[#C84600]" />
                  <span>{t.k65}</span>
                </div>
                <h3 className="text-2xl font-bold text-[#3A2E29] font-serif">
                  {t.k66}
                </h3>
                <p className="text-sm text-slate-700 font-normal leading-relaxed">
                  {t.k21}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D8D2D4] space-y-2 text-xs text-slate-700">
                <div className="flex items-center space-x-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#075960] flex-shrink-0" />
                  <span>{t.k67}</span>
                </div>
                <div className="flex items-center space-x-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#075960] flex-shrink-0" />
                  <span>{t.k68}</span>
                </div>
                <div className="flex items-center space-x-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#075960] flex-shrink-0" />
                  <span>{t.k69}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Link to H.O.M.E. Close Method */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={onOpenHowItWorks}
              className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#075960] hover:text-[#053d42] transition cursor-pointer group underline underline-offset-4"
            >
              <span>{t.k70}</span>
              <ArrowRight className="w-4 h-4 text-[#075960] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 4 — YOUR DAY-TO-DAY */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 sm:py-28 bg-[#EEEAEB] border-b border-[#D8D2D4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-center sm:text-left">
            
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-white px-3.5 py-1.5 rounded-full border border-[#D8D2D4]">
              <PhoneCall className="w-3.5 h-3.5 text-[#C84600]" />
              <span>{t.k71}</span>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight leading-tight">
                {t.k72}
              </h2>

              <p className="text-lg sm:text-xl text-slate-700 font-normal leading-relaxed">
                {t.k73}
              </p>
            </div>

            <div className="pt-4 sm:pt-6 border-t border-[#D8D2D4]">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#075960] font-serif italic">
                {t.k74}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 5 — OUR PROMISE */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-[#EEEAEB] px-3.5 py-1.5 rounded-full border border-[#D8D2D4]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C84600]" />
              <span>{t.k75}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif leading-tight">
              {t.k76}
            </h2>
            <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
              {t.k77}
            </p>
          </div>

          {/* 3 Core Experience Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1: Collaborative */}
            <div className="bg-[#EEEAEB] rounded-3xl p-8 border border-[#D8D2D4] space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white text-[#075960] flex items-center justify-center font-serif font-extrabold text-lg border border-[#D8D2D4]">
                  01
                </div>
                <h3 className="text-2xl font-bold text-[#3A2E29] font-serif">
                  {t.k78}
                </h3>
                <p className="text-sm text-slate-700 font-normal leading-relaxed">
                  {t.k79}
                </p>
              </div>
              <div className="pt-4 border-t border-[#D8D2D4] text-xs font-bold text-[#075960] flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C84600]" />
                <span>{t.k80}</span>
              </div>
            </div>

            {/* Pillar 2: Predictable */}
            <div className="bg-[#EEEAEB] rounded-3xl p-8 border border-[#D8D2D4] space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white text-[#075960] flex items-center justify-center font-serif font-extrabold text-lg border border-[#D8D2D4]">
                  02
                </div>
                <h3 className="text-2xl font-bold text-[#3A2E29] font-serif">
                  {t.k81}
                </h3>
                <p className="text-sm text-slate-700 font-normal leading-relaxed">
                  {t.k82}
                </p>
              </div>
              <div className="pt-4 border-t border-[#D8D2D4] text-xs font-bold text-[#075960] flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C84600]" />
                <span>{t.k83}</span>
              </div>
            </div>

            {/* Pillar 3: Transparent */}
            <div className="bg-[#EEEAEB] rounded-3xl p-8 border border-[#D8D2D4] space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white text-[#075960] flex items-center justify-center font-serif font-extrabold text-lg border border-[#D8D2D4]">
                  03
                </div>
                <h3 className="text-2xl font-bold text-[#3A2E29] font-serif">
                  {t.k84}
                </h3>
                <p className="text-sm text-slate-700 font-normal leading-relaxed">
                  {t.k85}
                </p>
              </div>
              <div className="pt-4 border-t border-[#D8D2D4] text-xs font-bold text-[#075960] flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C84600]" />
                <span>{t.k86}</span>
              </div>
            </div>

          </div>

          {/* Supporting Information: Communication Standard */}
          <div className="bg-[#EEEAEB] rounded-3xl p-6 sm:p-8 border border-[#D8D2D4] flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#075960] flex items-center justify-center flex-shrink-0 border border-[#D8D2D4]">
              <Clock className="w-6 h-6 text-[#075960]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#3A2E29]">
                {t.k87}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {t.k88}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 6 — FOUNDER-LED, TEAM-DELIVERED */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-[#EEEAEB] border-b border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D8D2D4] shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Michelle's Portrait */}
              <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border-2 border-[#D8D2D4] shadow-xs">
                  <img
                    src={MICHELLE_TEAM_PROFILE_IMAGE}
                    alt={t.k119}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-0.5">
                  <div className="text-lg font-bold text-[#3A2E29] font-serif">
                    Michelle Martinez
                  </div>
                  <div className="text-xs font-bold text-[#075960] uppercase tracking-wider">
                    {t.k31}
                  </div>
                </div>
              </div>

              {/* Founder-Led Content */}
              <div className="md:col-span-8 space-y-6">
                <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-[#EEEAEB] px-3.5 py-1.5 rounded-full border border-[#D8D2D4]">
                  <Award className="w-3.5 h-3.5 text-[#C84600]" />
                  <span>{t.k89}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#3A2E29] font-serif leading-tight">
                  {t.k90}
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
                  <p>
                    {t.k91}
                  </p>
                  <p>
                    {t.k92}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenAboutMichelle}
                    className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#075960] hover:text-[#053d42] transition cursor-pointer group underline underline-offset-4"
                  >
                    <span>{t.k33}</span>
                    <ArrowRight className="w-4 h-4 text-[#075960] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* BILINGUAL SUPPORT */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#EEEAEB] p-6 sm:p-8 rounded-3xl border border-[#D8D2D4] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-[#075960]/10 text-[#075960] flex items-center justify-center flex-shrink-0">
                <Globe2 className="w-6 h-6 text-[#075960]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-bold text-[#3A2E29] font-serif">
                  {t.k93}
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 font-normal">
                  {t.k94}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (onOpenSpanish) {
                  onOpenSpanish();
                } else {
                  window.location.hash = '#/es/';
                }
              }}
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#075960] hover:text-[#053d42] transition flex-shrink-0 cursor-pointer group underline underline-offset-4"
            >
              <span>{t.k95}</span>
              <ArrowRight className="w-4 h-4 text-[#075960] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 7 — FAQ */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-[#EEEAEB] border-b border-[#D8D2D4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center sm:text-left space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-white px-3.5 py-1.5 rounded-full border border-[#D8D2D4]">
              <MessageSquare className="w-3.5 h-3.5 text-[#C84600]" />
              <span>{t.k96}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif leading-tight">
              {t.k97}
            </h2>
          </div>

          <div className="space-y-4">
            {teamFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={faq.id || idx}
                  className="bg-white rounded-2xl border border-[#D8D2D4] overflow-hidden transition shadow-2xs"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-[#3A2E29] hover:text-[#075960] transition cursor-pointer font-serif"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#C84600] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm sm:text-base text-slate-700 font-normal leading-relaxed border-t border-[#D8D2D4]/50 pt-4 bg-white space-y-3">
                      <p>{faq.a}</p>
                      {faq.linkAction === 'about' && (
                        <div>
                          <button
                            onClick={onOpenAboutMichelle}
                            className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#075960] hover:text-[#053d42] transition cursor-pointer group underline underline-offset-4"
                          >
                            <span>{faq.linkText}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#075960] group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      )}
                      {faq.linkAction === 'how-it-works-setup' && (
                        <div>
                          <button
                            onClick={onOpenHowItWorks}
                            className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#075960] hover:text-[#053d42] transition cursor-pointer group underline underline-offset-4"
                          >
                            <span>{faq.linkText}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#075960] group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 8 — FINAL CTA */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 sm:py-28 bg-white border-t border-[#D8D2D4] text-[#3A2E29]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight leading-tight max-w-3xl mx-auto">
            {t.k98}
          </h2>

          <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed font-normal">
            {t.k99}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={onBookCall}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition cursor-pointer group"
            >
              <PhoneCall className="w-4 h-4 text-[#1A1412]" />
              <span>{t.k5}</span>
              <ArrowRight className="w-4 h-4 text-[#1A1412] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenHowItWorks}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#EEEAEB] hover:bg-[#D8D2D4]/70 text-[#3A2E29] px-7 py-4 rounded-xl font-bold text-sm uppercase tracking-wider border border-[#D8D2D4] transition cursor-pointer group"
            >
              <span>{t.k6}</span>
              <ArrowRight className="w-4 h-4 text-[#3A2E29] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="pt-2 text-xs text-slate-500 font-normal">
            {t.k100} <a href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`} className="text-[#3A2E29] font-bold hover:underline">{PHONE_NUMBER}</a> {t.k101}
          </div>

        </div>
      </section>

    </main>
  );
};
