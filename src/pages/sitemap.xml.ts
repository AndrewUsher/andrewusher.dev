import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { getAllTags, slugifyTag } from '../lib/tags'
import { getArchiveData } from '../lib/archive'

const siteUrl = import.meta.env.SITE || 'https://andrewusher.dev'

interface SitemapUrl {
  url: string
  lastmod?: string
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

export const GET: APIRoute = async () => {
  const sitemapUrls: SitemapUrl[] = []

  // Static pages
  sitemapUrls.push({ url: '/', changefreq: 'daily', priority: 1.0 })
  sitemapUrls.push({ url: '/about', changefreq: 'yearly', priority: 0.7 })
  sitemapUrls.push({ url: '/contact', changefreq: 'yearly', priority: 0.7 })
  sitemapUrls.push({ url: '/projects', changefreq: 'monthly', priority: 0.8 })
  sitemapUrls.push({ url: '/blog', changefreq: 'daily', priority: 0.9 })
  sitemapUrls.push({
    url: '/blog/archive',
    changefreq: 'monthly',
    priority: 0.5,
  })
  sitemapUrls.push({ url: '/blog/tags', changefreq: 'monthly', priority: 0.5 })
  sitemapUrls.push({ url: '/journal', changefreq: 'monthly', priority: 0.4 })
  sitemapUrls.push({ url: '/uses', changefreq: 'monthly', priority: 0.5 })
  const blogPosts = await getCollection('blogPosts')
  const publishedPosts = blogPosts.filter((post) => post.data.isPublished)

  publishedPosts.forEach((post) => {
    sitemapUrls.push({
      url: `/blog/${post.data.slug}`,
      lastmod: post.data.date.toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
    })
  })

  // Archive URLs match the pages produced by the archive routes.
  const archiveData = await getArchiveData()
  archiveData.forEach(({ year, months }) => {
    sitemapUrls.push({
      url: `/blog/archive/${year}`,
      changefreq: 'monthly',
      priority: 0.4,
    })
    months.forEach(({ slug }) => {
      sitemapUrls.push({
        url: `/blog/archive/${year}/${slug}`,
        changefreq: 'monthly',
        priority: 0.3,
      })
    })
  })

  // The project collection is presented on its index page; it has no detail routes.
  // Use the same tag slugger as the generated tag pages to avoid dead sitemap URLs.
  const tags = await getAllTags()
  tags.forEach(({ name }) => {
    const tagSlug = slugifyTag(name)
    sitemapUrls.push({
      url: `/blog/tags/${tagSlug}`,
      changefreq: 'monthly',
      priority: 0.3,
    })
  })

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (entry) => `  <url>
    <loc>${siteUrl}${entry.url}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
