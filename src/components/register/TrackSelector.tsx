
'use client'

// ─────────────────────────────────────────────────────────────────────────────
// TrackSelector — Innovation Track Selection Grid
// Sourced strictly from the TRACKS constant in src/lib/constants.ts.
// Includes accessible keyboard navigation.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from 'react'
import type { KeyboardEvent } from 'react'
import { TRACKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface TrackSelectorProps {
  selectedTrackId: string
  onChange: (trackId: string) => void
  error?: string
}

export default function TrackSelector({
  selectedTrackId,
  onChange,
  error,
}: TrackSelectorProps) {
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])

  const selectedIndex = TRACKS.findIndex(
    (track) => track.id === selectedTrackId
  )

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number
  ) => {
    if (TRACKS.length === 0) return

    let nextIndex = currentIndex

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (currentIndex + 1) % TRACKS.length
        break

      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (currentIndex - 1 + TRACKS.length) % TRACKS.length
        break

      case 'Home':
        nextIndex = 0
        break

      case 'End':
        nextIndex = TRACKS.length - 1
        break

      default:
        return
    }

    event.preventDefault()
    onChange(TRACKS[nextIndex].id)
    optionRefs.current[nextIndex]?.focus()
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span
          id="track-selector-label"
          className="text-xs font-mono tracking-wider uppercase text-white/90 flex items-center gap-1"
        >
          Preferred Track <span className="text-primary">*</span>
        </span>

        <span className="text-[10px] font-mono text-muted/60 uppercase">
          Choose 1 of {TRACKS.length} Tracks
        </span>
      </div>

      <div
        role="radiogroup"
        aria-labelledby="track-selector-label"
        aria-describedby={error ? 'track-selector-error' : undefined}
        aria-required="true"
        aria-invalid={Boolean(error)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      >
        {TRACKS.map((track, index) => {
          const isSelected = selectedTrackId === track.id

          const isTabStop =
            isSelected || (selectedIndex === -1 && index === 0)

          return (
            <button
              key={track.id}
              ref={(element) => {
                optionRefs.current[index] = element
              }}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={isTabStop ? 0 : -1}
              onClick={() => onChange(track.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                'relative text-left p-3.5 rounded-sm border transition-all duration-200',
                'flex flex-col justify-between gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                isSelected
                  ? 'bg-primary/[0.08] border-primary shadow-[0_0_15px_rgba(114,255,117,0.18)]'
                  : 'bg-[#090e09] border-white/10 hover:border-primary/40 hover:bg-[#0c120c]'
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-primary text-base select-none font-mono">
                      {track.symbol}
                    </span>

                    <span className="font-mono text-xs font-bold tracking-wide text-white group-hover:text-primary transition-colors">
                      {track.name}
                    </span>
                  </div>

                  <div
                    aria-hidden="true"
                    className={cn(
                      'w-4 h-4 rounded-full border flex items-center justify-center transition-colors',
                      isSelected
                        ? 'border-primary bg-primary text-[#080b08]'
                        : 'border-white/20 group-hover:border-primary/50'
                    )}
                  >
                    {isSelected && <Check size={11} strokeWidth={3} />}
                  </div>
                </div>

                <p className="text-[11px] text-muted leading-relaxed line-clamp-2">
                  {track.description}
                </p>
              </div>

              {track.tags && (
                <div className="flex flex-wrap gap-1 pt-1 border-t border-white/5">
                  {track.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-muted/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {error && (
        <p
          id="track-selector-error"
          role="alert"
          className="text-xs font-mono text-[#ff5f56] flex items-center gap-1.5 pt-1"
        >
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      )}
    </div>
  )
}
