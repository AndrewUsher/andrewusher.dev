import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import React from 'react'
import { Posts } from '~/components/shared/Posts'

dayjs.extend(customParseFormat)

type Post = {
  date: string;
  slug: string;
  title: string;
}

type Props = {
  posts: Post[]
}

export function RecentPosts ({ posts }: Props) {
  return (
    <section>
      <h2 className="text-4xl font-bold mb-8 dark:text-white">Recent Blog Posts</h2>
      <Posts posts={posts}/>
    </section>
  )
}
