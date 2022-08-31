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
          <h3 className="mb-4 break-words text-2xl font-semibold tracking-wide tracking-tighter hover:text-sky-500 dark:text-white">
            <a href={project.liveProjectLink} target="_blank" rel="noreferrer">
              {project.title}
            </a>
          </h3>
          <p className="text-xl leading-8 dark:text-slate-300">
            {project.summary}
          </p>
        </article>
      ))}
    </>
  )
}
