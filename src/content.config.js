import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders' // Not available with legacy API

const blogPosts = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './content/blog' }),
  schema: z.object({
    date: z.coerce.date(),
    isPublished: z.boolean().default(false),
    slug: z.string(),
    tags: z.array(z.string()).optional(),
    title: z.string(),
  }),
})

const projects = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '**/*.mdx'],
    base: './content/projects',
  }),
  schema: z.object({
    date: z.coerce.date(),
    isPublished: z.boolean().default(true),
    liveProjectLink: z.string().url(),
    slug: z.string(),
    summary: z.string(),
    title: z.string(),
  }),
})

const journal = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '**/*.mdx'],
    base: './content/journal',
  }),
  schema: z.object({
    date: z.coerce.date(),
    isPublished: z.boolean().default(false),
    slug: z.string(),
    title: z.string(),
  }),
})

export const collections = {
  blogPosts,
  projects,
  journal,
}
