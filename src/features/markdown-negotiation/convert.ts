import TurndownService from 'turndown'

export const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
  bulletListMarker: '-',
  linkStyle: 'inlined',
})

turndownService.remove([
  'nav',
  'header',
  'footer',
  'script',
  'style',
  'iframe',
  'noscript',
])
