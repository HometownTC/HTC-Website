import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { APPROVED_BLOG_CATEGORIES } from './data/blog-categories';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(1, 'title is required'),
    slug: z.string().min(1, 'slug is required'),
    description: z.string().min(1, 'description is required'),
    author: z.string().min(1, 'author is required'),
    reviewer: z.string(),
    publishDate: z.string().min(1, 'publishDate is required'),
    modifiedDate: z.string().min(1, 'modifiedDate is required'),
    category: z.enum(APPROVED_BLOG_CATEGORIES),
    tags: z.array(z.string().min(1)).min(1, 'tags must contain at least one tag'),
    sources: z.array(
      z.object({
        title: z.string().min(1, 'source title is required'),
        link: z.string().min(1, 'source link is required'),
      })
    ),
    formRevision: z.string().min(1, 'formRevision is required'),
    language: z.string().min(1, 'language is required'),
    translationOf: z.string().nullable(),
    canonical: z.string().url('canonical must be a valid URL'),
    disclaimer: z.string().min(1, 'disclaimer is required'),
    draft: z.boolean(),
  }),
});

export const collections = { blog };
