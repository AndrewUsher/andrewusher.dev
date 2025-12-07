/// <reference types="astro/client" />
import type { ComponentProps } from 'astro/types'
import {
  experimental_AstroContainer as AstroContainer,
  type ContainerRenderOptions,
} from 'astro/container'
import { Window } from 'happy-dom'

type AstroComponentFactory = Parameters<
  typeof AstroContainer.prototype.renderToString
>[0]

/* eslint-disable */
type ComponentContainerRenderOptions<T> = Omit<
  ContainerRenderOptions,
  'props'
> & {
  props?: T extends (...args: any) => any
    ? ComponentProps<T>
    : Record<string, any>
}

/* eslint-enable */
/**
 * Renders an Astro component to a DOM element for testing
 *
 * Note: Uses Node environment with happy-dom parser
 * See https://github.com/withastro/astro/issues/14895
 *
 * @example
 * ```ts
 * import { describe, test, expect } from 'vitest'
 * import MyComponent from '../components/MyComponent.astro'
 * import { renderAstroComponent } from './helpers'
 *
 * describe('MyComponent', () => {
 *   test('renders correctly', async () => {
 *     const { container, document } = await renderAstroComponent(MyComponent, {
 *       props: { title: 'Test' }
 *     })
 *     expect(document.textContent).toContain('Test')
 *   })
 * })
 * ```
 *
 * @param Component - The Astro component to render
 * @param options - Render options including props, slots, and locals
 * @returns An object with the container element and document for querying
 */
export async function renderAstroComponent<T extends AstroComponentFactory>(
  Component: T,
  options: ComponentContainerRenderOptions<T> = {}
) {
  const container = await AstroContainer.create()
  const html = await container.renderToString(Component, options)

  // Create a DOM using happy-dom for parsing and querying in Node environment
  const window = new Window()
  const document = window.document
  const div = document.createElement('div')
  div.innerHTML = html

  return { container: div, document: div, window }
}

/**
 * Renders an Astro component with React renderer support
 *
 * @example
 * ```ts
 * import { renderAstroComponentWithReact } from './helpers'
 * import ComponentWithReact from '../components/ComponentWithReact.astro'
 *
 * const { document } = await renderAstroComponentWithReact(ComponentWithReact)
 * ```
 *
 * @param Component - The Astro component to render
 * @param options - Render options including props, slots, and locals
 * @returns An object with the container element and document for querying
 */
export async function renderAstroComponentWithReact<
  T extends AstroComponentFactory
>(Component: T, options: ComponentContainerRenderOptions<T> = {}) {
  const { loadRenderers } = await import('astro:container')
  const { getContainerRenderer: reactRenderer } = await import('@astrojs/react')

  const renderers = await loadRenderers([reactRenderer()])
  const container = await AstroContainer.create({ renderers })
  const html = await container.renderToString(Component, options)

  // Create a DOM using happy-dom for parsing and querying in Node environment
  const window = new Window()
  const document = window.document
  const div = document.createElement('div')
  div.innerHTML = html

  return { container: div, document: div, window }
}
