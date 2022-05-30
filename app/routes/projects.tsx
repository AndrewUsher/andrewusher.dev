import * as React from 'react'
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { Projects } from '~/components/shared/Projects/Projects'
import { getProjects } from '~/lib/contentful.server'
import { logger } from '~/lib/logger.server'

export const loader: LoaderFunction = async () => {
  const data = await getProjects()
  logger.debug(`Projects route - ${data.total} projects found`)
  const parsedProjects = data.items.map(({ fields }) => ({
    ...fields,
  }))

  return parsedProjects
}

export const meta: MetaFunction = () => ({
  title: 'Projects - Andrew Usher',
  description: "Projects that I've worked on solely/contributed to.",
})

export default function ProjectsRoute() {
  const projects = useLoaderData()
  return (
    <>
      <main className="mx-auto max-w-screen-xl p-8">
        <Projects projects={projects} />
      </main>
    </>
  )
}
