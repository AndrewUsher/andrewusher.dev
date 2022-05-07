import * as React from 'react'
import {
  BookOpenIcon,
  HeartIcon,
  OfficeBuildingIcon,
  TerminalIcon
} from '@heroicons/react/solid'
import { Link, LoaderFunction, useLoaderData } from 'remix'
import { RecentPosts } from '~/components/home/RecentPosts/RecentPosts'
import { RecentProjects } from '~/components/home/RecentProjects/RecentProjects'
import { getBlogPosts, getProjects } from '~/lib/contentful.server'

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>
}

function ExternalLink({ href, children }: { children: string; href: string }) {
  return (
    <a className="underline" href={href}>
      {children}
    </a>
  )
}

type IntroSectionCardProps = {
  body: string
  heading: string
  icon: React.FunctionComponent<{ className: string }>
  url: string
}

function IntroSectionCard({
  body,
  heading,
  icon: Icon,
  url
}: IntroSectionCardProps) {
  return (
    <Link
      to={url}
      className="flex items-center rounded shadow-lg card p-6 transition ease-in-out hover:scale-105"
    >
      <section>
        <Icon className="h-10 w-10 mr-4 text-sky-600" />
      </section>
      <section>
        <h2 className="font-bold text-3xl mb-1 text-sky-600">{heading}</h2>
        <p className="text-base">{body}</p>
      </section>
    </Link>
  )
}

export const loader: LoaderFunction = async () => {
  const [blogPosts, projects] = await Promise.all([
    getBlogPosts(),
    getProjects()
  ])

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

export default function Index() {
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
        <div className="my-12 grid grid-cols-2 gap-8">
          <IntroSectionCard
            body="Loose collection of thoughts, things learned, and who-knows-whats about JavaScript, React, and TypeScript"
            heading="Blog"
            icon={BookOpenIcon}
            url="/blog"
          />
          <IntroSectionCard
            body="All of the fun things I've been working on"
            heading="Projects"
            icon={OfficeBuildingIcon}
            url="/projects"
          />
          <IntroSectionCard
            body="List of my daily drivers and necessities anyways, mostly revolving around my love for Apple"
            heading="Uses"
            icon={TerminalIcon}
            url="/uses"
          />
          <IntroSectionCard
            body="A list of things that I like, in no particular order"
            heading="Things I Like"
            icon={HeartIcon}
            url="/things-i-like"
          />
        </div>
        <RecentProjects projects={recentProjects} />
        <RecentPosts posts={recentBlogPosts} />
      </div>
    </>
  )
}
