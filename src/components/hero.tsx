import { type SanityDocument } from 'next-sanity'
import { sanity, urlFor } from '@/lib/sanity'
import ServerButton from '@/components/ServerButton'
import { initializeCart } from '@/lib/actions'

// get promo image from Sanity
const PROMO_IMAGE_QUERY = `*[_type == "promo"]{ _id, image,promoMessage,companyName}`
const options = { next: { revalidate: 30 } }

export default async function Hero() {
  const promo = await sanity.fetch<SanityDocument[]>(
    PROMO_IMAGE_QUERY,
    {},
    options
  )
  const promoImage = promo[0]

  return (
    <article className="relative h-full w-full overflow-clip">
      {promoImage.image && (
        <img
          src={urlFor(promoImage.image).url()}
          alt={promoImage.companyName}
          className="object-cover object-center max-h-[370px] md:max-h-[600px]"
        />
      )}

      <div className="relative md:w-1/2 bg-pink-500 md:absolute right-0 top-0 h-full flex flex-col items-center justify-center px-4 p-8">
        <img
          src="toyshop_logo.svg"
          alt="teddy bear icon"
          className="w-12 h-12 mr-2 mb-2"
        />

        <h1 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl text-center">
          20% off all cuddly toys
        </h1>

        <p className="text-white text-center text-sm md:text-lg mt-2">
          Use code <span className="font-bold">CUDDLY20</span> at checkout
        </p>

        <form
          action={initializeCart}
          className="w-full flex flex-col items-center justify-center mt-4 px-4"
        >
          <ServerButton
            text="Shop Now"
            variant="grey"
            className="sm:max-w-[320px] mt-0"
          />
        </form>
      </div>
    </article>
  )
}
