import React from 'react'
import { render, screen } from '@testing-library/react'
import { Posts } from './index'
import { RemixWrapper } from '../../../test-utils'

const MOCK_POSTS = [
  {
    title: 'Fastify Quickstart',
    date: '2022-01-05T00:00-06:00',
    slug: 'fastify-quickstart'
  },
  {
    title: 'Express Quickstart',
    date: '2021-01-05T00:00-06:00',
    slug: 'express-quickstart'
  }
]

describe('<Posts />', () => {
  test('should render post titles', () => {
    render(
      <RemixWrapper>
        <Posts posts={MOCK_POSTS} />
      </RemixWrapper>
    )

    const firstPostTitle = screen.getByText('Fastify Quickstart')
    const secondPostTitle = screen.getByText('Express Quickstart')

    expect(firstPostTitle).toBeInTheDocument()
    expect(secondPostTitle).toBeInTheDocument()
  })

  test('should render post links', () => {
    render(
      <RemixWrapper>
        <Posts entrySlugStart="/blog" posts={MOCK_POSTS}/>
      </RemixWrapper>
    )

    const postLink = screen.getByText('Fastify Quickstart')
    const linkPath = new URL(postLink.href).pathname

    expect(linkPath).toBe('/blog/fastify-quickstart')
  })

  test('should render post publish date', () => {
    render(
      <RemixWrapper>
        <Posts posts={MOCK_POSTS} />
      </RemixWrapper>
    )

    const publishInfo = screen.getByText('Published on January 05, 2022')

    expect(publishInfo).toBeInTheDocument()
    expect(publishInfo.getAttribute('datetime')).toBe('2022-01-05T00:00-06:00')
  })

  test('should render correct path prefix', () => {
    render(
      <RemixWrapper>
        <Posts entrySlugStart="/journal" posts={MOCK_POSTS}/>
      </RemixWrapper>
    )

    const postLink = screen.getByText('Fastify Quickstart')
    const linkPath = new URL(postLink.href).pathname

    expect(linkPath).toBe('/journal/fastify-quickstart')
  })
})
