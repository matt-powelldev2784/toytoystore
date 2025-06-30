import { sanity, urlFor } from '@/lib/sanity'
import { SanityDocument } from 'next-sanity'
import { initializeCart } from '@/lib/actions'

// get top category information from Sanity
const TOP_CATEGORIES_QUERY = `*[_type == "topCategories"]{ _id, image,title,description,"backgroundColor": backgroundColor.hex } | order(_createdAt desc)[0...4]`
const options = { next: { revalidate: 30 } }

export default async function TopCategories() {
  const topCategories = await sanity.fetch<SanityDocument[]>(
    TOP_CATEGORIES_QUERY,
    {},
    options
  )

  return (
    <section className="py-8 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our carefully curated collections of premium plush toys
          </p>
        </div>

        <form
          action={initializeCart}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {topCategories?.map((category) => (
            <button key={category._id} className="cursor-pointer">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div
                  className={`relative h-52 flex items-center justify-center`}
                  style={{ backgroundColor: category.backgroundColor }}
                >
                  <img
                    src={urlFor(category.image).url()}
                    alt={category.title}
                    className="h-52"
                  />
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {category?.title && category.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </form>
      </div>
    </section>
  )
}
