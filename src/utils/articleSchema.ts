// Builds the JSON-LD @graph (BlogPosting + BreadcrumbList) for a Hometown Brief post.
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

export function buildArticleSchema(
  post: ArticleSchemaInput,
  translatedCounterpartCanonical?: string
): Record<string, unknown> {
  const wordCount = post.content.split(/\s+/).filter(Boolean).length;
  const reviewer = post.reviewer
    ? { '@type': 'Person', name: post.reviewer, ...(REVIEWER_DETAILS[post.reviewer] || {}) }
    : undefined;

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
    ],
  };
}
