# AGENTS.md

This file provides guidance for agentic coding assistants working in this repository.

## Commands

**Development:**
- `npm run dev` - Start Astro dev server (default port 3000)
- `npm run build` - Build for production (outputs to `./build`)
- `npm run preview` - Preview production build
- `npm run lint` - Run Astro type checking

**Testing:**
- `npm test` - Run all Vitest tests
- `npm run test:watch` - Run tests in watch mode with UI
- `vitest run <test-file>` - Run a specific test file (e.g., `vitest run src/lib/github-commits.test.ts`)
- `npx playwright test` - Run e2e tests (requires dev server at localhost:3000)

**Important:** Always run `npm run lint` after making changes to verify type correctness.

## Code Style

### Imports
- Named imports preferred: `import { motion } from 'framer-motion'`
- Type imports: `import type { ComponentProps } from 'astro/types'` or inline in value imports
- Local components: `import Component from './Component.astro'` (default for Astro)
- Group imports logically: external libs → internal → types

### Formatting
- ESLint via `@drewster/eslint-config` handles formatting
- Tailwind classes: spacing → colors → utilities (e.g., `dark:bg-slate-800/50 dark:border-blue-400/30 group rounded-lg border-l-4 border-blue-400/50 bg-white p-4 shadow-sm`)
- Dark mode uses `dark:` prefix for class-based theming
- Multiple JSX props: place on separate lines for readability

### Types
- Interfaces for external/public types: `interface RecentCommitsProps`
- Type aliases for internal/shared types: `type Theme = 'github-dark' | 'dracula'`
- Explicit generic constraints: `<T extends AstroComponentFactory>`
- Avoid `any` - use proper types or `unknown`
- Use `type X = typeof Y[number]['value']` for derived types

### Naming
- Components: PascalCase (`RecentCommits`, `ThemeSwitcher`)
- Functions/hooks: camelCase (`calculateTagOverlap`, `useRecentlyViewed`)
- Constants: UPPER_SNAKE_CASE at file top (`TAG_WEIGHT`, `STORAGE_KEY`)
- Files:
  - Components: PascalCase (`RecentCommits.tsx`, `NavLink.astro`)
  - Lib/utilities: kebab-case (`github-commits.ts`, `calculate-reading-time.ts`)
  - Pages: kebab-case (`blog/[slug].astro`, `about.astro`)

### Astro Components
- Default export: `export default function MyComponent() { ... }`
- Frontmatter section with `---` delimiters for server-side code
- Props destructured in frontmatter: `const { href } = Astro.props`
- Use `<slot />` for children
- Use `client:load` for interactive React components in Astro files

### React Components
- Function declarations with named export: `export function RecentCommits({ commits }: Props) { ... }`
- Explicit interface for props: `interface RecentCommitsProps { commits: GitHubCommit[] }`
- Use JSX with className (not class)
- Direct imports: no `import React` needed (jsx-transform handles this)

### Hooks & Utilities
- Custom hooks: `use*` prefix (`useRecentlyViewed`, `useStreamSimulation`)
- Top-level function exports: `export function calculateTagOverlap(...)`
- Pure functions preferred for utilities
- Error handling: try-catch with console.error and graceful fallbacks

### Testing
- Vitest with globals enabled (`test`, `describe`, `expect` available globally)
- Test files: `*.test.ts` co-located with source files
- Descriptive test names using natural language: `test('fetches commits from multiple repositories')`
- Astro components: use `renderAstroComponent` helper from `src/test/helpers.ts`
- React components: add `// @vitest-environment jsdom` at file top
- API mocking: use MSW via `server` export from `src/test/mocks/server.ts`

### API Routes
- File pattern: `src/pages/api/[...].ts` with dynamic segments in brackets
- Export `GET` and `POST` functions: `export const GET: APIRoute = async ({ params }) => { ... }`
- Return `Response` objects: `new Response(JSON.stringify(data), { status, headers })`
- Include appropriate `Content-Type` header in responses
- Server-side Redis connections: `await createClient(...).connect()`

### Code Organization
- `src/components/` - Reusable UI components (Astro and React)
- `src/lib/` - Utility functions and business logic
- `src/hooks/` - React hooks
- `src/pages/` - File-based routing (Astro pages)
- `src/layouts/` - Astro layout components
- `src/content/` - Markdown/MDX content files
- `src/test/` - Test helpers and mocks

### Style & Semantics
- TailwindCSS v4 with class-based dark mode (`darkMode: ['class']`)
- Use semantic HTML: `<section>`, `<article>`, `<time>`, `<nav>`
- Accessibility: include `sr-only` labels for form controls, proper ARIA attributes
- Responsive: use `lg:`, `md:` prefixes for breakpoint-specific styles

### Other Conventions
- Constants at file top before imports if module-scoped
- Conditional returns: check conditions early, return with null/empty element
- Early returns for error states: `if (error) return <></>`
- Use `Omit<Type, 'key'>` for variant types
- Export types used by other modules: `export type BlogPost = CollectionEntry<'blogPosts'>`
