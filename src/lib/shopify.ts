import { createStorefrontApiClient } from '@shopify/storefront-api-client'

export const shopify = createStorefrontApiClient({
  storeDomain: 'thetoytoyshop.myshopify.com',
  apiVersion: '2024-04',
  publicAccessToken: process.env.SHOPIFY_PUBLIC_ACCESS_TOKEN,
})
