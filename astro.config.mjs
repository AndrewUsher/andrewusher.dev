import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import rehypeSlug from 'rehype-slug'
import rehypeToc from '@jsdevtools/rehype-toc'
import vercel from '@astrojs/vercel'
import pagefind from './integrations/pagefind.mjs'
import { transformerNotationHighlight } from '@shikijs/transformers'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ['react', 'react-dom', 'framer-motion'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion'],
    },
  },
  integrations: [
    react(),
    mdx({
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeToc,
          {
            headings: ['h1', 'h2', 'h3'],
            cssClasses: {
              toc: 'toc',
              list: 'toc-list',
              listItem: 'toc-item',
              link: 'toc-link',
            },
          },
        ],
      ],
      optimize: true,
    }),
    pagefind(),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        'github-dark': 'github-dark',
        'github-light': 'github-light',
        dracula: 'dracula',
        monokai: 'monokai',
        nord: 'nord',
      },
      defaultColor: false,
      wrap: true,
      transformers: [transformerNotationHighlight()],
    },
  },
})
