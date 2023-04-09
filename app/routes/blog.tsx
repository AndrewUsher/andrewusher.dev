import * as React from 'react'
import { useLoaderData } from '@remix-run/react'
import { LoaderFunction } from '@remix-run/server-runtime'
import { Posts } from '~/components/shared/Posts'
import { getBlogPosts } from '~/lib/contentful.server'

export const loader = async () => {
  const data = await getBlogPosts()
  const parsedPosts = data.map(({ fields }) => ({
    ...fields,
  }))

  return parsedPosts
}

export default function Blog() {
  const posts = useLoaderData<typeof loader>()
  return (
    <>
      <main className="mx-auto max-w-screen-xl p-8">
        <Posts entrySlugStart="/blog" posts={posts} />
      </main>
    </>
  )
}
