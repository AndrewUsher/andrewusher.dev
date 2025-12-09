# GitHub Gist Embeds

This document explains how to embed GitHub Gists in blog posts.

## Overview

The Gist component allows you to embed GitHub Gists directly in your blog posts with syntax highlighting, dark mode support, and advanced features like file selection and line highlighting.

## Features

- ✅ Server-side rendering (SSG) - Gists are fetched at build time
- ✅ Syntax highlighting using Shiki with dark theme
- ✅ Embed specific files from multi-file gists
- ✅ Line highlighting
- ✅ Responsive design
- ✅ Error handling with fallback UI

## Usage

### Prerequisites

Your blog post must use the `.mdx` extension (not `.md`) to use the Gist component.

### Import the Component

At the top of your MDX file, import the Gist component:

```mdx
---
title: "My Blog Post"
slug: "my-post"
date: 2025-12-08
isPublished: true
---

import Gist from '../../src/components/Gist.astro';
```

### Basic Embed

Embed an entire gist by passing its ID:

```mdx
<Gist id="cc23628a71c0cb1a9194161a8f9ea3f7" />
```

This will display all files in the gist with syntax highlighting.

### Embed a Specific File

If a gist contains multiple files, you can embed just one:

```mdx
<Gist id="cc23628a71c0cb1a9194161a8f9ea3f7" file="Box.js" />
```

### Line Highlighting

Highlight specific lines to draw attention to important code:

```mdx
<Gist id="cc23628a71c0cb1a9194161a8f9ea3f7" file="example.js" lines="1-5,10,15-20" />
```

Line specification format:
- Single line: `"5"`
- Range: `"1-10"`
- Multiple ranges: `"1-5,10,15-20"`
- Mixed: `"1,3-5,7,10-15"`

## Component Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | `string` | ✅ Yes | - | The GitHub gist ID (from the URL) |
| `file` | `string` | ❌ No | - | Specific filename to display (omit to show all files) |
| `lines` | `string` | ❌ No | - | Line numbers to highlight (e.g., "1-5,10") |

## Finding Gist IDs

The gist ID is in the URL of any GitHub gist:

```
https://gist.github.com/username/cc23628a71c0cb1a9194161a8f9ea3f7
                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                  This is the gist ID
```

## Examples

### Example 1: Simple Code Snippet

```mdx
## Function Example

Here's a useful utility function:

<Gist id="abc123def456" />
```

### Example 2: Multi-file with Specific File

```mdx
## Configuration Files

I've created a gist with multiple config files. Here's the Tailwind config:

<Gist id="abc123def456" file="tailwind.config.js" />
```

### Example 3: With Line Highlighting

```mdx
## Important Code Section

Pay attention to lines 5-10 where the magic happens:

<Gist id="abc123def456" file="magic.js" lines="5-10" />
```

## Styling

The gist embeds automatically:
- Match your site's color scheme (light/dark)
- Use the same syntax highlighting theme as code blocks (Shiki)
- Adapt to mobile screens with responsive design
- Display in a bordered container with metadata (filename, language, GitHub link)

## Build-Time Behavior

Gists are fetched during the build process, not at runtime. This means:

**Pros:**
- ⚡ Faster page loads (no client-side fetch)
- 📦 Works without JavaScript
- 🎨 Consistent syntax highlighting
- 🔒 No CORS issues

**Cons:**
- 🔄 Updates to the gist require a site rebuild
- 🚀 Builds may be slower with many gists
- 📊 Rate limited by GitHub API (60 requests/hour without token)

## GitHub API Rate Limits

To avoid rate limiting issues during builds:

1. **Optional:** Set a `GITHUB_TOKEN` environment variable with a personal access token
2. This increases the rate limit from 60 to 5,000 requests per hour

```bash
# .env (local development)
GITHUB_TOKEN=ghp_yourTokenHere
```

```bash
# Vercel (production)
# Add GITHUB_TOKEN to environment variables in project settings
```

## Error Handling

If a gist fails to load (invalid ID, deleted gist, rate limit), users will see:

```
Failed to load gist: Not Found
[View on GitHub]
```

The error is also logged to the console during build.

## Technical Implementation

The gist embed feature consists of:

- **`src/lib/gist.ts`** - GitHub API utilities
- **`src/components/Gist.astro`** - Astro component
- **`src/mdx-components.tsx`** - MDX component registration

## Troubleshooting

### "Module not found" error

Make sure you're importing the Gist component with the correct relative path:

```mdx
import Gist from '../../src/components/Gist.astro';
```

### Gist not displaying

1. Check that your file uses `.mdx` extension (not `.md`)
2. Verify the gist ID is correct
3. Check the build logs for error messages
4. Ensure the gist is public

### Syntax highlighting looks wrong

The component uses Shiki with the same themes as your regular code blocks. Check `astro.config.mjs` for theme configuration.

## Best Practices

1. **Use for complex code** - Gists are best for larger code examples that benefit from GitHub's version control
2. **Keep it relevant** - Only embed gists that add value to your content
3. **Consider performance** - Each gist adds to build time; use sparingly
4. **Maintain your gists** - Remember that the gist content is cached at build time
5. **Provide context** - Add text around the gist explaining what readers should focus on

## Future Enhancements

Potential improvements for consideration:

- Client-side refresh button to get latest gist content
- Caching layer to speed up builds
- Support for private gists (with authentication)
- Diff highlighting between gist revisions
- Embedded gist comments
