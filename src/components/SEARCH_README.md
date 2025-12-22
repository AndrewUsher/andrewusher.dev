# Blog Search Feature

## Overview

Full-text search across all blog posts with tag filtering, powered by [Pagefind](https://pagefind.app/).

## Features

- **Global Search**: Accessible from header on all pages
- **Real-time**: Search-as-you-type with 300ms debounce
- **Full-text**: Searches post titles and content
- **Tag Filtering**: Filter by a single tag
- **Keyboard Navigation**:
  - `⌘K` / `Ctrl+K` to open
  - Arrow keys to navigate results
  - `Enter` to visit post
  - `Esc` to close
- **Responsive**: Dropdown on desktop, modal on mobile
- **Accessible**: ARIA labels, screen reader support

## Development Workflow

### First Time Setup

1. Build the site to generate Pagefind index:
   ```bash
   npm run build
   ```

2. Copy index to public folder for dev mode:
   ```bash
   mkdir -p public/pagefind && cp -r dist/pagefind/* public/pagefind/
   ```

3. Start dev server:
   ```bash
   npm run dev
   ```

### After Adding/Modifying Blog Posts

Pagefind indexes content at build time, so you need to rebuild after changes:

```bash
npm run build && mkdir -p public/pagefind && cp -r dist/pagefind/* public/pagefind/
```

## Implementation Details

### Components

- **SearchDropdown.tsx**: Main search component with Pagefind integration
- Loads Pagefind dynamically via script tag to avoid Vite import issues
- Uses React hooks for state management and debouncing

### Indexing Configuration

Blog posts are marked for indexing with Pagefind data attributes:

```astro
<h1 data-pagefind-meta="title">{post.data.title}</h1>
<div data-pagefind-body>
  {post.data.tags?.map(tag => (
    <span data-pagefind-filter="tags" class="hidden">{tag}</span>
  ))}
  <Content />
</div>
```

### Build Process

1. `npm run build` → Runs `astro build`
2. Astro outputs to `dist/`
3. **Pagefind integration** runs automatically via `astro:build:done` hook
4. Pagefind indexes `dist/client/` → creates `dist/client/pagefind/`
5. Vercel adapter copies everything to `.vercel/output/static/` (includes pagefind)
6. In production (Vercel), index is served from `/pagefind/`
7. In dev mode, run `npm run sync-search` to copy to `public/pagefind/`

## Production

Pagefind index is automatically generated during production builds and deployed with the site. No additional setup needed.

## Statistics

- **24 blog posts** indexed
- **1,798 words** searchable
- **18 unique tags** available
- **~9KB** gzipped (SearchDropdown component)
