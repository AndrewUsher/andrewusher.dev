import * as React from 'react'
import { Link, LoaderFunction, useLoaderData } from 'remix'
import { RecentPosts } from '~/components/home/RecentPosts/RecentPosts'
import { RecentProjects } from '~/components/home/RecentProjects/RecentProjects'
import { getBlogPosts, getProjects } from '~/lib/contentful.server'

function Paragraph ({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>
}

function ExternalLink ({ href, children }: { children: string; href: string }) {
  return (
    <a className="underline" href={href}>
      {children}
    </a>
  )
}

function IntroLinkButton ({ children, to }: { children: string; to: string }) {
  return (
    <Link
      className="bg-sky-400 dark:bg-sky-600 hover:bg-sky-600 dark:hover:bg-sky-800 hover:text-white mr-8 px-4 py-4 text-lg ease-in-out w-full md:w-auto md:inline-block block text-center mb-8 dark:text-white"
      to={to}
    >
      {children}
    </Link>
  )
}

export const loader: LoaderFunction = async () => {
  const [blogPosts, projects] = await Promise.all([getBlogPosts(), getProjects()])

  return {
    recentBlogPosts: blogPosts.items.slice(0, 5).map(({ fields }) => ({
      date: fields.date,
      slug: fields.slug,
      title: fields.title
    })),

    recentProjects: projects.items.map(({ fields }) => ({
      summary: fields.summary,
      title: fields.title
    }))
  }
}

export default function Index () {
  const { recentBlogPosts, recentProjects } = useLoaderData()
  return (
    <>
      <div className="max-w-screen-xl mx-auto p-8">
        <div className="prose lg:prose-xl dark:prose-invert">
          <Paragraph>
            Howdy! During the day, I am a systems engineer at{' '}
            <ExternalLink href="https://www.autozone.com/">
              AutoZone
            </ExternalLink>
            , primarily leading a small team of React developers on the B2C web
            application.
          </Paragraph>
          <Paragraph>
            During my free time, I like dabbling around with new front end
            technologies by creating my own projects. When I&apos;m not coding,
            I like to play basketball and ride my bike throughout downtown
            Memphis.
          </Paragraph>
          <Paragraph>
            <Link to="/about">Read more about me here.</Link>
          </Paragraph>
        </div>
        <div className="mt-12">
          <IntroLinkButton to="/blog">Go To Blog</IntroLinkButton>
          <IntroLinkButton to="/contact">Get In Touch</IntroLinkButton>
        </div>
        <RecentProjects projects={recentProjects}/>
        <RecentPosts posts={recentBlogPosts}/>
      </div>
    </>
  )
}
