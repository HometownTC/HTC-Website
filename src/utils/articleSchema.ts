// Builds the JSON-LD @graph (BlogPosting + BreadcrumbList, plus FAQPage when the post has an FAQ section) for a Hometown Brief post.
// Used in two places so they never drift apart:
//   - src/pages/[...slug].astro renders it into the static HTML at build time
//     (so crawlers that do not run JavaScript still see it), and
//   - src/components/BlogPostPage.tsx replaces it with the same object on the client.

export interface ArticleSchemaInput {
  title: string;
  description: string;
  canonical: string;
  language: string;
  publishDate: string;
  modifiedDate: string;
  category: string;
  categorySlug: string;
  tags: string[];
  author: string;
  reviewer?: string;
  heroImage?: string;
  content: string;
}

const SITE = 'https://hometowntc.com';

// Approved reviewer details (matches the About Michelle page).
const REVIEWER_DETAILS: Record<string, { jobTitle: string; url: string }> = {
  'Michelle Martinez': {
    jobTitle: 'Founder, Hometown Transaction Coordinators',
    url: `${SITE}/about/`,
  },
};


// Pulls Q&A pairs from a post's "## Frequently Asked Questions" section
// ("### Question" headings, answer paragraphs below) for FAQPage schema.
function plain(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*|__|\*|`/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractFaqs(content: string): { question: string; answer: string }[] {
  const start = content.search(/^## (Frequently Asked Questions|Preguntas frecuentes)\s*$/im);
  if (start < 0) return [];
  const rest = content.slice(start).split('\n').slice(1).join('\n');
  const end = rest.search(/^(## |\*\*(The short sale series|Related reading)|---\s*$)/m);
  const section = end >= 0 ? rest.slice(0, end) : rest;
  return section
    .split(/^### /m)
    .slice(1)
    .map((chunk) => {
      const [q, ...a] = chunk.split('\n');
      return { question: plain(q), answer: plain(a.join(' ')) };
    })
    .filter((f) => f.question && f.answer);
}

export function buildArticleSchema(
  post: ArticleSchemaInput,
  translatedCounterpartCanonical?: string
): Record<string, unknown> {
  const wordCount = post.content.split(/\s+/).filter(Boolean).length;
  const reviewer = post.reviewer
    ? { '@type': 'Person', name: post.reviewer, ...(REVIEWER_DETAILS[post.reviewer] || {}) }
    : undefined;

  const faqs = extractFaqs(post.content);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${post.canonical}#article`,
        isPartOf: {
          '@type': 'Blog',
          '@id': `${SITE}/resources/#blog`,
          name: 'The Hometown Brief',
          url: `${SITE}/resources/`,
        },
        headline: post.title,
        description: post.description,
        inLanguage: post.language,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': post.canonical,
          // reviewedBy is a WebPage property in schema.org, not an Article one
          ...(reviewer ? { reviewedBy: reviewer } : {}),
        },
        url: post.canonical,
        datePublished: post.publishDate,
        dateModified: post.modifiedDate,
        ...(post.heroImage ? { image: `${SITE}${post.heroImage}` } : {}),
        wordCount,
        articleSection: post.category,
        keywords: post.tags,
        author: {
          '@type': 'Organization',
          name: post.author,
          url: `${SITE}/`,
        },
        ...(translatedCounterpartCanonical
          ? { translationOfWork: { '@id': `${translatedCounterpartCanonical}#article` } }
          : {}),
        publisher: {
          '@type': 'Organization',
          name: 'Hometown Transaction Coordinators',
          url: `${SITE}/`,
          logo: { '@type': 'ImageObject', url: `${SITE}/favicon.jpg` },
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${post.canonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'The Hometown Brief', item: `${SITE}/resources/` },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.category,
            item: `${SITE}/resources/${post.categorySlug}/`,
          },
          { '@type': 'ListItem', position: 4, name: post.title, item: post.canonical },
        ],
      },
      ...(faqs.length
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${post.canonical}#faq`,
              isPartOf: { '@id': post.canonical },
              inLanguage: post.language,
              mainEntity: faqs.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: { '@type': 'Answer', text: f.answer },
              })),
            },
          ]
        : []),
    ],
  };
}
