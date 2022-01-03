import contentful from 'contentful'

const contentfulAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN
const contentfulSpaceId = process.env.CONTENTFUL_SPACE_ID

const client = contentful.createClient({
  accessToken: contentfulAccessToken,
  space: contentfulSpaceId
})

const getBlogPosts = async () => {
  const data = await client.getEntries()
  return data
}

export { getBlogPosts }
