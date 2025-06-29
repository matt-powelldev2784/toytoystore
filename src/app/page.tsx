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
    <section className="flex flex-col items-center justify-center h-full">
      {promoInfo.image && (
        <img
          src={urlFor(promoInfo.image).width(200).url()}
          alt={promoInfo.companyName}
          className="mt-8"
        />
      )}

      <h1 className="text-4xl font-bold mb-8 text-center px-4">
        {promoInfo.companyName}
      </h1>
      <p className="text-lg text-center">{promoInfo.promoMessage}</p>

      <form
        action={initializeCart}
        className="w-full flex flex-col items-center justify-center mt-4 px-4"
      >
        <ServerButton
          text="Enter Store"
          variant="red"
          className="sm:max-w-[320px]"
        />
      </form>
    </section>
  )
}
