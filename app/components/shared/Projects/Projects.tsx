import React from 'react'
import { Project } from '~/types/contentful'

type Props = {
  projects: Omit<Project, 'date'>[]
}

export function Projects({ projects }: Props) {
  return (
    <>
      {projects.map((project) => (
        <article key={project.title} className="mb-6">
          <h3 className="focus:decoration-[0.5rem mb-4 break-words text-2xl font-semibold underline decoration-sky-400 decoration-[0.25rem] hover:decoration-sky-400/50 hover:decoration-[0.5rem] focus:decoration-sky-600/50 motion-safe:transition-all motion-safe:duration-200 dark:text-white">
            {project.title}
          </h3>
          <p className="text-xl leading-8 dark:text-slate-300">
            {project.summary}
          </p>
        </article>
      ))}
    </>
  )
}
