import { shopify } from '@/lib/shopify'
import { createCart, getAllProducts } from '@/lib/shopifyQueries'
import { Product } from '@/lib/types'
import { type SanityDocument } from 'next-sanity'
import { sanity } from '@/lib/sanity'

// get products from Shopify
const getProducts = async (): Promise<Product[]> => {
  const { data } = await shopify.request(getAllProducts)

  console.log('data', data)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.products.edges.map((product: any) => ({
    id: product.node.id,
    title: product.node.title,
    description: product.node.description,
    image: product.node.images.edges[0]?.node.src || null,
    price: product.node.priceRange.minVariantPrice.amount,
  }))
}

// get promo information from Sanity
const PROMO_QUERY = `*[_type == "promo"]{ _id, image,promoMessage,companyName}`
const options = { next: { revalidate: 30 } }

export default async function Home() {
  const cart = await createCart()
  const products = await getProducts()
  const promo = await sanity.fetch<SanityDocument[]>(PROMO_QUERY, {}, options)
  const promoInfo = promo[0]

  console.log('cart', cart)

  console.log('products', products)

  return (
    <main className="flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">{promoInfo.companyName}</h1>
      <p className="text-lg">{promoInfo.promoMessage}</p>
      <a
        href={`/shop?cartId=${cart.id}`}
        className="bg-red-500 rounded p-2 text-white mt-8"
      >
        Enter Store
      </a>
    </main>
  )
}



