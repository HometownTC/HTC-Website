import React from 'react';
import { ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';
import type { Language } from '../types';

const COPY = {
  "en": {
    "badge": "PROTECT THE AGENT · PROTECT THE BROKER · PROTECT THE CLIENT",
    "title": "From Yes to Sold, you don't have to carry the file alone.",
    "body": "Whether you're launching a listing or managing an executed contract through Post-Close, HTC keeps the moving parts organized so you can stay client-facing.",
    "cta": "BOOK A 15-MINUTE FIT CALL",
    "client": "Already an HTC client? Submit a Deal →"
  },
  "es": {
    "badge": "PROTEJA AL AGENTE · PROTEJA AL BROKER · PROTEJA AL CLIENTE",
    "title": "Del Sí al Vendido, no tiene que cargar el expediente solo.",
    "body": "Ya sea que esté lanzando un listado o llevando un contrato ejecutado hasta el Post-Cierre, HTC mantiene organizadas todas las piezas para que usted pueda enfocarse en sus clientes.",
    "cta": "AGENDAR LLAMADA DE 15 MINUTOS",
    "client": "¿Ya es cliente de HTC? Envíe una transacción →"
  }
} as const;


interface Props {
  language?: Language;
  onBookCall: () => void;
  onSubmitDeal: () => void;
}

export const FinalCTA: React.FC<Props> = ({ onBookCall, onSubmitDeal, language = 'en' }) => {
  const t = COPY[language];
  return (
    <section className="py-16 sm:py-24 bg-[#3A2E29] text-white relative overflow-hidden border-t border-[#20C5D2]/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#20C5D2] bg-black/30 px-4 py-1.5 rounded-full border border-[#20C5D2]/40">
          <ShieldCheck className="w-4 h-4 text-[#FE7311]" />
          <span>{t.badge}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
          {t.title}
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
          {t.body}
        </p>

        <div className="pt-4 space-y-4">
          {/* One Orange Button */}
          <div>
            <button
              onClick={onBookCall}
              className="bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-9 py-4.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl transition inline-flex items-center space-x-2.5 cursor-pointer transform hover:-translate-y-0.5"
            >
              <PhoneCall className="w-4 h-4 text-[#1A1412]" />
              <span>{t.cta}</span>
              <ArrowRight className="w-4 h-4 text-[#1A1412]" />
            </button>
          </div>

          {/* Quiet Secondary Text */}
          <div>
            <button
              onClick={onSubmitDeal}
              className="text-slate-300 hover:text-white text-xs font-semibold tracking-wide transition cursor-pointer inline-flex items-center space-x-1 border-b border-slate-500/40 pb-0.5 hover:border-white"
            >
              <span>{t.client}</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};


