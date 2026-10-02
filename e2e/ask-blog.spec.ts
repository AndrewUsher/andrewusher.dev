import { test, expect } from '@playwright/test'

test.skip(process.env.ASK_BLOG_ENABLED !== 'true', 'Run with ASK_BLOG_ENABLED=true to include the widget.')

const post = '/blog/cookie-store-api-the-modern-way-to-handle-cookies'
const source = {
  number: 1,
  title: 'Cookie Store API',
  heading: 'Getting Cookies',
  url: `${post}#getting-cookies`,
  excerpt: 'Use cookieStore.get to read a cookie asynchronously.',
}

test.beforeEach(async ({ page }) => {
  await page.route('**/api/ask-blog', async route => {
    if (route.request().method() === 'GET') {
      await route.fulfill({ json: { enabled: true } })
      return
    }
    await route.fulfill({ contentType: 'application/x-ndjson', body: [
      { type: 'sources', sources: [source] },
      { type: 'delta', text: 'Use cookieStore.get [1].' },
      { type: 'done', html: `<p>Use <code>cookieStore.get</code> <a href="${source.url}">[1]</a>.</p>` },
    ].map(event => JSON.stringify(event)).join('\n') + '\n' })
  })
})

test('opens with keyboard focus, renders citations, and retains history across blog navigation', async ({ page }) => {
  await page.goto('/blog')
  const launcher = page.getByRole('button', { name: 'Ask my blog', exact: true })
  await launcher.click()
  const input = page.getByRole('textbox', { name: 'Your question about the blog' })
  await expect(input).toBeFocused()
  await input.fill('How do I replace document.cookie?')
  await page.getByRole('button', { name: 'Send question' }).click()
  await expect(page.locator('.ask-blog-markdown')).toContainText('cookieStore.get')
  await page.locator('.ask-blog-markdown a').click()
  await expect(page).toHaveURL(new RegExp(`${post}#getting-cookies$`))
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await page.getByRole('button', { name: 'Ask my blog', exact: true }).click()
  await expect(page.getByRole('log')).toContainText('How do I replace document.cookie?')
  await expect(page.locator('.ask-blog-markdown')).toContainText('cookieStore.get')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(page.getByRole('button', { name: 'Ask my blog', exact: true })).toBeFocused()
})

test('uses a full-height mobile panel, contains keyboard focus, and clears the conversation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/blog')
  await page.getByRole('button', { name: 'Ask my blog', exact: true }).click()
  const bounds = await page.getByRole('dialog').boundingBox()
  expect(bounds?.width).toBe(390)
  expect(bounds?.height).toBe(844)
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab')
    expect(await page.evaluate(() => Boolean(document.activeElement?.closest('dialog')))).toBe(true)
  }
  await page.getByRole('textbox').fill('Read cookies?')
  await page.getByRole('button', { name: 'Send question' }).click()
  await expect(page.locator('.ask-blog-markdown')).toContainText('cookieStore.get')
  await page.getByRole('button', { name: 'Clear chat' }).click()
  await expect(page.getByRole('log')).toContainText('Find the paragraph')
  await expect(page.getByRole('textbox')).toBeFocused()
})

test('shows rate-limit feedback and hides the launcher when runtime availability is disabled', async ({ page }) => {
  await page.unroute('**/api/ask-blog')
  let enabled = true
  await page.route('**/api/ask-blog', async route => {
    if (route.request().method() === 'GET') return route.fulfill({ json: { enabled } })
    return route.fulfill({ status: 429, json: { error: 'You’ve reached the 10-question hourly limit.' } })
  })
  await page.goto('/blog')
  await page.getByRole('button', { name: 'Ask my blog', exact: true }).click()
  await page.getByRole('textbox').fill('Read cookies?')
  await page.getByRole('button', { name: 'Send question' }).click()
  await expect(page.locator('.ask-blog-error')).toContainText('hourly limit')
  enabled = false
  await page.reload()
  await expect(page.getByRole('button', { name: 'Ask my blog', exact: true })).not.toBeVisible()
})

test('keeps the launcher off non-blog pages and resets conversation on reload', async ({ page }) => {
  await page.goto('/about')
  await expect(page.getByRole('button', { name: 'Ask my blog', exact: true })).not.toBeVisible()
  await page.goto('/blog')
  await page.getByRole('button', { name: 'Ask my blog', exact: true }).click()
  await page.getByRole('textbox').fill('Read cookies?')
  await page.getByRole('button', { name: 'Send question' }).click()
  await expect(page.locator('.ask-blog-markdown')).toContainText('cookieStore.get')
  await page.reload()
  await page.getByRole('button', { name: 'Ask my blog', exact: true }).click()
  await expect(page.getByRole('log')).toContainText('Find the paragraph')
})
