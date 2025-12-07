import type { CollectionEntry } from 'astro:content'

type Props = {
  projects: Array<CollectionEntry<'projects'>>
}

export function ProjectsGrid({ projects }: Props) {
  return (
    <>
      {projects.map(({ data }) => (
        <article key={data.title} className="mb-6">
          <h3 className="dark:text-white mb-4 break-words text-2xl font-semibold tracking-tighter hover:text-sky-500">
            <a href={data.liveProjectLink} target="_blank" rel="noreferrer">
              {data.title}
            </a>
          </h3>
          <p className="dark:text-slate-300 text-xl leading-8">
            {data.summary}
          </p>
        </article>
      ))}
    </>
  )
}
