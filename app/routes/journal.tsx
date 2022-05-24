import * as React from 'react'
import { LoaderFunction, useLoaderData } from 'remix'
import { Posts } from '~/components/shared/Posts'
import { getBlogPosts, getJournalEntries } from '~/lib/contentful.server'

export const loader: LoaderFunction = async () => {
  const data = await getJournalEntries()
  const parsedPosts = data.items.map(({ fields }) => ({
    ...fields
  }))

  return parsedPosts
}

export default function Journal () {
  const posts = useLoaderData()
  return (
    <>
      <main className="max-w-screen-xl mx-auto p-8">
        <Posts entrySlugStart="/journal" posts={posts} />
      </main>
    </>
  )
}
