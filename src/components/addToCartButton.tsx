/* eslint-disable @next/next/no-img-element */
'use client'

import { useFormStatus } from 'react-dom'

export default function AddToCartButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex cursor-pointer justify-center mt-4 px-4 py-2 text-white text-sm font-medium rounded bg-zinc-600 hover:bg-zinc-700 w-full`}
    >
      {pending ? (
        <img src="loading.svg" alt="loading" className="w-4 h-4 animate-spin" />
      ) : (
        'Add to cart'
      )}
    </button>
  )
}
