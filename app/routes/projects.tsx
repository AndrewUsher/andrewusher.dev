import * as React from 'react'
import { useLoaderData } from '@remix-run/react'
import { MetaFunction } from '@remix-run/server-runtime'
import { Projects } from '~/components/shared/Projects/Projects'
import { getProjects } from '~/lib/contentful.server'
import { logger } from '~/lib/logger.server'

export const loader = async () => {
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
  const projects = useLoaderData<typeof loader>()
  return (
    <>
      <main className="mx-auto max-w-screen-xl p-8">
        <Projects projects={projects} />
      </main>
    </>
  )
}
