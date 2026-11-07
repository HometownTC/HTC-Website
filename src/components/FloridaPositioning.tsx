import React, { useState } from 'react';
import { MapPin, ArrowRight, ShieldCheck, CheckCircle2, Compass, Building2, X } from 'lucide-react';
import { useEscapeKey } from '../hooks/useEscapeKey';
import type { Language } from '../types';

const COPY = {
  "en": {
    "h1r": "South Florida (Tri-County Core)",
    "h1d": "Our founding region with decades of high-density FAR/BAR, condo, and municipal compliance experience.",
    "h2r": "Central Florida & Space Coast",
    "h2d": "Full transaction support for Orlando metro, vacation home corridors, and growing residential markets.",
    "h3r": "Tampa Bay & Suncoast",
    "h3d": "Dedicated transaction support for West Coast residential sales, coastal condos, and fast-moving suburbs.",
    "h4r": "Southwest Florida",
    "h4d": "Dedicated file management for Naples, Fort Myers, Cape Coral, and luxury gulf communities.",
    "h5r": "North Florida & Panhandle",
    "h5d": "Statewide contract compliance serving Jacksonville, St. Augustine, Pensacola, and Tallahassee.",
    "founding": "Founding Market",
    "statewide": "Statewide Coverage",
    "badge": "FLORIDA SERVICE AREAS",
    "title": "South Florida roots. Statewide support.",
    "intro": "HTC was built in South Florida and supports Realtor partners throughout Florida.",
    "c1": "South Florida Roots",
    "c1d": "Where HTC was built and where our deepest market experience began across Miami-Dade, Broward, and Palm Beach.",
    "c2": "Statewide Support",
    "c2d": "Organized real estate support for Realtor partners throughout Florida.",
    "explore": "EXPLORE FLORIDA SERVICE AREAS",
    "mTitle": "Florida-wide support. South Florida roots.",
    "mIntro": "Serving Realtors, brokers, and title partners throughout Florida.",
    "mBody": "HTC provides boutique real estate support throughout Florida across two primary service lanes: Listing Services (pre-contract setup & Listing Launch) and Contract Services (executed contract through closing). Whether your file is in Miami Beach, Naples, Orlando, Tampa, or Jacksonville, our Lead TCs manage FAR/BAR contracts, escrow timelines, HOA approvals, and broker compliance with speed and precision.",
    "counties": "Counties:",
    "ready": "Ready to submit a transaction anywhere in Florida?",
    "cta": "Book a 15-Minute Fit Call"
  },
  "es": {
    "h1r": "Sur de Florida (Tres Condados)",
    "h1d": "Nuestra región fundadora, con décadas de experiencia en contratos FAR/BAR, condominios y cumplimiento municipal en mercados de alta densidad.",
    "h2r": "Centro de Florida y Space Coast",
    "h2d": "Apoyo completo de transacciones para el área de Orlando, corredores de casas vacacionales y mercados residenciales en crecimiento.",
    "h3r": "Tampa Bay y Suncoast",
    "h3d": "Apoyo dedicado para ventas residenciales en la costa oeste, condominios costeros y suburbios de rápido movimiento.",
    "h4r": "Suroeste de Florida",
    "h4d": "Manejo dedicado de expedientes para Naples, Fort Myers, Cape Coral y comunidades de lujo en el Golfo.",
    "h5r": "Norte de Florida y Panhandle",
    "h5d": "Cumplimiento de contratos en todo el estado para Jacksonville, St. Augustine, Pensacola y Tallahassee.",
    "founding": "Mercado fundador",
    "statewide": "Cobertura estatal",
    "badge": "ÁREAS DE SERVICIO EN FLORIDA",
    "title": "Raíces en el Sur de Florida. Apoyo en todo el estado.",
    "intro": "HTC nació en el Sur de Florida y apoya a Realtors aliados en toda Florida.",
    "c1": "Raíces en el Sur de Florida",
    "c1d": "Donde nació HTC y donde comenzó nuestra mayor experiencia de mercado, en Miami-Dade, Broward y Palm Beach.",
    "c2": "Apoyo en todo el estado",
    "c2d": "Apoyo inmobiliario organizado para Realtors aliados en toda Florida.",
    "explore": "VER ÁREAS DE SERVICIO EN FLORIDA",
    "mTitle": "Apoyo en toda Florida. Raíces en el Sur de Florida.",
    "mIntro": "Al servicio de Realtors, brokers y compañías de título en toda Florida.",
    "mBody": "HTC brinda apoyo inmobiliario boutique en toda Florida en dos líneas de servicio: Servicios de Listados (preparación previa al contrato y Lanzamiento de Listados) y Servicios de Contrato (desde el contrato ejecutado hasta el cierre). Ya sea que su expediente esté en Miami Beach, Naples, Orlando, Tampa o Jacksonville, nuestros Lead TCs manejan contratos FAR/BAR, plazos de depósito, aprobaciones de HOA y cumplimiento con el broker con rapidez y precisión.",
    "counties": "Condados:",
    "ready": "¿Listo para enviar una transacción desde cualquier parte de Florida?",
    "cta": "Agendar llamada de 15 minutos"
  }
} as const;


interface Props {
  language?: Language;
  onBookCall: () => void;
  onOpenMiamiTc?: () => void;
  onOpenMiamiDadeTc?: () => void;
  onOpenBrowardTc?: () => void;
  onOpenSouthFloridaTc?: () => void;
}

export const FloridaPositioning: React.FC<Props> = ({ onBookCall, onOpenMiamiTc, onOpenMiamiDadeTc, onOpenBrowardTc, onOpenSouthFloridaTc, language = 'en' }) => {
  const t = COPY[language];
  const [modalOpen, setModalOpen] = useState(false);
  useEscapeKey(modalOpen, () => setModalOpen(false));

  const keyHubs = [
    {
      region: t.h1r,
      counties: 'Miami-Dade, Broward & Palm Beach',
      description: t.h1d,
      badge: t.founding
    },
    {
      region: t.h2r,
      counties: 'Orange, Osceola, Seminole, Brevard & Volusia',
      description: t.h2d,
      badge: t.statewide
    },
    {
      region: t.h3r,
      counties: 'Hillsborough, Pinellas, Pasco & Sarasota',
      description: t.h3d,
      badge: t.statewide
    },
    {
      region: t.h4r,
      counties: 'Collier, Lee & Charlotte',
      description: t.h4d,
      badge: t.statewide
    },
    {
      region: t.h5r,
      counties: 'Duval, St. Johns, Escambia & Leon',
      description: t.h5d,
      badge: t.statewide
    }
  ];

  return (
    <section id="florida" className="py-16 sm:py-20 bg-white border-b border-[#D8D2D4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-extrabold uppercase tracking-widest text-[#075960] bg-[#EEEAEB] px-3.5 py-1.5 rounded-full border border-[#D8D2D4]">
            <MapPin className="w-4 h-4 text-[#C84600]" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#3A2E29] tracking-tight">
            {t.title}
          </h2>

          <p className="text-base sm:text-lg text-[#3A2E29]/80 leading-relaxed font-medium">
            {t.intro}
          </p>
        </div>

        {/* 2 Simple Ideas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          <div className="bg-[#EEEAEB] rounded-2xl p-6 sm:p-8 border border-[#D8D2D4] shadow-sm flex flex-col justify-between space-y-3">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#075960] flex items-center justify-center border border-[#D8D2D4]">
                <Building2 className="w-5 h-5 text-[#075960]" />
              </div>
              <h3 className="text-xl font-serif font-extrabold text-[#3A2E29]">
                {t.c1}
              </h3>
              <p className="text-sm text-[#3A2E29]/80 font-medium leading-relaxed">
                {t.c1d}
              </p>
            </div>
          </div>

          <div className="bg-[#EEEAEB] rounded-2xl p-6 sm:p-8 border border-[#D8D2D4] shadow-sm flex flex-col justify-between space-y-3">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#075960] flex items-center justify-center border border-[#D8D2D4]">
                <Compass className="w-5 h-5 text-[#075960]" />
              </div>
              <h3 className="text-xl font-serif font-extrabold text-[#3A2E29]">
                {t.c2}
              </h3>
              <p className="text-sm text-[#3A2E29]/80 font-medium leading-relaxed">
                {t.c2d}
              </p>
            </div>
          </div>

        </div>

        {/* CTA Button */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="bg-[#20C5D2] hover:bg-[#0b8288] text-white px-8 py-4 rounded-xl font-sans font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md hover:shadow-lg transition inline-flex items-center space-x-2.5 group cursor-pointer"
          >
            <span>{t.explore}</span>
            <ArrowRight className="w-4 h-4 text-[#C84600] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* Service Areas Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex p-4 sm:p-6">
          <div className="m-auto bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#D8D2D4] relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-[#3A2E29] text-white p-6 sm:p-8 relative">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 text-slate-300 hover:text-white bg-white/10 p-2 rounded-full transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center space-x-2 text-[10px] font-extrabold uppercase tracking-widest text-[#20C5D2] bg-black/40 px-3 py-1 rounded-full border border-[#20C5D2]/30 mb-3">
                <MapPin className="w-3.5 h-3.5 text-[#FE7311]" />
                <span>{t.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-white">
                {t.mTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                {t.mIntro}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-4 max-h-[70vh] overflow-y-auto">
              <p className="text-xs sm:text-sm text-[#3A2E29]/80 font-medium leading-relaxed bg-[#EEEAEB] p-4 rounded-2xl border border-[#D8D2D4]">
                {t.mBody}
              </p>

              <div className="space-y-3 pt-2">
                {keyHubs.map((hub, idx) => (
                  <div key={idx} className="bg-white p-4 sm:p-5 rounded-2xl border border-[#D8D2D4] shadow-sm space-y-1.5 hover:border-[#075960] transition">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-extrabold text-[#3A2E29] flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-[#075960]" />
                        <span>{hub.region}</span>
                      </h4>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EEEAEB] text-[#3A2E29] border border-[#D8D2D4]">
                        {hub.badge}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-[#075960]">
                      {t.counties} {hub.counties}
                    </div>
                    <p className="text-xs text-[#3A2E29]/80 font-medium leading-relaxed">
                      {hub.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#EEEAEB] p-5 border-t border-[#D8D2D4] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-bold text-[#3A2E29]">
                {t.ready}
              </div>
              <button
                onClick={() => {
                  setModalOpen(false);
                  onBookCall();
                }}
                className="bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-sm"
              >
                {t.cta}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
