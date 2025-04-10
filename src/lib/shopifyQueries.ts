import { shopify } from './shopify'
import { Product } from './types'

export const getProducts = async (): Promise<Product[]> => {
  const query = `
    query getAllProducts {
      products(first: 100) {
        edges {
          node {
            id
            title
            description
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
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                }
              }
            }
          }
        }
      }
    }
  `

  const { data } = await shopify.request(query)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.products.edges.map((product: any) => ({
    productId: product.node.id,
    variantId: product.node.variants.edges[0]?.node.id || null,
    title: product.node.title,
    description: product.node.description,
    image: product.node.images.edges[0]?.node.src || null,
    price: product.node.priceRange.minVariantPrice.amount,
  }))
}

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

  return data.cartCreate.cart
}



type AddToCartProps = {
  cartId: string
  variantId: string
  quantity?: number
}

export const addToCart = async ({
  cartId,
  variantId,
  quantity = 1,
}: AddToCartProps) => {
  const mutation = `
   mutation addCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id
      lines(first: 10){
        edges
        {
          node{
            quantity
            merchandise{
              ... on ProductVariant {
                id
              }
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
      }
    }
    
    
    userErrors {
      field
      message
    }
  }
}
  `

  const requestPayload = {
    variables: {
      cartId,
      lines: [
        {
          merchandiseId: variantId,
          quantity,
        },
      ],
    },
  }

  const { data, errors } = await shopify.request(mutation, requestPayload)
  console.log('errors', errors)

  return data.cartLinesAdd.cart
}

export const getCart = async (cartId: string) => {
  if (!cartId) {
    throw new Error('Cart ID is required to fetch the cart.')
  }

  const query = `
    query cartQuery($cartId: ID!) {
      cart(id: $cartId) {
        id
        createdAt
        updatedAt
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              cost {
                amountPerQuantity {
                  amount
                  currencyCode
                }
                totalAmount {
                  amount
                  currencyCode
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                  }
                }
              }
            }
          }
        }
        attributes {
          key
          value
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
          totalDutyAmount {
            amount
            currencyCode
          }
        }
        buyerIdentity {
          email
          phone
          customer {
            id
          }
          countryCode
        }
      }
    }
  `

  const requestPayload = {
    variables: {
      cartId,
    },
  }

  const { data, errors } = await shopify.request(query, requestPayload)

  console.log('errors', errors)
  console.log('data.cart.lines.edges.length', data.cart.lines.edges.length)

  return {
    id: data.cart.id,
    checkoutUrl: data.cart.checkoutUrl,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: data.cart.lines.edges.map((line: any) => ({
      id: line.node.id,
      quantity: line.node.quantity,
      pricePerItem: line.node.cost.amountPerQuantity.amount,
      totalPrice: line.node.cost.totalAmount.amount,
      currencyCode: line.node.cost.amountPerQuantity.currencyCode,
      variantId: line.node.merchandise.id,
      title: line.node.merchandise.title,
      productTitle: line.node.merchandise.product.title,
    })),
  }
}