import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Link, NavLink as RemixNavLink, NavLinkProps, useLocation } from 'remix'
import Typical from 'react-typical'

const NavLink = ({ children, to }: NavLinkProps) => (
  <RemixNavLink className="block ml-8 first:ml-0 text-xl dark:text-white" to={to}>{children}</RemixNavLink>
)

const MobileNavLink = ({ children, to }: NavLinkProps) => (
  <RemixNavLink className="block mb-4 pb-4 text-xl dark:text-white w-full text-center" to={to}>{children}</RemixNavLink>
)

export function Header () {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const closeSidebar = () => {
    setSidebarOpen(false)
  }
  const openSidebar = () => {
    setSidebarOpen(true)
  }

  useEffect(() => {
    // Close sidebar on route change
    closeSidebar()
  }, [location])

  return (
    <>
      <header className="max-w-screen-xl mx-auto py-4 px-4 flex items-center justify-between">
        <h1 className="text-4xl font-bold dark:text-white">
          <Link to="/">
          <Typical loop={1} steps={["Andrew", 500, "Andrew Usher", 500]} wrapper="div">Andrew Usher</Typical>
          </Link>
        </h1>
        {/* TODO: Add sidebar for mobile if new links are added */}
        <nav className="hidden lg:flex justify-between">
          <NavLink to="/about">About Me</NavLink>
          <NavLink to="/blog">Blog</NavLink>
        </nav>
        <nav className="flex lg:hidden">
          <button onClick={openSidebar} className="dark:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

        </nav>

      </header>
      <div className={clsx('transition ease-in-out fixed top-0 bg-sky-300 h-full w-full text-white', {
        'translate-x-full': !sidebarOpen,
        'translate-x-0': sidebarOpen
      })}>
        <nav className="flex justify-between p-4 mb-8">
          <h1 className="text-4xl font-bold dark:text-white">
            <Link to="/">
          Andrew Usher
            </Link>
          </h1>
          <button onClick={closeSidebar} className="dark:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </nav>
        <div>
          <MobileNavLink to="/">Home</MobileNavLink>
          <MobileNavLink to="/about">About Me</MobileNavLink>
          <MobileNavLink to="/blog">Blog</MobileNavLink>
          <MobileNavLink to="/contact">Get in Touch</MobileNavLink>
          <MobileNavLink to="/office-hours">Office Hours</MobileNavLink>
          <MobileNavLink to="/projects">Projects</MobileNavLink>
          <MobileNavLink to="/uses">Uses</MobileNavLink>
        </div>
      </div>
    </>
  )
}
