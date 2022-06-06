import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import React from 'react'
import { Posts } from '~/components/shared/Posts'
import { BlogPostOrJournalEntry } from '~/types/contentful'

dayjs.extend(customParseFormat)

type Props = {
  posts: Omit<BlogPostOrJournalEntry, 'content'>[]
}

export function RecentPosts({ posts }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-4xl font-bold dark:text-white">
        Recent Blog Posts
      </h2>
      <Posts entrySlugStart="/blog" posts={posts} />
    </section>
  )
}
