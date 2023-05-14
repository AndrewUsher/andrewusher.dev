import { Link, NavLink as RemixNavLink, NavLinkProps } from '@remix-run/react'
import Typical from 'react-typical'

const NavLink = ({ children, to }: NavLinkProps) => {
  const linkClasses =
    'ml-8 block lg:text-xl first:ml-0 dark:text-white text-base'
  if (to === '/resume.pdf') {
    return (
      <a href={to} className={linkClasses} target="_blank" rel="noreferrer">
        Resume
      </a>
    )
  }
  return (
    <RemixNavLink className={linkClasses} to={to}>
      {children}
    </RemixNavLink>
  )
}

export function Header() {
  return (
    <>
      <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between p-8 lg:flex-row">
        <h1 className="text-4xl font-bold dark:text-white">
          <Link to="/">
            <Typical
              loop={1}
              steps={['Andrew', 500, 'Andrew Usher', 500]}
              wrapper="div"
            />
          </Link>
        </h1>
        <nav className="hidden justify-between lg:flex">
          <NavLink to="/about">About Me</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/resume.pdf">Resume</NavLink>
        </nav>
        <nav className="mt-6 flex lg:hidden">
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/contact">Contact Me</NavLink>
          <NavLink to="/resume.pdf">Resume</NavLink>
        </nav>
      </div>
    </>
  )
}
