import React, { useEffect, useState } from 'react';
import { ArrowRight, Lock, Unlock, ExternalLink, Download, PhoneCall } from 'lucide-react';
import { TOOLKIT_SECTIONS, TOOLKIT_FILTERS, ToolkitItem, readToolkitUnlocked } from '../data/agentToolkit';
import { ToolkitUnlockForm } from './ToolkitUnlockForm';
import { usePageSeo } from '../hooks/usePageSeo';
import { trackHtcEvent } from '../utils/analytics';

interface Props {
  onGoHome: () => void;
  onBookCall: () => void;
  onNavigate?: (path: string) => void;
}

const CANONICAL = 'https://hometowntc.com/resources/free-guides-downloads/';

const isInternal = (url: string) => url.startsWith('/') && !url.startsWith('/downloads/');

export const AgentToolkitPage: React.FC<Props> = ({ onGoHome, onBookCall, onNavigate }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [filter, setFilter] = useState<(typeof TOOLKIT_FILTERS)[number]['id']>('all');
  const matches = (item: ToolkitItem) => filter === 'all' || item.tags.includes(filter);

  useEffect(() => {
    setUnlocked(readToolkitUnlocked());
  }, []);

  usePageSeo({
    title: 'Free Agent Toolkit for Florida Realtors | Hometown TC',
    description:
      'Free tools for Florida agents from Hometown Transaction Coordinators: a FAR/BAR timeline calculator, client email templates, Canva templates and a condo, co-op and HOA resource guide.',
    canonicalUrl: CANONICAL,
    breadcrumbs: [
      { name: 'Home', url: 'https://hometowntc.com/' },
      { name: 'Resources', url: 'https://hometowntc.com/resources/' },
      { name: 'Free Agent Toolkit', url: CANONICAL },
    ],
  });

  const openLink = (item: ToolkitItem, url: string) => (e: React.MouseEvent) => {
    trackHtcEvent('guide_download', { source: 'Toolkit page', label: item.title });
    if (isInternal(url) && onNavigate) {
      e.preventDefault();
      onNavigate(url);
    }
  };

  const renderItem = (item: ToolkitItem) => {
    const locked = item.gated && !unlocked;
    return (
      <article key={item.id} className="rounded-2xl border border-[#D8D2D4] bg-white p-6 shadow-sm flex flex-col">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#075960] bg-[#0D9BA3]/10 px-2.5 py-1 rounded-full">
            {item.format}
          </span>
          {item.gated && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
              {locked ? <Lock className="w-3.5 h-3.5" aria-hidden="true" /> : <Unlock className="w-3.5 h-3.5" aria-hidden="true" />}
              {locked ? 'Unlock below' : 'Unlocked'}
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-[#3A2E29] font-serif">{item.title}</h3>
        <p className="mt-2 text-sm text-slate-700 leading-relaxed flex-1">{item.description}</p>
        <ul className="mt-4 space-y-2">
          {item.links.map((link) =>
            locked ? (
              <li key={link.label} className="flex items-center gap-2 text-sm text-slate-400">
                <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{link.label}</span>
              </li>
            ) : (
              <li key={link.label}>
                <a
                  href={link.url}
                  onClick={openLink(item, link.url)}
                  {...(link.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  {...(link.url.startsWith('/downloads/') ? { download: '' } : {})}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#075960] hover:text-[#053d42] underline underline-offset-4"
                >
                  {link.url.startsWith('/downloads/') ? (
                    <Download className="w-4 h-4" aria-hidden="true" />
                  ) : link.url.startsWith('http') ? (
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  )}
                  <span>{link.label}</span>
                </a>
                {link.note && <span className="ml-6 block text-xs text-slate-500">{link.note}</span>}
              </li>
            )
          )}
        </ul>
      </article>
    );
  };

  return (
    <main className="bg-[#EEEAEB]/40">
      <header className="bg-white border-b border-[#D8D2D4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6">
            <button onClick={onGoHome} className="hover:text-[#0D9BA3] cursor-pointer">Home</button>
            <span aria-hidden="true">→</span>
            <span className="text-[#3A2E29]">Free Agent Toolkit</span>
          </nav>
          <div className="inline-flex text-xs font-extrabold uppercase tracking-widest text-[#0D9BA3] bg-[#0D9BA3]/10 px-3.5 py-1.5 rounded-full border border-[#0D9BA3]/20">
            Free for Florida agents
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2E29] font-serif tracking-tight">
            Free Agent Toolkit
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-700 leading-relaxed">
            The tools we built for our own files, shared with Florida agents and new transaction coordinators.
            Two are open to everyone. The downloads unlock once with your name, email and phone.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-14">
        <div role="group" aria-label="Filter the toolkit" className="relative z-10 flex flex-wrap gap-2">
          {TOOLKIT_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`px-4 py-2 rounded-full text-sm font-bold border transition cursor-pointer ${
                filter === f.id
                  ? 'bg-[#075960] text-white border-[#075960]'
                  : 'bg-white text-[#3A2E29] border-[#D8D2D4] hover:border-[#0D9BA3]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        {TOOLKIT_SECTIONS.filter((section) => section.items.some(matches)).map((section) => (
          <section key={section.id} aria-labelledby={`${section.id}-title`}>
            <h2 id={`${section.id}-title`} className="text-2xl font-bold text-[#3A2E29] font-serif">{section.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{section.intro}</p>
            {section.id === 'downloads' && !unlocked && (
              <div className="mt-6">
                <ToolkitUnlockForm source="Toolkit page" onUnlocked={() => setUnlocked(true)} />
              </div>
            )}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{section.items.filter(matches).map(renderItem)}</div>
          </section>
        ))}

        <section className="rounded-2xl bg-[#3A2E29] text-white p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
          <div>
            <h2 className="text-2xl font-bold font-serif">Want us to run the file for you?</h2>
            <p className="mt-2 text-sm text-[#D8D2D4] max-w-xl">
              Book a 15-minute fit call and see how Hometown Transaction Coordinators handles contract to close.
            </p>
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
