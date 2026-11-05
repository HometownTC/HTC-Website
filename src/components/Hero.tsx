import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FOUNDER_IMAGE } from '../data/content';
import type { Language } from '../types';

const COPY = {
  "en": {
    "eyebrow": "BOUTIQUE REAL ESTATE SUPPORT AGENCY",
    "h1": "Smooth Closings.",
    "h1b": "Period.",
    "p1": "We provide organized listing and contract support behind your real estate business so you can stay client-facing.",
    "p2": "Start with a Fit Call, set up your business once, then submit files whenever you need support.",
    "tag": "PROTECT THE AGENT. PROTECT THE BROKER. PROTECT THE CLIENT.",
    "cta": "BOOK A 15-MINUTE FIT CALL",
    "cta2": "Explore Services + Pricing",
    "alt": "Michelle Martinez, Founder",
    "since": "Serving Realtors since 1995"
  },
  "es": {
    "eyebrow": "AGENCIA BOUTIQUE DE APOYO INMOBILIARIO",
    "h1": "Cierres Impecables.",
    "h1b": "Punto.",
    "p1": "Brindamos apoyo organizado de listados y contratos detrás de su negocio inmobiliario para que usted pueda enfocarse en sus clientes.",
    "p2": "Comience con una llamada de compatibilidad, configure su negocio una sola vez y envíe expedientes cuando necesite apoyo.",
    "tag": "PROTEJA AL AGENTE. PROTEJA AL BROKER. PROTEJA AL CLIENTE.",
    "cta": "AGENDAR LLAMADA DE 15 MINUTOS",
    "cta2": "Ver servicios y precios",
    "alt": "Michelle Martinez, Fundadora",
    "since": "Al servicio de Realtors desde 1995"
  }
} as const;


interface Props {
  language?: Language;
  onBookCall: () => void;
  onSubmitDeal?: () => void;
  onSeeHowItWorks?: () => void;
  onExploreServices?: () => void;
}

export const Hero: React.FC<Props> = ({ onBookCall, onExploreServices, onSeeHowItWorks, language = 'en' }) => {
  const t = COPY[language];
  const handleSecondaryClick = () => {
    if (onExploreServices) {
      onExploreServices();
    } else if (onSeeHowItWorks) {
      onSeeHowItWorks();
    } else {
      const el = document.getElementById('what-we-handle') || document.getElementById('pricing');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#EEEAEB] pt-8 pb-16 lg:py-20 border-b border-[#D8D2D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center space-x-2 bg-[#3A2E29]/5 border border-[#3A2E29]/15 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-[#3A2E29]">
              <span className="w-2 h-2 rounded-full bg-[#075960]" />
              <span>{t.eyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-[84px] font-serif font-extrabold text-[#3A2E29] tracking-tight leading-[1.02]">
              {t.h1}{' '}
              <span className="text-[#C84600]">
                {t.h1b}
              </span>
            </h1>

            {/* Supporting Copy */}
            <div className="space-y-3 text-base sm:text-lg text-[#3A2E29]/90 font-medium leading-relaxed max-w-2xl">
              <p>
                {t.p1}
              </p>
              <p className="text-sm sm:text-base text-[#3A2E29]">
                {t.p2}
              </p>
              <p className="text-xs sm:text-sm font-extrabold text-[#075960] uppercase tracking-wider">
                {t.tag}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onBookCall}
                className="bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span>{t.cta}</span>
                <ArrowRight className="w-4 h-4 text-[#1A1412] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleSecondaryClick}
                className="text-[#3A2E29] hover:text-[#075960] font-bold text-sm underline underline-offset-4 transition flex items-center justify-center space-x-1.5 py-2 cursor-pointer"
              >
                <span>{t.cta2}</span>
                <ArrowRight className="w-4 h-4 text-[#075960]" />
              </button>
            </div>

          </div>

          {/* Right Hero Visual Column (Michelle's Photo - Clean & Unobstructed) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">
              {/* Clean founder photograph - no dark overlay hiding her, no floating badges over face */}
              <img
                src={FOUNDER_IMAGE}
                alt={t.alt}
                width={480}
                height={500}
                fetchPriority="high"
                decoding="async"
                className="w-full h-[460px] sm:h-[500px] object-cover object-center"
                referrerPolicy="no-referrer"
              />

              {/* Simple Clean Caption Below Photo */}
              <div className="bg-[#3A2E29] p-4 text-white">
                <div className="text-base font-bold font-sans text-white">
                  {t.alt}
                </div>
                <div className="text-xs text-[#20C5D2] font-semibold mt-0.5">
                  {t.since}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

