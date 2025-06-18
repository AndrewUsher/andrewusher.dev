import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders' // Not available with legacy API

const blogPosts = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './content/blog' }),
  schema: z.object({
    date: z.coerce.date(),
    isPublished: z.boolean().default(false),
    slug: z.string(),
    title: z.string(),
  }),
})

export const collections = {
  blogPosts,
}
