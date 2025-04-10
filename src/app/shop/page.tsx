import { getCart, getProducts } from '@/lib/shopifyQueries'
import ProductCard from '@/components/productCard'
import { getCartIdFromCookie } from '@/lib/cartCookie'
import { redirect } from 'next/navigation'

const getCartId = async () => {
  const cartId = await getCartIdFromCookie()
  return cartId
}

export default async function ShopPage() {
  const products = await getProducts()
  const cartId = await getCartId()
  if (!cartId) redirect('/')
  const cart = await getCart(cartId)

  console.log('cart', cart)

  // console.log('products', products)

  return (
    <main className="relative min-w-screen min-h-screen">
      <div className="relative z-10 text-left text-black p-8">
        <h2 className="text-4xl font-bold mb-8">Products</h2>
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
