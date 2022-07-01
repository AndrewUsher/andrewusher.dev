import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('Main homepage banners displayed', async ({ page }) => {
    await page.goto('/')
    const [projectsIsVisible, postsIsVisible] = await Promise.all([
      page.isVisible('text=Recent Projects'),
      page.isVisible('text=Recent Blog Posts'),
    ])

    expect(projectsIsVisible).toBe(true)
    expect(postsIsVisible).toBe(true)
  })

  test('Buy me a coffee button is displayed', async ({ page }) => {
    await page.goto('/')
    const coffeeButtonSelector = 'img[alt="Buy Me A Coffee"]'
    const coffeeButton = page.locator(coffeeButtonSelector)
    await expect(coffeeButton).toBeVisible()
  })
})
