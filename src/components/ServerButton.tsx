/* eslint-disable @next/next/no-img-element */
'use client'

import { useFormStatus } from 'react-dom'

type EnterStoreButtonProps = {
  text: string
  disabled?: boolean
}

export default function ServerButton({
  text,
  disabled,
}: EnterStoreButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={disabled || pending}
      className={`bg-red-500 rounded p-2 text-white mt-8 w-full sm:w-44 h-10 cursor-pointer ${disabled ? 'opacity-50' : ''}`}
    >
      {pending ? (
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
