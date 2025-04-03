import { shopify } from '@/lib/shopify'
import { getAllProducts } from '@/lib/shopifyQueries'
import { Product } from '@/lib/types'
import { type SanityDocument } from 'next-sanity'
import { sanity } from '@/lib/sanity'
import ProductCard from '@/components/productCard'

// get products from Shopify
const getProducts = async (): Promise<Product[]> => {
  const { data } = await shopify.request(getAllProducts)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.products.edges.map((product: any) => ({
    id: product.node.id,
    title: product.node.title,
    description: product.node.description,
    handle: product.node.handle,
    image: product.node.images.edges[0]?.node.src || null,
    price: product.node.priceRange.minVariantPrice.amount,
  }))
}

// get promo information from Sanity
const PROMO_QUERY = `*[_type == "promo"]{ _id, image,promoMessage,companyName}`
const options = { next: { revalidate: 30 } }

export default async function Home() {
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
            key={product.id}
            title={product.title}
            description={product.description}
            image={product.image}
            handle={product.handle}
            price={product.price}
          />
        ))}
      </div>
    </main>
  )
}



