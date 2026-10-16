import React from 'react';
import {
  MapPin,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Calendar,
  FileText,
  Clock,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { LocationPageConfig } from '../data/locationData';
import { PHONE_NUMBER, EMAIL_ADDRESS } from '../data/content';

interface Props {
  data: LocationPageConfig;
  onBookCall: () => void;
  onSubmitDeal: () => void;
  onGoHome: () => void;
  onOpenPricing: () => void;
}

export const DynamicLocationPage: React.FC<Props> = ({
  data,
  onBookCall,
  onSubmitDeal,
  onGoHome,
  onOpenPricing,
}) => {
  return (
    <div className="bg-[#EEEAEB] text-[#3A2E29] min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#3A2E29] via-[#2A211D] to-[#3A2E29] text-white pt-24 pb-16 lg:pt-32 lg:pb-20 border-b border-[#D8D2D4]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#20C5D2] tracking-widest uppercase mb-4">
            <button onClick={onGoHome} className="hover:text-white transition cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span className="text-white">{data.breadcrumbLabel}</span>
          </div>

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#20C5D2]/20 border border-[#20C5D2]/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#20C5D2] tracking-wide">
              <MapPin className="w-3.5 h-3.5" />
              <span>{data.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight font-serif">
              {data.h1Title} <br />
              <span className="text-[#20C5D2]">{data.h1Accent}</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              {data.introParagraph}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={onBookCall}
                className="bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-8 py-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>BOOK A 15-MINUTE FIT CALL</span>
                <ArrowRight className="w-4 h-4 text-[#1A1412]" />
              </button>
              <button
                onClick={onSubmitDeal}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>SUBMIT A DEAL</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CITIES & LOCAL BOARD COVERAGE */}
      <section className="py-10 bg-white border-b border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#075960]">
                Local Board &amp; Portal Coordination
              </div>
              <div className="text-sm font-semibold text-[#3A2E29] mt-0.5">
                {data.mlsBoard}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.citiesCovered.map((city, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-[#EEEAEB] border border-[#D8D2D4] text-xs font-semibold text-[#3A2E29]"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOCAL CHALLENGES WE SOLVE */}
      <section className="py-16 sm:py-20 bg-[#FAF8F5] border-b border-[#D8D2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#075960] bg-white px-3.5 py-1.5 rounded-full border border-[#D8D2D4]">
              <Building2 className="w-3.5 h-3.5 text-[#C84600]" />
              <span>REGIONAL REAL ESTATE EXPERTISE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#3A2E29]">
              Regional Nuances in {data.countyName}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every Florida market has unique local pain points. HTC protects your transactions with experienced Florida coordinators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.keyChallenges.map((challenge, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D8D2D4] space-y-4 shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#075960]/10 text-[#075960] flex items-center justify-center font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="font-serif font-bold text-lg text-[#3A2E29]">
                  {challenge.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMPLIANCE WORKFLOW CHECKPOINTS */}
      <section className="py-16 bg-white border-b border-[#D8D2D4]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#3A2E29]">
              What Hometown TC Handles on Every File
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Complete, end-to-end milestone management from contract execution to funded closing.
            </p>
          </div>

          <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-[#D8D2D4] grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.complianceItems.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-[#075960] flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQS */}
      {data.faqs.length > 0 && (
        <section className="py-16 bg-[#EEEAEB] border-b border-[#D8D2D4]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#3A2E29]">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-4">
              {data.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-[#D8D2D4] space-y-2 shadow-xs">
                  <h4 className="font-bold text-sm sm:text-base text-[#3A2E29]">
                    {faq.question}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. FINAL CTA */}
      <section className="py-16 bg-[#3A2E29] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold">
            Ready to Streamline Your {data.countyName} Files?
          </h3>
          <p className="text-sm text-slate-300">
            Start with a 15-minute Fit Call. Set up your business preferences once, then submit files as you close.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onBookCall}
              className="bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-8 py-4 rounded-xl font-black text-xs uppercase tracking-wider transition shadow-lg cursor-pointer"
            >
              BOOK A 15-MINUTE FIT CALL
            </button>
            <button
              onClick={onOpenPricing}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-wider border border-white/20 transition cursor-pointer"
            >
              EXPLORE PRICING
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
