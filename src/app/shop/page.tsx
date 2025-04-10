import { getCart, getProducts } from '@/lib/shopifyQueries'
import ProductCard from '@/components/productCard'
import { getCartIdFromCookie } from '@/lib/cartCookie'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const getCartId = async () => {
  const cartId = await getCartIdFromCookie()
  return cartId
}

export default async function ShopPage() {
  const products = await getProducts()
  const cartId = await getCartId()
  if (!cartId) redirect('/')
  const cart = await getCart(cartId)


  return (
    <section className="relative min-w-screen min-h-screen mb-24">
      <div className="relative z-10 text-left text-black p-8">
        <h2 className="text-4xl font-bold">Products</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8 px-4 sm:px-12">
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

      <div className="w-full flex flex-col items-center justify-center">
        <Link
          href={cart.checkoutUrl}
          className="bg-red-500 rounded p-2 text-white mt-4 md:mt-8 "
        >
          Checkout
        </Link>
      </div>
    </section>
  )
}
