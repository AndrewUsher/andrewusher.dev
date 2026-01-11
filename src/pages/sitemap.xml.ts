import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import dayjs from 'dayjs'

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
  sitemapUrls.push({
    url: '/things-i-like',
    changefreq: 'monthly',
    priority: 0.5,
  })

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

  // Projects
  const projects = await getCollection('projects')
  const publishedProjects = projects.filter(
    (project) => project.data.isPublished
  )

  publishedProjects.forEach((project) => {
    sitemapUrls.push({
      url: `/projects/${project.data.slug}`,
      lastmod: project.data.date.toISOString(),
      changefreq: 'monthly',
      priority: 0.7,
    })
  })

  const years = new Set(
    publishedPosts.map((post) => dayjs(post.data.date).year())
  )

  years.forEach((year) => {
    sitemapUrls.push({
      url: `/blog/archive/${year}`,
      changefreq: 'monthly',
      priority: 0.4,
    })
  })

  publishedPosts.forEach((post) => {
    const year = dayjs(post.data.date).year()
    const month = dayjs(post.data.date).format('MMMM').toLowerCase()
    sitemapUrls.push({
      url: `/blog/archive/${year}/${month}`,
      changefreq: 'monthly',
      priority: 0.3,
    })
  })

  // Tag pages
  const allTags = new Set<string>()
  publishedPosts.forEach((post) => {
    post.data.tags?.forEach((tag: string) => allTags.add(tag))
  })

  allTags.forEach((tag: string) => {
    const tagSlug = tag.toLowerCase().replace(/\s+/g, '-')
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
