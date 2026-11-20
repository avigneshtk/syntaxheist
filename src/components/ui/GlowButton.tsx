// GlowButton — primary CTA button for SyntaxHeist.
// Renders as <Link> when href is provided, otherwise as <button>.
// Supports 'primary' (filled) and 'outline' variants, and sm/md/lg sizes.

import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ButtonVariant, ButtonSize } from '@/lib/types'

// ─── Prop types with discriminated union ────────────────────────────────────

interface BaseProps {
  children:   React.ReactNode
  variant?:   ButtonVariant
  size?:      ButtonSize
  className?: string
}

interface AsLinkProps extends BaseProps {
  href:      string
  onClick?:  React.MouseEventHandler<HTMLAnchorElement>
  disabled?: never
  type?:     never
}

interface AsButtonProps extends BaseProps {
  href?:     never
  onClick?:  React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  type?:     'button' | 'submit' | 'reset'
}

type GlowButtonProps = AsLinkProps | AsButtonProps

// ─── Style maps ──────────────────────────────────────────────────────────────

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary !text-[#080b08] font-bold ' +
    'hover:bg-white hover:!text-[#080b08] hover:shadow-[0_0_28px_rgba(114,255,117,0.45)] ' +
    'active:scale-[0.98]',
  outline:
    'bg-transparent text-primary border border-primary/60 font-semibold ' +
    'hover:border-primary hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_20px_rgba(114,255,117,0.22)] ' +
    'active:scale-[0.98]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-10 px-4 py-2 text-xs tracking-widest',
  md: 'min-h-11 px-6 py-3 text-sm tracking-widest',
  lg: 'min-h-12 px-8 py-4 text-sm tracking-widest',
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function GlowButton({
  children,
  variant  = 'primary',
  size     = 'md',
  className = '',
  href,
  onClick,
  disabled,
  type = 'button',
}: GlowButtonProps) {
  const classes = cn(
    // Base
    'inline-flex items-center justify-center gap-2',
    'rounded-sm uppercase font-mono leading-tight text-center',
    'transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base',
    // Variant + size
    variantClasses[variant],
    sizeClasses[size],
    // Disabled state (button only)
    disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
    className,
  )

  if (href !== undefined) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  )
}
