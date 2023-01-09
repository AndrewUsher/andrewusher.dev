import * as React from 'react'
import { useLoaderData } from '@remix-run/react'
import { LoaderFunction } from '@remix-run/server-runtime'
import { Posts } from '~/components/shared/Posts'
import { getBlogPosts, getJournalEntries } from '~/lib/contentful.server'

export const loader: LoaderFunction = async () => {
  const data = await getJournalEntries()
  const parsedPosts = data.items.map(({ fields }) => ({
    ...fields,
  }))

  return parsedPosts
}

export default function Journal() {
  const posts = useLoaderData()
  return (
    <>
      <main className="mx-auto max-w-screen-xl p-8">
        <Posts entrySlugStart="/journal" posts={posts} />
      </main>
    </>
  )
}
