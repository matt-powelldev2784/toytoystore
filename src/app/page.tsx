import Hero from '@/components/hero'
import TopCategories from '@/components/topCategories'

export default async function Home() {
  return (
    <section className="flex flex-col items-center justify-start min-h-screen">
      <Hero />
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
