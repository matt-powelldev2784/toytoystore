/* eslint-disable @next/next/no-img-element */
import { type SanityDocument } from 'next-sanity'
import { sanity, urlFor } from '@/lib/sanity'
import ServerButton from '@/components/ServerButton'
import { initializeCart } from '@/lib/actions'

// get promo information from Sanity
const PROMO_QUERY = `*[_type == "promo"]{ _id, image,promoMessage,companyName}`
const options = { next: { revalidate: 30 } }

export default async function Home() {
  const promo = await sanity.fetch<SanityDocument[]>(PROMO_QUERY, {}, options)
  const promoInfo = promo[0]

  return (
    <section className="flex flex-col items-center justify-center p-8 h-full">
      {promoInfo.image && (
        <img
          src={urlFor(promoInfo.image).width(200).url()}
          alt={promoInfo.companyName}
        />
      )}

      <h1 className="text-4xl font-bold mb-8">{promoInfo.companyName}</h1>
      <p className="text-lg">{promoInfo.promoMessage}</p>

      <form action={initializeCart}>
        <ServerButton text="Enter Store" />
      </form>
    </section>
  )
}
