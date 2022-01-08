import React from 'react'
import { Link } from 'remix'

type Post = {
  slug: string;
  title: string;
}

type Props = {
  posts: Post[]
}
export function RecentPosts ({ posts }: Props) {
  return (
    <section>
      <h2 className="text-4xl font-bold mb-8 dark:text-white">Recent Blog Posts</h2>
      {posts.map(post => (
        <article key={post.title}>
          <h3 className="text-2xl font-semibold mb-4 dark:text-white">
            <Link to={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
        </article>
      ))}
    </section>
  )
}
