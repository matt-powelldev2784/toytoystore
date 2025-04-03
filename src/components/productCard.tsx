import Image from 'next/image'

type ProductCardProps = {
  title: string
  description: string
  image: string | null
  handle: string
  price: string
}

export default function ProductCard({
  title,
  description,
  image,
  handle,
  price,
}: ProductCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative w-full h-64">
        {image ? (
          <Image src={image} alt={title} fill />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 truncate">{title}</h2>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>
        <p className="text-sm text-gray-800 font-semibold mt-2">
          £ {Number(price).toFixed(2)}
        </p>
        <a
          href={`/products/${handle}`}
          className="inline-block mt-4 px-4 py-2 bg-zinc-600 text-white text-sm font-medium rounded hover:bg-zinc-700 transition-colors"
        >
          Add to cart
        </a>
      </div>
    </div>
  )
}
