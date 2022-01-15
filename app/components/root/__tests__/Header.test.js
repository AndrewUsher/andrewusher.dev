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

    const headerLink = await screen.getByText('Andrew Usher')
    expect(headerLink).toBeTruthy()
    expect(new URL(headerLink.href).pathname).toBe('/')
  })
})
