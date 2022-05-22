import dayjs from 'dayjs'
import React from 'react'
import Giscus from '@giscus/react'
import { getMDXComponent } from 'mdx-bundler/client'
import {
  json,
  Link,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData
} from 'remix'
import { ReadingProgressBar } from '~/components/post/ReadingProgress/ReadingProgress'
import { getBlogPostBySlug } from '~/lib/contentful.server'
import { logger } from '~/lib/logger.server'
import draculaHighlight from '~/styles/dracula.css'
import { compileMMDX } from '~/lib/mdx.server'

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: draculaHighlight
  }
]

export const loader: LoaderFunction = async ({ params }) => {
  try {
    if (!params.slug) {
      throw json({ message: 'not found' }, 404)
    }
    const { content: mdContent, ...rest } = await getBlogPostBySlug(params.slug)
    const mdxContent = await compileMMDX(mdContent)

    return {
      ...rest,
      content: mdxContent.code
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
        "You landed on a page that Peter the Penguin wasn't able to find"
    }
  } else {
    return {
      title: data.title,
      description: `${data.title} | Andrew Usher`
    }
  }
}

export default function BlogPostPage() {
  const post = useLoaderData()
  // it's generally a good idea to memoize this function call to
  // avoid re-creating the component every render.
  const Component = React.useMemo(
    () => getMDXComponent(post.content),
    [post.content]
  )
  const formattedPublishDate = dayjs(post.date).format('MMMM DD, YYYY')
  return (
    <>
      <main className="max-w-screen-xl mx-auto pb-12 px-4 prose dark:prose-invert prose-pre:py-6 prose-pre:px-4 prose-pre:bg-[#282a36]">
        <div className="w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] py-20 px-4 text-center bg-gradient-to-tl from-blue-400 to-emerald-400 shadow-lg">
          <h1 className="mb-1">{post.title}</h1>
          <time dateTime={post.date}>Published on {formattedPublishDate}</time>
        </div>
        <Component className="mt-12" />
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
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-indigo-600 to-blue-400">
      <div className="h-full md:h-auto px-40 py-20 bg-white rounded-md shadow-xl">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-blue-600 text-9xl">404</h1>

          <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            <span className="text-red-500">Oops!</span> Page not found
          </h6>

          <p className="mb-8 text-center text-gray-500 md:text-lg">
            The page you’re looking for doesn’t exist.
          </p>

          <Link
            to="/"
            className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
