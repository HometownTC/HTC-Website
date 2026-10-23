// =============================================================================
// HOMETOWN TC — THE HOMETOWN BRIEF DATA & SEARCH HELPERS
// Project Book v1.3 Section 10: Editorial Governance & Search Architecture
// Reads 100% dynamically from Markdown/MDX files in src/content/blog/.
// Zero hand-copied posts or article copy live in this file.
// =============================================================================

import {
  APPROVED_BLOG_CATEGORIES,
  ApprovedBlogCategory,
  CATEGORY_ARCHIVES,
  CategoryArchiveConfig,
  LEGACY_CATEGORY_REDIRECTS,
} from './blog-categories';
import {
  BlogPostData,
  BlogSourceItem,
  getAllBlogPosts,
  getPublishedBlogPosts,
  getPublishedPostBySlug,
  getPublishedPostsByCategory,
  setPublishedBlogPosts,
} from './blog-posts';

export {
  APPROVED_BLOG_CATEGORIES,
  CATEGORY_ARCHIVES,
  LEGACY_CATEGORY_REDIRECTS,
  getAllBlogPosts,
  getPublishedBlogPosts,
  getPublishedPostBySlug,
  getPublishedPostsByCategory,
  setPublishedBlogPosts,
};

export type { ApprovedBlogCategory, CategoryArchiveConfig, BlogPostData, BlogSourceItem };

// Permanent approved topic categories
export const PERMANENT_TOPIC_CATEGORIES = APPROVED_BLOG_CATEGORIES;
export type TopicCategory = ApprovedBlogCategory;

export const BLOG_CATEGORIES = [
  'All Topics',
  ...APPROVED_BLOG_CATEGORIES,
];

// Re-export CATEGORY_ARCHIVE_CONFIGS & aliases pointing to the single settings file
export const CATEGORY_ARCHIVE_CONFIGS = CATEGORY_ARCHIVES;
export const CATEGORY_SLUG_ALIASES = LEGACY_CATEGORY_REDIRECTS;

// =============================================================================
// REQUIRED INTERNAL LINKING DIRECTORY
// =============================================================================

export interface InternalLinkItem {
  id: string;
  label: string;
  url: string;
  description: string;
}

export const HTC_INTERNAL_LINKS: InternalLinkItem[] = [
  {
    id: 'run-the-numbers',
    label: 'Run the Numbers',
    url: '/agent-business-calculator/',
    description: 'Interactive ROI tool to calculate effective hourly rate and model production growth.',
  },
  {
    id: 'how-htc-works',
    label: 'How HTC Works',
    url: '/how-htc-works/',
    description: 'Our four-step H.O.M.E. system for contract-to-close file management.',
  },
  {
    id: 'why-htc',
    label: 'Why HTC',
    url: '/why-htc/',
    description: 'Why Florida agents trust Hometown Transaction Coordinators over generic virtual assistants.',
  },
  {
    id: 'listing-launch',
    label: 'Listing Launch',
    url: '/listing-coordination/',
    description: 'Pre-listing intake, MLS compliance verification, and marketing asset preparation.',
  },
  {
    id: 'contract-to-close',
    label: 'Contract-to-Close',
    url: '/contract-to-close-services/',
    description: 'Comprehensive milestone tracking from escrow intake through final funding.',
  },
  {
    id: 'pricing',
    label: 'Services + Pricing',
    url: '/pricing/',
    description: 'Transparent, per-file pricing with zero monthly retainers or setup fees.',
  },
  {
    id: 'tc-workshop',
    label: 'Florida TC Workshop',
    url: '/tcworkshop/',
    description: 'Practical training on Florida contracts, statutory deadlines, and file coordination.',
  },
  {
    id: 'free-guides',
    label: 'Free Guides + Downloads',
    url: '/free-guides-downloads/',
    description: 'Printable checklists, milestone roadmaps, and condo audit field manuals.',
  },
  {
    id: 'faq',
    label: 'FAQ',
    url: '/faq/',
    description: 'Answers to common questions about setup, file intake, and communications.',
  },
  {
    id: 'fit-call',
    label: 'Fit Call',
    url: '/book/',
    description: 'Schedule a focused 15-minute fit call to see if HTC is the right fit for your business.',
  },
  {
    id: 'hometown-brief',
    label: 'The Hometown Brief Archive',
    url: '/resources/',
    description: 'All evergreen operations briefs and Florida real estate answer articles.',
  },
];

// =============================================================================
// SEARCH ENGINE IMPLEMENTATION
// Covers: article title, description, category, tags, and Markdown body
// Reads directly from published Markdown files (draft === false)
// =============================================================================

export interface SearchResultItem {
  id: string;
  slug: string;
  headline: string;
  shortSummary: string;
  category: string;
  categorySlug: string;
  readTime: string;
  matchedField: 'title' | 'brief' | 'category' | 'tags' | 'body';
}

export function searchBriefs(query: string, categoryFilter: string = 'All Topics'): SearchResultItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const published = getPublishedBlogPosts();

  return published
    .filter((post) => {
      if (categoryFilter !== 'All Topics') {
        const isMatch =
          post.category.toLowerCase() === categoryFilter.toLowerCase() ||
          post.categorySlug === categoryFilter.toLowerCase();
        if (!isMatch) return false;
      }

      const titleMatch = post.title.toLowerCase().includes(q);
      const descMatch = post.description.toLowerCase().includes(q);
      const catMatch = post.category.toLowerCase().includes(q);
      const tagMatch = post.tags.some((t) => t.toLowerCase().includes(q));
      const bodyMatch = post.content.toLowerCase().includes(q);

      return titleMatch || descMatch || catMatch || tagMatch || bodyMatch;
    })
    .map((post) => {
      let matchedField: 'title' | 'brief' | 'category' | 'tags' | 'body' = 'title';
      if (post.title.toLowerCase().includes(q)) matchedField = 'title';
      else if (post.description.toLowerCase().includes(q)) matchedField = 'brief';
      else if (post.tags.some((t) => t.toLowerCase().includes(q))) matchedField = 'tags';
      else if (post.category.toLowerCase().includes(q)) matchedField = 'category';
      else matchedField = 'body';

      const shortSummary =
        post.description.length > 140 ? `${post.description.substring(0, 137)}...` : post.description;

      return {
        id: post.slug,
        slug: post.slug,
        headline: post.title,
        shortSummary,
        category: post.category,
        categorySlug: post.categorySlug,
        readTime: post.readTime,
        matchedField,
      };
    });
}
