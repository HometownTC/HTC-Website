import React, { useEffect } from 'react';
import {
  ShieldCheck,
  Award,
  Heart,
  PhoneCall,
  ArrowRight,
  Users,
  Compass
} from 'lucide-react';
import { FOUNDER_IMAGE, MEET_MICHELLE_IMAGE } from '../data/content';
import type { Language } from '../types';

const COPY = {
  "en": {
    "k0": "Home",
    "k1": "Meet Michelle",
    "k2": "MEET MICHELLE",
    "k3": "I built Hometown around a standard.",
    "k4": "\"I'm Michelle Martinez, founder of Hometown Transaction Coordinators. I've served Realtors since 1995 and personally processed more than 20,000 transactions.",
    "k5": "After all those files, one thing has never changed: there are real people behind every transaction. The work matters because they matter.\"",
    "k6": "Serving Realtors since 1995",
    "k7": "HTC founded in 2018",
    "k8": "20,000+ transactions",
    "k9": "MEET THE TRIBE",
    "k10": "BOOK A 15-MINUTE FIT CALL",
    "k11": "SEE WHY HTC",
    "k12": "Founder + Owner",
    "k13": "MISSION + VISION",
    "k14": "OUR MISSION",
    "k15": "We own the boring work so agents can grow.",
    "k16": "From Yes to Sold, HTC keeps the operational work behind the transaction moving.",
    "k17": "OUR VISION",
    "k18": "To become Florida’s most trusted name in transaction support.",
    "k19": "Growing alongside real estate professionals and perfecting the experience behind every closing, every year.",
    "k20": "OUR VALUES",
    "k21": "Do the right thing for the people and the work entrusted to us.",
    "k22": "Create structure so the work stays organized and everyone knows what comes next.",
    "k23": "Know the work, keep learning, and keep raising the standard.",
    "k24": "Build better systems so good work feels easier to deliver and easier to experience.",
    "k25": "H.O.M.E. guides how we lead, how we train, how we choose our partners, and how we make decisions at HTC.",
    "k26": "SEE THE H.O.M.E. CLOSE METHOD",
    "k27": "THE PROMISE BEHIND THE WORK",
    "k28": "Protect the Agent. Protect the Broker. Protect the Client.",
    "k29": "That promise is the filter behind the systems we build, the people we train, and the way HTC supports the work entrusted to us.",
    "k30": "Collaborative. Predictable. Transparent.",
    "k31": "Good Business. Good Community. Real Impact.",
    "k32": "HTC Honors is our way of giving back to the agents who support Hometown and turning that business into something bigger than the closing itself.",
    "k33": "Our agents earn HTC Honors points as they work with us. They can use those points for rewards or charitable giving, and when they choose to donate their points, HTC matches the donation.",
    "k34": "Our agents are busy people, and sometimes their points expire before they use them. We still find ways to turn that value into meaningful community support.",
    "k35": "Through HTC Honors, we give our time, financial support, food, hygiene products, care packages, and other needed items to organizations serving people in our communities. Supporting survivors of domestic violence is especially close to my heart.",
    "k36": "IMPACT AT A GLANCE",
    "k37": "Current published HTC Honors impact",
    "k38": "Charities Supported",
    "k39": "Self-Care Kits for Survivors",
    "k40": "Donated",
    "k41": "Setting the Standard & Leading the Tribe",
    "k42": "THE STANDARD CONTINUES",
    "k43": "Hometown was never meant to stop with me.",
    "k44": "My job is to set the standard, build the systems, and make sure the people carrying the Hometown name understand what it means.",
    "k45": "Today, HTC is a tech-enabled team built to carry that standard forward across every file we support.",
    "k46": "Meet the people helping carry it forward.",
    "k47": "Michelle Martinez is the founder and owner of Hometown Transaction Coordinators, a boutique Florida real estate support agency. She has served Realtors since 1995, has personally processed more than 20,000 transactions, and founded HTC in 2018.",
    "k48": "Michelle Martinez - Founder of Hometown Transaction Coordinators",
    "k49": "Michelle Martinez - HTC Office Operations & Leadership"
  },
  "es": {
    "k0": "Inicio",
    "k1": "Conozca a Michelle",
    "k2": "CONOZCA A MICHELLE",
    "k3": "Construí Hometown en torno a un estándar.",
    "k4": "\"Soy Michelle Martinez, fundadora de Hometown Transaction Coordinators. Sirvo a Realtors desde 1995 y he procesado personalmente más de 20,000 transacciones.",
    "k5": "Después de todos esos expedientes, algo nunca ha cambiado: detrás de cada transacción hay personas reales. El trabajo importa porque ellas importan.\"",
    "k6": "Al servicio de Realtors desde 1995",
    "k7": "HTC fundada en 2018",
    "k8": "Más de 20,000 transacciones",
    "k9": "CONOZCA AL EQUIPO",
    "k10": "AGENDAR LLAMADA DE 15 MINUTOS",
    "k11": "VEA POR QUÉ HTC",
    "k12": "Fundadora + Propietaria",
    "k13": "MISIÓN + VISIÓN",
    "k14": "NUESTRA MISIÓN",
    "k15": "Nos encargamos del trabajo tedioso para que los agentes puedan crecer.",
    "k16": "Del Sí al Vendido, HTC mantiene en marcha el trabajo operativo detrás de la transacción.",
    "k17": "NUESTRA VISIÓN",
    "k18": "Ser el nombre de mayor confianza en apoyo de transacciones en Florida.",
    "k19": "Crecer junto a los profesionales inmobiliarios y perfeccionar la experiencia detrás de cada cierre, cada año.",
    "k20": "NUESTROS VALORES",
    "k21": "Hacer lo correcto por las personas y el trabajo que se nos confía.",
    "k22": "Crear estructura para que el trabajo se mantenga organizado y todos sepan qué sigue.",
    "k23": "Dominar el trabajo, seguir aprendiendo y seguir elevando el estándar.",
    "k24": "Construir mejores sistemas para que el buen trabajo sea más fácil de entregar y de vivir.",
    "k25": "H.O.M.E. guía cómo lideramos, cómo capacitamos, cómo elegimos a nuestros aliados y cómo tomamos decisiones en HTC.",
    "k26": "VER EL MÉTODO DE CIERRE H.O.M.E.",
    "k27": "LA PROMESA DETRÁS DEL TRABAJO",
    "k28": "Proteja al Agente. Proteja al Broker. Proteja al Cliente.",
    "k29": "Esa promesa es el filtro detrás de los sistemas que construimos, las personas que capacitamos y la manera en que HTC apoya el trabajo que se nos confía.",
    "k30": "Colaborativos. Predecibles. Transparentes.",
    "k31": "Buen negocio. Buena comunidad. Impacto real.",
    "k32": "HTC Honors es nuestra forma de retribuir a los agentes que apoyan a Hometown y de convertir ese negocio en algo más grande que el cierre mismo.",
    "k33": "Nuestros agentes acumulan puntos HTC Honors al trabajar con nosotros. Pueden usarlos para recompensas o donaciones benéficas, y cuando eligen donar sus puntos, HTC iguala la donación.",
    "k34": "Nuestros agentes son personas ocupadas y a veces sus puntos vencen antes de usarlos. Aun así encontramos formas de convertir ese valor en apoyo significativo para la comunidad.",
    "k35": "A través de HTC Honors donamos tiempo, apoyo económico, alimentos, productos de higiene, paquetes de cuidado y otros artículos necesarios a organizaciones que sirven a personas en nuestras comunidades. Apoyar a sobrevivientes de violencia doméstica es algo especialmente cercano a mi corazón.",
    "k36": "IMPACTO EN RESUMEN",
    "k37": "Impacto publicado de HTC Honors",
    "k38": "Organizaciones benéficas apoyadas",
    "k39": "Kits de autocuidado para sobrevivientes",
    "k40": "Donado",
    "k41": "Estableciendo el estándar y liderando al equipo",
    "k42": "EL ESTÁNDAR CONTINÚA",
    "k43": "Hometown nunca fue pensado para terminar conmigo.",
    "k44": "Mi trabajo es establecer el estándar, construir los sistemas y asegurarme de que las personas que llevan el nombre Hometown entiendan lo que significa.",
    "k45": "Hoy, HTC es un equipo apoyado por la tecnología, creado para llevar ese estándar a cada expediente que apoyamos.",
    "k46": "Conozca a las personas que ayudan a llevarlo adelante.",
    "k47": "Michelle Martinez es la fundadora y propietaria de Hometown Transaction Coordinators, una agencia boutique de apoyo inmobiliario en Florida. Sirve a Realtors desde 1995, ha procesado personalmente más de 20,000 transacciones y fundó HTC en 2018.",
    "k48": "Michelle Martinez, fundadora de Hometown Transaction Coordinators",
    "k49": "Michelle Martinez, operaciones y liderazgo de HTC"
  }
} as const;


interface Props {
  onBookCall: () => void;
  onSubmitDeal: () => void;
  onGoHome: () => void;
  onOpenHowItWorks: () => void;
  onOpenWhyHtc: () => void;
  onOpenPricing: () => void;
  onOpenTransactionCoordination: () => void;
  onOpenListingCoordination: () => void;
  onOpenMeetTheTribe?: () => void;
  language?: Language;
}

export const AboutMichellePage: React.FC<Props> = ({
  onBookCall,
  onSubmitDeal,
  onGoHome,
  onOpenHowItWorks,
  onOpenWhyHtc,
  onOpenPricing,
  onOpenTransactionCoordination,
  onOpenListingCoordination,
  onOpenMeetTheTribe,
  language = 'en'
}) => {
  const t = COPY[language];
  useEffect(() => {
    const originalTitle = document.title;
    document.title = language === 'es' ? 'Michelle Martinez | Fundadora de Hometown Transaction Coordinators' : 'Michelle Martinez | Founder of Hometown Transaction Coordinators';

    let metaDesc = document.querySelector('meta[name="description"]');
    const originalMetaContent = metaDesc ? metaDesc.getAttribute('content') : '';
    const targetMetaContent =
      'Meet Michelle Martinez, founder of Hometown Transaction Coordinators, and learn the mission, vision, H.O.M.E. values, HTC Honors impact, and standard behind Hometown.';

    if (metaDesc) {
      metaDesc.setAttribute('content', targetMetaContent);
    }

    // Structured Data for Person & Breadcrumbs
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'person-michelle-martinez-schema';
    schemaScript.text = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Michelle Martinez',
        jobTitle: t.k12,
        description:
          t.k47,
        worksFor: {
          '@type': 'Organization',
          name: 'Hometown Transaction Coordinators'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: t.k0,
            item: window.location.origin
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: t.k1,
            item: `${window.location.origin}/about/`
          }
        ]
      }
    ]);
    document.head.appendChild(schemaScript);

    window.scrollTo(0, 0);

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalMetaContent) {
        metaDesc.setAttribute('content', originalMetaContent);
      }
      const existingScript = document.getElementById('person-michelle-martinez-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [language]);

  return (
    <div className="bg-[#EEEAEB] text-[#3A2E29] min-h-screen">
      
      {/* ------------------------------------------------------------------ */}
      {/* SECTION 1 — HERO: MEET MICHELLE */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-[#EEEAEB] border-b border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#075960] tracking-widest uppercase mb-8">
            <button onClick={onGoHome} className="hover:text-[#3A2E29] transition cursor-pointer">{t.k0}</button>
            <span>→</span>
            <span className="text-[#3A2E29]">{t.k1}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column (Desktop) / Top Column (Mobile): Copy */}
            <div className="lg:col-span-7 space-y-6 order-1">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-white px-3.5 py-1.5 rounded-full border border-[#D8D2D4] shadow-2xs">
                <Award className="w-3.5 h-3.5 text-[#C84600]" />
                <span>{t.k2}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight leading-[1.15]">
                {t.k3}
              </h1>

              {/* Primary AEO Answer & Core Body */}
              <div className="space-y-4 text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
                <p>
                  {t.k4}
                </p>
                <p>
                  {t.k5}
                </p>
              </div>

              {/* Proof Line */}
              <div className="pt-2 text-xs sm:text-sm font-bold text-[#075960] tracking-wide flex flex-wrap items-center gap-2">
                <span>{t.k6}</span>
                <span>·</span>
                <span>{t.k7}</span>
                <span>·</span>
                <span>{t.k8}</span>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {onOpenMeetTheTribe ? (
                  <button
                    onClick={onOpenMeetTheTribe}
                    className="inline-flex items-center justify-center space-x-2 bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-7 py-4 rounded-xl font-black text-xs uppercase tracking-wider transition shadow-md hover:shadow-lg cursor-pointer group"
                  >
                    <span>{t.k9}</span>
                    <ArrowRight className="w-4 h-4 text-[#1A1412] group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={onBookCall}
                    className="inline-flex items-center justify-center space-x-2 bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-7 py-4 rounded-xl font-black text-xs uppercase tracking-wider transition shadow-md hover:shadow-lg cursor-pointer group"
                  >
                    <span>{t.k10}</span>
                    <ArrowRight className="w-4 h-4 text-[#1A1412] group-hover:translate-x-1 transition-transform" />
                  </button>
                )}

                <button
                  onClick={onOpenWhyHtc}
                  className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 text-[#3A2E29] border border-[#D8D2D4] px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer group"
                >
                  <span>{t.k11}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

            {/* Right Column (Desktop) / Bottom Column (Mobile): Portrait */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end order-2">
              <div className="relative w-full max-w-sm sm:max-w-md">
                <div className="rounded-3xl overflow-hidden border-2 border-[#D8D2D4] shadow-sm bg-white">
                  <img
                    src={MEET_MICHELLE_IMAGE || FOUNDER_IMAGE}
                    alt={t.k48}
                    className="w-full h-auto object-cover object-top aspect-[4/5]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-5 bg-white border-t border-[#D8D2D4]">
                    <div className="text-base font-bold text-[#3A2E29] font-sans">Michelle Martinez</div>
                    <div className="text-xs font-bold text-[#075960] uppercase tracking-wider mt-0.5">
                      {t.k12}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 2 — MISSION + VISION */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          
          {/* Section Eyebrow */}
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-[#EEEAEB] px-3.5 py-1.5 rounded-full border border-[#D8D2D4]">
              <Compass className="w-3.5 h-3.5 text-[#C84600]" />
              <span>{t.k13}</span>
            </div>
          </div>

          {/* Side-by-Side Editorial Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            
            {/* OUR MISSION (Foundation) */}
            <div className="bg-[#EEEAEB] rounded-3xl p-8 sm:p-12 border border-[#D8D2D4] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#075960]">
                  {t.k14}
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#3A2E29] font-serif leading-tight">
                  {t.k15}
                </h2>
              </div>
              <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
                {t.k16}
              </p>
            </div>

            {/* OUR VISION (Forward-Looking & Larger in Scale) */}
            <div className="bg-gradient-to-br from-[#3A2E29] to-[#251D1A] text-white rounded-3xl p-8 sm:p-12 border border-[#3A2E29] shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#FE7311]">
                  {t.k17}
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-white font-serif leading-[1.15] tracking-tight">
                  {t.k18}
                </h2>
              </div>
              <p className="text-base sm:text-lg text-slate-200 font-light leading-relaxed">
                {t.k19}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 3 — H.O.M.E. VALUES */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-[#EEEAEB] border-b border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-white px-3.5 py-1.5 rounded-full border border-[#D8D2D4]">
              <Heart className="w-3.5 h-3.5 text-[#C84600]" />
              <span>{t.k20}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif leading-tight">
              Honor. Order. Mastery. Ease.
            </h2>
          </div>

          {/* 4 Clean Columns Desktop / Stacked Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            
            {/* HONOR */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-[#D8D2D4] shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs font-black tracking-widest text-[#075960] uppercase">
                  H
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#3A2E29] font-serif">
                  HONOR
                </h3>
                <p className="text-sm text-slate-700 font-normal leading-relaxed">
                  {t.k21}
                </p>
              </div>
            </div>

            {/* ORDER */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-[#D8D2D4] shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs font-black tracking-widest text-[#C84600] uppercase">
                  O
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#3A2E29] font-serif">
                  ORDER
                </h3>
                <p className="text-sm text-slate-700 font-normal leading-relaxed">
                  {t.k22}
                </p>
              </div>
            </div>

            {/* MASTERY */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-[#D8D2D4] shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs font-black tracking-widest text-[#075960] uppercase">
                  M
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#3A2E29] font-serif">
                  MASTERY
                </h3>
                <p className="text-sm text-slate-700 font-normal leading-relaxed">
                  {t.k23}
                </p>
              </div>
            </div>

            {/* EASE */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-[#D8D2D4] shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs font-black tracking-widest text-[#C84600] uppercase">
                  E
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#3A2E29] font-serif">
                  EASE
                </h3>
                <p className="text-sm text-slate-700 font-normal leading-relaxed">
                  {t.k24}
                </p>
              </div>
            </div>

          </div>

          {/* Underneath Statement & Method Link */}
          <div className="pt-4 border-t border-[#D8D2D4] space-y-4 max-w-4xl">
            <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
              {t.k25}
            </p>
            <div>
              <button
                onClick={onOpenHowItWorks}
                className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#075960] hover:text-[#0a7f86] transition cursor-pointer group"
              >
                <span>{t.k26}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 4 — THE HTC PROMISE */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 sm:py-28 bg-white border-b border-[#D8D2D4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-[#EEEAEB] px-3.5 py-1.5 rounded-full border border-[#D8D2D4]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C84600]" />
            <span>{t.k27}</span>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight leading-tight max-w-3xl mx-auto">
              {t.k28}
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-slate-700 font-normal leading-relaxed max-w-2xl mx-auto">
              {t.k29}
            </p>
          </div>

          <div className="pt-6 sm:pt-8 border-t border-[#D8D2D4] max-w-2xl mx-auto">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#075960] font-serif tracking-tight">
              {t.k30}
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 5 — HTC HONORS */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-[#EEEAEB] border-b border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Story & Meaning */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-white px-3.5 py-1.5 rounded-full border border-[#D8D2D4]">
                <Heart className="w-3.5 h-3.5 text-[#C84600]" />
                <span>HTC HONORS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight leading-tight">
                {t.k31}
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
                <p>
                  {t.k32}
                </p>
                <p>
                  {t.k33}
                </p>
                <p>
                  {t.k34}
                </p>
                <p>
                  {t.k35}
                </p>
              </div>

            </div>

            {/* Right Column: Impact at a Glance */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D8D2D4] shadow-sm space-y-8">
                <div className="border-b border-[#D8D2D4] pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#075960]">
                    {t.k36}
                  </span>
                  <div className="text-xs text-slate-500 mt-1">{t.k37}</div>
                </div>

                <div className="space-y-6">
                  {/* 15+ */}
                  <div className="flex items-baseline space-x-4">
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#3A2E29] font-serif min-w-[90px]">
                      15+
                    </div>
                    <div className="text-base sm:text-lg font-medium text-slate-700">
                      {t.k38}
                    </div>
                  </div>

                  <div className="border-t border-[#EEEAEB]" />

                  {/* 100+ */}
                  <div className="flex items-baseline space-x-4">
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#C84600] font-serif min-w-[90px]">
                      100+
                    </div>
                    <div className="text-base sm:text-lg font-medium text-slate-700">
                      {t.k39}
                    </div>
                  </div>

                  <div className="border-t border-[#EEEAEB]" />

                  {/* $15,000 */}
                  <div className="flex items-baseline space-x-4">
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#075960] font-serif min-w-[90px]">
                      $15,000
                    </div>
                    <div className="text-base sm:text-lg font-medium text-slate-700">
                      {t.k40}
                    </div>
                  </div>
                </div>


              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 6 — FOUNDER-LED. TEAM-DELIVERED. */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Image on left (desktop) / bottom (mobile) */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-sm sm:max-w-md">
                <div className="rounded-3xl overflow-hidden border-2 border-[#D8D2D4] shadow-sm bg-[#F7F5F5]">
                  <img
                    src="/images/office.webp"
                    alt={t.k49}
                    className="w-full h-auto object-cover object-top aspect-[4/5]"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="p-5 bg-white border-t border-[#D8D2D4]">
                    <div className="text-base font-bold text-[#3A2E29] font-sans">Michelle Martinez</div>
                    <div className="text-xs font-bold text-[#075960] uppercase tracking-wider mt-0.5">
                      {t.k41}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Copy on right (desktop) / top (mobile) */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-[#EEEAEB] px-3.5 py-1.5 rounded-full border border-[#D8D2D4]">
                <Users className="w-3.5 h-3.5 text-[#C84600]" />
                <span>{t.k42}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight leading-tight">
                {t.k43}
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
                <p>
                  {t.k44}
                </p>
                <p>
                  {t.k45}
                </p>
                <p className="font-medium text-[#3A2E29]">
                  {t.k46}
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {onOpenMeetTheTribe ? (
                  <button
                    onClick={onOpenMeetTheTribe}
                    className="inline-flex items-center justify-center space-x-2 bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-7 py-4 rounded-xl font-black text-xs uppercase tracking-wider transition shadow-md hover:shadow-lg cursor-pointer group"
                  >
                    <span>{t.k9}</span>
                    <ArrowRight className="w-4 h-4 text-[#1A1412] group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={onBookCall}
                    className="inline-flex items-center justify-center space-x-2 bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-7 py-4 rounded-xl font-black text-xs uppercase tracking-wider transition shadow-md hover:shadow-lg cursor-pointer group"
                  >
                    <span>{t.k10}</span>
                    <ArrowRight className="w-4 h-4 text-[#1A1412] group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
                <button
                  onClick={onOpenWhyHtc}
                  className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 text-[#3A2E29] border border-[#D8D2D4] px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer group"
                >
                  <span>{t.k11}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 7 — FOUNDER SIGN-OFF */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 sm:py-28 bg-[#EEEAEB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          
          {/* Exact Sign-off Text */}
          <div className="space-y-3">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight">
              FORWARD.
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-light text-[#075960] font-serif italic tracking-wide">
              Always Forward.
            </div>
          </div>

          {/* Founder Identity */}
          <div className="pt-2 space-y-1">
            <div className="text-lg sm:text-xl font-bold text-[#3A2E29] font-sans">
              Michelle Martinez
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#C84600]">
              {t.k12}
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-600">
              Hometown Transaction Coordinators
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={onBookCall}
              className="inline-flex items-center justify-center space-x-2 bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-8 py-4 rounded-xl font-black text-xs uppercase tracking-wider transition shadow-md hover:shadow-lg cursor-pointer group"
            >
              <PhoneCall className="w-4 h-4 text-[#1A1412]" />
              <span>{t.k10}</span>
              <ArrowRight className="w-4 h-4 text-[#1A1412] group-hover:translate-x-1 transition-transform" />
            </button>
            
            {onOpenMeetTheTribe && (
              <button
                onClick={onOpenMeetTheTribe}
                className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 text-[#3A2E29] border border-[#D8D2D4] px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer group"
              >
                <span>{t.k9}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};
