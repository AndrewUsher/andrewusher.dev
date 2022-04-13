import * as React from 'react'
import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Posts } from '~/components/shared/Posts'
import { getBlogPosts } from '~/lib/contentful.server'

export const loader: LoaderFunction = async () => {
  const data = await getBlogPosts()
  const parsedPosts = data.items.map(({ fields }) => ({
    ...fields
  }))

  return parsedPosts
}

export default function Blog () {
  const posts = useLoaderData()
  return (
    <>
      <main className="max-w-screen-xl mx-auto py-4 px-4">
        <Posts posts={posts} />
      </main>
    </>
  )
}
