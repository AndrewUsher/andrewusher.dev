# andrewusher.dev

Personal portfolio and blog site built with Astro and React.

## Tech Stack

- **Framework**: Astro 5.9
- **UI**: React 19 with Astro integration
- **Styling**: TailwindCSS v4
- **Content**: Markdown/MDX with content collections
- **Deployment**: Vercel

## Development

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Commands

- `npm run dev` - Start Astro dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint on src/
- `npm test` - Run Vitest tests
- `npm run test:watch` - Run tests in watch mode with UI

## Project Structure

```
/
├── content/           # Content collections (blog, projects, journal)
│   ├── blog/         # Blog posts (Markdown/MDX)
│   ├── projects/     # Project pages
│   └── journal/      # Journal entries
├── public/           # Static assets (fonts, images, etc.)
├── src/
│   ├── components/   # Astro and React components
│   ├── data/         # Static data (timeline, etc.)
│   ├── layouts/      # Astro layouts
│   ├── pages/        # File-based routing
│   └── styles/       # Global styles
└── astro.config.mjs  # Astro configuration
```

## Content Management

Content is managed through Astro content collections defined in `src/content.config.js`:

- **blogPosts**: Blog articles with date, title, slug
- **projects**: Portfolio projects with links and summaries
- **journal**: Personal journal entries

Add new content by creating Markdown/MDX files in the appropriate `content/` directory.

## Deployment

The site is configured for automatic deployment to Vercel. Push to the `dev` branch to trigger a deployment.

Custom redirects are configured in `vercel.json`.
