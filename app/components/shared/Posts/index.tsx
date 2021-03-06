import dayjs from 'dayjs'
import React from 'react'
import { Link } from 'remix'
import { BlogPostOrJournalEntry } from '~/types/contentful'

type Props = {
  entrySlugStart: '/blog' | '/journal'
  posts: Omit<BlogPostOrJournalEntry, 'content'>[]
}

export function Posts({ entrySlugStart, posts }: Props) {
  return (
    <>
      {posts.map((post) => (
        <article key={post.title} className="mb-6">
          <h3 className="mb-1 break-words text-2xl font-semibold dark:text-white">
            <Link
              className="hover:text-sky-500"
              to={`${entrySlugStart}/${post.slug}`}
            >
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
