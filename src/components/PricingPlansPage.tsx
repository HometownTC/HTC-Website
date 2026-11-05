import React, { useState } from 'react';
import {
  Check,
  HelpCircle,
  PhoneCall,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  ShieldCheck,
  Layers,
  Clock,
  ArrowUp,
  CheckCircle2
} from 'lucide-react';
import { PRICING_PAGE_DATA } from '../data/pricingData';
import { PRICING_PAGE_DATA_ES } from '../data/pricingData.es';
import { usePageSeo } from '../hooks/usePageSeo';
import { getOrganizationSchema, getFaqSchema } from '../utils/seoUtils';
import { ScaleWaitlistModal } from './ScaleWaitlistModal';
import { trackPricingPlanClick } from '../utils/analytics';
import type { Language } from '../types';

const COPY = {
  "en": {
    "k0": "Purpose:",
    "k1": "Due at registration for new clients before Setup Call",
    "k2": "What Is Included in Every Listing Launch:",
    "k3": "Optional Add-Ons:",
    "k4": "You Own",
    "k5": "We Own",
    "k6": "Residential Timing",
    "k7": "Cancellation Policy",
    "k8": "Additional Services & Add-Ons:",
    "k9": "What We Handle:",
    "k10": "Agent Provides:",
    "k11": "Focused Specifically on Brokerage File Approval:",
    "k12": "Broker Compliance is focused specifically on brokerage file approval. Pro client communication, buyer/seller milestone reminders, inspection/lender coordination, and full Contract-to-Close coordination are not included.",
    "k13": "Custom support may include:",
    "k14": "What SCALE includes",
    "k15": "Pick your plan",
    "k16": "Most flexible",
    "k17": "Join SCALE",
    "k18": "Questions first? Call us at",
    "k19": "FREQUENTLY ASKED QUESTIONS",
    "k20": "Frequently Asked Questions",
    "k21": "Base:",
    "k22": "Pro:",
    "k23": "Have questions about workflows, clients, or technology?",
    "k24": "Explore all 6 categories in our complete FAQ directory including Services, Getting Started, Working Together, Your Clients, and Trust + Technology.",
    "k25": "VISIT COMPLETE FAQ DIRECTORY",
    "k26": "Florida TC Services & Pricing Plans | Hometown TC",
    "k27": "Boutique transaction coordination pricing for Florida agents. The Hometown Signature at $495 per closed side, Listing Launch, SCALE, and bilingual TC support.",
    "k28": "Pricing & Services",
    "k29": "Florida Real Estate Transaction Coordination & Listing Launch",
    "k30": "Hometown Transaction Coordinators",
    "k31": "The Hometown Signature (Contract-to-Close)",
    "k32": "Complete contract-to-close transaction management and client care, per closed side. Paid at closing.",
    "k33": "LAMP Weekly Seller Reports",
    "k34": "Weekly seller reports while a listing HTC launched is active: showings, buyer feedback and next steps. Per month; included with SCALE.",
    "k35": "Listing Launch (Standard)",
    "k36": "Pre-market listing launch and full MLS draft input with 3 business days turnaround.",
    "k37": "Listing Launch (Priority)",
    "k38": "Expedited pre-market listing launch and MLS draft input with 1 business day turnaround.",
    "k39": "Broker Compliance (Rental / Lease File)",
    "k40": "Broker compliance audit and portal upload for residential rental and lease agreements.",
    "k41": "Broker Compliance (Sale / Purchase Contract)",
    "k42": "Broker compliance audit and portal upload for residential purchase and sales files.",
    "k43": "Agent Setup Investment",
    "k44": "One-time setup and systems integration investment for new HTC clients.",
    "k45": "Month to month",
    "k46": "Cancel anytime",
    "k47": "3 months up front",
    "k48": "Save $119.10",
    "k49": "6 months up front",
    "k50": "Save $357.30",
    "k51": "1 year up front",
    "k52": "Save $952.80",
    "k53": "3 Listing Launches a month",
    "k54": "In the MLS within 1 business day once we have your photos, supplements and showing instructions.",
    "k55": "Every included listing gets the extras",
    "k56": "Condo & HOA research, 5 virtually staged photos on request, and LAMP weekly seller reports.",
    "k57": "Document drafting",
    "k58": "Listing agreements, offers, buyer broker and showing agreements, from your written instructions. FREC compliant, sent for signature through DocuSign.",
    "k59": "Referral Management",
    "k60": "Monthly check-ins with your client and referral partner. W-9s and agreements collected on time.",
    "k61": "NEST post-closing care",
    "k62": "Nurture • Engage • Stay Top-of-Mind: touches at 30, 60, 90, 180 and 365 days, plus your monthly PORCH Report.",
    "k63": "Night & weekend support",
    "k64": "For SCALE members only.",
    "k65": "Per agent",
    "k66": "SCALE covers one agent’s own business. Teams: each member has their own membership. Ask us about a group rate.",
    "k67": "Need more?",
    "k68": "Anything beyond your 3 monthly Listing Launches is 25% off regular prices for SCALE members.",
    "k69": "Fair use",
    "k70": "SCALE is sized for a busy solo agent. Memberships used beyond one agent’s business may be paused or ended.",
    "k71": "/ month",
    "k72": "once",
    "k73": "10% off",
    "k74": "15% off",
    "k75": "20% off"
  },
  "es": {
    "k0": "Propósito:",
    "k1": "Se paga al registrarse, antes de la llamada de configuración",
    "k2": "Lo que incluye cada Lanzamiento de Listado:",
    "k3": "Opcionales:",
    "k4": "Usted se encarga de",
    "k5": "Nosotros nos encargamos de",
    "k6": "Plazo residencial",
    "k7": "Política de cancelación",
    "k8": "Servicios adicionales y opcionales:",
    "k9": "Lo que manejamos:",
    "k10": "El agente proporciona:",
    "k11": "Enfocado específicamente en la aprobación del expediente en el brokerage:",
    "k12": "Cumplimiento con el Broker se enfoca específicamente en la aprobación del expediente en el brokerage. No incluye la comunicación con el cliente de Pro, los recordatorios de hitos para comprador o vendedor, la coordinación de inspección o prestamista, ni la coordinación completa De Contrato a Cierre.",
    "k13": "El apoyo a la medida puede incluir:",
    "k14": "Lo que incluye SCALE",
    "k15": "Elija su plan",
    "k16": "El más flexible",
    "k17": "Unirse a SCALE",
    "k18": "¿Preguntas primero? Llámenos al",
    "k19": "PREGUNTAS FRECUENTES",
    "k20": "Preguntas frecuentes",
    "k21": "Base:",
    "k22": "Pro:",
    "k23": "¿Tiene preguntas sobre flujos de trabajo, clientes o tecnología?",
    "k24": "Explore las 6 categorías de nuestro directorio completo de preguntas frecuentes, incluyendo Servicios, Para Empezar, Trabajando Juntos, Sus Clientes y Confianza + Tecnología.",
    "k25": "VER EL DIRECTORIO COMPLETO DE PREGUNTAS",
    "k26": "Servicios y Precios de Coordinación de Transacciones en Florida | Hometown TC",
    "k27": "Precios de coordinación de transacciones boutique para agentes en Florida. The Hometown Signature a $495 por lado cerrado, Lanzamiento de Listados, SCALE y apoyo bilingüe.",
    "k28": "Precios y Servicios",
    "k29": "Coordinación de transacciones inmobiliarias y Lanzamiento de Listados en Florida",
    "k30": "Hometown Transaction Coordinators",
    "k31": "The Hometown Signature (De Contrato a Cierre)",
    "k32": "Manejo completo de la transacción De Contrato a Cierre y atención al cliente, por lado cerrado. Se paga al cierre.",
    "k33": "Reportes semanales LAMP para el vendedor",
    "k34": "Reportes semanales para el vendedor mientras un listado lanzado por HTC está activo: visitas, comentarios de compradores y próximos pasos. Por mes; incluido con SCALE.",
    "k35": "Lanzamiento de Listado (Estándar)",
    "k36": "Lanzamiento previo al mercado y borrador completo en el MLS en 3 días hábiles.",
    "k37": "Lanzamiento de Listado (Prioritario)",
    "k38": "Lanzamiento acelerado previo al mercado y borrador en el MLS en 1 día hábil.",
    "k39": "Cumplimiento con el Broker (Expediente de alquiler)",
    "k40": "Auditoría de cumplimiento y carga al portal del broker para contratos de alquiler residencial.",
    "k41": "Cumplimiento con el Broker (Contrato de compraventa)",
    "k42": "Auditoría de cumplimiento y carga al portal del broker para expedientes de compraventa residencial.",
    "k43": "Inversión de Configuración del Agente",
    "k44": "Inversión única de configuración e integración de sistemas para nuevos clientes de HTC.",
    "k45": "Mes a mes",
    "k46": "Cancele cuando quiera",
    "k47": "3 meses por adelantado",
    "k48": "Ahorre $119.10",
    "k49": "6 meses por adelantado",
    "k50": "Ahorre $357.30",
    "k51": "1 año por adelantado",
    "k52": "Ahorre $952.80",
    "k53": "3 Lanzamientos de Listado al mes",
    "k54": "En el MLS en 1 día hábil una vez que tengamos sus fotos, anexos e instrucciones de visita.",
    "k55": "Cada listado incluido recibe los extras",
    "k56": "Investigación de condominio y HOA, 5 fotos con staging virtual a solicitud y reportes semanales LAMP para el vendedor.",
    "k57": "Redacción de documentos",
    "k58": "Contratos de listado, ofertas, acuerdos de representación del comprador y de visitas, según sus instrucciones por escrito. Conforme a FREC, enviados para firma por DocuSign.",
    "k59": "Manejo de referidos",
    "k60": "Contacto mensual con su cliente y su aliado de referidos. Formularios W-9 y acuerdos recopilados a tiempo.",
    "k61": "Atención post-cierre NEST",
    "k62": "Nurture • Engage • Stay Top-of-Mind: contactos a los 30, 60, 90, 180 y 365 días, más su Reporte PORCH mensual.",
    "k63": "Apoyo de noche y fines de semana",
    "k64": "Solo para miembros de SCALE.",
    "k65": "Por agente",
    "k66": "SCALE cubre el negocio propio de un agente. Equipos: cada miembro tiene su propia membresía. Pregúntenos por una tarifa de grupo.",
    "k67": "¿Necesita más?",
    "k68": "Todo lo que pase de sus 3 Lanzamientos de Listado mensuales tiene 25% de descuento sobre el precio regular para miembros de SCALE.",
    "k69": "Uso justo",
    "k70": "SCALE está pensado para un agente individual ocupado. Las membresías usadas más allá del negocio de un agente pueden pausarse o terminarse.",
    "k71": "/ mes",
    "k72": "pago único",
    "k73": "10% menos",
    "k74": "15% menos",
    "k75": "20% menos"
  }
} as const;


interface Props {
  onBookCall: () => void;
  onSubmitDeal: () => void;
  onGoHome: () => void;
  onOpenTransactionCoordination: () => void;
  onOpenListingCoordination: () => void;
  onOpenHowItWorks: () => void;
  onOpenWhyHtc: () => void;
  onOpenRoi: () => void;
  onOpenTcWorkshop?: () => void;
  onOpenFaq?: () => void;
  language?: Language;
}

export const PricingPlansPage: React.FC<Props> = ({
  onBookCall,
  onSubmitDeal,
  onGoHome,
  onOpenRoi,
  onOpenTcWorkshop,
  onOpenFaq,
  language = 'en',
}) => {
  const t = COPY[language];
  const es = language === 'es';
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const data = es ? PRICING_PAGE_DATA_ES : PRICING_PAGE_DATA;

  usePageSeo({
    title: t.k26,
    description: t.k27,
    canonicalUrl: es ? 'https://hometowntc.com/es/precios/' : 'https://hometowntc.com/pricing/',
    language,
    alternates: [
      { lang: 'en', url: 'https://hometowntc.com/pricing/' },
      { lang: 'es', url: 'https://hometowntc.com/es/precios/' }
    ],
    breadcrumbs: [
      { name: es ? 'Inicio' : 'Home', url: es ? 'https://hometowntc.com/es/' : 'https://hometowntc.com/' },
      { name: t.k28, url: es ? 'https://hometowntc.com/es/precios/' : 'https://hometowntc.com/pricing/' }
    ],
    structuredData: [
      getOrganizationSchema(language),
      getFaqSchema(
        data.faqs.map(item => ({
          q: item.question,
          a: item.answerParagraphs.join(' ')
        }))
      ),
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: t.k29,
        provider: {
          '@type': 'Organization',
          name: t.k30
        },
        areaServed: 'Florida',
        offers: [
          {
            '@type': 'Offer',
            name: t.k31,
            price: '495.00',
            priceCurrency: 'USD',
            description: t.k32
          },
          {
            '@type': 'Offer',
            name: t.k33,
            price: '99.00',
            priceCurrency: 'USD',
            description: t.k34
          },
          {
            '@type': 'Offer',
            name: t.k35,
            price: '125.00',
            priceCurrency: 'USD',
            description: t.k36
          },
          {
            '@type': 'Offer',
            name: t.k37,
            price: '225.00',
            priceCurrency: 'USD',
            description: t.k38
          },
          {
            '@type': 'Offer',
            name: t.k39,
            price: '100.00',
            priceCurrency: 'USD',
            description: t.k40
          },
          {
            '@type': 'Offer',
            name: t.k41,
            price: '195.00',
            priceCurrency: 'USD',
            description: t.k42
          },
          {
            '@type': 'Offer',
            name: t.k43,
            price: '399.00',
            priceCurrency: 'USD',
            description: t.k44
          }
        ]
      }
    ]
  });

  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#3A2E29]">
      
      {/* 1. HERO + VSL */}
      <section className="pt-12 pb-16 bg-white border-b border-[#D8D2D4]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          
          {/* Header Copy */}
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 bg-[#075960]/10 text-[#075960] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <span>{data.hero.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight">
              {data.hero.title}
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {data.hero.description}
            </p>
          </div>

          {/* Simple Inline Jump Links (No Cards) */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs sm:text-sm font-semibold text-slate-700">
            {data.hero.jumpLinks.map((link, idx) => (
              <React.Fragment key={link.targetId}>
                <button
                  onClick={() => scrollToSection(link.targetId)}
                  className="hover:text-[#075960] transition cursor-pointer underline-offset-4 hover:underline"
                >
                  {link.label}
                </button>
                {idx < data.hero.jumpLinks.length - 1 && (
                  <span className="text-slate-300 select-none">|</span>
                )}
              </React.Fragment>
            ))}
          </div>

        </div>
      </section>

      {/* 2. AGENT SETUP INVESTMENT */}
      <section
        id="agent-setup"
        className="py-12 lg:py-16 bg-white border-b border-[#D8D2D4] scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#D8D2D4] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-[#075960]/10 text-[#075960] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{data.agentSetup.badge}</span>
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3A2E29] font-serif">
                  {data.agentSetup.name}
                </h2>
                <p className="text-xs font-bold uppercase tracking-wider text-[#C84600]">
                  {data.agentSetup.timing}
                </p>
              </div>
              <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">
                <strong className="text-[#3A2E29]">{t.k0}</strong> {data.agentSetup.purpose}
              </p>
              <ul className="grid sm:grid-cols-2 gap-2.5 pt-1 text-xs text-slate-600">
                {data.agentSetup.details.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <div className="w-4 h-4 rounded-full bg-[#075960]/15 text-[#075960] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-start lg:items-end justify-between border-t lg:border-t-0 lg:border-l border-[#D8D2D4] pt-6 lg:pt-0 lg:pl-8 flex-shrink-0 space-y-4">
              <div className="lg:text-right">
                <div className="text-3xl sm:text-4xl font-black font-serif text-[#3A2E29]">
                  {data.agentSetup.price}
                </div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  {data.agentSetup.priceNote}
                </div>
                <div className="text-[11px] text-[#075960] font-bold mt-1 max-w-[220px] lg:text-right">
                  {t.k1}
                </div>
              </div>

              <a
                href="/register/"
                className="inline-flex items-center space-x-2 bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
              >
                <span>{data.agentSetup.ctaText}</span>
                <ArrowRight className="w-4 h-4 text-[#1A1412]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LISTING LAUNCH (Editorial Two-Column Layout | Background: Cream) */}
      <section
        id="listing-launch"
        className="py-16 lg:py-20 bg-[#EEEAEB] border-b border-[#D8D2D4] scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Eyebrow & Headline */}
          <div className="mb-10 space-y-2">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#075960]">
              {data.listingLaunch.eyebrow}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#3A2E29] font-serif">
              {data.listingLaunch.name}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
              {data.listingLaunch.description}
            </p>
          </div>

          {/* Two-Column Editorial Layout */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Column: Service Details & What's Handled */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="font-bold text-base text-[#3A2E29] uppercase tracking-wider text-xs">
                {t.k2}
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                {data.listingLaunch.included.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-[#075960]/15 text-[#075960] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <button
                  onClick={onSubmitDeal}
                  className="inline-flex items-center space-x-2 bg-[#075960] hover:bg-[#053d42] text-white px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer group"
                >
                  <span>{data.listingLaunch.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Column: Standard / Priority Pricing + Add-Ons */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-4">
                {data.listingLaunch.options.map((opt, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-white rounded-2xl border border-[#D8D2D4] shadow-sm flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-sm sm:text-base text-[#3A2E29]">
                          {opt.title}
                        </h4>
                        {opt.badge && (
                          <span className="bg-[#FE7311] text-[#1A1412] text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-[#075960]" />
                        <span>{opt.turnaround}</span>
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-2xl font-extrabold text-[#3A2E29]">
                        {opt.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add-Ons Sub-List */}
              <div className="pt-2 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t.k3}
                </div>
                <div className="space-y-2 text-xs">
                  {data.listingLaunch.addons.map((addon, idx) => (
                    <div
                      key={idx}
                      className="flex items-baseline justify-between py-2 border-b border-[#D8D2D4]/70 gap-4"
                    >
                      <div className="text-slate-700">
                        <span className="font-semibold text-[#3A2E29]">{addon.name}</span>
                        {addon.note && (
                          <span className="text-slate-500 block text-[11px] mt-0.5">
                            {addon.note}
                          </span>
                        )}
                        {addon.includedWithScale && (
                          <a href="#scale" className="inline-block text-[11px] font-semibold text-[#C84600] hover:underline mt-1">
                            {typeof addon.includedWithScale === 'string' ? addon.includedWithScale : 'Included with SCALE'} · Learn more
                          </a>
                        )}
                      </div>
                      <span className="font-bold text-[#075960] flex-shrink-0 text-right whitespace-nowrap">
                        {addon.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. CONTRACT-TO-CLOSE — THE HOMETOWN SIGNATURE (one card | Background: White) */}
      <section
        id="contract-to-close"
        className="py-16 lg:py-24 bg-white border-b border-[#D8D2D4] scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section Eyebrow & Headline */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#075960]">
              {data.contractToClose.eyebrow}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3A2E29] font-serif">
              {data.contractToClose.name}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {data.contractToClose.description}
            </p>
            <p className="text-xs text-slate-500 pt-1">
              <em>{data.contractToClose.setupNote}</em>
            </p>
          </div>

          {/* The Hometown Signature (single plan; Base retired, Pro renamed Nov 2026) */}
          {data.contractToClose.plans.map((plan) => (
            <div
              key={plan.id}
              className="max-w-4xl mx-auto bg-white rounded-3xl border-2 border-[#FE7311] shadow-xl text-[#3A2E29] overflow-hidden"
            >
              <div className="p-8 sm:p-10 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-6 border-b border-[#D8D2D4]">
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#3A2E29]">{plan.name}</h3>
                    {plan.tagline && <p className="mt-2 text-base sm:text-lg font-bold text-[#C84600]">{plan.tagline}</p>}
                  </div>
                  <div className="flex items-baseline gap-2 sm:text-right">
                    <span className="text-5xl font-extrabold font-serif text-[#3A2E29]">{plan.price}</span>
                    <span className="text-sm text-slate-500">{plan.priceNote}</span>
                  </div>
                </div>

                {plan.intro && (
                  <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700 max-w-3xl">
                    {plan.intro.map((t, i) => <p key={i}>{t}</p>)}
                  </div>
                )}

                <div className="grid md:grid-cols-5 gap-6">
                  {plan.youOwn && (
                    <div className="md:col-span-2 rounded-2xl bg-[#EEEAEB] border border-[#D8D2D4] p-6 space-y-4">
                      <div className="text-xs font-extrabold uppercase tracking-widest text-[#075960]">{t.k4}</div>
                      <ul className="space-y-4">
                        {plan.youOwn.map((item) => (
                          <li key={item.title} className="text-sm leading-relaxed">
                            <span className="block font-bold text-[#3A2E29]">{item.title}</span>
                            <span className="text-slate-600">{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {plan.weOwn && (
                    <div className="md:col-span-3 rounded-2xl bg-[#3A2E29] text-white p-6 space-y-4">
                      <div className="text-xs font-extrabold uppercase tracking-widest text-[#20C5D2]">{t.k5}</div>
                      <ul className="space-y-3.5">
                        {plan.weOwn.map((item) => (
                          <li key={item.title} className="flex items-start gap-2.5 text-sm leading-relaxed">
                            <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-[#20C5D2]/25 text-[#20C5D2]">
                              <Check className="w-3 h-3" />
                            </div>
                            <span><strong className="text-white">{item.title}:</strong> <span className="text-slate-200">{item.text}</span></span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {plan.closing && (
                  <div className="text-center space-y-1.5 pt-2">
                    <p className="text-xl font-extrabold font-serif text-[#3A2E29]">{plan.closing[0]}</p>
                    {plan.closing.slice(1, -2).map((t, i) => <p key={i} className="text-sm text-slate-600">{t}</p>)}
                    <p className="text-sm font-bold text-[#075960] pt-1">{plan.closing.slice(-2).join(' ')}</p>
                  </div>
                )}

                <a
                  href={plan.href || '/register/'}
                  onClick={() => trackPricingPlanClick(plan.name, plan.id)}
                  className="w-full sm:w-auto sm:mx-auto sm:px-12 py-4 rounded-xl font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-md flex items-center justify-center space-x-2 bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412]"
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}

          {/* Residential Timing & Cancellation Policy Clear Blocks */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#D8D2D4] space-y-1.5 shadow-xs">
              <div className="flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-[#C84600]">
                <Clock className="w-4 h-4 text-[#C84600]" />
                <span>{t.k6}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {data.contractToClose.timingNote}
              </p>
            </div>

            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#D8D2D4] space-y-1.5 shadow-xs">
              <div className="flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-[#075960]">
                <ShieldCheck className="w-4 h-4" />
                <span>{t.k7}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {data.contractToClose.cancellationNote}
              </p>
            </div>
          </div>

          {/* Additional Contract-to-Close Services */}
          <div className="pt-2 border-t border-[#D8D2D4] space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.k8}
            </div>
            <div className="grid sm:grid-cols-2 gap-5 text-xs">
              {data.contractToClose.additionalServices.map((svc, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#D8D2D4] shadow-xs space-y-1.5"
                >
                  <strong className="text-sm font-bold text-[#3A2E29] block">{svc.name}</strong>
                  <p className="text-xs text-slate-600 leading-relaxed">{svc.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. BROKER COMPLIANCE (Clean Two-Column Editorial Section | Background: Cream) */}
      <section
        id="broker-compliance"
        className="py-16 lg:py-20 bg-[#EEEAEB] border-b border-[#D8D2D4] scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10 space-y-2">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#075960]">
              {data.brokerCompliance.eyebrow}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#3A2E29] font-serif">
              {data.brokerCompliance.name}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
              {data.brokerCompliance.description}
            </p>
          </div>

          {/* Clean Two-Column Editorial Section */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Column: Scope, Agent Provides, and Boundary */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#3A2E29]">
                  {t.k9}
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  {data.brokerCompliance.whatWeHandle.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-[#075960]/15 text-[#075960] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Agent Provides */}
              <div className="p-4 bg-white rounded-2xl border border-[#D8D2D4] space-y-2 shadow-xs">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#C84600]">
                  {t.k10}
                </h4>
                <ul className="grid sm:grid-cols-1 gap-2 text-xs text-slate-700">
                  {data.brokerCompliance.agentProvides.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C84600] flex-shrink-0" />
                      <span className="capitalize">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Scope Boundary Notice */}
              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#D8D2D4] space-y-1.5">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  {t.k11}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.k12}
                </p>
              </div>
            </div>

            {/* Right Column: Rental $100 | Contract $195 Due when submitted */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-3">
                {data.brokerCompliance.rates.map((rate, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-white rounded-2xl border border-[#D8D2D4] shadow-sm flex items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-[#3A2E29]">
                        {rate.type}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 capitalize">
                        {rate.paymentNote}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#3A2E29]">
                        {rate.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={onSubmitDeal}
                  className="w-full inline-flex items-center justify-center space-x-2 bg-[#075960] hover:bg-[#053d42] text-white px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer group"
                >
                  <span>{data.brokerCompliance.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. TEAMS + BROKERAGES (Three Simple Service Areas | Background: White) */}
      <section
        id="teams-brokerages"
        className="py-16 lg:py-24 bg-white border-b border-[#D8D2D4] scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#075960]">
              {data.teamsBrokerages.eyebrow}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3A2E29] font-serif">
              {data.teamsBrokerages.name}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {data.teamsBrokerages.description}
            </p>
          </div>

          {/* Three Simple Service Areas (No Flat Public Price) */}
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 text-center">
              {t.k13}
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {data.teamsBrokerages.serviceAreas.map((area, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#D8D2D4] space-y-3 text-left shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#075960]/10 text-[#075960] flex items-center justify-center font-bold">
                    {idx === 0 && <ShieldCheck className="w-5 h-5" />}
                    {idx === 1 && <Layers className="w-5 h-5" />}
                    {idx === 2 && <Sparkles className="w-5 h-5" />}
                  </div>
                  <h3 className="font-bold text-base text-[#3A2E29] font-serif">
                    {area.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs: BOOK A 15-MINUTE FIT CALL & EXPLORE THE FLORIDA TC WORKSHOP */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onBookCall}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-8 py-4 rounded-xl font-black text-xs uppercase tracking-wider transition shadow-md cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#1A1412]" />
              <span>{data.teamsBrokerages.ctaPrimary}</span>
            </button>

            {onOpenTcWorkshop ? (
              <button
                onClick={onOpenTcWorkshop}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white hover:bg-[#EEEAEB] text-[#075960] border-2 border-[#075960] px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer group"
              >
                <span>{data.teamsBrokerages.ctaSecondary}</span>
                <ArrowRight className="w-4 h-4 text-[#075960] group-hover:translate-x-0.5 transition-transform" />
              </button>
            ) : (
              <a
                href="https://www.hometowntc.com/tcworkshop"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white hover:bg-[#EEEAEB] text-[#075960] border-2 border-[#075960] px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer group"
              >
                <span>{data.teamsBrokerages.ctaSecondary}</span>
                <ArrowRight className="w-4 h-4 text-[#075960] group-hover:translate-x-0.5 transition-transform" />
              </a>
            )}
          </div>

        </div>
      </section>

      {/* 6. SCALE — NOW OPEN (Oct 30, 2026: Michelle — say what it is, what it carries, and the options) */}
      <section
        id="scale"
        className="py-16 lg:py-20 bg-[#EEEAEB] border-b border-[#D8D2D4] scroll-mt-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#3A2E29] text-white rounded-3xl p-6 sm:p-10 border border-[#D8D2D4] shadow-xl space-y-6">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/10 text-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">
                <Zap className="w-3.5 h-3.5 text-[#FDBB16]" />
                <span>{data.scale.eyebrow}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-serif">
                {data.scale.headline}
              </h2>
              <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                {data.scale.description}
              </p>
            </div>

            <div className="bg-white/5 border border-white/15 rounded-2xl p-5 sm:p-6">
              <p className="text-[#FDBB16] text-xs font-black uppercase tracking-wider mb-3">{t.k14}</p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-slate-100">
                {[
                  [t.k53, t.k54],
                  [t.k55, t.k56],
                                    [t.k57, t.k58],
                  [t.k59, t.k60],
                  [t.k61, t.k62],
                  [t.k63, t.k64],
                ].map(([title, d]) => (
                  <li key={title} className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#0D9BA3]" />
                    <span><b className="text-white">{title}.</b> <span className="text-slate-300">{d}</span></span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 text-xs">
              {[
                [t.k65, t.k66],
                [t.k67, t.k68],
                [t.k69, t.k70],
              ].map(([title, d]) => (
                <div key={title} className="rounded-xl border border-white/15 bg-white/5 p-4">
                  <p className="font-black uppercase tracking-wider text-[#FDBB16] mb-1">{title}</p>
                  <p className="text-slate-300 leading-relaxed">{d}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-center text-[#FDBB16] text-xs font-black uppercase tracking-wider mb-3">{t.k15}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { plan: 'monthly', name: t.k45, price: '$397', unit: t.k71, note: t.k46, save: '', best: true },
                  { plan: 'prepaid_3', name: t.k47, price: '$1,071.90', unit: t.k72, note: t.k48, save: t.k73, best: false },
                  { plan: 'prepaid_6', name: t.k49, price: '$2,024.70', unit: t.k72, note: t.k50, save: t.k74, best: false },
                  { plan: 'prepaid_12', name: t.k51, price: '$3,811.20', unit: t.k72, note: t.k52, save: t.k75, best: false },
                ].map((o) => (
                  <a
                    key={o.plan}
                    href={`https://team.hometowntc.com/homebase/scale.html?plan=${o.plan}`}
                    className={`block rounded-2xl p-4 text-center transition border-2 ${o.best ? 'bg-white text-[#3A2E29] border-[#FE7311]' : 'bg-white/95 text-[#3A2E29] border-transparent hover:border-[#0D9BA3]'}`}
                  >
                    <div className="h-5 mb-1">
                      {o.best ? <span className="text-[10px] font-black uppercase tracking-wider text-[#FE7311]">{t.k16}</span> : <span className="text-[10px] font-black uppercase tracking-wider bg-[#FDBB16] text-[#3A2E29] px-2 py-0.5 rounded-full">{o.save}</span>}
                    </div>
                    <div className="text-sm font-bold">{o.name}</div>
                    <div className="text-2xl font-extrabold mt-1">{o.price}</div>
                    <div className="text-xs text-slate-500">{o.unit} · {o.note}</div>
                    <div className="mt-3 inline-flex items-center justify-center bg-[#FE7311] text-[#1A1412] px-4 py-2 rounded-xl font-black text-[11px] uppercase tracking-wider">
                      {t.k17} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </a>
                ))}
              </div>
              <p className="text-center text-[11px] text-slate-400 mt-3">{data.scale.waitlistNote}</p>
              <p className="text-center text-xs text-slate-300 mt-2">
                {t.k18} <a href="tel:+19543778330" className="underline text-[#FDBB16]">(954) 377-8330</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS (Accordion Only | Background: White) */}
      <section
        id="faq"
        className="py-16 lg:py-24 bg-white scroll-mt-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-2 bg-[#075960]/10 text-[#075960] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t.k19}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3A2E29] font-serif">
              {t.k20}
            </h2>
          </div>

          {/* Clean Accordion (No Giant Cards, No Extra Sales Blocks) */}
          <div className="space-y-4">
            {data.faqs.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-[#D8D2D4] overflow-hidden transition shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 sm:p-6 font-bold text-sm sm:text-base text-[#3A2E29] flex justify-between items-center cursor-pointer hover:text-[#075960] transition"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#075960] flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0 ml-4" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-[#D8D2D4] pt-4 space-y-3">
                      {faq.answerParagraphs.map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}

                      {/* Payment Timing Breakdown */}
                      {faq.paymentBreakdown && (
                        <div className="space-y-1.5 font-medium text-slate-700">
                          {faq.paymentBreakdown.map((item, idx) => (
                            <p key={idx}>
                              <strong>{item.item}:</strong> {item.timing}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Base vs Pro Comparison */}
                      {faq.baseProBreakdown && (
                        <div className="space-y-1.5 text-slate-700">
                          <p><strong>{t.k21}</strong> {faq.baseProBreakdown.base}</p>
                          <p><strong>{t.k22}</strong> {faq.baseProBreakdown.pro}</p>
                        </div>
                      )}

                      {/* Specific Contextual Links */}
                      {faq.links && faq.links.length > 0 && (
                        <div className="pt-2 flex flex-wrap items-center gap-4">
                          {faq.links.map((link, idx) => {
                            if (link.action === 'bookCall') {
                              return (
                                <button
                                  key={idx}
                                  onClick={onBookCall}
                                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#075960] hover:text-[#053d42] transition uppercase tracking-wider cursor-pointer"
                                >
                                  <span>{link.text}</span>
                                </button>
                              );
                            }
                            if (link.action === 'roi') {
                              return (
                                <button
                                  key={idx}
                                  onClick={onOpenRoi}
                                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#075960] hover:text-[#053d42] transition cursor-pointer"
                                >
                                  <span>{link.text}</span>
                                </button>
                              );
                            }
                            if (link.action === 'contractToCloseSection') {
                              return (
                                <button
                                  key={idx}
                                  onClick={() => scrollToSection('contract-to-close')}
                                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#075960] hover:text-[#053d42] transition uppercase tracking-wider cursor-pointer"
                                >
                                  <span>{link.text}</span>
                                </button>
                              );
                            }
                            if (link.action === 'tcWorkshop') {
                              return onOpenTcWorkshop ? (
                                <button
                                  key={idx}
                                  onClick={onOpenTcWorkshop}
                                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#C84600] hover:text-[#a03700] transition uppercase tracking-wider cursor-pointer"
                                >
                                  <span>{link.text}</span>
                                </button>
                              ) : (
                                <a
                                  key={idx}
                                  href="https://www.hometowntc.com/tcworkshop"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#C84600] hover:text-[#a03700] transition uppercase tracking-wider cursor-pointer"
                                >
                                  <span>{link.text}</span>
                                </a>
                              );
                            }
                            return null;
                          })}
                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Direct link to complete FAQ directory */}
          {onOpenFaq && (
            <div className="pt-6 border-t border-[#EAE4DC] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FBF9F5] p-6 rounded-2xl border">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-bold text-[#3A2E29] text-base">{t.k23}</h4>
                <p className="text-xs text-[#6B5E55]">
                  {t.k24}
                </p>
              </div>
              <button
                onClick={onOpenFaq}
                className="whitespace-nowrap inline-flex items-center space-x-2 bg-[#3A2E29] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#251D19] transition cursor-pointer shadow-sm"
              >
                <span>{t.k25}</span>
                <ArrowRight className="w-4 h-4 text-[#20C5D2]" />
              </button>
            </div>
          )}

        </div>
      </section>

      {/* SCALE Waitlist Modal */}
      <ScaleWaitlistModal
        isOpen={isWaitlistModalOpen}
        onClose={() => setIsWaitlistModalOpen(false)}
      />

    </div>
  );
};
