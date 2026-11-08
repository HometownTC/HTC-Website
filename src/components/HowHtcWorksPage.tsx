import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ArrowRight,
  PhoneCall,
  ChevronDown,
  ChevronUp,
  Play,
  Volume2,
  VolumeX,
  Clock,
  Sparkles,
  FileText
} from 'lucide-react';
import { PHONE_NUMBER } from '../data/content';
import type { Language } from '../types';

const COPY = {
  "en": {
    "k0": "Home",
    "k1": "How HTC Works",
    "k2": "HOW HTC WORKS",
    "k3": "Here’s what happens when you work with HTC.",
    "k4": "Hometown Transaction Coordinators (HTC) supports Florida Realtors with Listing Launch, Contract-to-Close, and Broker Compliance. Start with a Fit Call, set up your business once, then submit files whenever you need support.",
    "k5": "BOOK A 15-MINUTE FIT CALL",
    "k6": "VIEW SERVICES + PRICING",
    "k7": "Your browser does not support HTML5 video.",
    "k8": "Watch: How HTC Works (1:45)",
    "k9": "Florida Transaction Coordination Customer Journey",
    "k10": "CC Captions Ready",
    "k11": "Video:",
    "k12": "Customer Journey Walkthrough",
    "k13": "GETTING STARTED",
    "k14": "Set up once. Submit when you need us.",
    "k15": "01 — Book a Fit Call",
    "k16": "We learn what you need and determine whether HTC is the right fit for the way you do business.",
    "k17": "02 — Register + Setup",
    "k18": "Once you register, new HTC clients complete the one-time $399 Agent Setup Investment before the Setup Call. We build your brokerage requirements, templates, communication preferences, and unique client touches into the HTC workflow.",
    "k19": "See Setup Investment + Pricing",
    "k20": "03 — Quick File Drop",
    "k21": "Once setup is complete, use Quick File Drop whenever you need Listing Launch, Contract-to-Close, or Broker Compliance support.",
    "k22": "CURRENT CLIENT? SUBMIT A NEW DEAL",
    "k23": "YOUR SERVICES",
    "k24": "Choose the support the file needs.",
    "k25": "You do not have to use every HTC service on every file. Send us the work you want supported.",
    "k26": "Listing Support",
    "k27": "LISTING LAUNCH",
    "k28": "Getting ready to list?",
    "k29": "We prepare the listing pieces for your review and approval.",
    "k30": "EXPLORE LISTING SERVICES",
    "k31": "Under Contract",
    "k32": "CONTRACT-TO-CLOSE",
    "k33": "Have an executed agreement?",
    "k34": "Choose The Hometown Signature for support from agreement through Post-Close.",
    "k35": "EXPLORE CONTRACT-TO-CLOSE",
    "k36": "Compliance Only",
    "k37": "BROKER COMPLIANCE",
    "k38": "Already managing the lease or sale?",
    "k39": "Send us the file when you need help getting it through brokerage compliance.",
    "k40": "SEE BROKER COMPLIANCE PRICING",
    "k41": "What happens after you send us the contract?",
    "k42": "For Contract-to-Close, HTC uses the H.O.M.E. Close Method to organize the work from executed agreement through Post-Close.",
    "k43": "SEE THE HOMETOWN SIGNATURE",
    "k44": "HOW IT WORKS · FAQ",
    "k45": "A few things agents ask us.",
    "k46": "Have more questions?",
    "k47": "Book a 15-Minute Fit Call and we’ll talk through what you need.",
    "k48": "PROTECT THE AGENT · PROTECT THE BROKER · PROTECT THE CLIENT",
    "k49": "Ready to see if HTC fits the way you work?",
    "k50": "Start with a focused 15-minute conversation. We’ll learn what you need and determine whether HTC is the right fit for your business.",
    "k51": "Direct Phone:",
    "k52": "Once you register, we’ll schedule your Setup Call and build your brokerage requirements, templates, communication preferences, and unique client touches into the HTC workflow.",
    "k53": "H — Honor the Agreement",
    "k54": "Review the executed agreement, parties, dates, and documents that drive the file.",
    "k55": "O — Organize the File",
    "k56": "Build the working timeline, organize contacts and documents, and identify what is missing.",
    "k57": "M — Monitor the Milestones",
    "k58": "Track administrative milestones, follow up, document updates, and bring anything that needs your attention back to you.",
    "k59": "E — Ease the Close",
    "k60": "Support the final administrative steps, closing coordination, broker file completion, and Post-Close.",
    "k61": "Do I have to complete Setup every time I send a file?",
    "k62": "No. Setup is completed once. If your brokerage, preferences, templates, or business needs change, we can update your setup.",
    "k63": "How do I submit a new file?",
    "k64": "Existing HTC clients use Quick File Drop to submit Listing Launch, Contract-to-Close, and Broker Compliance files.",
    "k65": "Can I use different HTC services for different files?",
    "k66": "Yes. Choose the service that fits the support you need for that particular file.",
    "k67": "Who communicates with my clients during Contract-to-Close?",
    "k68": "That depends on the plan you choose. With Base, you remain the primary point of contact for your clients. Pro includes additional direct client communication and support from HTC.",
    "k69": "What if something changes in my business after Setup?",
    "k70": "Tell us. We can update your templates, brokerage requirements, communication preferences, and other workflow details as your business changes.",
    "k71": "How HTC Works | Florida Transaction Coordination",
    "k72": "See how Hometown Transaction Coordinators works with Florida real estate agents from Fit Call and Setup to Listing Launch, Contract-to-Close, and Broker Compliance.",
    "k73": "How HTC Works: Florida Transaction Coordination Process",
    "k74": "Hometown Transaction Coordinators supports Florida Realtors with Listing Launch, Contract-to-Close, and Broker Compliance.",
    "k75": "Book a Fit Call",
    "k76": "Register + Setup",
    "k77": "Once you register, we schedule your Setup Call and build your brokerage requirements, templates, communication preferences, and unique client touches into the HTC workflow.",
    "k78": "Quick File Drop",
    "k79": "See how Hometown Transaction Coordinators works with Florida Realtors, from Fit Call and Setup to Listing Launch, Contract-to-Close, Broker Compliance, and Post-Close support.",
    "k80": "Play VSL video"
  },
  "es": {
    "k0": "Inicio",
    "k1": "Cómo Funciona HTC",
    "k2": "CÓMO FUNCIONA HTC",
    "k3": "Esto es lo que pasa cuando trabaja con HTC.",
    "k4": "Hometown Transaction Coordinators (HTC) apoya a Realtors en Florida con Lanzamiento de Listados, De Contrato a Cierre y Cumplimiento con el Broker. Comience con una llamada de compatibilidad, configure su negocio una sola vez y envíe expedientes cuando necesite apoyo.",
    "k5": "AGENDAR LLAMADA DE 15 MINUTOS",
    "k6": "VER SERVICIOS Y PRECIOS",
    "k7": "Su navegador no puede reproducir este video.",
    "k8": "Video: Cómo funciona HTC (1:45, en inglés)",
    "k9": "El recorrido del cliente con HTC en Florida",
    "k10": "Subtítulos disponibles",
    "k11": "Video:",
    "k12": "Recorrido del cliente",
    "k13": "PARA EMPEZAR",
    "k14": "Configure una vez. Envíe cuando nos necesite.",
    "k15": "01 — Agende una llamada de compatibilidad",
    "k16": "Conocemos lo que necesita y vemos si HTC es la opción adecuada para su forma de trabajar.",
    "k17": "02 — Registro + Configuración",
    "k18": "Al registrarse, los nuevos clientes de HTC completan la Inversión de Configuración del Agente, un pago único de $399, antes de la llamada de configuración. Integramos al flujo de trabajo de HTC los requisitos de su brokerage, sus plantillas, sus preferencias de comunicación y los detalles únicos con sus clientes.",
    "k19": "Ver inversión de configuración y precios",
    "k20": "03 — Quick File Drop",
    "k21": "Una vez completada la configuración, use Quick File Drop cuando necesite apoyo de Lanzamiento de Listados, De Contrato a Cierre o Cumplimiento con el Broker.",
    "k22": "¿YA ES CLIENTE? ENVÍE UNA TRANSACCIÓN",
    "k23": "SUS SERVICIOS",
    "k24": "Elija el apoyo que necesita el expediente.",
    "k25": "No tiene que usar todos los servicios de HTC en cada expediente. Envíenos el trabajo en el que quiere apoyo.",
    "k26": "Apoyo de listados",
    "k27": "LANZAMIENTO DE LISTADOS",
    "k28": "¿Listo para listar?",
    "k29": "Preparamos las piezas del listado para su revisión y aprobación.",
    "k30": "VER SERVICIOS DE LISTADOS",
    "k31": "Bajo contrato",
    "k32": "DE CONTRATO A CIERRE",
    "k33": "¿Tiene un contrato ejecutado?",
    "k34": "Elija The Hometown Signature para recibir apoyo desde el contrato hasta el Post-Cierre.",
    "k35": "VER DE CONTRATO A CIERRE",
    "k36": "Solo cumplimiento",
    "k37": "CUMPLIMIENTO CON EL BROKER",
    "k38": "¿Ya está manejando el alquiler o la venta?",
    "k39": "Envíenos el expediente cuando necesite ayuda para pasar el cumplimiento de su brokerage.",
    "k40": "VER PRECIOS DE CUMPLIMIENTO",
    "k41": "¿Qué pasa después de que nos envía el contrato?",
    "k42": "En De Contrato a Cierre, HTC usa el Método de Cierre H.O.M.E. para organizar el trabajo desde el contrato ejecutado hasta el Post-Cierre.",
    "k43": "VER THE HOMETOWN SIGNATURE",
    "k44": "CÓMO FUNCIONA · PREGUNTAS",
    "k45": "Algunas preguntas que nos hacen los agentes.",
    "k46": "¿Tiene más preguntas?",
    "k47": "Agende una llamada de 15 minutos y hablamos de lo que necesita.",
    "k48": "PROTEJA AL AGENTE · PROTEJA AL BROKER · PROTEJA AL CLIENTE",
    "k49": "¿Listo para ver si HTC encaja con su forma de trabajar?",
    "k50": "Comience con una conversación de 15 minutos. Conoceremos lo que necesita y veremos si HTC es la opción adecuada para su negocio.",
    "k51": "Teléfono directo:",
    "k52": "Al registrarse, agendamos su llamada de configuración e integramos al flujo de trabajo de HTC los requisitos de su brokerage, sus plantillas, sus preferencias de comunicación y los detalles únicos con sus clientes.",
    "k53": "H — Honor the Agreement",
    "k54": "Revisamos el contrato ejecutado, las partes, las fechas y los documentos que rigen el expediente.",
    "k55": "O — Organize the File",
    "k56": "Armamos el cronograma de trabajo, organizamos contactos y documentos, e identificamos lo que falta.",
    "k57": "M — Monitor the Milestones",
    "k58": "Damos seguimiento a los hitos administrativos, documentamos novedades y le traemos todo lo que requiere su atención.",
    "k59": "E — Ease the Close",
    "k60": "Apoyamos los pasos administrativos finales, la coordinación del cierre, el expediente del broker y el Post-Cierre.",
    "k61": "¿Tengo que completar la configuración cada vez que envío un expediente?",
    "k62": "No. La configuración se hace una sola vez. Si cambian su brokerage, sus preferencias, sus plantillas o las necesidades de su negocio, podemos actualizarla.",
    "k63": "¿Cómo envío un nuevo expediente?",
    "k64": "Los clientes actuales de HTC usan Quick File Drop para enviar expedientes de Lanzamiento de Listados, De Contrato a Cierre y Cumplimiento con el Broker.",
    "k65": "¿Puedo usar distintos servicios de HTC para distintos expedientes?",
    "k66": "Sí. Elija el servicio que corresponde al apoyo que necesita en cada expediente.",
    "k67": "¿Quién se comunica con mis clientes durante De Contrato a Cierre?",
    "k68": "Depende del plan que elija. Con Base, usted sigue siendo el contacto principal de sus clientes. Pro incluye comunicación directa adicional con el cliente y apoyo de HTC.",
    "k69": "¿Qué pasa si algo cambia en mi negocio después de la configuración?",
    "k70": "Avísenos. Podemos actualizar sus plantillas, requisitos del brokerage, preferencias de comunicación y otros detalles del flujo de trabajo a medida que su negocio cambia.",
    "k71": "Cómo Funciona HTC | Coordinación de Transacciones en Florida",
    "k72": "Vea cómo Hometown Transaction Coordinators trabaja con agentes en Florida, desde la llamada de compatibilidad y la configuración hasta Lanzamiento de Listados, De Contrato a Cierre y Cumplimiento con el Broker.",
    "k73": "Cómo Funciona HTC: el proceso de coordinación de transacciones en Florida",
    "k74": "Hometown Transaction Coordinators apoya a Realtors en Florida con Lanzamiento de Listados, De Contrato a Cierre y Cumplimiento con el Broker.",
    "k75": "Agende una llamada de compatibilidad",
    "k76": "Registro + Configuración",
    "k77": "Al registrarse, agendamos su llamada de configuración e integramos al flujo de trabajo de HTC los requisitos de su brokerage, sus plantillas, sus preferencias de comunicación y los detalles únicos con sus clientes.",
    "k78": "Quick File Drop",
    "k79": "Vea cómo Hometown Transaction Coordinators trabaja con Realtors en Florida, desde la llamada de compatibilidad y la configuración hasta Lanzamiento de Listados, De Contrato a Cierre, Cumplimiento con el Broker y Post-Cierre.",
    "k80": "Reproducir video"
  }
} as const;


interface Props {
  onBookCall: () => void;
  onSubmitDeal: () => void;
  onExploreServices: () => void;
  onOpenListingCoordination?: () => void;
  onOpenContractToClose?: () => void;
  onOpenBrokerCompliance?: () => void;
  onCompareBasePro?: () => void;
  onGoHome: () => void;
  language?: Language;
}

export const HowHtcWorksPage: React.FC<Props> = ({
  onBookCall,
  onSubmitDeal,
  onExploreServices,
  onOpenListingCoordination,
  onOpenContractToClose,
  onOpenBrokerCompliance,
  onCompareBasePro,
  onGoHome,
  language = 'en'
}) => {
  const t = COPY[language];
  const [showTranscript, setShowTranscript] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // SEO & AEO dynamic document title and meta description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = t.k71;

    let metaDesc = document.querySelector('meta[name="description"]');
    const originalMetaContent = metaDesc ? metaDesc.getAttribute('content') : '';
    
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        t.k79
      );
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute(
        'content',
        t.k79
      );
      document.head.appendChild(metaDesc);
    }

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalMetaContent) {
        metaDesc.setAttribute('content', originalMetaContent);
      }
    };
  }, [language]);

  // The 3 Getting Started Steps
  const gettingStartedSteps = [
    {
      num: '01',
      title: t.k15,
      description:
        t.k16,
      ctaType: 'bookCall',
      ctaText: 'BOOK A 15-MINUTE FIT CALL →',
      action: onBookCall
    },
    {
      num: '02',
      title: t.k17,
      description:
        t.k52,
      ctaType: 'pricingLink',
      ctaText: 'See Setup Investment + Pricing →',
      action: onExploreServices
    },
    {
      num: '03',
      title: t.k20,
      description:
        t.k21,
      ctaType: 'submitDeal',
      ctaText: 'CURRENT CLIENT? SUBMIT A NEW DEAL →',
      action: onSubmitDeal
    }
  ];

  // The H.O.M.E. Close Method Steps
  const homeMethodSteps = [
    {
      letter: 'H',
      title: t.k53,
      description:
        t.k54,
      color: '#075960',
      bgBadge: 'bg-[#075960]',
      borderBadge: 'border-[#075960]'
    },
    {
      letter: 'O',
      title: t.k55,
      description:
        t.k56,
      color: '#C84600',
      bgBadge: 'bg-[#C84600]',
      borderBadge: 'border-[#C84600]'
    },
    {
      letter: 'M',
      title: t.k57,
      description:
        t.k58,
      color: '#075960',
      bgBadge: 'bg-[#075960]',
      borderBadge: 'border-[#075960]'
    },
    {
      letter: 'E',
      title: t.k59,
      description:
        t.k60,
      color: '#3A2E29',
      bgBadge: 'bg-[#3A2E29]',
      borderBadge: 'border-[#3A2E29]'
    }
  ];

  // The FAQs (Section 5)
  const faqs = [
    {
      q: t.k61,
      a: t.k62
    },
    {
      q: t.k63,
      a: t.k64,
      linkText: 'SUBMIT A NEW DEAL →',
      linkAction: onSubmitDeal
    },
    {
      q: t.k65,
      a: t.k66,
      linkText: 'VIEW SERVICES + PRICING →',
      linkAction: onExploreServices
    },
    {
      q: t.k67,
      a: t.k68,
      linkText: 'SEE THE HOMETOWN SIGNATURE →',
      linkAction: onCompareBasePro || onExploreServices
    },
    {
      q: t.k69,
      a: t.k70
    }
  ];

  const transcriptText = `Hi, I'm Michelle with Hometown Transaction Coordinators. When you decide to partner with HTC, the process is built to be seamless, predictable, and stress-free from day one.

It starts with a simple 15-Minute Fit Call to ensure we're aligned on your volume and market area. Next, we complete your one-time Agent Setup—integrating your brokerage compliance guidelines, preferred title and lending partners, and communication cadences into our custom workflow.

From that point on, whenever you get a listing or an accepted FAR/BAR contract, you simply submit the package to us. Our Florida team immediately audits the file, builds your critical date timeline, communicates with all parties, tracks statutory milestones, and delivers a 100% compliant broker file through closing.

You stay in control of client relationships and negotiations, while we handle every deadline and detail behind the scenes.`;

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
        item: 'https://hometowntc.com/how-htc-works/'
      }
    ]
  };

  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: t.k71,
    description:
      t.k72,
    thumbnailUrl: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80'
    ],
    uploadDate: '2026-01-15T08:00:00-05:00',
    duration: 'PT1M19S',
    contentUrl: 'https://hometowntc.com/videos/how-htc-works-vsl.mp4',
    embedUrl: 'https://hometowntc.com/how-htc-works/',
    transcript: transcriptText
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: t.k73,
    description:
      t.k74,
    step: [
      {
        '@type': 'HowToStep',
        name: t.k75,
        text: t.k16
      },
      {
        '@type': 'HowToStep',
        name: t.k76,
        text: t.k77
      },
      {
        '@type': 'HowToStep',
        name: t.k78,
        text: t.k21
      }
    ]
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      
      {/* ------------------------------------------------------------------ */}
      {/* SECTION 1 — HERO + VSL (SPLIT LAYOUT ON DESKTOP, STACKED ON MOBILE) */}
      {/* ------------------------------------------------------------------ */}
      <header className="pt-10 pb-16 sm:pt-14 sm:pb-20 bg-white border-b border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb / Home Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-bold text-slate-500 mb-8">
            <button
              onClick={onGoHome}
              className="hover:text-[#075960] transition cursor-pointer"
            >
              {t.k0}
            </button>
            <span className="text-slate-400">→</span>
            <span className="text-[#3A2E29]">{t.k1}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Headline, Supporting Copy, CTAs */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center space-x-2 text-xs font-extrabold uppercase tracking-widest text-[#075960] bg-[#075960]/10 px-3.5 py-1.5 rounded-full border border-[#075960]/20">
                <span>{t.k2}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight leading-tight">
                {t.k3}
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
                {t.k4}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
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
                  className="inline-flex items-center justify-center sm:justify-start space-x-1.5 text-[#075960] hover:text-[#053d42] font-bold text-sm tracking-wide transition py-2 cursor-pointer group underline underline-offset-4"
                >
                  <span>{t.k6}</span>
                  <ArrowRight className="w-4 h-4 text-[#075960] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

            {/* Right Column: 16:9 VSL Video (Reserved for HTC_VSL_03_How-HTC-Works_v1.mp4) */}
            <div className="lg:col-span-6">
              <div className="space-y-3">
                
                {/* 16:9 Video Player Container */}
                <div className="relative w-full aspect-video bg-[#3A2E29] rounded-2xl overflow-hidden shadow-2xl border border-[#D8D2D4] group">
                  {isVideoPlaying ? (
                    <video
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover z-20 relative bg-black"
                    >
                      <source src="/videos/how-htc-works-vsl.mp4" type="video/mp4" />
                      {t.k7}
                    </video>
                  ) : (
                    /* Subtle Poster / Video Backdrop */
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#241C19] via-[#3A2E29] to-[#4D3E38] flex flex-col justify-between p-6">
                      
                      {/* Top Bar inside Video */}
                      <div className="flex items-center justify-between z-10">
                        <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-semibold text-slate-200 border border-white/10">
                          <span className="w-2 h-2 rounded-full bg-[#075960] animate-pulse" />
                          <span>HTC_VSL_03_How-HTC-Works_v1.mp4</span>
                        </div>
                        <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold text-white/90">
                          1:45
                        </div>
                      </div>

                      {/* Center Play Button Overlay */}
                      <div className="flex flex-col items-center justify-center space-y-3 my-auto z-10">
                        <button
                          onClick={() => setIsVideoPlaying(true)}
                          aria-label={t.k80}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C84600] hover:bg-[#b03d00] text-white flex items-center justify-center shadow-2xl hover:scale-105 transition transform cursor-pointer"
                        >
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                        </button>
                        <div className="text-center">
                          <div className="text-white font-bold text-sm sm:text-base">
                            {t.k8}
                          </div>
                          <div className="text-slate-300 text-xs font-medium">
                            {t.k9}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Controls Bar */}
                      <div className="flex items-center justify-between z-10 pt-2 border-t border-white/10">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="text-slate-300 hover:text-white transition p-1 cursor-pointer"
                            title={isMuted ? 'Unmute' : 'Mute'}
                          >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </button>
                          <span className="text-[11px] font-medium text-slate-300">
                            {isMuted ? 'Muted by default' : 'Sound active'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-[11px] font-bold text-[#20C5D2] bg-[#20C5D2]/20 px-2 py-0.5 rounded">
                          <span>{t.k10}</span>
                        </div>
                      </div>

                    </div>
                  )}

                </div>

                {/* Video Info & View Transcript Option */}
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="text-slate-500 font-medium">
                    {t.k11} <span className="text-slate-700 font-semibold">{t.k12}</span>
                  </span>

                  <button
                    onClick={() => setShowTranscript(!showTranscript)}
                    className="text-[#075960] hover:text-[#053d42] font-bold inline-flex items-center space-x-1 cursor-pointer hover:underline"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{showTranscript ? 'Hide Transcript' : 'View Transcript'}</span>
                    {showTranscript ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Collapsible Transcript Box */}
                {showTranscript && (
                  <div className="p-4 sm:p-5 bg-[#EEEAEB] rounded-xl border border-[#D8D2D4] text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed animate-in fade-in duration-200">
                    <div className="font-bold text-[#3A2E29] flex items-center space-x-1.5 pb-1 border-b border-[#D8D2D4]">
                      <FileText className="w-4 h-4 text-[#075960]" />
                      <span>{language === 'es' ? 'Transcripción del video (en inglés)' : 'Video Transcript'} · HTC_VSL_03_How-HTC-Works_v1.mp4</span>
                    </div>
                    <p className="whitespace-pre-line text-slate-700 text-xs leading-relaxed pt-1">
                      {transcriptText}
                    </p>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 2 — GETTING STARTED */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-[#EEEAEB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-white px-3.5 py-1.5 rounded-full border border-[#D8D2D4]">
              <span>{t.k13}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight">
              {t.k14}
            </h2>
          </div>

          {/* 3-Step Horizontal Process on Desktop / Stacked on Mobile (Numbered Rail) */}
          <div className="relative">
            
            {/* Horizontal Rail Line (Desktop) */}
            <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-[#D8D2D4] -z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 relative z-10">
              
              {/* Step 01 */}
              <div className="flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-2xl bg-white border-2 border-[#075960] text-[#075960] flex items-center justify-center font-black text-xl shadow-sm flex-shrink-0">
                      01
                    </div>
                    <div className="h-0.5 flex-grow bg-[#D8D2D4] lg:hidden" />
                  </div>

                  <div className="space-y-2 pt-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#3A2E29] font-serif">
                      {t.k15}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                      {t.k16}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onBookCall}
                    className="inline-flex items-center space-x-2 text-[#C84600] hover:text-[#9e3700] font-bold text-sm uppercase tracking-wider transition cursor-pointer group"
                  >
                    <span>{t.k5}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Step 02 */}
              <div className="flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-2xl bg-white border-2 border-[#C84600] text-[#C84600] flex items-center justify-center font-black text-xl shadow-sm flex-shrink-0">
                      02
                    </div>
                    <div className="h-0.5 flex-grow bg-[#D8D2D4] lg:hidden" />
                  </div>

                  <div className="space-y-2 pt-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#3A2E29] font-serif">
                      {t.k17}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                      {t.k18}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onExploreServices}
                    className="inline-flex items-center space-x-1.5 text-[#075960] hover:text-[#053d42] font-bold text-sm tracking-wide transition cursor-pointer group underline underline-offset-4"
                  >
                    <span>{t.k19}</span>
                    <ArrowRight className="w-4 h-4 text-[#075960] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Step 03 */}
              <div className="flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-2xl bg-white border-2 border-[#3A2E29] text-[#3A2E29] flex items-center justify-center font-black text-xl shadow-sm flex-shrink-0">
                      03
                    </div>
                    <div className="h-0.5 flex-grow bg-[#D8D2D4] lg:hidden" />
                  </div>

                  <div className="space-y-2 pt-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#3A2E29] font-serif">
                      {t.k20}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                      {t.k21}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onSubmitDeal}
                    className="inline-flex items-center space-x-2 text-[#C84600] hover:text-[#9e3700] font-bold text-sm uppercase tracking-wider transition cursor-pointer group"
                  >
                    <span>{t.k22}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 3 — CHOOSE THE SUPPORT YOU NEED */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-white border-y border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-[#EEEAEB] px-3.5 py-1.5 rounded-full border border-[#D8D2D4]">
              <span>{t.k23}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight">
              {t.k24}
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {t.k25}
            </p>
          </div>

          {/* Three Equal Service Cards (Desktop 3-col, Mobile Stacked) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            
            {/* Card 1: LISTING LAUNCH */}
            <div className="bg-[#EEEAEB] rounded-2xl p-6 sm:p-8 border border-[#D8D2D4] flex flex-col justify-between space-y-6 hover:border-[#075960] transition shadow-sm hover:shadow-md group">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-[#075960] bg-white px-3 py-1 rounded-full border border-[#D8D2D4]">
                  <span>{t.k26}</span>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#3A2E29] font-serif">
                    {t.k27}
                  </h3>
                  <div className="text-xs font-semibold text-[#C84600] mt-1">
                    {t.k28}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {t.k29}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D8D2D4]">
                <button
                  onClick={onOpenListingCoordination || onExploreServices}
                  className="inline-flex items-center space-x-1.5 text-[#075960] hover:text-[#053d42] font-bold text-xs uppercase tracking-wider transition cursor-pointer group-hover:translate-x-0.5 underline underline-offset-4"
                >
                  <span>{t.k30}</span>
                  <ArrowRight className="w-4 h-4 text-[#075960] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Card 2: CONTRACT-TO-CLOSE */}
            <div className="bg-[#EEEAEB] rounded-2xl p-6 sm:p-8 border border-[#D8D2D4] flex flex-col justify-between space-y-6 hover:border-[#C84600] transition shadow-sm hover:shadow-md group">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-[#C84600] bg-white px-3 py-1 rounded-full border border-[#D8D2D4]">
                  <span>{t.k31}</span>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#3A2E29] font-serif">
                    {t.k32}
                  </h3>
                  <div className="text-xs font-semibold text-[#C84600] mt-1">
                    {t.k33}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {t.k34}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D8D2D4]">
                <button
                  onClick={onOpenContractToClose || onExploreServices}
                  className="inline-flex items-center space-x-1.5 text-[#075960] hover:text-[#053d42] font-bold text-xs uppercase tracking-wider transition cursor-pointer group-hover:translate-x-0.5 underline underline-offset-4"
                >
                  <span>{t.k35}</span>
                  <ArrowRight className="w-4 h-4 text-[#075960] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Card 3: BROKER COMPLIANCE */}
            <div className="bg-[#EEEAEB] rounded-2xl p-6 sm:p-8 border border-[#D8D2D4] flex flex-col justify-between space-y-6 hover:border-[#075960] transition shadow-sm hover:shadow-md group">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-[#3A2E29] bg-white px-3 py-1 rounded-full border border-[#D8D2D4]">
                  <span>{t.k36}</span>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#3A2E29] font-serif">
                    {t.k37}
                  </h3>
                  <div className="text-xs font-semibold text-[#C84600] mt-1">
                    {t.k38}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {t.k39}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D8D2D4]">
                <button
                  onClick={onOpenBrokerCompliance || onExploreServices}
                  className="inline-flex items-center space-x-1.5 text-[#075960] hover:text-[#053d42] font-bold text-xs uppercase tracking-wider transition cursor-pointer group-hover:translate-x-0.5 underline underline-offset-4"
                >
                  <span>{t.k40}</span>
                  <ArrowRight className="w-4 h-4 text-[#075960] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 4 — WHAT HAPPENS AFTER YOU SUBMIT A CONTRACT (H.O.M.E. CLOSE METHOD) */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-[#EEEAEB] border-b border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-white px-3.5 py-1.5 rounded-full border border-[#D8D2D4]">
              <span>{t.k32}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight">
              {t.k41}
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {t.k42}
            </p>
          </div>

          {/* Continuous Four-Part Horizontal Progression on Desktop / Vertical Progression on Mobile */}
          <div className="relative">
            
            {/* Horizontal Continuous Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-7 left-10 right-10 h-0.5 bg-[#D8D2D4] -z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-8 relative z-10">
              {homeMethodSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    {/* Anchor Letter Node & Mobile Track */}
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-14 h-14 rounded-2xl bg-white border-2 flex items-center justify-center font-black text-2xl shadow-sm flex-shrink-0"
                        style={{ borderColor: step.color, color: step.color }}
                      >
                        {step.letter}
                      </div>
                      <div className="h-0.5 flex-grow bg-[#D8D2D4] lg:hidden" />
                    </div>

                    <div className="space-y-2 pt-1">
                      <h3 className="text-xl font-bold text-[#3A2E29] font-serif">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-700 leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Link Under Process */}
          <div className="pt-2">
            <button
              onClick={onCompareBasePro || onExploreServices}
              className="inline-flex items-center space-x-2 text-[#C84600] hover:text-[#9e3700] font-bold text-sm uppercase tracking-wider transition cursor-pointer group underline underline-offset-4"
            >
              <span>{t.k43}</span>
              <ArrowRight className="w-4 h-4 text-[#C84600] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 5 — FAQ */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-white border-y border-[#D8D2D4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-[#EEEAEB] px-3.5 py-1.5 rounded-full border border-[#D8D2D4]">
              <span>{t.k44}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight">
              {t.k45}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, fIdx) => {
              const isOpen = openFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className="bg-[#EEEAEB] rounded-2xl border border-[#D8D2D4] overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-[#3A2E29] hover:text-[#075960] transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#C84600] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm sm:text-base text-slate-700 font-normal leading-relaxed border-t border-[#D8D2D4] pt-4 bg-white space-y-3">
                      <p>{faq.a}</p>
                      {faq.linkText && faq.linkAction && (
                        <div className="pt-2">
                          <button
                            onClick={faq.linkAction}
                            className="inline-flex items-center space-x-1.5 text-[#C84600] hover:text-[#9e3700] font-bold text-xs uppercase tracking-wider transition cursor-pointer group underline underline-offset-4"
                          >
                            <span>{faq.linkText}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#C84600] group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Have More Questions Prompt Block */}
          <div className="pt-6 p-8 rounded-2xl bg-[#EEEAEB] border border-[#D8D2D4] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#3A2E29] font-serif">
                {t.k46}
              </h3>
              <p className="text-sm sm:text-base text-slate-700 font-normal">
                {t.k47}
              </p>
            </div>
            <button
              onClick={onBookCall}
              className="bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-7 py-3.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2 cursor-pointer flex-shrink-0 group"
            >
              <span>{t.k5}</span>
              <ArrowRight className="w-4 h-4 text-[#1A1412] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 6 — PRIMARY PAGE CTA */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-[#3A2E29] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#20C5D2] bg-black/40 px-4 py-1.5 rounded-full border border-[#20C5D2]/40">
            <ShieldCheck className="w-4 h-4 text-[#FE7311]" />
            <span>{t.k48}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight leading-tight">
            {t.k49}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            {t.k50}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onBookCall}
              className="w-full sm:w-auto bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-9 py-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-2xl transition flex items-center justify-center space-x-2.5 cursor-pointer group"
            >
              <PhoneCall className="w-4 h-4 text-[#1A1412]" />
              <span>{t.k5}</span>
              <ArrowRight className="w-4 h-4 text-[#1A1412] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreServices}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-sm border border-white/20 transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{t.k6}</span>
              <ArrowRight className="w-4 h-4 text-[#20C5D2]" />
            </button>
          </div>

          <div className="pt-2 flex items-center justify-center space-x-6 text-xs text-slate-400 font-medium">
            <span>{t.k51} <strong className="text-white">{PHONE_NUMBER}</strong></span>
          </div>

        </div>
      </section>

    </main>
  );
};

