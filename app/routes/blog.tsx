import * as React from 'react'
import { useLoaderData } from '@remix-run/react'
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
      <main className="mx-auto max-w-(--breakpoint-xl) p-8">
        <Posts entrySlugStart="/blog" posts={posts} />
      </main>
    </>
  )
}
