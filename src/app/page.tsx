import { type SanityDocument } from 'next-sanity'
import { sanity } from '@/lib/sanity'
import { createCart } from '@/lib/shopifyQueries'
import { setCartIdCookie } from '@/lib/cartCookie'
import { redirect } from 'next/navigation'

const addCartCookie = async () => {
  'use server'
  const cart = await createCart()
  const cartId = cart.id.split('?')[0]
  await setCartIdCookie(cartId)
  redirect('/shop')
}

// get promo information from Sanity
const PROMO_QUERY = `*[_type == "promo"]{ _id, image,promoMessage,companyName}`
const options = { next: { revalidate: 30 } }

export default async function Home() {
  const promo = await sanity.fetch<SanityDocument[]>(PROMO_QUERY, {}, options)
  const promoInfo = promo[0]

  return (
    <main className="flex flex-col items-center justify-center bg-gray-100 p-8  h-screen">
      <h1 className="text-4xl font-bold mb-8">{promoInfo.companyName}</h1>
      <p className="text-lg">{promoInfo.promoMessage}</p>
      <form action={addCartCookie}>
        <button
          type="submit"
          className="bg-red-500 rounded p-2 text-white mt-8"
        >
          Enter Store
        </button>
      </form>
    </main>
  )
}
