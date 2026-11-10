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
                {challenge.source && (
                  <a
                    href={challenge.source.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-[11px] font-semibold text-[#075960] underline hover:text-[#C84600]"
                  >
                    Source: {challenge.source.title}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3b. LUXURY FILES */}
      {data.luxuryLocalLine && (
        <section className="py-16 sm:py-20 bg-[#3A2E29] text-white border-b border-[#D8D2D4]/20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-3 max-w-3xl">
              <div className="text-xs font-bold uppercase tracking-widest text-[#20C5D2]">Luxury transaction coordination</div>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold">Luxury Transaction Coordinator in {data.countyName}</h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {data.luxuryLocalLine} A luxury file isn’t a standard file with more zeros. It has more people, more documents and less room for a loose end.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                ['The agent is the only voice the client hears', 'We never step between you and your client. We keep the dates, documents and parties on track behind you, and you decide what your clients hear and when.'],
                ['Luxury files can stay on our founder’s desk', 'Michelle Martinez has worked in Florida real estate since 1995, spent 2015 to 2019 in luxury, and today coordinates $10 million-plus sales for top clients.'],
                ['A second pair of eyes on every file', 'Our File Integrity Audit reviews the file against the contract. Anything we see goes to you and the closing attorney for your judgment, the way Florida’s licensing rules require.'],
                ['Entity, trust and all-cash buyers', 'High-value buyers often purchase through an entity or trust. The FR/Bar contract now carries a federal FinCEN reporting paragraph; we make sure the closing agent gets what it needs on time.'],
              ].map(([t, d], idx) => (
                <div key={idx} className="rounded-2xl border border-white/15 bg-white/5 p-6 space-y-2">
                  <h3 className="font-serif font-bold text-lg">{t}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-[#FE7311]/10 border border-[#FE7311]/40 p-5 text-sm text-slate-200 leading-relaxed">
              <strong className="text-white">Recent luxury file:</strong> HTC supported Heather Lefebvre of Ocean Area Living and Adache Real Estate on the buyers’ side of a $37.1 million oceanfront sale on Hillsboro Mile in Broward County.{' '}
              <a href="/resources/congratulations-heather-lefebvre-hillsboro-mile/" className="text-[#20C5D2] underline font-semibold">Read the story</a>
              {' · '}
              <a href="/resources/what-changed-2026-fr-bar-contract-revision/" className="text-[#20C5D2] underline font-semibold">What the FinCEN paragraph says</a>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              The Hometown Signature covers everything you need from contract to close. Want more than that? We tailor white-glove programs for luxury agents.{' '}
              <a href="/book/" className="text-[#20C5D2] underline font-semibold">Book a conversation</a>
            </p>
          </div>
        </section>
      )}

      {/* 3c. CONDO FILES (high-density cities) */}
      {data.condoLocalLine && (
        <section className="py-16 sm:py-20 bg-white border-b border-[#D8D2D4]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-3 max-w-3xl">
              <div className="text-xs font-bold uppercase tracking-widest text-[#B84A00]">Condo transaction coordination</div>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#3A2E29]">Luxury Condo Transaction Coordinator in {data.countyName}</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {data.condoLocalLine} Condos are their own beast. Our founder, Michelle Martinez, cut her teeth in downtown Miami condos, closing more than 300 units a month across downtown Miami’s buildings from 2010 to 2015, and HTC still coordinates condo closings for agents today.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                ['Rider A and Rider B, done right', 'We train agents and transaction coordinators to execute the FR/Bar Condominium Rider (Rider A) and Homeowners’ Association/Community Disclosure (Rider B): what has to be provided, by whom, and what goes on the checklist.'],
                ['Association research, early', 'On a listing, we research the association, verify contacts and line up the document set as early as possible, so you have what you need before a buyer asks. Condo/HOA research is a $100 Listing Launch add-on, or included with every Listing Launch in SCALE.'],
                ['Florida law on the seller’s side', 'We can’t force an association to respond. We do use every applicable Florida statute, starting with section 718.503, to help the seller get what is needed to disclose the building’s physical and fiscal health properly. The building itself is for you and your client to judge.'],
              ].map(([t, d], idx) => (
                <div key={idx} className="rounded-2xl border border-[#D8D2D4] bg-[#FAF8F5] p-6 space-y-2">
                  <h3 className="font-serif font-bold text-lg text-[#3A2E29]">{t}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <a
                href="/resources/free-guides-downloads/condo-coop-hoa-guide/"
                className="inline-flex items-center justify-center gap-2 bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider"
              >
                Open the Condo, Co-op &amp; HOA Guide
              </a>
              <span className="text-sm text-slate-600">Free: Florida statutes, Miami-Dade and Broward rules, DBPR forms and the scripts we use to request association documents.</span>
            </div>
          </div>
        </section>
      )}

      {/* 3d. NEIGHBORHOOD CARDS (condo counts from Florida DBPR) */}
      {data.neighborhoods && data.neighborhoods.length > 0 && (
        <section className="py-16 sm:py-20 bg-[#FAF8F5] border-b border-[#D8D2D4]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-3 max-w-3xl">
              <div className="text-xs font-bold uppercase tracking-widest text-[#B84A00]">Neighborhood by neighborhood</div>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#3A2E29]">{data.neighborhoodsHeading ?? 'Neighborhoods we work in'}</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                What each area is, how many condominiums the State of Florida has registered there, and what files there need from us.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.neighborhoods.map((n, idx) => (
                <div key={idx} className="rounded-2xl border border-[#D8D2D4] bg-white p-6 space-y-3">
                  <h3 className="font-serif font-bold text-lg text-[#3A2E29]">{n.name}</h3>
                  <div className="rounded-xl bg-[#EEEAEB] px-4 py-3">
                    <div className="text-2xl font-black text-[#075960] leading-none">{n.condos.toLocaleString('en-US')}</div>
                    <div className="text-xs text-slate-700 mt-1">
                      registered condominiums · {n.units} units{n.zips ? ` · ${/^\d/.test(n.zips) ? 'ZIP ' : ''}${n.zips}` : ''}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{n.about}</p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <span className="font-bold text-[#3A2E29]">What these files need: </span>
                    {n.files}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
              Counts are condominiums registered with the{' '}
              <a href="https://www2.myfloridalicense.com/condos-timeshares-mobile-homes/public-records/" target="_blank" rel="noopener noreferrer" className="underline text-[#075960]">
                Florida Department of Business and Professional Regulation
              </a>{' '}
              as of November 2026, counted by the ZIP codes shown. One registered condominium can be a whole tower or one phase of it.
            </p>
          </div>
        </section>
      )}

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

      {/* 5b. OFFICIAL LOCAL SOURCES */}
      {data.sources && data.sources.length > 0 && (
        <section className="py-10 bg-white border-b border-[#D8D2D4]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#075960]">Official local sources</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {data.sources.map((s, idx) => (
                <li key={idx}>
                  <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-[#075960] underline font-semibold hover:text-[#C84600]">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Local rules change. Confirm current requirements with the building department and your title company. This page is educational and is not legal advice.
            </p>
          </div>
        </section>
      )}

      {/* Structured data for search engines and AI answers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'ProfessionalService',
                '@id': 'https://hometowntc.com/#organization',
                name: 'Hometown Transaction Coordinators',
                url: 'https://hometowntc.com/',
                telephone: PHONE_NUMBER,
                email: EMAIL_ADDRESS,
                founder: { '@type': 'Person', name: 'Michelle Martinez' },
                areaServed: [
                  { '@type': 'AdministrativeArea', name: 'Miami-Dade County, Florida' },
                  { '@type': 'AdministrativeArea', name: 'Broward County, Florida' },
                  { '@type': 'AdministrativeArea', name: 'Palm Beach County, Florida' },
                ],
              },
              {
                '@type': 'Service',
                name: `Transaction coordination for Realtors in ${data.countyName}`,
                serviceType: 'Real estate transaction coordination',
                provider: { '@id': 'https://hometowntc.com/#organization' },
                areaServed: { '@type': 'Place', name: `${data.countyName}, Florida` },
                url: `https://hometowntc.com/${data.slug}/`,
              },
              ...(data.faqs.length
                ? [{
                    '@type': 'FAQPage',
                    mainEntity: data.faqs.map((f) => ({
                      '@type': 'Question',
                      name: f.question,
                      acceptedAnswer: { '@type': 'Answer', text: f.answer },
                    })),
                  }]
                : []),
            ],
          }),
        }}
      />

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
