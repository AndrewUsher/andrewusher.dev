import { buildBlogIndex } from '../src/features/ask-blog/build-index'

buildBlogIndex().catch(error => {
  console.error('Blog index generation failed:', error instanceof Error ? error.message : 'Unknown error')
  process.exitCode = 1
})
