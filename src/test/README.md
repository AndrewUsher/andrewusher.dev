# Astro Component Testing

This directory contains test utilities for testing Astro components using Vitest and the Astro Container API.

## Current Status

✅ **Ready to use!** This project uses Vitest 3.2.4 with full support for Astro 5's Container API.

## Quick Start

### Testing a Simple Astro Component

```typescript
import { describe, test, expect } from 'vitest'
import MyComponent from '../components/MyComponent.astro'
import { renderAstroComponent } from './helpers'

describe('MyComponent', () => {
  test('renders correctly', async () => {
    const { document } = await renderAstroComponent(MyComponent, {
      props: { title: 'Hello World' }
    })

    const heading = document.querySelector('h1')
    expect(heading?.textContent).toBe('Hello World')
  })
})
```

### Testing Astro Components with React Children

```typescript
import { renderAstroComponentWithReact } from './helpers'
import ComponentWithReact from '../components/ComponentWithReact.astro'

test('renders React children', async () => {
  const { document } = await renderAstroComponentWithReact(ComponentWithReact, {
    props: { count: 5 }
  })

  expect(document.textContent).toContain('Count: 5')
})
```

### Testing with Slots

```typescript
test('renders slot content', async () => {
  const { document } = await renderAstroComponent(Card, {
    props: { title: 'Card Title' },
    slots: {
      default: 'Card content goes here',
      footer: '<p>Footer text</p>'
    }
  })

  expect(document.textContent).toContain('Card content goes here')
})
```

## Helper Functions

### `renderAstroComponent(Component, options)`

Renders an Astro component and returns a DOM representation for testing.

**Parameters:**
- `Component` - The Astro component to render
- `options.props` - Props to pass to the component
- `options.slots` - Slot content (object with slot names as keys)
- `options.locals` - Astro.locals data

**Returns:**
- `container` - The root div element containing the rendered HTML
- `document` - The same div element (for backwards compatibility)
- `window` - The happy-dom Window instance

### `renderAstroComponentWithReact(Component, options)`

Same as `renderAstroComponent` but includes React renderer support for components that use React children.

## Environment Configuration

### Node Environment (Default)

The Vitest config uses `node` as the default environment, which is required for Astro's Container API:

```typescript
// vitest.config.mts
export default getViteConfig({
  test: {
    environment: 'node',  // Required for Astro Container API
  },
})
```

### Testing React Components

For React-only component tests (not Astro components), override the environment:

```typescript
// @vitest-environment jsdom
import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'
import MyReactComponent from './MyReactComponent'

test('React component test', () => {
  const { getByText } = render(<MyReactComponent />)
  expect(getByText('Hello')).toBeInTheDocument()
})
```

## DOM Querying

The helpers use happy-dom to create a DOM in the Node environment. You can use standard DOM APIs:

```typescript
const { document } = await renderAstroComponent(Component)

// Query selectors
document.querySelector('button')
document.querySelectorAll('.card')
document.getElementById('main')

// Text content
document.textContent
element.innerText

// Attributes
element.getAttribute('href')
element.className
element.classList.contains('active')
```

## Limitations

### Server-Side Only

The Container API renders components server-side only. You cannot test:
- Client-side JavaScript behavior
- Click handlers or other DOM events
- Client-side state management
- Hydration behavior

For these scenarios, use:
- **Playwright** (already configured in this project) for E2E tests
- **Vitest Browser Mode** for component interaction testing

### Static HTML Only

Tests receive the static HTML output after server-side rendering. Interactive features that require client hydration will not function in these tests.

### Experimental API

The Container API is experimental and may have breaking changes in minor Astro versions. Pin your Astro version and review release notes carefully.

## Type Definitions

The project includes custom TypeScript definitions for Astro testing modules:

- `src/test/types.d.ts` - Ambient type declarations for `astro/config`, `astro/container`, and `astro:container`

These types ensure proper TypeScript support when importing Astro modules in test files and configuration.

## Troubleshooting

### Error: "Cannot read properties of undefined (reading 'name')"

This error occurs with Vitest 1.x when trying to import `.astro` files. Upgrade to Vitest 3.x to fix.

### Tests Not Finding DOM Elements

Ensure you're destructuring `document` from the render result:

```typescript
// ✅ Correct
const { document } = await renderAstroComponent(Component)

// ❌ Wrong
const result = await renderAstroComponent(Component)
// result.querySelector won't work
```

### React Components Not Rendering

Use `renderAstroComponentWithReact()` instead of `renderAstroComponent()` for components with React children.

## Resources

- [Astro Container API Docs](https://docs.astro.build/en/reference/container-reference/)
- [Astro Testing Guide](https://docs.astro.build/en/guides/testing/)
- [Vitest Documentation](https://vitest.dev/)
- [GitHub Issue #14895](https://github.com/withastro/astro/issues/14895) - Environment compatibility
