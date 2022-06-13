import { initSeo } from 'remix-seo'

export const { getSeo, getSeoLinks, getSeoMeta } = initSeo({
  canonical: 'https://andrewusher.dev',
  defaultTitle: 'Andrew Usher',
  twitter: {
    card: 'summary',
    creator: '@AndrewUsher17',
    site: '@AndrewUsher17',
  },
})
