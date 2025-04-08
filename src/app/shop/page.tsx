import { getProducts } from '@/lib/shopifyQueries'
import { type SanityDocument } from 'next-sanity'
import { sanity } from '@/lib/sanity'
import ProductCard from '@/components/productCard'

// get promo information from Sanity
const PROMO_QUERY = `*[_type == "promo"]{ _id, image,promoMessage,companyName}`
const options = { next: { revalidate: 30 } }

type ShopPageProps = { searchParams: { cartId: string } }

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const cartId = searchParams.cartId
  const products = await getProducts()
  const promo = await sanity.fetch<SanityDocument[]>(PROMO_QUERY, {}, options)
  const promoInfo = promo[0]

  console.log('products', products)

  return (
    <main className="relative min-w-screen min-h-screen">
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
            cartId={cartId}
          />
        ))}
      </div>
    </main>
  )
}
