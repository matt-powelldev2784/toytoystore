'use client'

import { useFormStatus } from 'react-dom'

const variants = {
  default: 'rounded p-2 text-white w-full h-10 cursor-pointer',
  red: 'bg-red-500',
  grey: 'bg-zinc-700 ',
  white: 'bg-white text-black',
}

type EnterStoreButtonProps = {
  text: string
  disabled?: boolean
  variant: keyof typeof variants
  className?: string
}

export default function ServerButton({
  text,
  disabled,
  variant,
  className,
}: EnterStoreButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={disabled || pending}
      className={`${variants.default} ${variants[variant]} ${className} ${disabled ? 'opacity-50' : ''}`}
    >
      {pending ? (
        <img
          src="/loading_white.svg"
          alt="loading"
          className="w-4 h-4 animate-spin flex justify-center items-center mx-auto"
        />
      ) : (
        <p className={`${variants[variant]}`}>{text}</p>
      )}
    </button>
  )
}
