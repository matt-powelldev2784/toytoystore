import { getCartIdFromCookie } from '@/lib/cartCookie'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Product } from '@/lib/types'
import { handleAddToCart } from '@/lib/actions'
import ServerButton from './ServerButton'

export default async function ProductCard({
  variantId,
  title,
  description,
  image,
  price,
}: Product) {
  const cartId = await getCartIdFromCookie()
  if (!cartId) redirect('/')

  return (
    <article className="bg-zinc-100 rounded-lg overflow-hidden p-4">
      <div className="relative w-full h-48">
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

        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        <p className="text-sm text-gray-800 font-semibold">
          £ {Number(price).toFixed(2)}
        </p>

        <form action={handleAddToCart}>
          <input type="hidden" name="cartId" value={cartId} />
          <input type="hidden" name="variantId" value={variantId} />
          <ServerButton text={'Add to Cart'} variant="grey" />
        </form>
      </div>
    </article>
  )
}
