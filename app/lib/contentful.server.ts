import contentful from 'contentful'

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

export { getBlogPosts }
