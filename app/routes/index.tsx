import * as React from 'react'
import {
  BookOpenIcon,
  BuildingOfficeIcon,
  CommandLineIcon,
  HeartIcon,
  RectangleGroupIcon,
  UserIcon,
} from '@heroicons/react/24/solid'
import {
  HeadersFunction,
  Link,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from 'remix'
import { RecentPosts } from '~/components/home/RecentPosts/RecentPosts'
import { RecentProjects } from '~/components/home/RecentProjects/RecentProjects'
import { getBlogPosts, getProjects } from '~/lib/contentful.server'
import { BlogPostOrJournalEntry, Project } from '~/types/contentful'
import { getSeo } from '~/seo'

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
  url,
}: IntroSectionCardProps) {
  return (
    <Link
      to={url}
      className="card flex items-center rounded p-6 shadow-lg transition ease-in-out hover:scale-105 dark:bg-slate-800"
    >
      <section>
        <Icon className="mr-4 h-10 w-10 text-sky-600" />
      </section>
      <section>
        <h2 className="mb-1 text-3xl font-bold text-sky-600">{heading}</h2>
        <p className="text-base">{body}</p>
      </section>
    </Link>
  )
}

export const headers: HeadersFunction = () => ({
  'Cache-Control':
    'public, max-age=3600, s-max-age=36000, stale-while-revalidate=72000',
})

type LoaderData = {
  recentBlogPosts: Omit<BlogPostOrJournalEntry, 'content'>[]
  recentProjects: Omit<Project, 'date'>[]
}

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const [blogPosts, projects] = await Promise.all([
    getBlogPosts(),
    getProjects(),
  ])

  return {
    recentBlogPosts: blogPosts.items.slice(0, 5).map(({ fields }) => ({
      date: fields.date,
      slug: fields.slug,
      title: fields.title,
    })),

    recentProjects: projects.items.map(({ fields }) => ({
      liveProjectLink: fields.liveProjectLink,
      summary: fields.summary,
      title: fields.title,
    })),
  }
}

const [seoMeta, seoLinks] = getSeo()

export const links: LinksFunction = () => [...seoLinks]
export const meta: MetaFunction = () => ({ ...seoMeta })

export default function Index() {
  const { recentBlogPosts, recentProjects } = useLoaderData<LoaderData>()
  console.log({ recentProjects })
  return (
    <>
      <div className="mx-auto max-w-screen-xl p-8">
        <div className="prose dark:prose-invert lg:prose-xl">
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
        <div className="my-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <IntroSectionCard
            body="Loose collection of thoughts, things learned, and who-knows-whats about JavaScript, React, and TypeScript"
            heading="Blog"
            icon={RectangleGroupIcon}
            url="/blog"
          />
          <IntroSectionCard
            body="Public collection of personal things I've written over the years"
            heading="Journal"
            icon={BookOpenIcon}
            url="/journal"
          />
          <IntroSectionCard
            body="All of the fun things I've been working on"
            heading="Projects"
            icon={BuildingOfficeIcon}
            url="/projects"
          />
          <IntroSectionCard
            body="List of my daily drivers and necessities anyways, mostly revolving around my love for Apple"
            heading="Uses"
            icon={CommandLineIcon}
            url="/uses"
          />
          <IntroSectionCard
            body="A list of things that I like, in no particular order"
            heading="Things I Like"
            icon={HeartIcon}
            url="/things-i-like"
          />
          <IntroSectionCard
            body="Any questions? Project ideas? Get in touch with me!"
            heading="Get In Touch"
            icon={UserIcon}
            url="/contact"
          />
        </div>
        <RecentProjects projects={recentProjects} />
        <RecentPosts posts={recentBlogPosts} />
      </div>
    </>
  )
}
