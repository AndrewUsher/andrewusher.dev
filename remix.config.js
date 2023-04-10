/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildPath: './api/_build/index.js',
  ignoredRouteFiles: ['.*'],
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
}
