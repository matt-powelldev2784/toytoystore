/* eslint-disable @next/next/no-img-element */
import { getCartIdFromCookie } from '@/lib/cartCookie'
import { sanity } from '@/lib/sanity'
import { getCart } from '@/lib/shopifyQueries'
import { SanityDocument } from 'next-sanity'
import Link from 'next/link'
import React from 'react'

//get cart id from Shopify
const getCartDetails = async () => {
  const cartId = await getCartIdFromCookie()
  if (!cartId) return null
  const cart = await getCart(cartId)
  return cart
}

// get promo information from Sanity
const PROMO_QUERY = `*[_type == "promo"]{ _id, image,promoMessage,companyName}`
const options = { next: { revalidate: 30 } }

export default async function Header() {
  const promo = await sanity.fetch<SanityDocument[]>(PROMO_QUERY, {}, options)
  const promoInfo = promo[0]
  const cart = await getCartDetails()

  return (
    <header className="flex flex-row items-center justify-between p-4 sm:p-6 h-10 sm:h-14 bg-red-500">
      <h1 className="text-xl sm:text-3xl font-bold text-white">
        {promoInfo.companyName}
      </h1>

      {cart && (
        <Link href={cart.checkoutUrl}>
          <img
            src="cart_white.svg"
            alt="Checkout"
            className="w-7 h-7 sm:w-10 sm:h-10"
          />
        </Link>
      )}
    </header>
  )
}
