import React, { useEffect, useState } from 'react';
import { Download, PhoneCall, CheckCircle2 } from 'lucide-react';
import { ToolkitUnlockForm } from './ToolkitUnlockForm';
import { usePageSeo } from '../hooks/usePageSeo';
import { trackHtcEvent } from '../utils/analytics';

interface Props {
  onGoHome: () => void;
  onBookCall: () => void;
  onNavigate?: (path: string) => void;
}

// Florida Short Sale Field Guide (approved by Michelle, Nov 20 2026).
// Gated with name, email and phone. Sign-ups go to Hunter as kind "short_sale_guide"
// (until Hunter adds that branch, the server files them as Free Toolkit leads).
const CANONICAL = 'https://hometowntc.com/resources/free-guides-downloads/florida-short-sale-field-guide/';
const GUIDE_PDF = '/downloads/htc-florida-short-sale-field-guide.pdf';
const LOG_PDF = '/downloads/htc-short-sale-weekly-follow-up-log.pdf';
const UNLOCK_KEY = 'htc_short_sale_field_guide_v1';

const INSIDE: string[] = [
  'Day-one Quick Start and the timeline numbers to know',
  'Who does what: agents, negotiator, transaction coordinator, closing agent',
  'FHA, VA, Fannie Mae and Freddie Mac short sale rules side by side',
  'Before-you-list questions for the seller and the negotiator',
  'Rider G cheat sheet (CR-7 Rev. 10/21): what runs now, what waits for approval',
  'Third-party authorization checklist',
  'What the servicer usually asks for, and who provides it',
  'Title red flags',
  'Weekly follow-up log (also as a one-page printable)',
  'Setting expectations with buyers and sellers',
];

const SERIES: { slug: string; title: string }[] = [
  { slug: 'rider-g-short-sale-approval-contingency-florida', title: 'Rider G explained (Part 1)' },
  { slug: 'approved-short-sale-buyer-cancels-fannie-freddie-fha', title: 'When an approved buyer cancels (Part 2)' },
  { slug: 'what-does-short-sale-transaction-coordinator-do-florida', title: 'What a short sale TC does' },
  { slug: 'short-sale-negotiator-vs-transaction-coordinator', title: 'Negotiator vs. transaction coordinator' },
  { slug: 'how-long-does-short-sale-take-florida', title: 'How long a Florida short sale takes' },
  { slug: 'fha-short-sale-88-86-84-rule-florida', title: 'The FHA 88/86/84 rule' },
];

function readUnlocked(): boolean {
  try {
    return typeof window !== 'undefined' && window.localStorage.getItem(UNLOCK_KEY) === '1';
  } catch {
    return false;
  }
}

function saveUnlocked(): void {
  try {
    window.localStorage.setItem(UNLOCK_KEY, '1');
  } catch {
    /* storage blocked: unlock lasts for this visit only */
  }
}

export const ShortSaleFieldGuidePage: React.FC<Props> = ({ onGoHome, onBookCall, onNavigate }) => {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(readUnlocked());
  }, []);

  usePageSeo({
    title: 'Florida Short Sale Field Guide for Realtors (Free PDF) | Hometown TC',
    description:
      'Free 15-page guide for Florida agents on short sales pending approval: FHA, VA, Fannie Mae and Freddie Mac rules, a Rider G cheat sheet, checklists and a weekly follow-up log.',
    canonicalUrl: CANONICAL,
    breadcrumbs: [
      { name: 'Home', url: 'https://hometowntc.com/' },
      { name: 'Free Agent Toolkit', url: 'https://hometowntc.com/resources/free-guides-downloads/' },
      { name: 'Florida Short Sale Field Guide', url: CANONICAL },
    ],
  });

  const go = (path: string) => (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  const handleUnlocked = () => {
    saveUnlocked();
    setUnlocked(true);
  };

  return (
    <main className="bg-white">
      <header className="border-b border-[#D8D2D4] bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500 mb-6">
            <button onClick={onGoHome} className="hover:text-[#0D9BA3] cursor-pointer">Home</button>
            <span aria-hidden="true">→</span>
            <a href="/resources/free-guides-downloads/" onClick={go('/resources/free-guides-downloads/')} className="hover:text-[#0D9BA3]">Free Agent Toolkit</a>
            <span aria-hidden="true">→</span>
            <span className="text-[#3A2E29]">Florida Short Sale Field Guide</span>
          </nav>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8 items-start">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#0D9BA3]">Free download · 15-page PDF</p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#3A2E29] font-serif tracking-tight">
                Florida Short Sale Field Guide for Realtors
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
                For agents working a short sale that is waiting on lender approval. Whose rules apply, which dates run,
                what title looks for, and how to keep the servicer follow-up from going quiet. Current as of November 2026.
              </p>
              <div className="mt-6">
                {unlocked ? (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={GUIDE_PDF}
                      download=""
                      onClick={() => trackHtcEvent('field_guide_download', { source: 'Short Sale Field Guide page', label: 'Field Guide PDF' })}
                      className="inline-flex items-center justify-center gap-2 bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider"
                    >
                      <Download className="w-4 h-4" aria-hidden="true" />
                      <span>Download the guide</span>
                    </a>
                    <a
                      href={LOG_PDF}
                      download=""
                      onClick={() => trackHtcEvent('field_guide_download', { source: 'Short Sale Field Guide page', label: 'Weekly log PDF' })}
                      className="inline-flex items-center justify-center gap-2 border-2 border-[#3A2E29] text-[#3A2E29] hover:bg-[#3A2E29] hover:text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider"
                    >
                      <Download className="w-4 h-4" aria-hidden="true" />
                      <span>Weekly log (1 page)</span>
                    </a>
                  </div>
                ) : (
                  <ToolkitUnlockForm
                    source="Short Sale Field Guide"
                    kind="short_sale_guide"
                    emailTag="Short Sale Field Guide"
                    title="Get the free guide"
                    buttonLabel="Send me the guide"
                    itemName="the guide"
                    onUnlocked={handleUnlocked}
                  />
                )}
              </div>
            </div>
            <img
              src="/images/resources/short-sale-field-guide-cover.webp"
              alt="Cover of the HTC Florida Short Sale Field Guide"
              width={640}
              height={828}
              className="w-full max-w-[260px] mx-auto rounded-xl shadow-xl border border-[#D8D2D4]"
            />
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <section aria-labelledby="inside-title">
          <h2 id="inside-title" className="text-2xl font-bold text-[#3A2E29] font-serif">What's inside</h2>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INSIDE.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[#1A1412]">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#075960] shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="series-title" className="rounded-2xl border border-[#D8D2D4] bg-[#FAF8F5] p-6">
          <h2 id="series-title" className="text-xl font-bold text-[#3A2E29] font-serif">Read the short sale series on The Hometown Brief</h2>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {SERIES.map((s) => (
              <li key={s.slug}>
                <a href={`/resources/${s.slug}/`} onClick={go(`/resources/${s.slug}/`)} className="font-semibold text-[#075960] hover:text-[#053d42] underline underline-offset-4">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-xs text-slate-500">
          This guide is educational and does not constitute legal, tax or financial advice. Confirm current requirements with the servicer,
          the negotiator and a Florida real estate attorney.
        </p>

        <section className="rounded-2xl bg-[#3A2E29] text-white p-8 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
          <div>
            <h2 className="text-xl font-bold font-serif">Have a short sale pending approval?</h2>
            <p className="mt-2 text-sm text-[#D8D2D4]">Book a short sale Fit Call. We track the approval and keep the file on schedule while you and the negotiator work.</p>
          </div>
          <button
            onClick={() => {
              trackHtcEvent('short_sale_fit_call', { source: 'Short Sale Field Guide page' });
              onBookCall();
            }}
            className="inline-flex items-center justify-center gap-2 bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] px-7 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" aria-hidden="true" />
            <span>Book a Fit Call</span>
          </button>
        </section>
      </div>
    </main>
  );
};
