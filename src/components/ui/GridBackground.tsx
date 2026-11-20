
import { cn } from '@/lib/utils'

interface GridBackgroundProps {
  className?: string
  /** Grid cell size in pixels. Default: 40 */
  cellSize?: number
  /** Dot opacity (0–1). Default: 0.07 */
  opacity?: number
}

export default function GridBackground({
  className = '',
  cellSize = 40,
  opacity = 0.07,
}: GridBackgroundProps) {
  const safeCellSize =
    Number.isFinite(cellSize) && cellSize > 0 ? cellSize : 40

  const safeOpacity =
    Number.isFinite(opacity)
      ? Math.min(1, Math.max(0, opacity))
      : 0.07

  return (
    <div
      aria-hidden="true"
      className={cn(
        'absolute inset-0 pointer-events-none select-none',
        className
      )}
      style={{
        backgroundImage: `radial-gradient(circle, rgba(114,255,117,${safeOpacity}) 1px, transparent 1px)`,
        backgroundSize: `${safeCellSize}px ${safeCellSize}px`,
        backgroundRepeat: 'repeat',
      }}
    />
  )
}
