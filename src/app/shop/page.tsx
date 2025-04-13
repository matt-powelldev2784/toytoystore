/* eslint-disable @next/next/no-img-element */
import { getCart, getProducts } from '@/lib/shopifyQueries'
import ProductCard from '@/components/productCard'
import { getCartIdFromCookie } from '@/lib/cartCookie'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CartItem } from '@/lib/types'
import ServerButton from '@/components/ServerButton'
import { navigateToCheckout } from '@/lib/actions'

const getCartId = async () => {
  const cartId = await getCartIdFromCookie()
  return cartId
}

export default async function ShopPage() {
  const products = await getProducts()

  const cartId = await getCartId()
  if (!cartId) redirect('/')

  const cart = await getCart(cartId)
  if (cart.error) redirect('/')

  const numberOfCartItems = cart.items.reduce((acc: number, item: CartItem) => {
    return acc + item.quantity
  }, 0)

  return (
    <section className="min-w-screen min-h-screen mb-24">
      <div className="relative z-10 text-left text-black p-8">
        <h2 className="text-4xl font-bold">Products</h2>
      </div>

      {numberOfCartItems > 0 && (
        <Link
          href={cart.checkoutUrl}
          className="absolute top-0 right-4 z-30 flex items-center justify-center h-10 sm:h-14"
        >
          <p className="p-2 text-white font-bold text-2xl">
            {numberOfCartItems}
          </p>
          <img
            src="cart_white.svg"
            alt="Checkout Icon"
            className="w-7 h-7 sm:w-10 sm:h-10"
          />
        </Link>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8 px-4 sm:px-12">
        {products.map((product) => (
          <ProductCard key={product.variantId} {...product} />
        ))}
      </div>

      <form
        action={navigateToCheckout}
        className="w-full flex flex-col items-center justify-center px-4"
      >
        <input type="hidden" name="checkoutUrl" value={cart.checkoutUrl} />

        <ServerButton text="Checkout" disabled={numberOfCartItems === 0} />

        <p className="text-zinc-600 text-sm mt-2 text-center">
          Password to test shop:
        </p>
        <p className="text-zinc-600 text-sm text-center">toyshop</p>
      </form>
    </section>
  )
}
