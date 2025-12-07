# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog site for Andrew Usher, built with Astro and React. Currently migrating from Remix to Astro - **all new development should target the Astro structure**.

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

### Astro Structure (Current)

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
- `astro.config.mjs` - Main config with React and MDX integrations
- Output directory: `./build`
- Vite plugins: TailwindCSS v4 (`@tailwindcss/vite`)

### Legacy Code (Deprecated - Do Not Extend)

The `app/` directory contains deprecated Remix code that will be removed after migration:
- `app/routes/` - Old Remix routes
- `app/components/` - Old React components
- `app/lib/*.server.ts` - Server utilities (Contentful, Airtable, logger)
- Path alias `~/` maps to `./app/` (will be removed)

**Do not add new features to the `app/` directory.**

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

**Current (Astro Content Collections):**
- Blog posts: `content/blog/*.md` and `*.mdx`
- Projects: `content/projects/*.md` and `*.mdx`
- Schema validation via Zod in `src/content.config.js`
- Access via Astro's content API: `getCollection('blogPosts')`

**Legacy (Contentful CMS - Being Phased Out):**
- Only used by deprecated Remix routes in `app/`
- Environment vars in `app/env.ts` (CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN)

## Development Notes

**Migration in Progress:**
- Main branch for PRs: `dev` (not `main`)
- Current branch: `refactor/astro`
- Focus all new work on `src/` directory structure
- The `app/` directory will be removed when migration completes

**Key Patterns:**
- Use `.astro` files for static/server-rendered pages
- Use React (.tsx) with `client:load` for interactive components
- All blog content is Markdown/MDX in `content/` directory
- File naming: PascalCase for components, kebab-case for routes

## Deployment

- Platform: Vercel
- Redirects: `vercel.json` (social links like /github, /twitter)
- Build command will be updated when migration completes
