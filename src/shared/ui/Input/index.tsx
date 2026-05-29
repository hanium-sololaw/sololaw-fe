import { InputHTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none',
        'focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
        className,
      )}
      {...props}
    />
  )
}
