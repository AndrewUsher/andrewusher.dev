import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import React from 'react'
import { Posts } from '~/components/shared/Posts'
import { BlogPost } from '~/types/contentful'

dayjs.extend(customParseFormat)

type Props = {
  posts: BlogPost[]
}

export function RecentPosts ({ posts }: Props) {
  return (
    <section>
      <h2 className="text-4xl font-bold mb-8 dark:text-white">Recent Blog Posts</h2>
      <Posts posts={posts}/>
    </section>
  )
}
