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
    <section className="flex flex-col items-center justify-start min-h-screen">
      <article className="relative max-h-[700px] overflow-clip border-3 border-red-500">
        <form
          action={initializeCart}
          className="absolute top-1/2 right-6 transform -translate-y-1/2 flex flex-col items-center justify-center w-2/3 border-2 border-blue-500 px-4"
        >
          <h1 className="text-[#2265cc] font-bold text-4xl">
            20% off all cuddly toys
          </h1>
          <p className="text-white text-lg mt-2">
            Use code <span className="font-bold">CUDDLY20</span> at checkout
          </p>

          <ServerButton
            text="Shop Now"
            variant="red"
            className="sm:max-w-[320px] width-[320px] bg-red-500 sm:bg-blue-500 md-bg-green-500 lg:bg-yellow-500"
          />

          <p className="text-white text-lg mb-4 max-w-[500px] text-justify mt-4">
            At Toy Toy Shop, we believe every child deserves the perfect cuddly
            friend. Our carefully selected collection features ultra-soft plush
            toys, adorable stuffed animals, and huggable companions made from
            the finest materials. From classic teddy bears to whimsical
            creatures, each toy is chosen for its exceptional quality, safety,
            and ability to spark imagination. Whether you are looking for a
            bedtime buddy, a comforting friend, or the perfect gift, we have
            something special waiting for you.
          </p>
        </form>

        {promoInfo.image && (
          <img
            src={urlFor(promoInfo.image).url()}
            alt={promoInfo.companyName}
            className="object-cover object-center border-2 border-green-500"
          />
        )}
      </article>

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
