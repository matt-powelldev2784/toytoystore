'use server'

import { revalidatePath } from 'next/cache'
import { addToCart, createCart } from './shopifyQueries'
import { setCartIdCookie } from './cartCookie'
import { redirect } from 'next/navigation'

export const handleAddToCart = async (formData: FormData) => {
  const cartId = formData.get('cartId') as string
  const variantId = formData.get('variantId') as string

  try {
    await addToCart({
      cartId,
      variantId,
      quantity: 1,
    })

    revalidatePath('/shop') // Revalidate the shop page to reflect changes
  } catch (error) {
    console.error('Error adding cart item', error)
  }
}

export const initializeCart = async () => {
  const cart = await createCart()
  await setCartIdCookie(cart.id)
  redirect('/shop')
}
