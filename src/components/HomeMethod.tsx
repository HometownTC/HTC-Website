import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Clock, FileSpreadsheet, KeyRound } from 'lucide-react';
import type { Language } from '../types';

const COPY = {
  "en": {
    "s1": "Review the executed agreement, parties, dates, and documents that drive the file.",
    "s2": "Build the working timeline, organize contacts and documents, and identify what is missing.",
    "s3": "Track administrative milestones, follow up, document updates, and bring anything that needs the agent’s attention back to them.",
    "s4": "Support the final administrative steps, closing coordination, broker file completion, and Post-Close.",
    "stage": "STAGE",
    "badge": "OUR CUSTOMER PROCESS",
    "title": "THE H.O.M.E. CLOSE METHOD",
    "intro": "Our four-stage method for moving Contract-to-Close files forward with structure, visibility, and care.",
    "cta": "SEE HOW HTC WORKS",
    "about": "Learn about our agency culture & founder values →"
  },
  "es": {
    "s1": "Revisamos el contrato ejecutado, las partes, las fechas y los documentos que rigen el expediente.",
    "s2": "Armamos el cronograma de trabajo, organizamos contactos y documentos, e identificamos lo que falta.",
    "s3": "Damos seguimiento a los hitos administrativos, documentamos novedades y le llevamos al agente todo lo que requiere su atención.",
    "s4": "Apoyamos los pasos administrativos finales, la coordinación del cierre, el expediente del broker y el Post-Cierre.",
    "stage": "ETAPA",
    "badge": "NUESTRO PROCESO",
    "title": "EL MÉTODO DE CIERRE H.O.M.E.",
    "intro": "Nuestro método de cuatro etapas para avanzar expedientes de Contrato a Cierre con estructura, visibilidad y cuidado.",
    "cta": "VEA CÓMO FUNCIONA HTC",
    "about": "Conozca nuestra cultura y los valores de la fundadora →"
  }
} as const;


interface Props {
  language?: Language;
  onSeeHowItWorks?: () => void;
  onOpenAbout?: () => void;
  onBookCall?: () => void;
}

export const HomeMethod: React.FC<Props> = ({ onSeeHowItWorks, onOpenAbout, language = 'en' }) => {
  const t = COPY[language];
  const stages = [
    {
      letter: 'H',
      name: 'Honor the Agreement',
      summary: t.s1,
      icon: CheckCircle2,
      accentColor: 'text-[#075960]',
      badgeBg: 'bg-[#075960]',
      stepNum: `${t.stage} 01`
    },
    {
      letter: 'O',
      name: 'Organize the File',
      summary: t.s2,
      icon: FileSpreadsheet,
      accentColor: 'text-[#C84600]',
      badgeBg: 'bg-[#FE7311]',
      stepNum: `${t.stage} 02`
    },
    {
      letter: 'M',
      name: 'Monitor the Milestones',
      summary: t.s3,
      icon: Clock,
      accentColor: 'text-[#075960]',
      badgeBg: 'bg-[#075960]',
      stepNum: `${t.stage} 03`
    },
    {
      letter: 'E',
      name: 'Ease the Close',
      summary: t.s4,
      icon: KeyRound,
      accentColor: 'text-[#3A2E29]',
      badgeBg: 'bg-[#3A2E29]',
      stepNum: `${t.stage} 04`
    }
  ];

  return (
    <section id="home-method" className="py-14 sm:py-16 bg-[#EEEAEB] border-b border-[#D8D2D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D8D2D4] shadow-xl relative overflow-hidden space-y-8">
          
          {/* Section Header */}
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-[#EEEAEB] px-3.5 py-1.5 rounded-full border border-[#D8D2D4]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C84600]" />
              <span>{t.badge}</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#3A2E29] tracking-tight">
              {t.title}
            </h2>
            
            <p className="text-base sm:text-lg text-[#3A2E29]/85 font-medium leading-relaxed">
              {t.intro}
            </p>
          </div>

          {/* Connected Flow Strip */}
          <div className="bg-[#FAF8F5] rounded-2xl p-4 sm:p-5 border border-[#D8D2D4]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-sans font-extrabold text-[#3A2E29]">
              <div className="flex items-center space-x-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#20C5D2] text-white flex items-center justify-center font-black text-xs shadow-2xs">
                  H
                </span>
                <span>Honor the Agreement</span>
              </div>
              <span className="hidden md:inline text-[#C84600] font-extrabold text-base" aria-hidden="true">→</span>
              
              <div className="flex items-center space-x-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#FE7311] text-[#1A1412] font-black flex items-center justify-center font-black text-xs shadow-2xs">
                  O
                </span>
                <span>Organize the File</span>
              </div>
              <span className="hidden md:inline text-[#C84600] font-extrabold text-base" aria-hidden="true">→</span>
              
              <div className="flex items-center space-x-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#20C5D2] text-white flex items-center justify-center font-black text-xs shadow-2xs">
                  M
                </span>
                <span>Monitor the Milestones</span>
              </div>
              <span className="hidden md:inline text-[#C84600] font-extrabold text-base" aria-hidden="true">→</span>
              
              <div className="flex items-center space-x-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#3A2E29] text-white flex items-center justify-center font-black text-xs shadow-2xs">
                  E
                </span>
                <span>Ease the Close</span>
              </div>
            </div>
          </div>

          {/* 4 Stage Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {stages.map((stage, idx) => {
              return (
                <div 
                  key={idx}
                  className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-7 border border-[#D8D2D4] hover:border-[#075960]/50 transition-all shadow-2xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`w-9 h-9 rounded-xl ${stage.badgeBg} text-white flex items-center justify-center font-sans font-black text-sm shadow-xs`}>
                        {stage.letter}
                      </span>
                      <span className="text-[11px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                        {stage.stepNum}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-extrabold text-[#3A2E29] leading-snug">
                      {stage.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#3A2E29]/80 font-medium leading-relaxed">
                      {stage.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Row */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-[#D8D2D4]">
            <button
              onClick={onSeeHowItWorks}
              className="bg-[#20C5D2] hover:bg-[#0b8288] text-white font-sans font-extrabold text-sm sm:text-base px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center space-x-3 cursor-pointer group"
            >
              <span>{t.cta}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#C84600]" />
            </button>

            {onOpenAbout && (
              <button
                onClick={onOpenAbout}
                className="text-xs sm:text-sm text-slate-600 hover:text-[#3A2E29] font-semibold underline underline-offset-4 transition cursor-pointer text-left sm:text-right"
              >
                {t.about}
              </button>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
