import React from 'react'
import { Project } from '~/types/contentful'

type Props = {
  projects: Project[]
}

export function Projects ({ projects }: Props) {
  return (
    <>
      {projects.map(project => (
        <article key={project.title} className="mb-6">
          <h3 className="text-2xl mb-4 font-semibold dark:text-white underline decoration-sky-400 decoration-[0.25rem] motion-safe:transition-all motion-safe:duration-200 hover:decoration-[0.5rem] focus:decoration-[0.5rem hover:decoration-sky-400/50 focus:decoration-sky-600/50">
            {project.title}
          </h3>
          <p className="text-xl leading-8 dark:text-slate-300">{project.summary}</p>
        </article>
      ))}
    </>
  )
}
