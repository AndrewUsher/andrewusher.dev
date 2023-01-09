import * as React from 'react'
import { useLoaderData } from '@remix-run/react'
import { LoaderFunction } from '@remix-run/server-runtime'
import { Posts } from '~/components/shared/Posts'
import { getBlogPosts } from '~/lib/contentful.server'
import { BlogPostOrJournalEntry } from '~/types/contentful'

type LoaderData = BlogPostOrJournalEntry[]

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const data = await getBlogPosts()
  const parsedPosts = data.items.map(({ fields }) => ({
    ...fields,
  }))

  return parsedPosts
}

export default function Blog() {
  const posts = useLoaderData<LoaderData>()
  return (
    <>
      <main className="mx-auto max-w-screen-xl p-8">
        <Posts entrySlugStart="/blog" posts={posts} />
      </main>
    </>
  )
}
