import dayjs from 'dayjs'
import React from 'react'
import { json, LoaderFunction } from '@remix-run/server-runtime'
import {
  Link,
  useLoaderData,
  V2_MetaFunction as V2MetaFunction,
} from '@remix-run/react'
import snarkdown from 'snarkdown'
import { ReadingProgressBar } from '~/components/post/ReadingProgress/ReadingProgress'
import { getJournalEntriesBySlug } from '~/lib/contentful.server'
import { logger } from '~/lib/logger.server'

export const loader: LoaderFunction = async ({ params }) => {
  try {
    if (!params.slug) {
      throw json({ message: 'not found' }, 404)
    }
    const { content: mdContent, ...rest } = await getJournalEntriesBySlug(
      params.slug
    )
    const content = snarkdown(mdContent)

    return {
      ...rest,
      content,
    }
  } catch (err) {
    logger.error(err)
    throw json({ message: 'not found' }, 404)
  }
}

export const meta: V2MetaFunction = ({ data }) => {
  if (!data?.content) {
    return [
      {
        title: 'Not Found',
      },
      {
        name: 'description',
        content:
          "You landed on a page that Peter the Penguin wasn't able to find",
      },
    ]
  } else {
    return [
      { title: data.title },
      { name: 'description', content: `${data.title} | Andrew Usher` },
    ]
  }
}

export default function BlogPostPage() {
  const post = useLoaderData()
  const formattedPublishDate = dayjs(post.date).format('MMMM DD, YYYY')
  return (
    <>
      <div className="s mx-auto mt-8 max-w-(--breakpoint-xl) px-4">
        <h1 className="mb-1 break-words text-3xl font-bold text-indigo-600 dark:text-indigo-200">
          {post.title}
        </h1>
        <time
          className="text-indigo-400 opacity-80 dark:text-indigo-200"
          dateTime={post.date}
        >
          Published on {formattedPublishDate}
        </time>
        <main className="prose-lg pb-12 prose-ul:list-disc dark:prose-invert">
          <div
            className="mt-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </main>
      </div>
      <ReadingProgressBar />
    </>
  )
}

export function ErrorBoundary() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-linear-to-r from-indigo-600 to-blue-400">
      <div className="h-full rounded-md bg-white px-40 py-20 shadow-xl md:h-auto">
        <div className="flex flex-col items-center">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>

          <h6 className="mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl">
            <span className="text-red-500">Oops!</span> Page not found
          </h6>

          <p className="mb-8 text-center text-gray-500 md:text-lg">
            The page you’re looking for doesn’t exist.
          </p>

          <Link
            to="/"
            className="bg-blue-100 px-6 py-2 text-sm font-semibold text-blue-800"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
