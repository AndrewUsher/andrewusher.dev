import dayjs from 'dayjs'
import { motion } from 'framer-motion'
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
        <motion.article
          key={post.title}
          className="mb-6 origin-left"
          initial={{ opacity: 0, translateX: -800 }}
          whileInView={{ opacity: 1, translateX: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-1 break-words text-2xl font-semibold tracking-wide dark:text-white">
            <Link
              className="tracking-tighter hover:text-sky-500"
              to={`${entrySlugStart}/${post.slug}`}
            >
              {post.title}
            </Link>
          </h3>
          <time
            dateTime={post.date}
            className="text-sm tracking-wide text-slate-700 dark:text-slate-500"
          >
            Published on {dayjs(post.date).format('MMMM DD, YYYY')}
          </time>
        </motion.article>
      ))}
    </>
  )
}
