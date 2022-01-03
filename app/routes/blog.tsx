import * as React from 'react'
import { LoaderFunction, useLoaderData } from 'remix'
import { getBlogPosts } from '~/lib/contentful.server'

export const loader: LoaderFunction = async () => {
  const data = await getBlogPosts()
  console.log(data)

  return data.items
}

export default function Blog () {
  const data = useLoaderData()
  return (
    <>
      <main className="max-w-screen-xl mx-auto py-4 px-4">
        {data.map(post => (
          <div key={post.fields.title}>
            <h2>{post.fields.title}</h2>
            <small>Published on {}</small>
          </div>
        ))}
      </main>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
