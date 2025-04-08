import { shopify } from './shopify'

export const getAllProducts = `
  query getAllProducts {
    products(first: 100) {
      edges {
        node {
          id
          title
          description
          handle
          images(first: 1) {
            edges {
              node {
                src
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`

export const createCart = async () => {
  'use server'
  const mutation = `
    mutation CreateCart {
      cartCreate {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `

  const { data } = await shopify.request(mutation)
  console.log('data.cartCreate.cart', data.cartCreate.cart)
  // console.log('data', data)
  return data.cartCreate.cart
}
