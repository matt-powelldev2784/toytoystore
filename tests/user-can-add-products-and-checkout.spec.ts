import { test, expect } from '@playwright/test'

test('user can add products and checkout', async ({ page }) => {
  await page.goto('/')

  // navigate to shop page
  const enterStoreButton = page.getByRole('button', { name: 'Shop Now' })
  await enterStoreButton.click()

  // check if the user is redirected to the shop page
  await page.waitForURL('/shop')
  const productsTitle = page.getByRole('heading', { name: 'Products' })
  await expect(productsTitle).toHaveText('Products')

  // add one product to the cart
  const addToCartButtons = page.getByRole('button', { name: 'Add to cart' })
  const firstAddToCartButton = addToCartButtons.first()
  await firstAddToCartButton.click()

  // wait for the cart to update
  const addToCartResponse = page.waitForResponse(
    (response) =>
      response.url().includes('/shop') &&
      response.request().method() === 'POST' &&
      response.status() === 200
  )
  await addToCartResponse

  // check the cart product count is one
  const imageLocator = page.locator('img[alt="Checkout Icon"]')
  const cartCountLocator = imageLocator.locator('xpath=preceding-sibling::p')
  await cartCountLocator.waitFor({ state: 'visible' })
  const cartCount = await cartCountLocator.textContent()
  expect(cartCount?.trim()).toBe('1')

  // check user can navigate to checkout page
  cartCountLocator.click()
  await expect(page).toHaveURL(
    /https:\/\/thetoytoyshop\.myshopify\.com\/checkouts/
  )
})
