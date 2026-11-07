import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  PhoneCall,
  Star,
  ChevronDown,
  ChevronUp,
  FileText,
  Play,
  Volume2,
  VolumeX,
  CheckCircle2,
  Globe2,
  MapPin,
  Building2,
  Compass
} from 'lucide-react';
import { PHONE_NUMBER } from '../data/content';
import { FloridaClosedDealsHeatMap } from './FloridaClosedDealsHeatMap';
import type { Language } from '../types';

const COPY = {
  "en": {
    "k0": "Home",
    "k1": "Why HTC",
    "k2": "WHY HTC",
    "k3": "Built around your business. Backed by experience.",
    "k4": "Hometown Transaction Coordinators is a boutique Florida real estate support agency built for Realtors who want experienced people, a dependable team, and support that reflects the way they actually do business.",
    "k5": "BOOK A 15-MINUTE FIT CALL",
    "k6": "SEE HOW HTC WORKS",
    "k7": "Since 1995",
    "k8": "Michelle serving Realtors",
    "k9": "Est. 2018",
    "k10": "HTC agency founded",
    "k11": "Transactions personally processed by our founder",
    "k12": "Bilingual",
    "k13": "English + Spanish support",
    "k14": "THE HTC STANDARD",
    "k15": "Not all transaction support is built the same.",
    "k16": "The difference is not a longer checklist. It is the experience, structure and care behind how the work gets done.",
    "k17": "CORE PILLAR",
    "k18": "Experience Comes First",
    "k19": "Technology helps us work efficiently, but it does not replace the experience behind the work. HTC combines established workflows with experienced human review, communication and follow-through.",
    "k20": "Your Business Is Not a Template",
    "k21": "We have HTC defaults when you need them, but we do not assume every real estate business works the same way. Your brokerage requirements, templates, communication preferences and unique client touches are built into your Setup so the support feels like an extension of your business.",
    "k22": "Boutique by Design",
    "k23": "HTC gives you the relationship and personal attention of a boutique company with the structure of a team behind it. Your business does not have to depend on one person remembering how you like things done. Your setup and standards become part of the way HTC supports your files.",
    "k24": "MEET THE HTC TEAM",
    "k25": "Florida Is Our Lane",
    "k26": "HTC was built around supporting Florida real estate professionals. Our transaction workflows, forms, brokerage requirements and training are designed around the work Florida Realtors handle every day.",
    "k27": "BUILT AROUND YOU",
    "k28": "We learn how you work before we work your files.",
    "k29": "We can absolutely support a business using HTC defaults. But real estate businesses are not all the same.",
    "k30": "During Setup, we bring your brokerage requirements, templates, communication preferences and client touches into our workflow. That intentional work upfront allows future files to plug into a system already built around the way you do business.",
    "k31": "Set it up once. Carry your standard forward.",
    "k32": "SEE HOW GETTING STARTED WORKS",
    "k33": "YOUR BUSINESS ARCHITECTURE",
    "k34": "Your Brokerage",
    "k35": "Your Templates",
    "k36": "Your Communication",
    "k37": "Your Client Touches",
    "k38": "integrated seamlessly",
    "k39": "THE RESULT",
    "k40": "Built directly into the HTC workflow.",
    "k41": "Your preferences and requirements become part of the HTC workflow so future files can be supported more consistently.",
    "k42": "OUR STANDARD",
    "k43": "Protect the Agent. Protect the Broker. Protect the Client.",
    "k44": "Protect the Agent",
    "k45": "Keep the administrative work organized, the written trail clear, and anything requiring the agent’s attention visible.",
    "k46": "Protect the Broker",
    "k47": "Work within the brokerage’s file requirements and help maintain an organized transaction record for review.",
    "k48": "Protect the Client",
    "k49": "Support a professional, organized experience with communication and follow-through appropriate to the service selected.",
    "k50": "SUPPORT THAT CAN GROW WITH YOU",
    "k51": "One relationship. More ways to use it.",
    "k52": "Your support needs may change as your business changes. HTC can meet you at different points in the work — from getting a listing ready to launch, to managing a contract through Post-Close, to brokerage compliance and customized team support.",
    "k53": "CORE TRANSACTION LIFECYCLE",
    "k54": "Listing Launch",
    "k55": "Contract-to-Close",
    "k56": "Post-Close",
    "k57": "Broker Compliance",
    "k58": "Teams + Brokerages",
    "k59": "Staff Training",
    "k60": "EXPLORE SERVICES + PRICING",
    "k61": "FLORIDA CLOSED-DEAL HEAT MAP",
    "k62": "Files worked across Florida markets.",
    "k63": "Aggregated transaction volume (in process and closed) based on real transaction data. Shaded by county intensity with top municipal file counts.",
    "k64": "Verified Transaction Data",
    "k65": "Aggregated from HTC transaction records by Florida county and municipality. Shading and municipal counts read directly from the dataset.",
    "k66": "Strict Client Privacy",
    "k67": "Counts are strictly aggregated by county and city. Areas with fewer than 5 files are protected. No property-level pins or addresses.",
    "k68": "BILINGUAL SUPPORT",
    "k69": "Communication that feels comfortable.",
    "k70": "HTC supports real estate communication in English and Spanish, helping agents serve clients and transaction parties in the language that works best for the conversation.",
    "k71": "Professional bilingual coordination across Florida buyers, sellers, cooperating agents, and title teams.",
    "k72": "VER HTC EN ESPAÑOL",
    "k73": "FROM THE AGENTS WE SUPPORT",
    "k74": "The work should speak for itself.",
    "k75": "READ MORE AGENT REVIEWS",
    "k76": "WHY HTC · FAQ",
    "k77": "A few things you may want to know.",
    "k78": "Still deciding if HTC is right for you?",
    "k79": "Book a 15-Minute Fit Call. We’ll learn how you work, what you need, and determine whether we’re the right fit.",
    "k80": "Your business already has a standard. Your support should meet it.",
    "k81": "If you are looking for experienced, relationship-driven real estate support built around the way you work, let’s see if HTC is the right fit.",
    "k82": "Why HTC | Michelle Martinez on the Boutique TC Advantage",
    "k83": "Founder Michelle Martinez shares why Florida Realtors choose Hometown Transaction Coordinators — 30+ years of Florida contract heritage, dedicated team accountability, and boutique operational excellence.",
    "k84": "Why choose Hometown Transaction Coordinators?",
    "k85": "Florida Realtors choose Hometown Transaction Coordinators because we combine experienced transaction coordination with a boutique agency model. Rather than relying on a single solo freelancer or a rigid overseas assistant, HTC builds your brokerage compliance, templates, communication preferences, and client touches directly into an organized workflow backed by an experienced team.",
    "k86": "What makes HTC different from another transaction coordinator?",
    "k87": "HTC combines experienced Florida real estate support with a boutique team model and a setup built around the way you do business. We do not expect every agent, brokerage or client experience to fit one generic workflow.",
    "k88": "Does HTC customize its transaction coordination process?",
    "k89": "Yes. Where our standard defaults work for you, we use them. Where you have specific brokerage requirements, custom templates, communication preferences or personalized client touches, we build those into your Setup so future files flow seamlessly.",
    "k90": "Is Hometown Transaction Coordinators a solo TC or an agency?",
    "k91": "HTC is a boutique real estate support agency. You receive the personal service and dedicated attention of a boutique partner, backed by the stability, redundancies, and standards of an established Florida team structure.",
    "k92": "Does HTC work with Florida Realtors statewide?",
    "k93": "Yes. HTC was founded in South Florida in 2018 with roots dating back to 1995, and we provide transaction coordination for Florida Realtors across the entire state of Florida.",
    "k94": "Does HTC provide Spanish transaction coordination support?",
    "k95": "Yes. HTC provides professional bilingual transaction support in English and Spanish, ensuring clear and comfortable communication with your Spanish-speaking clients, cooperating agents, and transaction partners.",
    "k96": "What services can I use with HTC?",
    "k97": "HTC supports Listing Launch, Contract-to-Close, Broker Compliance, and customized support for Florida teams and brokerages."
  },
  "es": {
    "k0": "Inicio",
    "k1": "Por Qué HTC",
    "k2": "POR QUÉ HTC",
    "k3": "Hecho a la medida de su negocio. Respaldado por experiencia.",
    "k4": "Hometown Transaction Coordinators es una agencia boutique de apoyo inmobiliario en Florida, creada para Realtors que buscan personas con experiencia, un equipo confiable y un apoyo que refleje la forma en que realmente trabajan.",
    "k5": "AGENDAR LLAMADA DE 15 MINUTOS",
    "k6": "VEA CÓMO FUNCIONA HTC",
    "k7": "Desde 1995",
    "k8": "Michelle al servicio de Realtors",
    "k9": "Fundada en 2018",
    "k10": "Fundación de la agencia HTC",
    "k11": "Transacciones procesadas personalmente por nuestra fundadora",
    "k12": "Bilingüe",
    "k13": "Apoyo en inglés + español",
    "k14": "EL ESTÁNDAR HTC",
    "k15": "No todo el apoyo de transacciones es igual.",
    "k16": "La diferencia no es una lista de tareas más larga. Es la experiencia, la estructura y el cuidado con que se hace el trabajo.",
    "k17": "PILAR PRINCIPAL",
    "k18": "La experiencia es lo primero",
    "k19": "La tecnología nos ayuda a trabajar con eficiencia, pero no reemplaza la experiencia detrás del trabajo. HTC combina flujos de trabajo establecidos con revisión humana experimentada, comunicación y seguimiento.",
    "k20": "Su negocio no es una plantilla",
    "k21": "Tenemos configuraciones estándar de HTC cuando las necesita, pero no asumimos que todos los negocios inmobiliarios funcionan igual. Los requisitos de su brokerage, sus plantillas, sus preferencias de comunicación y los detalles únicos con sus clientes se integran en su configuración para que el apoyo se sienta como una extensión de su negocio.",
    "k22": "Boutique por diseño",
    "k23": "HTC le da la relación y la atención personal de una empresa boutique con la estructura de un equipo detrás. Su negocio no tiene que depender de que una sola persona recuerde cómo le gusta que se hagan las cosas. Su configuración y sus estándares pasan a formar parte de la manera en que HTC apoya sus expedientes.",
    "k24": "CONOZCA AL EQUIPO HTC",
    "k25": "Florida es nuestro carril",
    "k26": "HTC se creó para apoyar a profesionales inmobiliarios en Florida. Nuestros flujos de trabajo, formularios, requisitos de brokerage y capacitación están diseñados en torno al trabajo que los Realtors en Florida manejan todos los días.",
    "k27": "HECHO A SU MEDIDA",
    "k28": "Aprendemos cómo trabaja antes de trabajar sus expedientes.",
    "k29": "Podemos apoyar perfectamente un negocio con las configuraciones estándar de HTC. Pero no todos los negocios inmobiliarios son iguales.",
    "k30": "Durante la configuración, integramos a nuestro flujo de trabajo los requisitos de su brokerage, sus plantillas, sus preferencias de comunicación y los detalles con sus clientes. Ese trabajo intencional desde el inicio permite que los siguientes expedientes entren en un sistema ya construido a la medida de su negocio.",
    "k31": "Configúrelo una vez. Lleve su estándar a cada expediente.",
    "k32": "VEA CÓMO EMPEZAR",
    "k33": "LA ARQUITECTURA DE SU NEGOCIO",
    "k34": "Su brokerage",
    "k35": "Sus plantillas",
    "k36": "Su comunicación",
    "k37": "Sus detalles con clientes",
    "k38": "integrados sin fricción",
    "k39": "EL RESULTADO",
    "k40": "Integrado directamente en el flujo de trabajo de HTC.",
    "k41": "Sus preferencias y requisitos pasan a formar parte del flujo de trabajo de HTC para apoyar los siguientes expedientes con más consistencia.",
    "k42": "NUESTRO ESTÁNDAR",
    "k43": "Proteja al Agente. Proteja al Broker. Proteja al Cliente.",
    "k44": "Proteger al Agente",
    "k45": "Mantener organizado el trabajo administrativo, claro el registro por escrito y visible todo lo que requiere la atención del agente.",
    "k46": "Proteger al Broker",
    "k47": "Trabajar dentro de los requisitos de expediente del brokerage y ayudar a mantener un registro organizado de la transacción para su revisión.",
    "k48": "Proteger al Cliente",
    "k49": "Apoyar una experiencia profesional y organizada, con la comunicación y el seguimiento que corresponden al servicio elegido.",
    "k50": "UN APOYO QUE CRECE CON USTED",
    "k51": "Una relación. Más formas de aprovecharla.",
    "k52": "Sus necesidades de apoyo pueden cambiar a medida que cambia su negocio. HTC puede acompañarlo en distintos puntos del trabajo: desde preparar un listado para su lanzamiento, hasta llevar un contrato hasta el Post-Cierre, el cumplimiento con el brokerage y el apoyo a la medida de equipos.",
    "k53": "CICLO PRINCIPAL DE LA TRANSACCIÓN",
    "k54": "Lanzamiento de Listados",
    "k55": "De Contrato a Cierre",
    "k56": "Post-Cierre",
    "k57": "Cumplimiento con el Broker",
    "k58": "Equipos + Brokerages",
    "k59": "Capacitación de personal",
    "k60": "VER SERVICIOS Y PRECIOS",
    "k61": "MAPA DE EXPEDIENTES EN FLORIDA",
    "k62": "Expedientes trabajados en los mercados de Florida.",
    "k63": "Volumen agregado de transacciones (en proceso y cerradas) basado en datos reales. Sombreado según la intensidad por condado, con los municipios de más expedientes.",
    "k64": "Datos de transacciones verificados",
    "k65": "Agregados a partir de los registros de transacciones de HTC por condado y municipio de Florida. El sombreado y los conteos municipales se leen directamente de los datos.",
    "k66": "Privacidad estricta de clientes",
    "k67": "Los conteos se agregan estrictamente por condado y ciudad. Las áreas con menos de 5 expedientes están protegidas. Sin ubicaciones ni direcciones de propiedades.",
    "k68": "APOYO BILINGÜE",
    "k69": "Una comunicación que se siente cómoda.",
    "k70": "HTC apoya la comunicación inmobiliaria en inglés y español, para que los agentes atiendan a clientes y partes de la transacción en el idioma que mejor funcione para cada conversación.",
    "k71": "Coordinación bilingüe profesional con compradores, vendedores, agentes cooperantes y equipos de título en Florida.",
    "k72": "ESTÁ VIENDO HTC EN ESPAÑOL",
    "k73": "DE LOS AGENTES QUE APOYAMOS",
    "k74": "El trabajo debe hablar por sí mismo.",
    "k75": "LEER MÁS RESEÑAS DE AGENTES",
    "k76": "POR QUÉ HTC · PREGUNTAS",
    "k77": "Algunas cosas que quizá quiera saber.",
    "k78": "¿Todavía decidiendo si HTC es para usted?",
    "k79": "Agende una llamada de 15 minutos. Conoceremos cómo trabaja, lo que necesita y veremos si somos la opción adecuada.",
    "k80": "Su negocio ya tiene un estándar. Su apoyo debe estar a la altura.",
    "k81": "Si busca apoyo inmobiliario con experiencia, basado en la relación y hecho a la medida de su forma de trabajar, veamos si HTC es la opción adecuada.",
    "k82": "Por Qué HTC | Michelle Martinez y la ventaja de un TC boutique",
    "k83": "La fundadora Michelle Martinez explica por qué Realtors en Florida eligen Hometown Transaction Coordinators: más de 30 años de experiencia en contratos en Florida, un equipo responsable y excelencia operativa boutique.",
    "k84": "¿Por qué elegir Hometown Transaction Coordinators?",
    "k85": "Los Realtors en Florida eligen Hometown Transaction Coordinators porque combinamos coordinación de transacciones con experiencia y un modelo de agencia boutique. En lugar de depender de un solo freelancer o de un asistente rígido en el extranjero, HTC integra el cumplimiento de su brokerage, sus plantillas, sus preferencias de comunicación y sus detalles con clientes en un flujo de trabajo organizado, respaldado por un equipo con experiencia.",
    "k86": "¿Qué hace diferente a HTC de otro coordinador de transacciones?",
    "k87": "HTC combina apoyo inmobiliario con experiencia en Florida, un modelo de equipo boutique y una configuración hecha a la medida de su negocio. No esperamos que cada agente, brokerage o experiencia de cliente quepa en un solo flujo genérico.",
    "k88": "¿HTC personaliza su proceso de coordinación de transacciones?",
    "k89": "Sí. Donde nuestras configuraciones estándar le funcionan, las usamos. Donde tiene requisitos específicos de su brokerage, plantillas propias, preferencias de comunicación o detalles personalizados con clientes, los integramos en su configuración para que los siguientes expedientes fluyan sin fricción.",
    "k90": "¿Hometown Transaction Coordinators es un TC independiente o una agencia?",
    "k91": "HTC es una agencia boutique de apoyo inmobiliario. Usted recibe el servicio personal y la atención dedicada de un aliado boutique, con la estabilidad, el respaldo y los estándares de un equipo establecido en Florida.",
    "k92": "¿HTC trabaja con Realtors en todo Florida?",
    "k93": "Sí. HTC se fundó en el Sur de Florida en 2018, con raíces desde 1995, y brinda coordinación de transacciones a Realtors en todo el estado de Florida.",
    "k94": "¿HTC ofrece apoyo de coordinación de transacciones en español?",
    "k95": "Sí. HTC brinda apoyo profesional y bilingüe en inglés y español, para una comunicación clara y cómoda con sus clientes hispanohablantes, agentes cooperantes y aliados de la transacción.",
    "k96": "¿Qué servicios puedo usar con HTC?",
    "k97": "HTC apoya Lanzamiento de Listados, De Contrato a Cierre, Cumplimiento con el Broker y apoyo a la medida para equipos y brokerages en Florida."
  }
} as const;


interface Props {
  onBookCall: () => void;
  onSubmitDeal?: () => void;
  onExploreServices: () => void;
  onGoHome: () => void;
  onOpenHowItWorks: () => void;
  onOpenAbout?: () => void;
  onOpenSpanish?: () => void;
  onOpenReviews?: () => void;
  language?: Language;
}

export const WhyHtcPage: React.FC<Props> = ({
  onBookCall,
  onSubmitDeal,
  onExploreServices,
  onGoHome,
  onOpenHowItWorks,
  onOpenAbout,
  onOpenSpanish,
  onOpenReviews,
  language = 'en'
}) => {
  const t = COPY[language];
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // SEO & AEO dynamic document title and meta description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = language === 'es' ? 'Por Qué HTC | Hometown Transaction Coordinators' : 'Why HTC | Florida Transaction Coordinator Support';

    let metaDesc = document.querySelector('meta[name="description"]');
    const originalMetaContent = metaDesc ? metaDesc.getAttribute('content') : '';
    const targetMetaContent =
      'See why Florida Realtors choose Hometown Transaction Coordinators for experienced, boutique transaction support built around their brokerage, workflow, communication preferences and clients.';

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

  const transcriptText = `Hi, I'm Michelle Martinez, founder of Hometown Transaction Coordinators.

I started supporting Florida real estate professionals back in 1995. Over three decades of Florida market shifts, I saw firsthand how hard top agents work to win listings, negotiate contracts, and protect their clients. Yet too often, behind the scenes, agents were stuck chasing missing initials, calculating statutory deadlines, and uploading compliance files late into the night.

In 2018, I founded HTC to give Florida Realtors a better standard of support.

We are not an isolated solo freelancer who disappears on sick days, nor an overseas virtual assistant reading scripts. HTC is a boutique Florida support agency built around experienced people, structured team redundancies, and deep Florida FAR/BAR contract mastery.

When you partner with HTC, your business gets dedicated coordinators backed by a cohesive team, bilingual English and Spanish support, audit-ready broker files, and a calm, proactive closing experience for your clients.

We invite you to book a 15-Minute Fit Call to see how HTC can support your business.`;

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
        name: t.k1,
        item: 'https://hometowntc.com/why-htc/'
      }
    ]
  };

  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: t.k82,
    description:
      t.k83,
    thumbnailUrl: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80'
    ],
    uploadDate: '2026-01-15T08:00:00-05:00',
    duration: 'PT2M10S',
    contentUrl: 'https://hometowntc.com/assets/HTC_VSL_05_Why-HTC_Michelle_v1.mp4',
    embedUrl: 'https://hometowntc.com/why-htc/',
    transcript: transcriptText
  };

  // Structured visible FAQs for direct AEO question matching & Schema.org FAQPage
  const faqData = [
    {
      q: t.k84,
      a: t.k85,
      linkAction: null,
      linkLabel: null
    },
    {
      q: t.k86,
      a: t.k87,
      linkAction: null,
      linkLabel: null
    },
    {
      q: t.k88,
      a: t.k89,
      linkAction: onOpenHowItWorks,
      linkLabel: 'SEE HOW SETUP WORKS'
    },
    {
      q: t.k90,
      a: t.k91,
      linkAction: onOpenAbout,
      linkLabel: 'MEET THE TEAM'
    },
    {
      q: t.k92,
      a: t.k93,
      linkAction: null,
      linkLabel: null
    },
    {
      q: t.k94,
      a: t.k95,
      linkAction: onOpenSpanish || (() => { window.location.hash = '#/es/'; }),
      linkLabel: t.k72
    },
    {
      q: t.k96,
      a: t.k97,
      linkAction: onExploreServices,
      linkLabel: 'VIEW SERVICES + PRICING'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };

  return (
    <main className="bg-[#EEEAEB] text-[#3A2E29] min-h-screen">
      {/* Schema.org Structured Data for SEO & AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 1 — HERO + VSL (SPLIT COPY/VIDEO DESKTOP, STACKED ON MOBILE) */}
      {/* ------------------------------------------------------------------ */}
      <header className="pt-10 pb-14 sm:pt-14 sm:pb-20 bg-white border-b border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-bold text-slate-500 mb-8">
            <button
              onClick={onGoHome}
              className="hover:text-[#0D9BA3] transition cursor-pointer"
            >
              {t.k0}
            </button>
            <span className="text-slate-400">→</span>
            <span className="text-[#3A2E29]">{t.k1}</span>
          </nav>

          {/* Grid Layout: Desktop Split Copy / Video, Mobile Stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Eyebrow, H1, Body, CTAs */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center space-x-2 text-xs font-extrabold uppercase tracking-widest text-[#0D9BA3] bg-[#0D9BA3]/10 px-3.5 py-1.5 rounded-full border border-[#0D9BA3]/20">
                <span>{t.k2}</span>
              </div>

              {/* H1 Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight leading-tight">
                {t.k3}
              </h1>

              {/* Body Copy */}
              <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
                {t.k4}
              </p>

              {/* Primary CTA & Secondary Link */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
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
                  className="inline-flex items-center justify-center sm:justify-start space-x-1.5 text-[#075960] hover:text-[#053d42] font-bold text-sm tracking-wide transition py-2 cursor-pointer group underline underline-offset-4"
                >
                  <span>{t.k6}</span>
                  <ArrowRight className="w-4 h-4 text-[#075960] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

          </div>

          {/* Proof line beneath hero (Elegant & Compact) */}
          <div className="mt-12 pt-8 border-t border-[#D8D2D4]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center sm:text-left">
              
              <div className="space-y-1">
                <div className="text-lg sm:text-xl font-bold text-[#3A2E29] font-serif">
                  {t.k7}
                </div>
                <div className="text-xs text-slate-600 font-normal">
                  {t.k8}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-lg sm:text-xl font-bold text-[#075960] font-serif">
                  {t.k9}
                </div>
                <div className="text-xs text-slate-600 font-normal">
                  {t.k10}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-lg sm:text-xl font-bold text-[#3A2E29] font-serif">
                  20,000+
                </div>
                <div className="text-xs text-slate-600 font-normal">
                  {t.k11}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-lg sm:text-xl font-bold text-[#FE7311] font-serif">
                  {t.k12}
                </div>
                <div className="text-xs text-slate-600 font-normal">
                  {t.k13}
                </div>
              </div>

            </div>
          </div>

        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 2 — THE HTC DIFFERENCE (EDITORIAL & PREMIUM 2x2 LAYOUT) */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-[#EEEAEB] border-b border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Section Header: Eyebrow, Heading, Supporting Copy */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-white px-3.5 py-1.5 rounded-full border border-[#D8D2D4]">
              <span>{t.k14}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight leading-tight">
              {t.k15}
            </h2>
            <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
              {t.k16}
            </p>
          </div>

          {/* 4 Feature Columns (2x2 Layout with Refined Number Accents) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Block 01 */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#D8D2D4] space-y-5 shadow-xs transition hover:border-[#075960]/60 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#D8D2D4]/60 pb-4">
                  <span className="text-xs font-mono font-bold text-[#075960] tracking-widest uppercase">
                    {t.k17}
                  </span>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#075960]">
                    01
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#3A2E29] font-serif leading-snug">
                  {t.k18}
                </h3>
                <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
                  {t.k19}
                </p>
              </div>
            </div>

            {/* Block 02 */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#D8D2D4] space-y-5 shadow-xs transition hover:border-[#075960]/60 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#D8D2D4]/60 pb-4">
                  <span className="text-xs font-mono font-bold text-[#075960] tracking-widest uppercase">
                    {t.k17}
                  </span>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#075960]">
                    02
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#3A2E29] font-serif leading-snug">
                  {t.k20}
                </h3>
                <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
                  {t.k21}
                </p>
              </div>
            </div>

            {/* Block 03 */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#D8D2D4] space-y-5 shadow-xs transition hover:border-[#075960]/60 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#D8D2D4]/60 pb-4">
                  <span className="text-xs font-mono font-bold text-[#075960] tracking-widest uppercase">
                    {t.k17}
                  </span>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#075960]">
                    03
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#3A2E29] font-serif leading-snug">
                  {t.k22}
                </h3>
                <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
                  {t.k23}
                </p>
              </div>
              <div className="pt-3">
                <button
                  onClick={onOpenAbout}
                  className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#075960] hover:text-[#053d42] transition cursor-pointer group"
                >
                  <span>{t.k24}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Block 04 */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#D8D2D4] space-y-5 shadow-xs transition hover:border-[#075960]/60 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#D8D2D4]/60 pb-4">
                  <span className="text-xs font-mono font-bold text-[#075960] tracking-widest uppercase">
                    {t.k17}
                  </span>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#075960]">
                    04
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#3A2E29] font-serif leading-snug">
                  {t.k25}
                </h3>
                <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
                  {t.k26}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 3 — WHY SETUP MATTERS (BUILT AROUND YOU) */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Copy & Strong Callout */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-[#075960]/10 px-3.5 py-1.5 rounded-full border border-[#075960]/20">
                <span>{t.k27}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight leading-tight">
                {t.k28}
              </h2>

              <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
                {t.k29}
              </p>

              <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
                {t.k30}
              </p>

              {/* Strong Callout Box */}
              <div className="p-6 rounded-2xl bg-[#EEEAEB] border-l-4 border-[#075960] border-y border-r border-[#D8D2D4]">
                <p className="text-lg sm:text-xl font-bold text-[#3A2E29] font-serif tracking-tight">
                  {t.k31}
                </p>
              </div>

              {/* Text Link */}
              <div className="pt-2">
                <button
                  onClick={onOpenHowItWorks}
                  className="inline-flex items-center space-x-2 text-sm font-bold uppercase tracking-wider text-[#075960] hover:text-[#053d42] transition cursor-pointer group"
                >
                  <span>{t.k32}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

            {/* Right Column: Simple, Elegant Visual Showing Custom Elements into HTC Workflow */}
            <div className="lg:col-span-6">
              <div className="bg-[#EEEAEB] rounded-3xl p-8 sm:p-10 border border-[#D8D2D4] shadow-xs space-y-6">
                
                <div className="text-xs font-mono font-bold text-[#075960] uppercase tracking-widest">
                  {t.k33}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="bg-white p-4 rounded-xl border border-[#D8D2D4] flex items-center space-x-3 shadow-2xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FE7311] flex-shrink-0" />
                    <span className="text-sm font-bold text-[#3A2E29]">{t.k34}</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-[#D8D2D4] flex items-center space-x-3 shadow-2xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#075960] flex-shrink-0" />
                    <span className="text-sm font-bold text-[#3A2E29]">{t.k35}</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-[#D8D2D4] flex items-center space-x-3 shadow-2xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#075960] flex-shrink-0" />
                    <span className="text-sm font-bold text-[#3A2E29]">{t.k36}</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-[#D8D2D4] flex items-center space-x-3 shadow-2xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FE7311] flex-shrink-0" />
                    <span className="text-sm font-bold text-[#3A2E29]">{t.k37}</span>
                  </div>
                </div>

                {/* Transition Indicator */}
                <div className="flex items-center justify-center py-2">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-500 bg-white/70 px-4 py-1.5 rounded-full border border-[#D8D2D4]">
                    <span>{t.k38}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FE7311]" />
                  </div>
                </div>

                {/* Destination Box: HTC Workflow */}
                <div className="bg-[#3A2E29] text-white p-6 rounded-2xl border border-[#20C5D2]/40 shadow-sm text-center space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#20C5D2]">
                    {t.k39}
                  </div>
                  <div className="text-lg sm:text-xl font-bold font-serif">
                    {t.k40}
                  </div>
                  <p className="text-xs text-slate-300 font-normal">
                    {t.k41}
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 4 — WHAT WE ARE BUILT TO PROTECT */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 sm:py-28 bg-[#3A2E29] text-white border-b border-[#241C19] relative overflow-hidden">
        {/* Subtle radial glow background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0D9BA3_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20 relative z-10">
          
          {/* Header */}
          <div className="max-w-3xl space-y-4 text-left">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#20C5D2] bg-black/40 px-3.5 py-1.5 rounded-full border border-[#20C5D2]/30">
              <span>{t.k42}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-serif tracking-tight leading-[1.1]">
              {t.k43}
            </h2>
          </div>

          {/* Three Equal Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-4">
            
            {/* Column 1: Protect the Agent */}
            <div className="space-y-4 pt-6 border-t-2 border-[#20C5D2]">
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-tight">
                {t.k44}
              </h3>
              <p className="text-base text-slate-300 font-normal leading-relaxed">
                {t.k45}
              </p>
            </div>

            {/* Column 2: Protect the Broker */}
            <div className="space-y-4 pt-6 border-t-2 border-[#FE7311]">
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-tight">
                {t.k46}
              </h3>
              <p className="text-base text-slate-300 font-normal leading-relaxed">
                {t.k47}
              </p>
            </div>

            {/* Column 3: Protect the Client */}
            <div className="space-y-4 pt-6 border-t-2 border-white/40">
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-tight">
                {t.k48}
              </h3>
              <p className="text-base text-slate-300 font-normal leading-relaxed">
                {t.k49}
              </p>
            </div>

          </div>

          {/* Bottom Link Underneath */}
          <div className="pt-6 border-t border-white/10">
            <button
              onClick={onOpenHowItWorks}
              className="inline-flex items-center space-x-2 text-sm font-bold uppercase tracking-wider text-[#20C5D2] hover:text-white transition cursor-pointer group"
            >
              <span>{t.k6}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 5 — BOUTIQUE DOES NOT MEAN LIMITED */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-[#075960]/10 px-3.5 py-1.5 rounded-full border border-[#075960]/20">
              <span>{t.k50}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight leading-tight">
              {t.k51}
            </h2>

            <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
              {t.k52}
            </p>
          </div>

          {/* Simple Horizontal Service Line & Secondary Capabilities */}
          <div className="bg-[#EEEAEB] rounded-2xl p-8 sm:p-10 border border-[#D8D2D4] space-y-8 shadow-xs">
            
            {/* Primary Horizontal Service Line */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold text-[#075960] uppercase tracking-widest">
                {t.k53}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="bg-white p-5 rounded-xl border border-[#D8D2D4] flex items-center justify-between shadow-2xs">
                  <span className="text-base font-bold text-[#3A2E29] font-serif">{t.k54}</span>
                  <ArrowRight className="w-4 h-4 text-[#FE7311] hidden md:block" />
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-[#D8D2D4] flex items-center justify-between shadow-2xs">
                  <span className="text-base font-bold text-[#3A2E29] font-serif">{t.k55}</span>
                  <ArrowRight className="w-4 h-4 text-[#FE7311] hidden md:block" />
                </div>

                <div className="bg-white p-5 rounded-xl border border-[#D8D2D4] flex items-center justify-between shadow-2xs">
                  <span className="text-base font-bold text-[#3A2E29] font-serif">{t.k56}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#075960]" />
                </div>
              </div>
            </div>

            {/* Secondary Capabilities Beneath It */}
            <div className="pt-6 border-t border-[#D8D2D4] flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-[#3A2E29]">
                <span className="bg-white px-3.5 py-2 rounded-lg border border-[#D8D2D4]">{t.k57}</span>
                <span className="text-slate-400">·</span>
                <span className="bg-white px-3.5 py-2 rounded-lg border border-[#D8D2D4]">{t.k58}</span>
                <span className="text-slate-400">·</span>
                <span className="bg-white px-3.5 py-2 rounded-lg border border-[#D8D2D4]">{t.k59}</span>
              </div>

              {/* Primary Link */}
              <button
                onClick={onExploreServices}
                className="inline-flex items-center space-x-2 text-sm font-bold uppercase tracking-wider text-[#075960] hover:text-[#053d42] transition cursor-pointer group"
              >
                <span>{t.k60}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 5B — FLORIDA CLOSED-DEAL COVERAGE MAP (BOOK SECTION 13) */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-[#075960]/10 px-3.5 py-1.5 rounded-full border border-[#075960]/20">
              <MapPin className="w-3.5 h-3.5 text-[#FE7311]" />
              <span>{t.k61}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight leading-tight">
              {t.k62}
            </h2>
            <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
              {t.k63}
            </p>
          </div>

          {/* Dynamic Heat Map reading from src/data/market-counts.json */}
          <FloridaClosedDealsHeatMap language={language} />

          {/* Context Cards: Data Integrity & Privacy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="bg-[#EEEAEB] p-5 rounded-2xl border border-[#D8D2D4]">
              <div className="flex items-center space-x-2 text-[#075960] font-bold text-sm mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#075960]" />
                <span>{t.k64}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {t.k65}
              </p>
            </div>

            <div className="bg-[#EEEAEB] p-5 rounded-2xl border border-[#D8D2D4]">
              <div className="flex items-center space-x-2 text-[#075960] font-bold text-sm mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#075960]" />
                <span>{t.k66}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {t.k67}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 6 — ENGLISH + SPANISH SUPPORT */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-[#EEEAEB] border-b border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#3A2E29] text-white rounded-3xl p-8 sm:p-12 lg:p-14 border border-[#20C5D2]/40 shadow-xl space-y-8">
            
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#20C5D2] bg-black/40 px-3.5 py-1.5 rounded-full border border-[#20C5D2]/30">
                <Globe2 className="w-3.5 h-3.5 text-[#FE7311]" />
                <span>{t.k68}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight leading-tight">
                {t.k69}
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                {t.k70}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs sm:text-sm text-slate-300 font-medium">
                {t.k71}
              </div>

              <button
                onClick={() => {
                  if (onOpenSpanish) {
                    onOpenSpanish();
                  } else {
                    window.location.hash = '#/es/';
                  }
                }}
                className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl border border-white/20 text-xs sm:text-sm font-bold uppercase tracking-wider transition cursor-pointer group flex-shrink-0"
              >
                <span>{t.k72}</span>
                <ArrowRight className="w-4 h-4 text-[#20C5D2] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 7 — SOCIAL PROOF */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-[#075960]/10 px-3.5 py-1.5 rounded-full border border-[#075960]/20">
              <Star className="w-3.5 h-3.5 text-[#FE7311] fill-[#FE7311]" />
              <span>{t.k73}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight leading-tight">
              {t.k74}
            </h2>
          </div>

          {/* Three Testimonials: 3 columns on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1: Gaby Martinez */}
            <div className="bg-[#EEEAEB] rounded-2xl p-8 border border-[#D8D2D4] space-y-6 flex flex-col justify-between shadow-2xs hover:border-[#075960]/50 transition">
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-[#3A2E29] font-normal leading-relaxed italic">
                  “Michelle and Mary are absolutely amazing Transaction Coordinators! Their attention to detail, organization, and communication are truly unmatched. They keep every file on track and make the entire process smooth and stress-free. So grateful to have them on our team!”
                </p>
              </div>

              <div className="pt-4 border-t border-[#D8D2D4] space-y-0.5">
                <div className="font-bold text-sm sm:text-base text-[#3A2E29] font-serif">
                  Gaby Martinez
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Xtreme By LPT Realty
                </div>
              </div>
            </div>

            {/* Testimonial 2: Zuzel Gonzalez */}
            <div className="bg-[#EEEAEB] rounded-2xl p-8 border border-[#D8D2D4] space-y-6 flex flex-col justify-between shadow-2xs hover:border-[#075960]/50 transition">
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-[#3A2E29] font-normal leading-relaxed italic">
                  “Michelle is my go to transaction coordinator for all of my real estate deals. She is always organized, professional, and on top of every detail from start to finish. I honestly couldn’t do my transactions without her support.”
                </p>
              </div>

              <div className="pt-4 border-t border-[#D8D2D4] space-y-0.5">
                <div className="font-bold text-sm sm:text-base text-[#3A2E29] font-serif">
                  Zuzel Gonzalez
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Florida Realtor
                </div>
              </div>
            </div>

            {/* Testimonial 3: Cindy Rios */}
            <div className="bg-[#EEEAEB] rounded-2xl p-8 border border-[#D8D2D4] space-y-6 flex flex-col justify-between shadow-2xs hover:border-[#075960]/50 transition">
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-[#3A2E29] font-normal leading-relaxed italic">
                  “Michelle takes so much weight off my shoulders and keeps everything running smoothly at all times. Her understanding of real estate laws and compliance gives me complete peace of mind because I know nothing is being overlooked.”
                </p>
              </div>

              <div className="pt-4 border-t border-[#D8D2D4] space-y-0.5">
                <div className="font-bold text-sm sm:text-base text-[#3A2E29] font-serif">
                  Cindy Rios
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Florida Realtor
                </div>
              </div>
            </div>

          </div>

          {/* Under Them: READ MORE AGENT REVIEWS → */}
          <div className="pt-4 border-t border-[#D8D2D4] flex items-center justify-start">
            <button
              onClick={() => {
                if (onOpenReviews) {
                  onOpenReviews();
                } else {
                  window.location.hash = '#/reviews/';
                }
              }}
              className="inline-flex items-center space-x-2 text-sm font-bold uppercase tracking-wider text-[#075960] hover:text-[#053d42] transition cursor-pointer group"
            >
              <span>{t.k75}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 8 — FAQ */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-[#EEEAEB] border-b border-[#D8D2D4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-white px-3.5 py-1.5 rounded-full border border-[#D8D2D4]">
              <span>{t.k76}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight leading-tight">
              {t.k77}
            </h2>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {faqData.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#D8D2D4] overflow-hidden transition shadow-2xs"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-[#3A2E29] hover:text-[#075960] transition cursor-pointer font-serif"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#FE7311] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm sm:text-base text-slate-700 font-normal leading-relaxed border-t border-[#D8D2D4]/50 pt-4 bg-white space-y-4">
                      <p>{faq.a}</p>
                      {faq.linkAction && faq.linkLabel && (
                        <div>
                          <button
                            onClick={faq.linkAction}
                            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#075960] hover:text-[#053d42] transition cursor-pointer group"
                          >
                            <span>{faq.linkLabel}</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Card: Still deciding if HTC is right for you? */}
          <div className="bg-[#3A2E29] text-white rounded-3xl p-8 sm:p-10 border border-[#20C5D2]/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                {t.k78}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                {t.k79}
              </p>
            </div>
            
            <button
              onClick={onBookCall}
              className="bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-7 py-3.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition flex items-center space-x-2.5 cursor-pointer group flex-shrink-0"
            >
              <PhoneCall className="w-4 h-4 text-[#1A1412]" />
              <span>{t.k5}</span>
              <ArrowRight className="w-4 h-4 text-[#1A1412] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 9 — FINAL CTA */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 sm:py-32 bg-white border-t border-[#D8D2D4] text-[#3A2E29]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight leading-tight max-w-3xl mx-auto">
            {t.k80}
          </h2>

          <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed font-normal">
            {t.k81}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8">
            <button
              onClick={onBookCall}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition cursor-pointer group"
            >
              <PhoneCall className="w-4 h-4 text-[#1A1412]" />
              <span>{t.k5}</span>
              <ArrowRight className="w-4 h-4 text-[#1A1412] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreServices}
              className="inline-flex items-center justify-center space-x-1.5 text-[#075960] hover:text-[#053d42] font-bold text-sm uppercase tracking-wider transition py-2 cursor-pointer group underline underline-offset-4"
            >
              <span>{t.k60}</span>
              <ArrowRight className="w-4 h-4 text-[#075960] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

    </main>
  );
};

