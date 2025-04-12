/* eslint-disable @next/next/no-img-element */
'use client'

import { addToCart } from '@/lib/shopifyQueries'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type AddToCartButtonProps = {
  cartId: string
  variantId: string
}

export default function AddToCartButton({
  cartId,
  variantId,
}: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleAddToCart = async () => {
    if (loading) return
    setLoading(true)

    try {
      await addToCart({
        cartId,
        variantId,
        quantity: 1,
      })

      await fetch('/api/revalidate', {
        method: 'POST',
        body: JSON.stringify({ path: '/shop' }),
      })

      router.refresh()
    } catch (error) {
      console.error('Error adding cart item', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className={`flex justify-center mt-4 px-4 py-2 text-white text-sm font-medium rounded bg-zinc-600 hover:bg-zinc-700 w-full`}
    >
      {loading ? (
        <img src="loading.svg" alt="loading" className="w-4 h-4 animate-spin" />
      ) : (
        'Add to cart'
      )}
    </button>
  )
}
