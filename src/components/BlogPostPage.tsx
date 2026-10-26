import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  UserCheck,
  ShieldCheck,
  Clock,
  Share2,
  BookOpen,
  ExternalLink,
  HelpCircle,
  ArrowRight,
  Tag,
  FileCheck2,
} from 'lucide-react';
import {
  getPublishedBlogPosts,
  getPublishedPostBySlug,
  getPublishedPostsByCategory,
  HTC_INTERNAL_LINKS,
} from '../data/blog';
import { NewsletterSignup } from './NewsletterSignup';

interface Props {
  slug: string;
  onBackToBlog: () => void;
  onBookCall: () => void;
  onOpenCalculator?: (hash?: string) => void;
  onOpenHowItWorks?: () => void;
  onOpenPricing?: () => void;
  onOpenContractToClose?: () => void;
  onOpenListingCoordination?: () => void;
  onOpenGuides?: () => void;
  onOpenTcWorkshop?: () => void;
  onOpenArticle?: (slug: string) => void;
}

// Render inline Markdown (**bold**, *italic*, `code`, [text](url)) safely into React nodes
function renderInlineMarkdown(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const tokenRegex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyIdx = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      nodes.push(
        <strong key={keyIdx++} className="font-bold text-[#3A2E29]">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      nodes.push(
        <em key={keyIdx++} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      nodes.push(
        <code
          key={keyIdx++}
          className="px-1.5 py-0.5 rounded bg-[#EEEAEB] text-[#075960] font-mono text-xs border border-[#D8D2D4]"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('[')) {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const isExternal = href.startsWith('http://') || href.startsWith('https://');
        nodes.push(
          <a
            key={keyIdx++}
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="text-[#075960] font-semibold underline hover:text-[#C84600] transition-colors"
          >
            {label}
          </a>
        );
      } else {
        nodes.push(token);
      }
    }
    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

// Parse Markdown body into clean semantic React blocks
function renderMarkdownBody(
  markdown: string,
  postTitle: string,
  postDescription: string
): React.ReactNode[] {
  const lines = markdown.split(/\r?\n/);
  const elements: React.ReactNode[] = [];
  let i = 0;
  let blockKey = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      i++;
      continue;
    }

    // Horizontal rule (skip if leading before any content)
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line)) {
      if (elements.length > 0) {
        elements.push(<hr key={blockKey++} className="border-t border-[#D8D2D4] my-8" />);
      }
      i++;
      continue;
    }

    // Heading (#, ##, ###)
    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingText = headingMatch[2].trim();
      // Skip duplicate H1 if it matches frontmatter title (header already renders H1)
      if (level === 1 && headingText.toLowerCase() === postTitle.toLowerCase()) {
        i++;
        continue;
      }
      if (level <= 2) {
        elements.push(
          <h2
            key={blockKey++}
            className="text-2xl sm:text-3xl font-serif font-extrabold text-[#3A2E29] leading-tight pt-4"
          >
            {renderInlineMarkdown(headingText)}
          </h2>
        );
      } else {
        elements.push(
          <h3
            key={blockKey++}
            className="text-xl sm:text-2xl font-serif font-bold text-[#3A2E29] leading-snug pt-2"
          >
            {renderInlineMarkdown(headingText)}
          </h3>
        );
      }
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      elements.push(
        <blockquote
          key={blockKey++}
          className="p-5 bg-[#EEEAEB]/60 rounded-xl border-l-4 border-[#075960] text-sm sm:text-base text-[#3A2E29] italic font-medium"
        >
          {renderInlineMarkdown(quoteLines.join(' '))}
        </blockquote>
      );
      continue;
    }

    // Unordered list (* or -)
    if (/^[*-]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[*-]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[*-]\s+/, ''));
        i++;
      }
      elements.push(
        <ul key={blockKey++} className="space-y-2.5 pl-1">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start space-x-3 text-sm sm:text-base text-slate-700 leading-relaxed"
            >
              <span className="w-2 h-2 rounded-full bg-[#075960] shrink-0 mt-2" />
              <span>{renderInlineMarkdown(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list (1. 2. ...)
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      elements.push(
        <ol key={blockKey++} className="space-y-3 pl-1">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start space-x-3 text-sm sm:text-base text-slate-700 leading-relaxed"
            >
              <span className="w-6 h-6 rounded-full bg-[#075960]/10 text-[#075960] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-[#075960]/20">
                {idx + 1}
              </span>
              <span>{renderInlineMarkdown(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraph
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(#{1,4}\s+|>\s?|[*-]\s+|\d+\.\s+|-{3,}$|\*{3,}$|_{3,}$)/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    const paragraphText = paraLines.join(' ');
    // Skip duplicate italic deck line at top if identical to frontmatter description
    const unwrapped = paragraphText.replace(/^\*+|\*+$/g, '').trim();
    if (elements.length === 0 && unwrapped.toLowerCase() === postDescription.trim().toLowerCase()) {
      continue;
    }
    elements.push(
      <p key={blockKey++} className="text-sm sm:text-base text-slate-700 leading-relaxed">
        {renderInlineMarkdown(paragraphText)}
      </p>
    );
  }

  return elements;
}

export const BlogPostPage: React.FC<Props> = ({
  slug,
  onBackToBlog,
  onBookCall,
  onOpenCalculator,
  onOpenHowItWorks,
  onOpenArticle,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const post = useMemo(() => getPublishedPostBySlug(slug), [slug]);
  const translatedCounterpart = useMemo(() => {
    if (!post) return undefined;
    return getPublishedBlogPosts().find(
      (p) =>
        (post.translationOf && p.slug === post.translationOf) ||
        p.translationOf === post.slug
    );
  }, [post]);
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return getPublishedPostsByCategory(post.categorySlug)
      .filter((p) => p.slug !== post.slug)
      .slice(0, 3);
  }, [post]);

  useEffect(() => {
    if (!post) return;

    const originalTitle = document.title;
    const pageTitle = `${post.title} | The Hometown Brief • HTC`;
    document.title = pageTitle;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let canonical = document.querySelector('link[rel="canonical"]');
    let createdCanonical = false;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
      createdCanonical = true;
    }
    const originalCanonicalHref = canonical.getAttribute('href');
    canonical.setAttribute('href', post.canonical);

    let metaDesc = document.querySelector('meta[name="description"]');
    const originalMetaContent = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute('content', post.description);
    }

    const setMetaTag = (attr: 'name' | 'property', key: string, value: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
      return el;
    };

    setMetaTag('property', 'og:title', pageTitle);
    setMetaTag('property', 'og:description', post.description);
    setMetaTag('property', 'og:type', 'article');
    setMetaTag('property', 'og:url', post.canonical);
    setMetaTag('property', 'og:site_name', 'The Hometown Brief • Hometown Transaction Coordinators');
    setMetaTag('property', 'article:published_time', post.publishDate);
    setMetaTag('property', 'article:modified_time', post.modifiedDate);
    setMetaTag('property', 'article:author', post.author);
    setMetaTag('property', 'article:section', post.category);
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', pageTitle);
    setMetaTag('name', 'twitter:description', post.description);

    const existingSchema = document.getElementById('hometown-article-schema');
    if (existingSchema) existingSchema.remove();

    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'hometown-article-schema';

    const wordCount = post.content.split(/\s+/).filter(Boolean).length;

    schemaScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          '@id': `${post.canonical}#article`,
          isPartOf: {
            '@type': 'Blog',
            '@id': 'https://hometowntc.com/resources/#blog',
            name: 'The Hometown Brief',
            url: 'https://hometowntc.com/resources/',
          },
          headline: post.title,
          description: post.description,
          inLanguage: post.language,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': post.canonical,
          },
          url: post.canonical,
          datePublished: post.publishDate,
          dateModified: post.modifiedDate,
          wordCount,
          articleSection: post.category,
          keywords: post.tags,
          author: {
            '@type': 'Organization',
            name: post.author,
            url: 'https://hometowntc.com/',
          },
          ...(post.reviewer
            ? {
                reviewedBy: {
                  '@type': 'Person',
                  name: post.reviewer,
                },
              }
            : {}),
          ...(post.translationOf && translatedCounterpart
            ? {
                translationOfWork: {
                  '@id': `${translatedCounterpart.canonical}#article`,
                },
              }
            : {}),
          publisher: {
            '@type': 'Organization',
            name: 'Hometown Transaction Coordinators',
            url: 'https://hometowntc.com/',
            logo: {
              '@type': 'ImageObject',
              url: 'https://hometowntc.com/favicon.jpg',
            },
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${post.canonical}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://hometowntc.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'The Hometown Brief',
              item: 'https://hometowntc.com/resources/',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: post.category,
              item: `https://hometowntc.com/resources/${post.categorySlug}/`,
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: post.title,
              item: post.canonical,
            },
          ],
        },
      ],
    });
    document.head.appendChild(schemaScript);

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalMetaContent) {
        metaDesc.setAttribute('content', originalMetaContent);
      }
      if (canonical) {
        if (createdCanonical) {
          canonical.remove();
        } else if (originalCanonicalHref) {
          canonical.setAttribute('href', originalCanonicalHref);
        }
      }
      const existing = document.getElementById('hometown-article-schema');
      if (existing) existing.remove();
    };
  }, [post]);

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (!post) {
    return (
      <div className="min-h-[60vh] bg-[#EEEAEB] flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full bg-white border border-[#D8D2D4] rounded-2xl p-8 text-center space-y-4 shadow-sm">
          <h1 className="text-2xl font-serif font-extrabold text-[#3A2E29]">Brief Not Found</h1>
          <p className="text-sm text-slate-600">
            This operational brief is either unpublished or no longer available.
          </p>
          <a
            href="/resources/"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey) {
                e.preventDefault();
                onBackToBlog();
              }
            }}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#075960] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#054449] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to The Hometown Brief</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[#EEEAEB] text-[#3A2E29] font-sans selection:bg-[#20C5D2] selection:text-white">
      {/* 1. BREADCRUMB BAR */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-[#D8D2D4] bg-white/90 backdrop-blur-md text-[11px] font-mono uppercase tracking-widest text-[#3A2E29]/70 py-2.5 px-4 sm:px-8 sticky top-0 z-30 shadow-xs"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <ol className="flex items-center space-x-1.5 flex-wrap">
            <li>
              <a href="/" className="hover:text-[#075960] transition font-bold text-[#3A2E29]">
                HOME
              </a>
            </li>
            <li aria-hidden="true" className="text-[#D8D2D4]">
              /
            </li>
            <li>
              <a
                href="/resources/"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    onBackToBlog();
                  }
                }}
                className="hover:text-[#075960] font-bold transition inline-flex items-center space-x-1 text-[#3A2E29]"
              >
                <ArrowLeft className="w-3 h-3 text-[#075960]" />
                <span>THE HOMETOWN BRIEF</span>
              </a>
            </li>
            <li aria-hidden="true" className="text-[#D8D2D4]">
              /
            </li>
            <li>
              <a
                href={`/resources/${post.categorySlug}/`}
                className="hover:text-[#075960] transition truncate max-w-[160px] sm:max-w-[240px] inline-block font-semibold"
              >
                {post.category}
              </a>
            </li>
            <li aria-hidden="true" className="text-[#D8D2D4] hidden lg:inline">
              /
            </li>
            <li
              aria-current="page"
              className="text-[#3A2E29] font-bold truncate max-w-[220px] hidden lg:inline"
            >
              {post.title}
            </li>
          </ol>

          <button
            onClick={handleShare}
            className="bg-[#EEEAEB] hover:bg-white text-[#3A2E29] border border-[#D8D2D4] px-2.5 py-1 rounded-lg text-[10px] font-bold transition inline-flex items-center space-x-1 cursor-pointer"
          >
            <Share2 className="w-3 h-3 text-[#075960]" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
          </button>
        </div>
      </nav>

      {/* 2. ARTICLE HEADER */}
      <header className="border-b border-[#D8D2D4] bg-white pt-10 sm:pt-14 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="inline-flex flex-wrap items-center gap-2">
              <a
                href={`/resources/${post.categorySlug}/`}
                className="bg-[#075960]/10 text-[#075960] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#075960]/30 hover:bg-[#075960] hover:text-white transition-colors"
              >
                {post.category}
              </a>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                <FileCheck2 className="w-3.5 h-3.5 text-[#075960]" />
                <span>{post.formRevision}</span>
              </span>
              {translatedCounterpart && (
                <a
                  href={`/resources/${translatedCounterpart.slug}/`}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && onOpenArticle) {
                      e.preventDefault();
                      onOpenArticle(translatedCounterpart.slug);
                    }
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#075960] hover:text-[#C84600] underline transition-colors"
                >
                  <span>
                    {translatedCounterpart.language === 'es'
                      ? 'Leer en Español'
                      : 'Read in English'}
                  </span>
                </a>
              )}
            </div>

            <div className="flex items-center space-x-4 text-xs text-slate-500 font-medium">
              <span className="inline-flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-[#075960]" />
                <span className="font-bold text-[#3A2E29]">{post.readTime}</span>
              </span>
              <button
                onClick={handleShare}
                className="hover:text-[#075960] transition cursor-pointer inline-flex items-center space-x-1 font-bold text-[#3A2E29]"
                title="Copy link to brief"
              >
                <Share2 className="w-3.5 h-3.5 text-[#075960]" />
                <span>{copiedLink ? 'COPIED!' : 'SHARE'}</span>
              </button>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#3A2E29] leading-tight tracking-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed border-l-4 border-[#075960] pl-4 sm:pl-6 py-1 italic font-medium">
            {post.description}
          </p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Tag className="w-3.5 h-3.5 text-[#075960]" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold bg-[#EEEAEB] text-[#3A2E29] px-2.5 py-0.5 rounded-full border border-[#D8D2D4]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Byline, Reviewer & Dates */}
          <div className="pt-6 border-t border-[#D8D2D4] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center space-x-1.5">
                <UserCheck className="w-4 h-4 text-[#075960]" />
                <span>
                  By <strong className="text-[#3A2E29]">{post.author}</strong>
                </span>
              </div>

              {post.reviewer && (
                <>
                  <span className="text-[#D8D2D4]">•</span>
                  <div className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#075960]" />
                    <span>
                      Reviewed by <strong className="text-[#3A2E29]">{post.reviewer}</strong>
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-500 font-medium">
              <span>Published {post.publishDate}</span>
              {post.modifiedDate && post.modifiedDate !== post.publishDate && (
                <>
                  <span>•</span>
                  <span>Updated {post.modifiedDate}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 3. MARKDOWN ARTICLE BODY */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#D8D2D4] shadow-sm space-y-5">
          {renderMarkdownBody(post.content, post.title, post.description)}
        </div>

        {/* 4. SOURCES (From frontmatter sources: [{ title, link }]) */}
        {post.sources.length > 0 && (
          <section
            aria-label="Sources and References"
            className="p-6 bg-white rounded-2xl border border-[#D8D2D4] space-y-3 shadow-sm"
          >
            <h2 className="text-base font-serif font-bold text-[#3A2E29] flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-[#075960]" />
              <span>Sources &amp; References</span>
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm">
              {post.sources.map((source, idx) => (
                <li key={idx}>
                  <a
                    href={source.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#075960] hover:text-[#C84600] hover:underline inline-flex items-center space-x-1.5 font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    <span>{source.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 5. NEXT BEST RESOURCE CTA */}
        <section
          aria-labelledby="next-resource-heading"
          className="bg-[#3A2E29] text-white rounded-2xl p-8 sm:p-10 border border-[#20C5D2]/30 shadow-xl space-y-6"
        >
          <div className="space-y-2 border-b border-white/15 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#20C5D2]">
              NEXT BEST RESOURCE
            </span>
            <h2
              id="next-resource-heading"
              className="text-2xl sm:text-3xl font-serif font-extrabold text-white"
            >
              Put These Insights Into Action
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Practical tools and operational pathways to streamline your Florida files.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 hover:bg-white/10 p-6 rounded-xl border border-white/15 flex flex-col justify-between space-y-4 transition">
              <div className="space-y-1">
                <span className="text-[11px] text-[#C84600] font-bold uppercase tracking-wider">
                  RECOMMENDED NEXT STEP
                </span>
                <h3 className="text-lg font-serif font-bold text-white">Run the Numbers</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  See how much administrative time HTC saves you on every contract.
                </p>
              </div>
              <a
                href="/agent-business-calculator/#time-worth"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey && onOpenCalculator) {
                    e.preventDefault();
                    onOpenCalculator('time-worth');
                  }
                }}
                className="w-full bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] font-black py-3 px-5 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer shadow-md text-center inline-block"
              >
                RUN THE NUMBERS →
              </a>
            </div>

            <div className="bg-white/5 hover:bg-white/10 p-6 rounded-xl border border-white/15 flex flex-col justify-between space-y-4 transition">
              <div className="space-y-1">
                <span className="text-[11px] text-[#20C5D2] font-bold uppercase tracking-wider">
                  OPERATIONAL WORKFLOW
                </span>
                <h3 className="text-lg font-serif font-bold text-white">How HTC Works</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Review our complete 4-step H.O.M.E. milestone system, or schedule a 15-Minute Fit Call.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href="/how-htc-works/"
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && onOpenHowItWorks) {
                      e.preventDefault();
                      onOpenHowItWorks();
                    }
                  }}
                  className="flex-1 bg-transparent hover:bg-white/10 text-white border border-white/30 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer text-center inline-block"
                >
                  HOW HTC WORKS
                </a>
                <button
                  onClick={onBookCall}
                  className="flex-1 bg-white/15 hover:bg-white/25 text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer text-center"
                >
                  FIT CALL
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 6. INTERNAL OPERATIONAL DIRECTORY */}
        <section
          aria-label="Internal Resource Directory"
          className="p-6 bg-white rounded-2xl border border-[#D8D2D4] space-y-4 shadow-sm"
        >
          <h2 className="text-base font-serif font-bold text-[#3A2E29] flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-[#075960]" />
            <span>HTC Operational Directory</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
            {HTC_INTERNAL_LINKS.slice(0, 6).map((item) => (
              <a
                key={item.id}
                href={item.url}
                className="text-[#075960] hover:underline font-bold inline-flex items-center space-x-1.5"
              >
                <ArrowRight className="w-3.5 h-3.5 text-[#075960] shrink-0" />
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </section>

        {/* 7. FRONTMATTER DISCLAIMER */}
        <section
          aria-label="Educational Disclaimer"
          className="p-6 bg-white rounded-2xl border border-[#D8D2D4] space-y-2 text-xs text-slate-600 shadow-sm"
        >
          <div className="flex items-center space-x-2 text-[#075960] font-bold uppercase tracking-wider text-xs">
            <HelpCircle className="w-4 h-4" />
            <span>Operational &amp; Educational Disclaimer</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-500 font-medium">{post.disclaimer}</p>
        </section>

        {/* 8. NEWSLETTER SIGNUP */}
        <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#D8D2D4] shadow-xs space-y-4">
          <div className="max-w-2xl mx-auto space-y-3 text-center">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#075960] block">
              WEEKLY TRANSACTION BRIEF
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#3A2E29]">
              Stay Ahead of Florida Contract &amp; Coordination Realities
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Concise breakdowns of Florida contract updates, templates, and operational field notes from our transaction desk.
            </p>
            <div className="pt-2">
              <NewsletterSignup variant="card" source={`Brief: ${post.title}`} />
            </div>
          </div>
        </div>

        {/* 9. RELATED PUBLISHED ARTICLES */}
        {relatedPosts.length > 0 && (
          <section
            aria-labelledby="related-articles-heading"
            className="space-y-4 pt-6 border-t border-[#D8D2D4]"
          >
            <div className="flex items-center justify-between">
              <h2
                id="related-articles-heading"
                className="text-xl font-serif font-extrabold text-[#3A2E29]"
              >
                More in {post.category}
              </h2>
              <a
                href={`/resources/${post.categorySlug}/`}
                className="text-xs font-bold text-[#075960] hover:text-[#C84600] transition-colors"
              >
                VIEW CATEGORY →
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((rel) => (
                <a
                  key={rel.slug}
                  href={`/resources/${rel.slug}/`}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && onOpenArticle) {
                      e.preventDefault();
                      onOpenArticle(rel.slug);
                    }
                  }}
                  className="p-5 bg-white rounded-xl border border-[#D8D2D4] hover:border-[#075960] hover:shadow-md transition space-y-2 group block"
                >
                  <span className="text-[11px] text-[#075960] font-bold uppercase tracking-wider block">
                    {rel.category}
                  </span>
                  <h3 className="text-sm font-serif font-bold text-[#3A2E29] group-hover:text-[#075960] transition line-clamp-2">
                    {rel.title}
                  </h3>
                  <span className="text-xs text-slate-400 block font-medium">{rel.readTime}</span>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
    </article>
  );
};
