// SectionLabel — small green uppercase eyebrow label above section headings.
// Use to orient the reader before each major section.

import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children:   React.ReactNode
  className?: string
  as?:        'p' | 'span' | 'div'
}

export default function SectionLabel({
  children,
  className = '',
  as: Tag   = 'p',
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
