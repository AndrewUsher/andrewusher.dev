import contentful, { EntryCollection } from 'contentful'
import { BlogPost, Project } from '~/types/contentful'

const contentfulAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN
const contentfulSpaceId = process.env.CONTENTFUL_SPACE_ID

const client = contentful.createClient({
  accessToken: contentfulAccessToken,
  space: contentfulSpaceId
})

const getBlogPosts = async () => {
  const data = await client.getEntries<BlogPost>({
    content_type: 'blog-post',
    order: '-fields.date'
  })
  return data
}

const getBlogPostBySlug = async (slug: string) => {
  const searchResults = await client.getEntries<BlogPost>({
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
