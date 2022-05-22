import { bundleMDX } from 'mdx-bundler'

export const compileMMDX = async (content: string) => {
  const { default: rehypeHighlight } = await import('rehype-highlight')
  const s = await bundleMDX({
    source: content,
    mdxOptions: options => {
      options.remarkPlugins = [...(options.remarkPlugins ?? [])]
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeHighlight]
      return options
    }

  })

  return s
}
