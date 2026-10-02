import { globSync, realpathSync, statSync } from 'node:fs'
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import rehypeSlug from 'rehype-slug'
import rehypeToc from '@jsdevtools/rehype-toc'
import vercel from '@astrojs/vercel'
import pagefind from './integrations/pagefind.mjs'
import { transformerNotationHighlight } from '@shikijs/transformers'
import istanbul from 'vite-plugin-istanbul'
import { loadEnv } from 'vite'
import askBlog from './integrations/ask-blog'
import { MODEL_DIRECTORY, MODEL_FILES, INDEX_FILE } from './src/features/ask-blog/config'

import sentry from '@sentry/astro'

const askBlogEnabled = (
  process.env.ASK_BLOG_ENABLED ??
  loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '').ASK_BLOG_ENABLED
) === 'true'
// The ONNX package ships several OS/architecture binaries. Vercel Node runs on
// Linux x64; exclude concrete files (the adapter doesn't accept glob patterns).
const onnxRoot = realpathSync('node_modules/onnxruntime-node')
const unusedNativeFiles = [...globSync(`${onnxRoot}/bin/**/*`)].filter(file =>
  statSync(file).isFile() && (!file.includes('/linux/x64/') || /providers_(cuda|tensorrt)/.test(file))
)

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: process.env.VERCEL
    ? 'https://andrewusher.dev'
    : 'http://localhost:4321',
  adapter: vercel({
    includeFiles: askBlogEnabled
      ? [INDEX_FILE, ...MODEL_FILES.map(file => `${MODEL_DIRECTORY}/${file}`)]
      : [],
    excludeFiles: unusedNativeFiles,
    maxDuration: 60,
    webAnalytics: {
      enabled: true,
    },
  }),
  vite: {
    plugins: [
      tailwindcss(),
      ...(process.env.E2E_COVERAGE === 'true'
        ? [
            istanbul({
              include: 'src/**',
              extension: ['.js', '.ts', '.tsx'],
            }),
          ]
        : []),
    ],
  },
  integrations: [
    askBlog(askBlogEnabled),
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
    sentry({
      project: 'andrewusher-dev',
      org: 'andrew-usher',
      authToken: process.env.SENTRY_AUTH_TOKEN,
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
      transformers: [transformerNotationHighlight()],
    },
  },
})
