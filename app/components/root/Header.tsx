import React from 'react'
import { Link, NavLink as RemixNavLink, NavLinkProps } from 'remix'

const NavLink = ({ children, to }: NavLinkProps) => (
  <RemixNavLink className="block ml-8 first:ml-0 text-xl dark:text-white" to={to}>{children}</RemixNavLink>
)

export function Header () {
  return (
    <header className="max-w-screen-xl mx-auto py-4 px-4 flex items-center justify-between">
      <h1 className="text-4xl font-bold dark:text-white">
        <Link to="/">
          Andrew Usher
        </Link>
      </h1>
      {/* TODO: Add sidebar for mobile if new links are added */}
      <nav className="hidden lg:flex justify-between">
        <NavLink to="/about">About Me</NavLink>
        <NavLink to="/blog">Blog</NavLink>
      </nav>
    </header>
  )
}
