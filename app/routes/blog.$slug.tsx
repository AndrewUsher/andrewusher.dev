import dayjs from 'dayjs'
import React from 'react'
import { json, LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import snarkdown from 'snarkdown'
import { getBlogPostBySlug } from '~/lib/contentful.server'

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const { content: mdContent, ...rest } = await getBlogPostBySlug(params.slug)
    const content = snarkdown(mdContent)

    return {
      ...rest,
      content
    }
  } catch (err) {
    console.error(err)
    throw json({ status: 404 })
  }
}

export const meta: MetaFunction = ({ data }) => {
  if (!data?.content) {
    return {
      title: 'Not Found',
      description: 'You landed on a page that Peter the Penguin wasn\'t able to find'
    }
  } else {
    return {
      title: data.title,
      description: `${data.title} | Andrew Usher`
    }
  }
}

export default function BlogPostPage () {
  const post = useLoaderData()
  const formattedPublishDate = dayjs(post.date).format('MMMM DD, YYYY')
  return (
    <main className="max-w-screen-xl mx-auto py-12 px-4 prose dark:prose-invert">
      <h1 className="mb-1">{post.title}</h1>
      <time dateTime={post.date}>Published on {formattedPublishDate}</time>
      <div className="mt-12" dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  )
}
