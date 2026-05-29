import { cn } from '@/shared/utils/cn'

interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-12 text-base',
}

export function Avatar({ src, alt, name, size = 'md', className }: AvatarProps) {
  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-gray-200 font-medium text-gray-600',
        sizeMap[size],
        className,
      )}
    >
      {src ? (
        <img src={src} alt={alt ?? name} className="size-full rounded-full object-cover" />
      ) : (
        initials
      )}
    </div>
  )
}
