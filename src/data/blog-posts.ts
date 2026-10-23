import {
  ApprovedBlogCategory,
  CATEGORY_ARCHIVES,
  LEGACY_CATEGORY_REDIRECTS,
} from './blog-categories';

export interface BlogSourceItem {
  title: string;
  link: string;
}

export interface BlogPostData {
  title: string;
  slug: string;
  description: string;
  author: string;
  reviewer: string;
  publishDate: string;
  modifiedDate: string;
  category: ApprovedBlogCategory;
  categorySlug: string;
  tags: string[];
  sources: BlogSourceItem[];
  formRevision: string;
  language: string;
  translationOf: string | null;
  canonical: string;
  disclaimer: string;
  draft: boolean;
  readTime: string;
  content: string;
}

export function resolveCategorySlug(category: ApprovedBlogCategory): string {
  const match = Object.values(CATEGORY_ARCHIVES).find((c) => c.name === category);
  return match ? match.slug : 'florida-contracts-defensible-files';
}

export function estimateReadTime(markdownBody: string): string {
  const words = markdownBody
    .replace(/[#*`>\-_[\]()]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

// Hydrated at build/render time from Astro's getCollection('blog', ({ data }) => !data.draft).
// Draft posts (draft: true) are never serialized into client bundles, HTML, sitemaps, or feeds.
let publishedStore: BlogPostData[] = [];

export function setPublishedBlogPosts(posts: BlogPostData[]): void {
  publishedStore = posts.filter((p) => !p.draft);
}

export function getAllBlogPosts(): BlogPostData[] {
  return publishedStore;
}

export function getPublishedBlogPosts(): BlogPostData[] {
  return publishedStore;
}

export function getPublishedPostBySlug(slug: string): BlogPostData | undefined {
  return publishedStore.find((p) => p.slug === slug);
}

export function getPublishedPostsByCategory(categorySlugOrName: string): BlogPostData[] {
  const resolvedSlug = LEGACY_CATEGORY_REDIRECTS[categorySlugOrName] || categorySlugOrName;
  return publishedStore.filter(
    (p) =>
      p.categorySlug === resolvedSlug ||
      p.category.toLowerCase() === categorySlugOrName.toLowerCase()
  );
}
