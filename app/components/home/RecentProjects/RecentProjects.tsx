import React from 'react'

type Project = {
  summary: string;
  title: string;
}

type Props = {
  projects: Project[]
}

export function RecentProjects ({ projects }: Props) {
  return (
    <section>
      <h2 className="text-4xl font-bold mb-8 dark:text-white">Recent Projects</h2>
      {projects.map(project => (
        <article key={project.title} className="mb-6">
          <h3 className="text-2xl mb-1 font-semibold dark:text-white underline decoration-sky-400 decoration-[0.25rem] motion-safe:transition-all motion-safe:duration-200 hover:decoration-[0.5rem] focus:decoration-[0.5rem hover:decoration-sky-400/50 focus:decoration-sky-600/50">
            {project.title}
          </h3>
          <p>{project.summary}</p>
        </article>
      ))}
    </section>
  )
}
