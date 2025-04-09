import { createStorefrontApiClient } from '@shopify/storefront-api-client'

export const shopify = createStorefrontApiClient({
  storeDomain: 'thetoytoyshop.myshopify.com',
  apiVersion: '2025-04',
  publicAccessToken: process.env.SHOPIFY_PUBLIC_ACCESS_TOKEN,
})
