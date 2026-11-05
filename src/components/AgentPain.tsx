import React from 'react';
import { Inbox, Clock, Brain } from 'lucide-react';
import type { Language } from '../types';

const COPY = {
  "en": {
    "badge": "THE AGENT REALITY",
    "h1": "Your Clients Need You.",
    "h2": "Your Transaction Needs a System.",
    "c1": "The inbox keeps moving.",
    "c1d": "Someone is always waiting for an update, document, response, or follow-up.",
    "c2": "The dates don't stop.",
    "c2d": "Your next showing does not pause the transaction timeline.",
    "c3": "Your brain shouldn't be the system.",
    "c3d": "HTC gives the file an owner, a process, and a written trail.",
    "end1": "You stay client-facing.",
    "end2": "We keep the administrative work behind the transaction moving."
  },
  "es": {
    "badge": "LA REALIDAD DEL AGENTE",
    "h1": "Sus clientes lo necesitan.",
    "h2": "Su transacción necesita un sistema.",
    "c1": "La bandeja de entrada no se detiene.",
    "c1d": "Siempre hay alguien esperando una actualización, un documento, una respuesta o un seguimiento.",
    "c2": "Las fechas no se detienen.",
    "c2d": "Su próxima visita no pausa el cronograma de la transacción.",
    "c3": "Su memoria no debería ser el sistema.",
    "c3d": "HTC le da al expediente un responsable, un proceso y un registro por escrito.",
    "end1": "Usted atiende a sus clientes.",
    "end2": "Nosotros mantenemos en marcha el trabajo administrativo detrás de la transacción."
  }
} as const;


interface Props {
  language?: Language;
  onBookCall?: () => void;
}

export const AgentPain: React.FC<Props> = ({ language = 'en' }) => {
  const t = COPY[language];
  return (
    <section className="py-16 sm:py-20 bg-[#3A2E29] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#20C5D2] bg-black/30 px-3.5 py-1.5 rounded-full border border-[#20C5D2]/40">
            <span>{t.badge}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-white tracking-tight leading-tight">
            {t.h1}{' '}
            <span className="block sm:inline text-[#FE7311] font-semibold italic">
              {t.h2}
            </span>
          </h2>
        </div>

        {/* 3 Real Life Touchpoints */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1 */}
          <div className="bg-white/5 rounded-2xl p-6 sm:p-7 border border-white/10 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-[#075960]/20 text-[#075960] flex items-center justify-center mb-2">
              <Inbox className="w-5 h-5 text-[#075960]" />
            </div>
            <h3 className="text-lg font-serif font-extrabold text-white">
              {t.c1}
            </h3>
            <p className="text-sm text-slate-300 font-medium leading-relaxed">
              {t.c1d}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/5 rounded-2xl p-6 sm:p-7 border border-white/10 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-[#FE7311]/20 text-[#FE7311] flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-[#C84600]" />
            </div>
            <h3 className="text-lg font-serif font-extrabold text-white">
              {t.c2}
            </h3>
            <p className="text-sm text-slate-300 font-medium leading-relaxed">
              {t.c2d}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/5 rounded-2xl p-6 sm:p-7 border border-white/10 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-[#075960]/20 text-[#075960] flex items-center justify-center mb-2">
              <Brain className="w-5 h-5 text-[#075960]" />
            </div>
            <h3 className="text-lg font-serif font-extrabold text-white">
              {t.c3}
            </h3>
            <p className="text-sm text-slate-300 font-medium leading-relaxed">
              {t.c3d}
            </p>
          </div>

        </div>

        {/* Clean Conclusion */}
        <div className="text-center max-w-3xl mx-auto pt-2">
          <p className="text-2xl sm:text-3xl font-serif font-extrabold text-white leading-snug">
            {t.end1} <span className="text-[#075960]">{t.end2}</span>
          </p>
        </div>

      </div>
    </section>
  );
};


