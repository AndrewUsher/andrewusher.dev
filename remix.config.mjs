import { createRoutesFromFolders } from '@remix-run/v1-route-convention'

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildPath: './api/_build/index.js',
  ignoredRouteFiles: ['**/*'],
  serverModuleFormat: 'cjs',
  routes: (defineRoutes) => {
    // `createRoutesFromFolders` will create routes for all files in the
    // routes directory using the same default conventions as Remix v1.
    return createRoutesFromFolders(defineRoutes, {
      // If you're already using `ignoredRouteFiles` in your Remix config,
      // you can move them to `ignoredFilePatterns` in the plugin's options.
      ignoredFilePatterns: ['.*'],
    })
  },
  async mdx(filename) {
    const [rehypeTOC, rehypeSlug] = await Promise.all([
      import('@jsdevtools/rehype-toc').then((mod) => mod.default),
      import('rehype-slug').then((mod) => mod.default),
    ])

    return {
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeTOC,
          {
            cssClasses: { toc: 'bg-slate-100 dark:bg-slate-800 p-8 shadow-lg' },
          },
        ],
      ],
    }
  },
  future: {
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
    v2_dev: true,
    v2_headers: true,
    v2_meta: true,
  },
}
