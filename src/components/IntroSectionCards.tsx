import {
  BuildingOfficeIcon,
  CommandLineIcon,
  HeartIcon,
  RectangleGroupIcon,
  UserIcon,
} from '@heroicons/react/24/solid'
import * as React from 'react'

type IntroSectionCardProps = {
  body: string
  heading: string
  icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string
      titleId?: string
    } & React.RefAttributes<SVGSVGElement>
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
    <a
      href={url}
      className="card dark:bg-slate-800 flex items-center rounded p-6 shadow-lg transition ease-in-out hover:scale-105"
    >
      <section>
        <Icon className="mr-4 h-10 w-10 text-sky-600" />
      </section>
      <section>
        <h2 className="mb-2 text-3xl font-bold text-sky-600">{heading}</h2>
        <p className="text-lg">{body}</p>
      </section>
    </a>
  )
}

export function IntroSectionCards() {
  return (
    <div className="my-12 grid grid-cols-1 gap-8 md:grid-cols-2">
      <IntroSectionCard
        body="Loose collection of thoughts, things learned, and who-knows-whats about JavaScript, React, and TypeScript"
        heading="Blog"
        icon={RectangleGroupIcon}
        url="/blog"
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
  )
}
