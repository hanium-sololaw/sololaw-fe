import { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className={cn('relative rounded-xl bg-white p-6 shadow-xl', className)}>
        {children}
      </div>
    </div>
  )
}
