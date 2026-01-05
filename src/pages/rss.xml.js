import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { marked } from 'marked'

/**
 * Truncate text to specified length, removing markdown formatting
 */
function truncateDescription(markdown, maxLength = 150) {
  // Strip markdown formatting (links, bold, italic, code blocks, etc.)
  const plainText = markdown
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .replace(/[*_~#]/g, '') // Remove markdown symbols
    .replace(/\n+/g, ' ') // Convert newlines to spaces
    .trim()

  if (plainText.length <= maxLength) {
    return plainText
  }

  // Truncate and add ellipsis
  return plainText.substring(0, maxLength).trim() + '...'
}

/**
 * Clean MDX/markdown content by removing import statements and JSX that won't work in RSS
 */
function cleanContent(markdown) {
  return (
    markdown
      // Remove import statements (common in MDX)
      .replace(/^import\s+.+from\s+['"].+['"];?\s*$/gm, '')
      // Remove export statements
      .replace(/^export\s+.+$/gm, '')
      .trim()
  )
}

export async function GET(context) {
  const posts = await getCollection('blogPosts')

  // Filter for published posts and sort by date descending
  const publishedPosts = posts
    .filter((post) => post.data.isPublished)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())

  // Convert posts to RSS items
  const items = publishedPosts.map((post) => {
    const cleanedContent = cleanContent(post.body)
    const htmlContent = marked.parse(cleanedContent)

    return {
      title: post.data.title,
      pubDate: post.data.date,
      description: truncateDescription(cleanedContent),
      link: `/blog/${post.data.slug}/`,
      content: htmlContent,
      categories: post.data.tags || [],
    }
  })

  return rss({
    title: "Andrew Usher's Blog",
    description:
      'Thoughts on web development, JavaScript, TypeScript, and software engineering',
    site: context.site,
    items,
    customData: '<language>en-us</language>',
  })
}
