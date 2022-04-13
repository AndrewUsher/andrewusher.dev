import * as React from 'react'
import { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Projects } from '~/components/shared/Projects/Projects'
import { getProjects } from '~/lib/contentful.server'

export const loader: LoaderFunction = async () => {
  const data = await getProjects()
  const parsedProjects = data.items.map(({ fields }) => ({
    ...fields
  }))

  return parsedProjects
}

export const meta: MetaFunction = () => ({
  title: 'Projects - Andrew Usher',
  description: "Projects that I've worked on solely/contributed to."
})

export default function ProjectsRoute () {
  const projects = useLoaderData()
  return (
    <>
      <main className="max-w-screen-xl mx-auto py-4 px-4">
        <Projects projects={projects} />
      </main>
    </>
  )
}
