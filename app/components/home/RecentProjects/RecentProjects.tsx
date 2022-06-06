import React from 'react'
import { Projects } from '~/components/shared/Projects/Projects'
import { Project } from '~/types/contentful'

type Props = {
  projects: Omit<Project, 'date'>[]
}

export function RecentProjects({ projects }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-4xl font-bold dark:text-white">
        Recent Projects
      </h2>
      <Projects projects={projects} />
    </section>
  )
}
