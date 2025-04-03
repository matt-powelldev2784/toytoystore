import { shopify } from '@/lib/shopify'
import { getAllProducts } from '@/lib/shopifyQueries'
import { Product } from '@/lib/types'

const getProducts = async (): Promise<Product[]> => {
  const { data } = await shopify.request(getAllProducts)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.products.edges.map((product: any) => ({
    id: product.node.id,
    title: product.node.title,
    description: product.node.description,
    handle: product.node.handle,
    image: product.node.images.edges[0]?.node.src || null,
  }))
}

  export default async function Home() {
    const products = await getProducts()

    console.log('products', products)
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          test
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
      </div>
    )
  }
