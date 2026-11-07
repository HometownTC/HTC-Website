import React from 'react';
import { Calendar, FileCheck, MapPin, Languages, Quote } from 'lucide-react';
import type { Language } from '../types';

const COPY = {
  "en": {
    "p1t": "Serving Realtors since 1995",
    "p1s": "Founder Experience · HTC Founded 2018",
    "p2t": "20,000+ transactions",
    "p2s": "Personally processed by our founder",
    "p3t": "Florida focused",
    "p3s": "Contract-to-Close Statewide",
    "p4t": "English + Spanish",
    "p4s": "Bilingual Team Support",
    "badge": "WITH HTC SINCE 2018",
    "quote": "“It took a bear off my back and freed me up to focus on what I do best — sell real estate.”",
    "since": "· HTC Client Since 2018"
  },
  "es": {
    "p1t": "Al servicio de Realtors desde 1995",
    "p1s": "Experiencia de la fundadora · HTC fundada en 2018",
    "p2t": "Más de 20,000 transacciones",
    "p2s": "Procesadas personalmente por nuestra fundadora",
    "p3t": "Enfocados en Florida",
    "p3s": "De Contrato a Cierre en todo el estado",
    "p4t": "Inglés + Español",
    "p4s": "Equipo bilingüe",
    "badge": "CON HTC DESDE 2018",
    "quote": "“It took a bear off my back and freed me up to focus on what I do best — sell real estate.”",
    "since": "· Clienta de HTC desde 2018"
  }
} as const;


export const ProofBar: React.FC<{ language?: Language }> = ({ language = 'en' }) => {
  const t = COPY[language];
  const proofItems = [
    {
      icon: Calendar,
      title: t.p1t,
      sublabel: t.p1s
    },
    {
      icon: FileCheck,
      title: t.p2t,
      sublabel: t.p2s
    },
    {
      icon: MapPin,
      title: t.p3t,
      sublabel: t.p3s
    },
    {
      icon: Languages,
      title: t.p4t,
      sublabel: t.p4s
    }
  ];

  return (
    <section className="bg-white border-b border-[#D8D2D4] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Fast Proof Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {proofItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`pt-4 md:pt-0 ${idx > 0 ? 'md:pl-6' : ''} flex flex-col items-center md:items-start text-center md:text-left space-y-1.5`}
              >
                <div className="w-9 h-9 rounded-xl bg-[#EEEAEB] text-[#075960] flex items-center justify-center mb-1 border border-[#D8D2D4]">
                  <Icon className="w-5 h-5 text-[#075960]" />
                </div>
                <div className="text-sm font-sans font-extrabold text-[#3A2E29]">
                  {item.title}
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  {item.sublabel}
                </div>
              </div>
            );
          })}
        </div>

        {/* Founding Client Real Human Proof Card */}
        <div className="bg-[#EEEAEB] rounded-2xl p-6 sm:p-8 border border-[#D8D2D4] relative overflow-hidden flex flex-col items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-[#3A2E29] text-white px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase">
              <Quote className="w-3 h-3 text-[#20C5D2]" />
              <span>{t.badge}</span>
            </div>
            <p className="text-lg sm:text-xl font-serif font-bold text-[#3A2E29] italic leading-snug pt-1">
              {t.quote}
            </p>
            <div className="text-xs sm:text-sm font-semibold text-[#20C5D2] pt-1">
              Heather Lefebvre <span className="text-[#3A2E29]/60">{t.since}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};


