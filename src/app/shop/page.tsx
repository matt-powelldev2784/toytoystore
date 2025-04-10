/* eslint-disable @next/next/no-img-element */
import { getCart, getProducts } from '@/lib/shopifyQueries'
import { type SanityDocument } from 'next-sanity'
import { sanity } from '@/lib/sanity'
import ProductCard from '@/components/productCard'
import { getCartIdFromCookie } from '@/lib/cartCookie'
import { redirect } from 'next/navigation'
import Link from 'next/link'

// get promo information from Sanity
const PROMO_QUERY = `*[_type == "promo"]{ _id, image,promoMessage,companyName}`
const options = { next: { revalidate: 30 } }

const getCartId = async () => {
  const cartId = await getCartIdFromCookie()
  return cartId
}

export default async function ShopPage() {
  const products = await getProducts()
  const promo = await sanity.fetch<SanityDocument[]>(PROMO_QUERY, {}, options)
  const promoInfo = promo[0]
  const cartId = await getCartId()
  if (!cartId) redirect('/')
  const cart = await getCart(cartId)

  console.log('cart', cart)

  // console.log('products', products)

  return (
    <main className="relative min-w-screen min-h-screen">
      <Link
        href={cart.checkoutUrl}
        className="absolute top-4 right-4 w-12 h-12  cursor-pointer z-50"
      >
        <img src="/cart_green.svg" alt="Checkout" className="w-12 h-12" />
      </Link>

      <div className="relative z-10 text-left text-black p-8">
        <h1 className="text-4xl font-bold mb-8">{promoInfo.companyName}</h1>
        <p className="text-lg">{promoInfo.promoMessage}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <ProductCard
            key={product.variantId}
            variantId={product.variantId}
            title={product.title}
            description={product.description}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
    </main>
  )
}
