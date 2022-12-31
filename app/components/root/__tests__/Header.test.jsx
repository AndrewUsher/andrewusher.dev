import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { Header } from '../Header'

describe('<Header />', () => {
  test('Renders link to homepage', async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const headerLinks = await screen.getAllByText('Andrew Usher')
    expect(headerLinks[0]).toBeInTheDocument()
    expect(new URL(headerLinks[0].href).pathname).toBe('/')
  })

  test('Renders name in header', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByText('Andrew Usher')).toBeInTheDocument()
  })
})
