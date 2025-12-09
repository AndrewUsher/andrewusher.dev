---
title: "Adding Estimated Reading Time to an Astro Blog"
slug: "adding-reading-time-to-astro-blog"
date: 2025-12-08
isPublished: true
tags: ["astro", "typescript", "web-development", "tutorial"]
---

Reading time estimates have become a standard UX feature on modern blogs. They set reader expectations, help people decide if they have time to read an article, and improve engagement. Adding this feature to an Astro blog is straightforward and can be done with a simple utility function and a reusable component.

## The Core Algorithm

The foundation of reading time estimation is a utility function that counts words and calculates reading duration. The standard approach assumes readers process about 200 words per minute.

```typescript
/**
 * Calculate estimated reading time for text content
 * @param content - Raw markdown or text content
 * @param wordsPerMinute - Reading speed (default: 200 wpm)
 * @returns Object with minutes and display string
 */
export function calculateReadingTime(
  content: string,
  wordsPerMinute = 200
): { minutes: number; display: string } {
  // Remove markdown syntax, code blocks, and extra whitespace
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/[#*_~[\]()]/g, '') // Remove markdown symbols
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()

  // Count words
  const wordCount = cleanContent.split(/\s+/).length

  // Calculate reading time
  const minutes = Math.ceil(wordCount / wordsPerMinute)

  // Format display string
  const display = minutes < 1 ? '< 1 min read' : `${minutes} min read`

  return { minutes, display }
}
```

The function handles several important considerations:

**Stripping Markdown**: Code blocks and inline code shouldn't count toward word count since they're not prose. Similarly, markdown syntax characters are removed to get accurate word counts.

**Whitespace Normalization**: Multiple spaces or newlines are collapsed into single spaces to ensure consistent word splitting.

**Rounding**: Using `Math.ceil` rounds up, so even a 201-word article shows "2 min read" rather than "1 min read". This errs on the side of giving readers slightly more time than needed.

**Return Format**: The function returns both the numeric minutes and a formatted display string for flexibility in how you present the information.

## The Display Component

With the calculation logic in place, a small Astro component handles rendering the reading time consistently across your blog:

```astro
---
interface Props {
  minutes: number
  display?: string
  className?: string
}

const { minutes, display, className = 'text-sm tracking-wide text-slate-700 dark:text-slate-500' } = Astro.props

// Generate display string if not provided
const readingTimeText = display ?? (minutes < 1 ? '< 1 min read' : `${minutes} min read`)
---

<span class={className}>{readingTimeText}</span>
```

This component is intentionally simple. It accepts:

- `minutes`: The calculated reading time
- `display`: Optional pre-formatted display string (useful if you want custom text)
- `className`: Optional custom Tailwind classes for styling flexibility

By keeping the component minimal and reusable, you can drop it into any location in your blog layout without duplication.

## Integration with Your Blog

The real benefit comes from integrating this into your Astro Content Collections. When you fetch blog posts using `getCollection('blogPosts')`, each entry includes the raw markdown content in its `body` property.

In your blog listing page, calculate reading time for each post:

```typescript
const blogPostsWithReadingTime = blogPosts.map(post => ({
  ...post,
  readingTime: calculateReadingTime(post.body)
}))
```

Then display it alongside the publish date. On individual post pages, add the reading time to the hero header where you show the title and date.

## The Benefits

This approach offers several advantages:

- **Build-time Calculation**: Reading time is calculated once during the build, not on every page load. There's zero runtime overhead.

- **Accurate for Your Content**: You can adjust the words-per-minute parameter for your audience if needed. Technical audiences might read slower, while shorter content might skew differently.

- **Flexible Presentation**: The component accepts custom classes, so you can style reading time differently in various locations (subtle on listings, prominent on individual posts).

- **Accessible**: The calculation is based on actual word count from your markdown, not arbitrary estimates, making it reliable and consistent across your blog.

Adding reading time to your blog is a small feature that makes a meaningful difference in reader experience. With Astro's content collections and a simple utility function, it requires surprisingly little code.
