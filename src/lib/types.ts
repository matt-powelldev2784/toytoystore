export type Product = {
  productId: string
  variantId: string
  title: string
  description: string
  handle: string
  image: string | null
  price: string
}

export type CartItem = {
  id: string
  variantId: string
  title: string
  price: string
  quantity: number
  image?: string | null
}