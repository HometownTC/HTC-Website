import React, { useEffect, useState } from 'react';
import { ExternalLink, Download, PhoneCall, Mail, MapPin } from 'lucide-react';
import { readToolkitUnlocked } from '../data/agentToolkit';
import { ToolkitUnlockForm } from './ToolkitUnlockForm';
import { usePageSeo } from '../hooks/usePageSeo';
import { trackHtcEvent } from '../utils/analytics';

interface Props {
  onGoHome: () => void;
  onBookCall: () => void;
  onNavigate?: (path: string) => void;
}

interface GuideLink {
  label: string;
  url: string;
  note?: string;
}

interface GuideSection {
  id: string;
  title: string;
  intro: string;
  links: GuideLink[];
}

// Links checked October 26, 2026. Keep official sources first.
const SECTIONS: GuideSection[] = [
  {
    id: 'statutes',
    title: 'Florida Statutes',
    intro: 'The current state law for each type of association.',
    links: [
      { label: 'Chapter 718: Condominiums', url: 'https://www.flsenate.gov/Laws/Statutes/2026/Chapter718/All' },
      { label: 'Chapter 719: Cooperatives', url: 'https://www.flsenate.gov/Laws/Statutes/2026/Chapter719/All' },
      { label: "Chapter 720: Homeowners' Associations", url: 'https://www.flsenate.gov/Laws/Statutes/2026/Chapter720/All' },
    ],
  },
  {
    id: 'local',
    title: 'Miami-Dade and Broward rules',
    intro: 'County notice rules for association applications, and the Miami-Dade association registry.',
    links: [
      {
        label: 'Miami-Dade Code Sec. 11A-18.1: Required notices for applications to purchase or rent a dwelling',
        url: 'https://library.municode.com/fl/miami_-_dade_county/codes/code_of_ordinances?nodeId=PTIIICOOR_CH11ADI_ARTIIHO_S11A-18.1RENOCOAPPUREDW',
      },
      {
        label: 'Miami-Dade Community Associations Registry',
        url: 'https://www.miamidade.gov/global/economy/consumer-protection/community-association-registry.page',
      },
      {
        label: 'Broward Code Sec. 16½-35.6: Required notices for applications to purchase a dwelling',
        url: 'https://library.municode.com/fl/broward_county/codes/code_of_ordinances?nodeId=PTIICOOR_CH16_1-2HURI_ARTIIIDIPR_DIV3DIREESTR_S16_1-2_-35.6RENOCOAPPUDW',
      },
    ],
  },
  {
    id: 'dbpr',
    title: 'State forms and publications (DBPR)',
    intro: 'Published by the Division of Florida Condominiums, Timeshares and Mobile Homes.',
    links: [
      { label: 'Condominium Frequently Asked Questions Sheet (DBPR Form CO 6000-4)', url: 'https://www2.myfloridalicense.com/lsc/forms/DBPRFormCO6000-4eff122302.pdf' },
      { label: 'Condominium Governance Form', url: 'https://www2.myfloridalicense.com/lsc/documents/CondominiumGovernanceForm.pdf' },
      { label: 'Cooperative Frequently Asked Questions Sheet (DBPR Form CO 6000-33-037)', url: 'https://www2.myfloridalicense.com/lsc/documents/CO6000-33-037CoopFAQA.pdf' },
      { label: 'Cooperative Shareholders Rights and Responsibilities', url: 'https://www2.myfloridalicense.com/lsc/documents/CooperativeUORREnglish.pdf' },
      { label: 'Estoppel Certificate and Transfer Fees', url: 'https://www2.myfloridalicense.com/lsc/documents/ESTOPPEL_CERTIFICATE_FEES.pdf' },
      { label: 'Structural Integrity Reserve Study (SIRS) Reporting and Database', url: 'https://www2.myfloridalicense.com/condos-timeshares-mobile-homes/condominiums-and-cooperatives-sirs-reporting/' },
    ],
  },
  {
    id: 'florida-realtors',
    title: 'Florida Realtors',
    intro: 'Member resources from Florida Realtors.',
    links: [
      { label: 'Questions to Ask When Buying a Condo (infographic)', url: 'https://www.floridarealtors.org/news-media/infographics/questions-ask-when-buying-condo' },
      { label: 'Legal Hotline (member benefit)', url: 'https://www.floridarealtors.org/tools-research/legal-hotline' },
    ],
  },
  {
    id: 'htc-tools',
    title: 'Scripts and tools from HTC',
    intro: 'What we use to request association documents. Make your own copy and edit it.',
    links: [
      { label: 'Starter Questions for the Association', url: 'https://docs.google.com/document/d/1DGpP8yZRCpmuZ0-cCce1BjHtVCo9c5jhyjwV-PsbEA0/copy', note: 'Google Doc: make a copy' },
      { label: "Seller's Email Requesting Association Documents (condo, co-op and HOA versions)", url: 'https://docs.google.com/document/d/18U0gRCysWXPEYcRUuL87pH0xpcJo10m_DbzMXBDm5Us/copy', note: 'Google Doc: make a copy' },
      { label: 'Line-Item Condominium Document Receipt', url: 'https://drive.google.com/file/d/1LhS3_w6lc0y-UV6MxmtoT-LVLunXJrDE/view' },
      { label: "Presentation: Condos, Co-ops and HOA's, Oh My!", url: 'https://drive.google.com/file/d/1mbArDkftXBjaEK98B5nDI8wHOFYAHGqb/view' },
    ],
  },
];

const CANONICAL = 'https://hometowntc.com/resources/free-guides-downloads/condo-coop-hoa-guide/';
const PDF_URL = '/downloads/htc-condo-coop-hoa-resource-guide.pdf';

export const CondoHoaGuidePage: React.FC<Props> = ({ onGoHome, onBookCall, onNavigate }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setUnlocked(readToolkitUnlocked());
  }, []);

  usePageSeo({
    title: 'Florida Condo, Co-op & HOA Resource Guide for Agents | Hometown TC',
    description:
      'Florida condo, co-op and HOA statutes, Miami-Dade and Broward association rules, DBPR forms, the Condominium Ombudsman and document request scripts for Realtors.',
    canonicalUrl: CANONICAL,
    breadcrumbs: [
      { name: 'Home', url: 'https://hometowntc.com/' },
      { name: 'Free Agent Toolkit', url: 'https://hometowntc.com/resources/free-guides-downloads/' },
      { name: 'Condo, Co-op & HOA Resource Guide', url: CANONICAL },
    ],
  });

  const goToolkit = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('/resources/free-guides-downloads/');
    }
  };

  return (
    <main className="bg-white">
      <header className="border-b border-[#D8D2D4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500 mb-6 print:hidden">
            <button onClick={onGoHome} className="hover:text-[#0D9BA3] cursor-pointer">Home</button>
            <span aria-hidden="true">→</span>
            <a href="/resources/free-guides-downloads/" onClick={goToolkit} className="hover:text-[#0D9BA3]">Free Agent Toolkit</a>
            <span aria-hidden="true">→</span>
            <span className="text-[#3A2E29]">Condo, Co-op & HOA Guide</span>
          </nav>
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#0D9BA3]">Hometown Transaction Coordinators</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#3A2E29] font-serif tracking-tight">
            Condo, Co-op & HOA Resource Guide
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
            The laws, forms and contacts we keep open on every Florida association file, with a focus on Miami-Dade and Broward.
            This guide points to official sources. It is not legal advice; contract and legal questions belong with the broker or a Florida real estate attorney.
          </p>
          <div className="mt-6 print:hidden">
            {unlocked ? (
              <a
                href={PDF_URL}
                download=""
                onClick={() => trackHtcEvent('guide_download', { source: 'Condo guide page', label: 'Condo guide PDF' })}
                className="inline-flex items-center gap-2 bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>Download the PDF</span>
              </a>
            ) : showForm ? (
              <ToolkitUnlockForm source="Condo guide page" onUnlocked={() => setUnlocked(true)} />
            ) : (
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider cursor-pointer"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>Get the PDF</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <section aria-labelledby="help-title" className="rounded-2xl border border-[#D8D2D4] bg-[#FAF8F5] p-6">
          <h2 id="help-title" className="text-xl font-bold text-[#3A2E29] font-serif">Office of the Condominium Ombudsman</h2>
          <p className="mt-1 text-sm text-slate-600">The state office that helps condominium unit owners with questions about their association.</p>
          <ul className="mt-4 space-y-2 text-sm text-[#1A1412]">
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-[#075960] shrink-0" aria-hidden="true" />1400 W. Commercial Boulevard, Suite 185-J, Fort Lauderdale, FL 33309-3791</li>
            <li className="flex items-start gap-2"><PhoneCall className="w-4 h-4 mt-0.5 text-[#075960] shrink-0" aria-hidden="true" /><a href="tel:+19542023234" className="underline underline-offset-4">954-202-3234</a></li>
            <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 text-[#075960] shrink-0" aria-hidden="true" /><a href="mailto:ombudsman@myfloridalicense.com" className="underline underline-offset-4">ombudsman@myfloridalicense.com</a></li>
            <li className="flex items-start gap-2"><ExternalLink className="w-4 h-4 mt-0.5 text-[#075960] shrink-0" aria-hidden="true" /><a href="https://www2.myfloridalicense.com/condos-timeshares-mobile-homes/condominium-ombudsman/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Ombudsman website</a></li>
          </ul>
        </section>

        {SECTIONS.map((section) => (
          <section key={section.id} aria-labelledby={`${section.id}-title`}>
            <h2 id={`${section.id}-title`} className="text-xl font-bold text-[#3A2E29] font-serif">{section.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{section.intro}</p>
            <ul className="mt-4 divide-y divide-[#EEEAEB] border-y border-[#EEEAEB]">
              {section.links.map((link) => (
                <li key={link.url} className="py-3">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 text-sm font-semibold text-[#075960] hover:text-[#053d42] underline underline-offset-4"
                  >
                    <ExternalLink className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{link.label}</span>
                  </a>
                  {link.note && <span className="ml-6 block text-xs text-slate-500">{link.note}</span>}
                  <span className="ml-6 hidden print:block text-[10px] text-slate-500 break-all">{link.url}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="text-xs text-slate-500">Links checked October 26, 2026. Laws and forms change; always confirm you have the current version.</p>

        <section className="rounded-2xl bg-[#3A2E29] text-white p-8 flex flex-col sm:flex-row sm:items-center gap-6 justify-between print:hidden">
          <div>
            <h2 className="text-xl font-bold font-serif">Association files are our everyday work.</h2>
            <p className="mt-2 text-sm text-[#D8D2D4]">Book a 15-minute fit call to see how HTC tracks every association document to closing.</p>
          </div>
          <button
            onClick={onBookCall}
            className="inline-flex items-center justify-center gap-2 bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-7 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" aria-hidden="true" />
            <span>Book a fit call</span>
          </button>
        </section>
      </div>
    </main>
  );
};
