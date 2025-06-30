import { type SanityDocument } from 'next-sanity'
import { sanity, urlFor } from '@/lib/sanity'
import ServerButton from '@/components/ServerButton'
import { initializeCart } from '@/lib/actions'
import TopCategories from '@/components/topCategories'

// get promo information from Sanity
const PROMO_QUERY = `*[_type == "promo"]{ _id, image,promoMessage,companyName}`
const options = { next: { revalidate: 30 } }

export default async function Home() {
  const promo = await sanity.fetch<SanityDocument[]>(PROMO_QUERY, {}, options)
  const promoInfo = promo[0]

  return (
    <section className="flex flex-col items-center justify-start min-h-screen">
      <article className="relative h-full w-full overflow-clip">
        {promoInfo.image && (
          <img
            src={urlFor(promoInfo.image).url()}
            alt={promoInfo.companyName}
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

      <TopCategories />

      <div className="">
        <img
          src="toyshop_logo.svg"
          alt="teddy bear icon"
          className="h-20 mr-2 mb-2 bg-red-500 w-full p-4"
        />

        <h2 className="text-lg font-semibold mt-6 text-center">
          Welcome to the Toy Toy Shop!
        </h2>
        <p className="text-md mb-4 max-w-[800px] text-justify px-4 ht-12">
          The Toy Toy Shop is passionate about to creating magical moments
          through the softest, safest, and most lovable plush toys. Every toy in
          our collection is hand-picked for its exceptional quality and ability
          to become a cherished companion.
        </p>
      </div>
    </section>
  )
}
