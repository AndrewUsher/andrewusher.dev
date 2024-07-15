import mdx from '@mdx-js/rollup'
import { vitePlugin as remix } from '@remix-run/dev'
import { createRoutesFromFolders } from '@remix-run/v1-route-convention'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'
import { vercelPreset } from '@vercel/remix/vite'


export default defineConfig({
  resolve: {
    alias: {
      '~': '/app',
    },
  },
  plugins: [
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    remix({
      presets: [vercelPreset()],
      routes: (defineRoutes) => {
        // `createRoutesFromFolders` will create routes for all files in the
        // routes directory using the same default conventions as Remix v1.
        return createRoutesFromFolders(defineRoutes, {
          // If you're already using `ignoredRouteFiles` in your Remix config,
          // you can move them to `ignoredFilePatterns` in the plugin's options.
          ignoredFilePatterns: ['.*'],
        })
      },
    }),
  ],
})
