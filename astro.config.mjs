import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import rehypeSlug from 'rehype-slug'
import rehypeToc from '@jsdevtools/rehype-toc'
import vercel from '@astrojs/vercel'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
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
    },
  },
})
