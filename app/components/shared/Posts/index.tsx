import dayjs from 'dayjs'
import React from 'react'
import { Link } from 'remix'
import { BlogPost } from '~/types/contentful'

type Props = {
  posts: BlogPost[]
}

export function Posts ({ posts }: Props) {
  return (
    <>
      {posts.map((post) => (
        <article key={post.title} className="mb-6">
          <h3 className="text-2xl mb-1 font-semibold dark:text-white">
            <Link className="hover:text-sky-500" to={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
          <time
            dateTime={post.date}
            className="text-sm text-slate-700 dark:text-slate-500"
          >
            Published on {dayjs(post.date).format('MMMM DD, YYYY')}
          </time>
        </article>
      ))}
    </>
  )
}
