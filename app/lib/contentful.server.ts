import contentful, { EntryCollection } from 'contentful'
import { Project } from '~/types/contentful'

const contentfulAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN
const contentfulSpaceId = process.env.CONTENTFUL_SPACE_ID

const client = contentful.createClient({
  accessToken: contentfulAccessToken,
  space: contentfulSpaceId
})

type BlogPostFields = {
  content: string;
  date: string;
  slug: string;
  title: string;
}

const getBlogPosts = async () => {
  const data = await client.getEntries<BlogPostFields>({
    content_type: 'blog-post',
    order: '-fields.date'
  })
  return data
}

const getBlogPostBySlug = async (slug: string) => {
  const searchResults = await client.getEntries<BlogPostFields>({
    content_type: 'blog-post',
    'fields.slug': slug
  })

  const foundPost = searchResults.items[0]
  return foundPost.fields
}

const getProjects = async (): Promise<EntryCollection<Project>> => {
  const data = await client.getEntries<Project>({
    content_type: 'projects',
    order: '-fields.date'
  })

  return data
}

export { getBlogPosts, getBlogPostBySlug, getProjects }
