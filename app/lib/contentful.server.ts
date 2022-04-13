import { EntryCollection } from 'contentful'
import { BlogPost, Project } from '~/types/contentful'
import { contentfulClient } from './globals.server'

const getBlogPosts = async () => {
  const data = await contentfulClient.getEntries<BlogPost>({
    content_type: 'blog-post',
    order: '-fields.date'
  })
  return data
}

const getBlogPostBySlug = async (slug: string) => {
  const searchResults = await contentfulClient.getEntries<BlogPost>({
    content_type: 'blog-post',
    'fields.slug': slug
  })

  const foundPost = searchResults.items[0]
  return foundPost.fields
}

const getProjects = async (): Promise<EntryCollection<Project>> => {
  const data = await contentfulClient.getEntries<Project>({
    content_type: 'projects',
    order: '-fields.date'
  })

  return data
}

export { getBlogPosts, getBlogPostBySlug, getProjects }
