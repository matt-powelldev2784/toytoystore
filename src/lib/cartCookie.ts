'use server'

import { cookies } from 'next/headers'

export const setCartIdCookie = async (cartId: string) => {
  const cookieStore = await cookies()
  cookieStore.set({
    name: 'cartId',
    value: cartId,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
}

export const getCartIdFromCookie = async (): Promise<string | undefined> => {
  const cookieStore = await cookies()
  return cookieStore.get('cartId')?.value
}

export const deleteCartIdCookie = async () => {
  const cookieStore = await cookies()
  cookieStore.delete('cartId')
}
