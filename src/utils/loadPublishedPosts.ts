import { isPublished } from './isPublished';
import { getCollection } from 'astro:content';
import {
  BlogPostData,
  estimateReadTime,
  resolveCategorySlug,
} from '../data/blog-posts';

export async function loadPublishedBlogPosts(): Promise<BlogPostData[]> {
  const entries = await getCollection('blog', ({ data }) => isPublished(data));

  return entries
    .map((entry) => {
      const body = (entry.body || '').trim();
      return {
        title: entry.data.title,
        slug: entry.data.slug,
        description: entry.data.description,
        author: entry.data.author,
        reviewer: entry.data.reviewer,
        publishDate: entry.data.publishDate,
        modifiedDate: entry.data.modifiedDate,
        category: entry.data.category,
        categorySlug: resolveCategorySlug(entry.data.category),
        tags: entry.data.tags,
        sources: entry.data.sources,
        formRevision: entry.data.formRevision,
        language: entry.data.language,
        translationOf: entry.data.translationOf,
        canonical: entry.data.canonical,
        disclaimer: entry.data.disclaimer,
        draft: entry.data.draft,
        readTime: estimateReadTime(body),
        content: body,
      };
    })
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}
