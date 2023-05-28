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
  LinksFunction,
  MetaFunction,
} from '@remix-run/server-runtime'
import { motion } from 'framer-motion'
import { Link, useLoaderData } from '@remix-run/react'
import { RecentPosts } from '~/components/home/RecentPosts/RecentPosts'
import { RecentProjects } from '~/components/home/RecentProjects/RecentProjects'
import { getBlogPosts, getProjects } from '~/lib/contentful.server'
import { getSeo } from '~/seo'

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.p>
  )
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
  icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined
      titleId?: string | undefined
    }
  >
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
        <h2 className="mb-2 text-3xl font-bold text-sky-600">{heading}</h2>
        <p className="text-lg">{body}</p>
      </section>
    </Link>
  )
}

export const headers: HeadersFunction = () => ({
  'Cache-Control':
    'public, max-age=3600, s-max-age=36000, stale-while-revalidate=72000',
})

export const loader = async () => {
  const [blogPosts, projects] = await Promise.all([
    getBlogPosts(),
    getProjects(),
  ])

  return {
    recentBlogPosts: blogPosts.slice(0, 5).map(({ fields }) => ({
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
  const { recentBlogPosts, recentProjects } = useLoaderData<typeof loader>()
  return (
    <>
      <div className="mx-auto max-w-screen-xl p-8 pt-0">
        <div className="prose dark:prose-invert lg:prose-xl">
          <Paragraph>
            Greetings! I am a systems engineer at{' '}
            <ExternalLink href="https://autozone.com">AutoZone</ExternalLink>,
            where I lead a team of React developers in the development of the
            B2C web application. In my leisure time, I enjoy experimenting with
            new front-end technologies by creating personal projects. Outside of
            work, I engage in physical activities such as basketball and cycling
            in downtown Memphis. For additional information about me, please
            refer to my profile.
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
