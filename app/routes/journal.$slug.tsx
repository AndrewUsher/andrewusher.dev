import dayjs from 'dayjs'
import React from 'react'
import Giscus from '@giscus/react'
import { json, Link, LoaderFunction, MetaFunction, useLoaderData } from 'remix'
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

export const meta: MetaFunction = ({ data }) => {
  if (!data?.content) {
    return {
      title: 'Not Found',
      description:
        "You landed on a page that Peter the Penguin wasn't able to find",
    }
  } else {
    return {
      title: data.title,
      description: `${data.title} | Andrew Usher`,
    }
  }
}

export default function BlogPostPage() {
  const post = useLoaderData()
  const formattedPublishDate = dayjs(post.date).format('MMMM DD, YYYY')
  return (
    <>
      <main className="prose-lg mx-auto max-w-screen-xl px-4 pb-12 dark:prose-invert md:prose-xl">
        <div className="relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] w-screen bg-gradient-to-tl from-blue-400 to-emerald-400 py-20 px-4 text-center shadow-lg">
          <h1 className="mb-1">{post.title}</h1>
          <time dateTime={post.date}>Published on {formattedPublishDate}</time>
        </div>
        <div
          className="mt-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <Giscus
          repo="AndrewUsher/blog-comments"
          repoId="R_kgDOHS90kA"
          category="Announcements"
          categoryId="DIC_kwDOHS90kM4CO-p9"
          mapping="pathname"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="preferred_color_scheme"
          lang="en"
          loading="lazy"
        />
      </main>
      <ReadingProgressBar />
    </>
  )
}

export function CatchBoundary() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-400">
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