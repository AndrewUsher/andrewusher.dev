import React from 'react'
import { Projects } from '~/components/shared/Projects/Projects'
import { Project } from '~/types/contentful'

type Props = {
  projects: Project[]
}

export function RecentProjects ({ projects }: Props) {
  return (
    <section>
      <h2 className="text-4xl font-bold mb-8 dark:text-white">Recent Projects</h2>
      <Projects projects={projects} />
    </section>
  )
}
