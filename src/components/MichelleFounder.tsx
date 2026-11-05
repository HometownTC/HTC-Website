import React from 'react';
import { Users, ArrowRight, UserCheck, ShieldCheck, Cpu, User } from 'lucide-react';
import { MEET_MICHELLE_IMAGE } from '../data/content';
import type { Language } from '../types';

const COPY = {
  "en": {
    "badge": "THE HOMETOWN SUPPORT MODEL",
    "title": "One point of contact. A team behind the work.",
    "intro": "Your Lead TC is your main day-to-day point of contact. Behind that relationship is your Dedicated Hometown Team, using people, systems, and technology to help keep the work organized and moving.",
    "role": "Founder & Owner • Serving Florida Realtors Since 1995",
    "exp": "Built on more than 30 years of Florida contract, title, and transaction coordination experience.",
    "flow": "HOW WORK MOVES WITH HOMETOWN",
    "model": "RELATIONSHIP & EXECUTION MODEL",
    "n1": "THE AGENT",
    "n1s": "Realtor Partner",
    "n1d": "Focus on clients, contracts, negotiations & pipeline.",
    "n2": "LEAD TC",
    "n2s": "Main Contact",
    "n2d": "Your single day-to-day point of contact for your files.",
    "n3": "HTC TEAM + SYSTEMS",
    "n3s": "Operational Engine",
    "n3d": "Dedicated team, systems & tech keeping work organized.",
    "sm": "Support Model:",
    "cta": "MEET THE TRIBE"
  },
  "es": {
    "badge": "EL MODELO DE APOYO HOMETOWN",
    "title": "Un solo punto de contacto. Un equipo detrás del trabajo.",
    "intro": "Su Lead TC es su contacto principal en el día a día. Detrás de esa relación está su equipo Hometown dedicado, con personas, sistemas y tecnología que mantienen el trabajo organizado y en marcha.",
    "role": "Fundadora y Propietaria • Al servicio de Realtors en Florida desde 1995",
    "exp": "Respaldada por más de 30 años de experiencia en contratos, títulos y coordinación de transacciones en Florida.",
    "flow": "CÓMO AVANZA EL TRABAJO CON HOMETOWN",
    "model": "MODELO DE RELACIÓN Y EJECUCIÓN",
    "n1": "EL AGENTE",
    "n1s": "Realtor aliado",
    "n1d": "Se enfoca en clientes, contratos, negociaciones y prospectos.",
    "n2": "LEAD TC",
    "n2s": "Contacto principal",
    "n2d": "Su único punto de contacto diario para sus expedientes.",
    "n3": "EQUIPO HTC + SISTEMAS",
    "n3s": "Motor operativo",
    "n3d": "Equipo dedicado, sistemas y tecnología que mantienen el trabajo organizado.",
    "sm": "Modelo de apoyo:",
    "cta": "CONOZCA AL EQUIPO"
  }
} as const;


interface Props {
  language?: Language;
  onBookCall?: () => void;
  onOpenAbout?: () => void;
  onOpenMeetTheTribe?: () => void;
}

export const MichelleFounder: React.FC<Props> = ({ onOpenAbout, onOpenMeetTheTribe, language = 'en' }) => {
  const t = COPY[language];
  const handleCta = () => {
    if (onOpenMeetTheTribe) {
      onOpenMeetTheTribe();
    } else if (onOpenAbout) {
      onOpenAbout();
    }
  };

  return (
    <section id="team" className="py-16 sm:py-20 bg-[#3A2E29] text-white border-b border-[#20C5D2]/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#20C5D2] bg-black/40 px-3.5 py-1.5 rounded-full border border-[#20C5D2]/40">
            <Users className="w-3.5 h-3.5 text-[#FE7311]" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-white tracking-tight">
            {t.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
            {t.intro}
          </p>
        </div>

        {/* Layout: Visual Model + Founder Authority */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Founder Card (Authority without listing operations roster) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black/40 shadow-2xl">
              <img
                src={MEET_MICHELLE_IMAGE}
                alt="Michelle Martinez - Founder of Hometown Transaction Coordinators"
                className="w-full h-80 sm:h-96 object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3A2E29] via-[#3A2E29]/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#3A2E29]/95 backdrop-blur-md rounded-2xl border border-white/10 space-y-1">
                <div className="text-sm font-bold text-white font-sans">Michelle Martinez</div>
                <div className="text-xs text-[#20C5D2] font-semibold">{t.role}</div>
                <p className="text-[11px] text-slate-300 leading-normal pt-1">
                  {t.exp}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Visual Customer Model Diagram & CTA */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Visual: YOU ↔ LEAD TC ↔ HTC TEAM + SYSTEMS */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#20C5D2]">
                  {t.flow}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {t.model}
                </span>
              </div>

              {/* 3-Part Architecture Visual */}
              <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 items-center">
                
                {/* Node 1: THE AGENT */}
                <div className="sm:col-span-3 bg-black/40 rounded-2xl p-4 border border-white/10 text-center space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-[#FE7311] mx-auto flex items-center justify-center">
                    <User className="w-5 h-5 text-[#C84600]" />
                  </div>
                  <div className="font-sans font-extrabold text-sm text-white">{t.n1}</div>
                  <div className="text-[11px] font-mono text-[#20C5D2] font-semibold uppercase">{t.n1s}</div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {t.n1d}
                  </p>
                </div>

                {/* Arrow 1 */}
                <div className="sm:col-span-1 flex items-center justify-center py-1 sm:py-0">
                  <div className="flex sm:flex-row flex-col items-center justify-center text-[#20C5D2] font-extrabold">
                    <span className="text-xl hidden sm:inline select-none">↔</span>
                    <span className="text-lg sm:hidden select-none">↕</span>
                  </div>
                </div>

                {/* Node 2: LEAD TC */}
                <div className="sm:col-span-3 bg-gradient-to-b from-[#20C5D2]/20 to-black/50 rounded-2xl p-4 border-2 border-[#20C5D2] text-center space-y-2 shadow-lg">
                  <div className="w-10 h-10 rounded-xl bg-[#20C5D2] text-[#1A1412] mx-auto flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-[#1A1412]" />
                  </div>
                  <div className="font-sans font-extrabold text-sm text-white">{t.n2}</div>
                  <div className="text-[11px] font-mono text-[#20C5D2] font-bold uppercase">{t.n2s}</div>
                  <p className="text-[11px] text-slate-200 leading-snug font-medium">
                    {t.n2d}
                  </p>
                </div>

                {/* Arrow 2 */}
                <div className="sm:col-span-1 flex items-center justify-center py-1 sm:py-0">
                  <div className="flex sm:flex-row flex-col items-center justify-center text-[#20C5D2] font-extrabold">
                    <span className="text-xl hidden sm:inline select-none">↔</span>
                    <span className="text-lg sm:hidden select-none">↕</span>
                  </div>
                </div>

                {/* Node 3: HTC TEAM + SYSTEMS */}
                <div className="sm:col-span-3 bg-black/40 rounded-2xl p-4 border border-white/10 text-center space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-[#FE7311] mx-auto flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-[#C84600]" />
                  </div>
                  <div className="font-sans font-extrabold text-xs text-white uppercase">{t.n3}</div>
                  <div className="text-[11px] font-mono text-[#C84600] font-semibold uppercase">{t.n3s}</div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {t.n3d}
                  </p>
                </div>

              </div>

              {/* Caption Line */}
              <div className="text-center pt-2 text-xs text-slate-300 font-medium">
                <span className="text-white font-semibold">{t.sm} </span>
                {t.n1} <span className="text-[#20C5D2] font-bold">↔</span> {t.n2} <span className="text-[#20C5D2] font-bold">↔</span> {t.n3}
              </div>
            </div>

            {/* Direct CTA: MEET THE TRIBE */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleCta}
                className="bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-8 py-4 rounded-xl font-sans font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition inline-flex items-center space-x-2.5 cursor-pointer"
              >
                <span>{t.cta}</span>
                <ArrowRight className="w-4 h-4 text-[#1A1412]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
