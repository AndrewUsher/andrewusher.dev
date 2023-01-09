import React from 'react'
import type { LinksFunction, MetaFunction } from '@remix-run/server-runtime'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import { Footer } from './components/root/Footer'
import { Header } from './components/root/Header'
import styles from './tailwind.css'

export const meta: MetaFunction = () => {
  return { title: 'Andrew Usher' }
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta property="og:url" content="https://andrewusher.dev" />
        <meta property="og:title" content="Andrew Usher" />
        <meta
          name="keywords"
          content="Learn React, NPM Needs, Node.js, Learn TypeScript"
        />
        <meta name="twitter:creator" content="@AndrewUsher17" />
        <meta name="twitter:site" content="@AndrewUsher17" />
        <meta name="twitter:title" content="Andrew Usher" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#7dd3fc"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#0284c7"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="color-scheme" content="dark light" />

        <Meta />
        <Links />
      </head>
      <body className="font-merriweather-sans dark:bg-neutral-900">
        <header className="sticky top-0 z-20 bg-white dark:bg-neutral-900">
          <div className="top-0 h-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>
          <Header />
        </header>
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}
