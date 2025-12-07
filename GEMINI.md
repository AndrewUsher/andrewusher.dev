# Agent Development Guide

## Commands
- **Build**: `npm run build` (Astro build)
- **Dev**: `npm run dev` (Astro dev server)
- **Test**: `npm test` (Vitest) or `npm run test:watch` (with UI)
- **Lint**: `npm run lint` (ESLint on app/ directory)
- **Single test**: `npx vitest run <test-file>` or `npx vitest <test-file>`

## Architecture
This is a **hybrid Astro/Remix codebase** transitioning from Remix to Astro:
- **Primary**: Astro (v5.9.1) - main build system with React integration
- **Legacy**: Remix (v2.0.0) - still configured for compatibility
- **Astro structure**: `src/pages/`, `src/components/`, `src/layouts/`, `content/` (blog/projects)
- **Remix structure**: `app/routes/`, `app/components/` (legacy TSX components)
- **Styling**: TailwindCSS v4 with custom config
- **Testing**: Vitest with jsdom, Testing Library, MSW for mocking

## Code Style
- **ESLint**: Custom `@drewster/eslint-config` (React + TypeScript)
- **Imports**: Use `~/` alias for `app/` directory, standard ES6 imports
- **React**: No explicit React imports (jsx-transform), prefer functional components
- **Types**: Strict TypeScript, prefer interface over type
- **Components**: React/TSX in both Astro and Remix directories
- **File naming**: PascalCase for components, kebab-case for routes/pages
