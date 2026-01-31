import type { CollectionEntry } from 'astro:content'

export const mockPublishedProjects: Array<CollectionEntry<'projects'>> = [
  {
    id: 'toolzy',
    body: '',
    collection: 'projects',
    data: {
      date: new Date('2024-06-15'),
      isPublished: true,
      liveProjectLink: 'https://toolzy.vercel.app/',
      slug: 'toolzy',
      summary: 'A collection of web-based tools',
      title: 'Toolzy',
    },
  },
  {
    id: 'dotfiles',
    body: '',
    collection: 'projects',
    data: {
      date: new Date('2024-01-01'),
      isPublished: true,
      liveProjectLink: 'https://github.com/andrewusher/dotfiles',
      summary: 'My personal dotfiles configuration',
      title: 'Dotfiles',
    },
  },
]

export const mockUnpublishedProject: CollectionEntry<'projects'> = {
  id: 'draft',
  body: '',
  collection: 'projects',
  data: {
    date: new Date('2024-12-01'),
    isPublished: false,
    liveProjectLink: '',
    summary: 'Work in progress',
    title: 'Draft Project',
  },
}
