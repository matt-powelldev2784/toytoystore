import { sanity } from '@/lib/sanity'
import { SanityDocument } from 'next-sanity'

import Link from 'next/link'
import React from 'react'


// get promo information from Sanity
const PROMO_QUERY = `*[_type == "promo"]{ _id, image,promoMessage,companyName}`
const options = { next: { revalidate: 30 } }

export default async function Header() {
  const promo = await sanity.fetch<SanityDocument[]>(PROMO_QUERY, {}, options)
  const promoInfo = promo[0]

  return (
    <header className="sticky top-0 flex flex-row items-center justify-between p-4 sm:p-6 h-10 sm:h-14 bg-red-500 z-1100">
      <Link href="/" className="flex items-center">
        <img
          src="toyshop_logo.svg"
          alt="Checkout"
          className="w-7 h-7 sm:w-10 sm:h-10 mr-2"
        />

        <h1 className="text-xl sm:text-3xl font-bold text-white">
          {promoInfo.companyName}
        </h1>
      </Link>
    </header>
  )
}
