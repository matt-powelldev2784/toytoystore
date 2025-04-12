/* eslint-disable @next/next/no-img-element */
'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

type EnterStoreButtonProps = {
  onClick?: () => Promise<void>
  href?: string
  text: string
  disabled?: boolean
}

export default function ServerButton({
  onClick,
  href,
  text,
  disabled,
}: EnterStoreButtonProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleClick = () => {
    startTransition(async () => {
      if (onClick) return await onClick()
      if (href) router.push(href)
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isPending}
      className={`bg-red-500 rounded p-2 text-white mt-8 w-[200px] ${disabled ? 'opacity-50' : ''}`}
    >
      {isPending ? (
        <img
          src="loading_red.svg"
          alt="loading"
          className="w-4 h-4 animate-spin flex justify-center items-center mx-auto"
        />
      ) : (
        <p>{text}</p>
      )}
    </button>
  )
}
