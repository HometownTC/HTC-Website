import React from 'react';
import { Calendar, FileText, FolderCheck, ArrowRight } from 'lucide-react';
import type { Language } from '../types';

const COPY = {
  "en": {
    "o1": "Listing Launch",
    "o1d": "We organize the moving pieces required to prepare and launch a listing.",
    "o2": "Contract-to-Close",
    "o2d": "We track the dates, documents, communication, and follow-up once the property is under contract.",
    "o3": "Post-Close: NEST",
    "o3d": "We complete the final file and follow-up steps after closing. NEST Post-Closing Care keeps you in touch with your client at 30, 60, 90, 180 and 365 days.",
    "o3p": "$29 per closing",
    "o3n": "Included with SCALE.",
    "badge": "WHAT MOVES OFF YOUR PLATE",
    "title": "The work keeps moving without living in your head.",
    "cta": "Explore Services + Pricing"
  },
  "es": {
    "o1": "Lanzamiento de Listados",
    "o1d": "Organizamos todas las piezas necesarias para preparar y lanzar un listado.",
    "o2": "De Contrato a Cierre",
    "o2d": "Damos seguimiento a fechas, documentos, comunicación y pendientes desde que la propiedad está bajo contrato.",
    "o3": "Post-Cierre: NEST",
    "o3d": "Completamos el expediente final y los pasos de seguimiento después del cierre. La atención post-cierre NEST lo mantiene en contacto con su cliente a los 30, 60, 90, 180 y 365 días.",
    "o3p": "$29 por cierre",
    "o3n": "Incluido con SCALE.",
    "badge": "LO QUE DEJA DE CARGAR",
    "title": "El trabajo avanza sin que tenga que llevarlo todo en la cabeza.",
    "cta": "Ver servicios y precios"
  }
} as const;


interface Props {
  language?: Language;
  onSubmitDeal?: () => void;
  onBookCall?: () => void;
  onExploreServices?: () => void;
}

export const WhatMovesOffPlate: React.FC<Props> = ({ onExploreServices, language = 'en' }) => {
  const t = COPY[language];
  const scrollToPricingOrServices = () => {
    if (onExploreServices) {
      onExploreServices();
    } else {
      const el = document.getElementById('pricing');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const outcomes: { icon: typeof Calendar; title: string; description: string; price?: string; note?: string }[] = [
    {
      icon: Calendar,
      title: t.o1,
      description: t.o1d
    },
    {
      icon: FileText,
      title: t.o2,
      description: t.o2d
    },
    {
      icon: FolderCheck,
      title: t.o3,
      description: t.o3d,
      price: t.o3p,
      note: t.o3n
    }
  ];

  return (
    <section id="what-we-handle" className="py-14 sm:py-16 bg-[#EEEAEB] border-b border-[#D8D2D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-white px-3.5 py-1.5 rounded-full border border-[#D8D2D4]">
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#3A2E29]">
            {t.title}
          </h2>
        </div>

        {/* 3 Outcome Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {outcomes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-[#D8D2D4] shadow-sm hover:shadow-md transition space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#075960]/10 text-[#075960] flex items-center justify-center border border-[#D8D2D4]">
                  <Icon className="w-6 h-6 text-[#075960]" />
                </div>
                <h3 className="text-xl font-serif font-extrabold text-[#3A2E29]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#3A2E29]/80 font-medium leading-relaxed">
                  {item.description}
                </p>
                {item.price && (
                  <p className="text-sm font-bold text-[#3A2E29]">
                    <span className="text-[#C84600]">{item.price}</span>
                    {item.note && <span className="block text-xs font-semibold text-[#075960] mt-0.5">{item.note}</span>}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Single Next Action */}
        <div className="text-center">
          <button
            onClick={scrollToPricingOrServices}
            className="text-[#075960] hover:text-[#053d42] font-bold text-base sm:text-lg underline underline-offset-4 transition inline-flex items-center space-x-2 group cursor-pointer"
          >
            <span>{t.cta}</span>
            <ArrowRight className="w-5 h-5 text-[#C84600] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};


