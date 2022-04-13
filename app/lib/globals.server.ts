import { ContentfulClientApi, createClient as contentfulCreateClient } from 'contentful'

let contentfulClient: ContentfulClientApi

const contentfulAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN
const contentfulSpaceId = process.env.CONTENTFUL_SPACE_ID

declare global {
  // eslint-disable-next-line no-var
  var __contentfulClient: ContentfulClientApi | undefined
}

if (process.env.NODE_ENV === 'production') {
  contentfulClient = contentfulCreateClient({
    accessToken: contentfulAccessToken!,
    space: contentfulSpaceId!
  })
} else {
  if (!global.__contentfulClient) {
    global.__contentfulClient = contentfulCreateClient({
      accessToken: contentfulAccessToken!,
      space: contentfulSpaceId!
    })
  }
  contentfulClient = global.__contentfulClient
}

export { contentfulClient }
