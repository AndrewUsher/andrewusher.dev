import Giscus from '@giscus/react'
import type { CollectionEntry } from 'astro:content'
import { RiTwitterFill } from 'react-icons/ri'
import { generateTwitterShareURL } from '../lib/generateTwitterShareURL'
import { ReadingProgressBar } from './ReadingProgress'

type Props = {
  children: React.ReactNode
  pathname: string
  post: CollectionEntry<'blogPosts'>
}

export function BlogPost({ children, pathname, post }: Props) {
  return (
    <>
      <main className="dark:prose-invert prose mx-auto max-w-screen-xl px-4 pb-12 prose-headings:text-blue-700 prose-h1:text-black prose-ul:list-disc">
        {children}
        <div className="dark:bg-stone-800 mb-4 flex items-center bg-stone-200 px-4 py-2">
          <RiTwitterFill fill="#1DA1F2" className="h-16 w-16 md:h-8 md:w-8" />
          <p className="ml-2">
            If you liked this article and think others should read it, please{' '}
            <a
              href={generateTwitterShareURL({
                slug: pathname,
                title: post.data.title,
              })}
            >
              share it on Twitter
            </a>
            !
          </p>
        </div>
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
