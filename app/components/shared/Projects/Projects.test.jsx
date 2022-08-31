import React from 'react'
import { render, screen } from '@testing-library/react'
import { Projects } from './Projects'
import { RemixWrapper } from '../../../test-utils'

const MOCK_PROJECTS = [
  {
    liveProjectLink: 'https://carbonite.vercel.app/',
    title: 'Carbonite',
    summary: 'Star Wars Wiki',
  },
  {
    liveProjectLink: 'https://carbonite.vercel.app/',
    title: 'Pokedex',
    summary: 'Gen 1 Pokedex',
  },
]

describe('<Projects />', () => {
  test('should render project titles', () => {
    render(
      <RemixWrapper>
        <Projects projects={MOCK_PROJECTS} />
      </RemixWrapper>
    )

    const firstProjectTitle = screen.getByText('Carbonite')
    const secondProjectTitle = screen.getByText('Pokedex')

    expect(firstProjectTitle).toBeInTheDocument()
    expect(secondProjectTitle).toBeInTheDocument()
  })

  test('should render project summary', () => {
    render(
      <RemixWrapper>
        <Projects projects={MOCK_PROJECTS} />
      </RemixWrapper>
    )

    const projectSummary = screen.getByText('Star Wars Wiki')

    expect(projectSummary).toBeInTheDocument()
  })

  test('should render project links', () => {
    const { container } = render(
      <RemixWrapper>
        <Projects projects={MOCK_PROJECTS} />
      </RemixWrapper>
    )

    expect(container.querySelectorAll('a').length).toBe(2)
  })
})
