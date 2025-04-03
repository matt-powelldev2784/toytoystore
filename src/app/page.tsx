import { shopify } from '@/lib/shopify'

export default async function Home() {
  const getProducts = async () => {
    const productQuery = `
  query getAllProducts {
    products(first: 100) {
      edges {
        node {
          id
          title
          description
          handle
          images(first: 1) {
            edges {
              node {
                src
                altText
              }
            }
          }
        }
      }
    }
  }
`

    const { data } = await shopify.request(productQuery, {
      variables: {
        handle: 'sample-product',
      },
    })
    console.log('data', data)

    return data.products.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      description: edge.node.description,
      handle: edge.node.handle,
      image: edge.node.images.edges[0]?.node.src || null,
    }))
  }

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
