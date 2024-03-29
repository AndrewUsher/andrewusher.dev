import { createClient } from 'contentful'
import { env } from '~/env'
import {
  ContentfulBlogPostEntrySkeleton,
  ContentfulJournalEntrySkeleton,
  ContentfulProjectEntrySkeleton,
} from '~/types/contentful'

const client = createClient({
  accessToken: env.CONTENTFUL_ACCESS_TOKEN,
  space: env.CONTENTFUL_SPACE_ID,
})

const getBlogPosts = async () => {
  const data = await client.getEntries<ContentfulBlogPostEntrySkeleton>({
    content_type: 'blog-post',
    order: ['-fields.date'],
  })
  return data.items
}

const getBlogPostBySlug = async (slug: string) => {
  const searchResults =
    await client.getEntries<ContentfulBlogPostEntrySkeleton>({
      content_type: 'blog-post',
      'fields.slug': slug,
    })

  const postNotFound = !searchResults?.items?.length
  if (postNotFound) {
    throw new Error(`Post for slug ${slug} not found`)
  }
  const foundPost = searchResults.items[0]
  return foundPost.fields
}

const getJournalEntries = async () => {
  const data = await client.getEntries<ContentfulJournalEntrySkeleton>({
    content_type: 'journal-entry',
    order: ['-fields.date'],
  })
  return data.items
}

const getJournalEntriesBySlug = async (slug: string) => {
  const searchResults = await client.getEntries<ContentfulJournalEntrySkeleton>(
    {
      content_type: 'journal-entry',
      'fields.slug': slug,
    }
  )

  const postNotFound = !searchResults.items.length
  if (postNotFound) {
    throw new Error(`Post for slug ${slug} not found`)
  }
  const foundPost = searchResults.items[0]
  return foundPost.fields
}

const getProjects = async () => {
  const data = await client.getEntries<ContentfulProjectEntrySkeleton>({
    content_type: 'projects',
    order: ['-fields.date'],
  })

  return data
}

export {
  getBlogPosts,
  getBlogPostBySlug,
  getJournalEntries,
  getJournalEntriesBySlug,
  getProjects,
}
