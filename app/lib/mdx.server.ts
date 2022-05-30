export const parseMarkdown = async (content: string) => {
  const { remark } = await import('remark')
  const { default: remarkHtml } = await import('remark-html')
  const { default: remarkParse } = await import('remark-parse')
  // eslint-disable-next-line
  // @ts-ignore TODO
  const { default: remarkPrism } = await import('remark-prism')

  const transformedHtml = await remark()
    .use(remarkParse)
    .use(remarkPrism)
    .use(remarkHtml, { sanitize: false })
    .process(content)

  return transformedHtml.toString('utf-8')
}
