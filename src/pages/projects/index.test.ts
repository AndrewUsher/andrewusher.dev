import { describe, test, expect, vi, beforeEach } from 'vitest'
import { renderAstroComponentWithReact } from '../../test/helpers'
import { getCollection } from 'astro:content'
import ProjectsIndex from './index.astro'
import {
  mockPublishedProjects,
  mockUnpublishedProject,
} from '../../test/fixtures/projects'

vi.mock('astro:content', () => ({
  getCollection: vi.fn(),
}))

describe('projects/index.astro', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  test('renders page with title and description', async () => {
    vi.mocked(getCollection).mockResolvedValue(mockPublishedProjects)

    const { document } = await renderAstroComponentWithReact(ProjectsIndex)

    const main = document.querySelector('main')
    expect(main).toBeTruthy()

    const h1 = main?.querySelector('h1')
    expect(h1).toBeTruthy()
    expect(h1?.textContent?.trim()).toBe('Projects')
  })

  test('filters unpublished projects', async () => {
    const mixedProjects = [...mockPublishedProjects, mockUnpublishedProject]
    vi.mocked(getCollection).mockResolvedValue(mixedProjects)

    const { document } = await renderAstroComponentWithReact(ProjectsIndex)

    expect(document.textContent).toContain('Toolzy')
    expect(document.textContent).toContain('Dotfiles')
    expect(document.textContent).not.toContain('Draft Project')
  })

  test('renders ProjectsGrid with published projects', async () => {
    vi.mocked(getCollection).mockResolvedValue(mockPublishedProjects)

    const { document } = await renderAstroComponentWithReact(ProjectsIndex)

    const articles = document.querySelectorAll('article')
    expect(articles).toHaveLength(2)

    const titles = document.querySelectorAll('article h3')
    expect(titles[0]?.textContent?.trim()).toBe('Toolzy')
    expect(titles[1]?.textContent?.trim()).toBe('Dotfiles')
  })

  test('project links have correct href and attributes', async () => {
    vi.mocked(getCollection).mockResolvedValue(mockPublishedProjects)

    const { document } = await renderAstroComponentWithReact(ProjectsIndex)

    const links = document.querySelectorAll('article h3 a')
    expect(links[0]).toHaveAttribute('href', 'https://toolzy.vercel.app/')
    expect(links[0]).toHaveAttribute('target', '_blank')
    expect(links[0]).toHaveAttribute('rel', 'noreferrer')

    expect(links[1]).toHaveAttribute(
      'href',
      'https://github.com/andrewusher/dotfiles'
    )
  })

  test('renders project summaries', async () => {
    vi.mocked(getCollection).mockResolvedValue(mockPublishedProjects)

    const { document } = await renderAstroComponentWithReact(ProjectsIndex)

    expect(document.textContent).toContain('A collection of web-based tools')
    expect(document.textContent).toContain('My personal dotfiles configuration')
  })
})
