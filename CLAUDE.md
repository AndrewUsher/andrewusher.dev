# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog site for Andrew Usher, built with Astro and React.

## Commands

**Development:**
- `npm run dev` - Start Astro dev server (default port 3000)
- `npm run build` - Build for production using Astro (outputs to `./build`)
- `npm run preview` - Preview production build

**Testing:**
- `npm test` - Run all Vitest tests
- `npm run test:watch` - Run tests in watch mode with UI
- `vitest run <test-file>` - Run a specific test file
- `npx playwright test` - Run e2e tests (requires dev server at localhost:3000)

**Linting:**
- `npm run lint` - ESLint on src/ directory (uses @drewster/eslint-config)

## Architecture

**Pages & Routing:**
- `src/pages/` - File-based routing (.astro files)
- `src/pages/index.astro` - Homepage
- `src/pages/blog/index.astro` - Blog listing
- `src/pages/blog/[slug].astro` - Dynamic blog post pages

**Components:**
- `src/components/` - Both .astro and .tsx (React) components
- React components require `client:load` directive in Astro files
- Example: `<HomepageIntro client:load />` for interactive React components

**Layouts:**
- `src/layouts/` - Astro layout components
- `BaseLayout.astro` - Primary layout wrapper

**Content Collections:**
- Defined in `src/content.config.js` with Zod schemas
- `blogPosts`: date, isPublished, slug, title (from `content/blog/`)
- `projects`: date, isPublished, liveProjectLink, slug, summary, title (from `content/projects/`)
- Content loaded via `glob()` loader with Markdown/MDX support

**Configuration:**
- `astro.config.mjs` - Main config with React, MDX integrations, and rehype plugins
- Output directory: `./build`
- Vite plugins: TailwindCSS v4 (`@tailwindcss/vite`)
- MDX plugins: rehypeSlug, @jsdevtools/rehype-toc
- Syntax highlighting: Shiki with github-dark theme

## Styling

- **TailwindCSS v4** via Vite plugin (`@tailwindcss/vite`)
- Config: `tailwind.config.js`
- Dark mode: class-based (`darkMode: ['class']`)
- Plugins: @tailwindcss/forms, @tailwindcss/typography, tailwindcss-animate
- Global styles: `src/styles/global.css`
- Custom design tokens: CSS variables for shadcn-style color system
- Typography: Merriweather Sans as primary font

## TypeScript

- Extends `astro/tsconfigs/strictest`
- JSX: react-jsx with jsxImportSource="react"
- No explicit React imports needed (jsx-transform)
- Path alias: `~/*` resolves to `./app/` (legacy only)

## Testing

**Vitest (Unit Tests):**
- Config: `vitest.config.ts`
- Environment: jsdom with globals enabled
- Setup: `vitest.setup.js`
- Test utils: `app/test-utils/index.jsx`
- Excludes: e2e directory

**Playwright (E2E Tests):**
- Config: `playwright.config.ts`
- Test directory: `./e2e`
- Base URL: http://localhost:3000
- Auto-starts dev server (`yarn dev`)
- Browsers: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari

## Content Management

All content is managed through Astro Content Collections:

- **Blog posts**: `content/blog/*.md` and `*.mdx`
- **Projects**: `content/projects/*.md` and `*.mdx`
- **Journal entries**: `content/journal/*.md` and `*.mdx`
- Schema validation via Zod in `src/content.config.js`
- Access via Astro's content API: `getCollection('blogPosts')`, `getEntry('blogPosts', slug)`

## Development Notes

**Key Patterns:**
- Use `.astro` files for static/server-rendered pages
- Use React (.tsx) with `client:load` for interactive components
- All blog content is Markdown/MDX in `content/` directory
- File naming: PascalCase for components, kebab-case for routes

## Forms

Contact form uses **Vercel Forms** (beta):
- Form component: `src/components/ContactForm.tsx`
- Uses `data-vercel-form` attribute for Vercel integration
- Client-side form handling with React

## Testing Astro Components

**Status:** ✅ Fully functional with Vitest 3.2.4

### Setup Overview

The project has Astro component testing configured using:
- **Astro Container API** (experimental) for rendering components
- **Vitest 3.2.4** for test runner
- **happy-dom** for DOM parsing in Node environment
- **@testing-library/dom** and **@testing-library/jest-dom** for assertions

### Test Configuration Files

- `vitest.config.mts` - Vitest configuration using Astro's `getViteConfig()`
- `vitest.setup.js` - Global test setup with jest-dom matchers
- `src/test/helpers.ts` - Utility functions for rendering Astro components
- `src/test/types.d.ts` - TypeScript declarations for Astro testing modules
- `src/test/README.md` - Comprehensive testing guide

### Test Helpers

Two main helpers are available:

```typescript
// Basic Astro component rendering
import { renderAstroComponent } from '../test/helpers'
const { document } = await renderAstroComponent(Component, { props: {...} })

// Astro component with React children
import { renderAstroComponentWithReact } from '../test/helpers'
const { document } = await renderAstroComponentWithReact(Component, { props: {...} })
```

### Example Test

See `src/components/NavLink.test.ts` for an example of testing an Astro component.

### Environment Notes

- **Default environment:** `node` (required for Astro Container API)
- **React component tests:** Add `// @vitest-environment jsdom` at top of file
- Tests use happy-dom programmatically within helpers to parse HTML in Node environment

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test src/components/NavLink.test.ts

# Run tests in watch mode with UI
npm run test:watch
```

## Deployment

- Platform: Vercel
- Main branch for PRs: `dev` (not `main`)
- Redirects: `vercel.json` (social links like /github, /twitter)
- Build command: `npm run build` (Astro build)
