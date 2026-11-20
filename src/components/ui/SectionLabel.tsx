
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: ReactNode
  className?: string
  as?: 'p' | 'span' | 'div'
}

export default function SectionLabel({
  children,
  className = '',
  as: Tag = 'p',
}: SectionLabelProps) {
  return (
    <Tag
      className={cn(
        'text-primary font-mono text-xs tracking-[0.3em] uppercase',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
