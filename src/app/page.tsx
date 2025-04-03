import { shopify } from '@/lib/shopify'
import { getAllProducts } from '@/lib/shopifyQueries'
import { Product } from '@/lib/types'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { type SanityDocument } from 'next-sanity'
import { sanity } from '@/lib/sanity'
import Image from 'next/image'
import blurImage from '@/assets/blur.jpg'

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
  }))
}

// get promo information from Sanity
const PROMO_QUERY = `*[_type == "promo"]{ _id, image,promoMessage,companyName}`
const options = { next: { revalidate: 30 } }
const { projectId, dataset } = sanity.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

export default async function Home() {
  const products = await getProducts()
  const promo = await sanity.fetch<SanityDocument[]>(PROMO_QUERY, {}, options)
  const promoInfo = promo[0]

  const promoImageUrl = promoInfo.image ? urlFor(promoInfo.image)?.url() : null

  return (
    <main className="relative min-w-screen min-h-screen">
      <Image
        src={promoImageUrl || blurImage}
        alt={promoInfo.promoMessage || 'Promo image'}
        width={550}
        height={330}
        className="absolute right-0"
      />

      <div className="relative z-10 text-left text-black p-8">
        <h1 className="text-4xl font-bold mb-8">{promoInfo.companyName}</h1>
        <p className="text-lg">{promoInfo.promoMessage}</p>
      </div>
    </main>
  )
}

