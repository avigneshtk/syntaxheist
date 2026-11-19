// GridBackground — subtle dot-grid overlay for section backgrounds.
// Pure CSS, zero JS. aria-hidden so it's invisible to assistive tech.
// Place as the first child of a relatively-positioned container.

import { cn } from '@/lib/utils'

interface GridBackgroundProps {
  className?: string
  /** Grid cell size in pixels. Default: 40 */
  cellSize?: number
  /** Dot opacity (0–1). Default: 0.07 */
  opacity?: number
}

export default function GridBackground({
  className  = '',
  cellSize   = 40,
  opacity    = 0.07,
}: GridBackgroundProps) {
  const dotColor = `rgba(114,255,117,${opacity})`

  return (
    <div
      aria-hidden="true"
      className={cn('absolute inset-0 pointer-events-none select-none', className)}
      style={{
        backgroundImage:  `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
        backgroundSize:   `${cellSize}px ${cellSize}px`,
        backgroundRepeat: 'repeat',
      }}
    />
  )
}
