import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import React from 'react'
import { Link } from 'remix'

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
      {posts.map(post => (
        <article key={post.title} className="mb-6">
          <h3 className="text-2xl mb-1 font-semibold dark:text-white underline decoration-sky-400 decoration-[0.25rem] motion-safe:transition-all motion-safe:duration-200 hover:decoration-[0.5rem] focus:decoration-[0.5rem hover:decoration-sky-400/50 focus:decoration-sky-600/50">
            <Link to={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
          <time dateTime={post.date} className="text-sm text-slate-700 dark:text-slate-500">Published on {dayjs(post.date).format('MMMM DD, YYYY')}</time>
        </article>
      ))}
    </section>
  )
}
