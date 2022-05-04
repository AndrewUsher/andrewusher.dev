import React from 'react'
import { MemoryRouter } from 'react-router'

export const RemixWrapper = ({ children }) => (
  <MemoryRouter>{children}</MemoryRouter>
)
