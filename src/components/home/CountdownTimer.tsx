'use client'

// CountdownTimer — dynamic live countdown to the hackathon start.
// Target: 20 March 2027, 10:00 AM IST
// Client Component: uses useSyncExternalStore for timer subscription without effect cascading renders.
// Ensures safe hydration and synchronized time ticks.

import { useSyncExternalStore } from 'react'
import { getTimeRemaining, pad } from '@/lib/utils'
import { EVENT } from '@/lib/constants'

function subscribeTimer(callback: () => void) {
  const id = setInterval(callback, 1000)
  return () => clearInterval(id)
}

function getTimerSnapshot() {
  return Math.floor(Date.now() / 1000)
}

function getServerSnapshot() {
  return null
}

export default function CountdownTimer() {
  const currentTick = useSyncExternalStore(
    subscribeTimer,
    getTimerSnapshot,
    getServerSnapshot
  )

  const isMounted = currentTick !== null
  const time = isMounted
    ? getTimeRemaining(new Date(EVENT.date.targetIso))
    : { days: 0, hours: 0, minutes: 0, seconds: 0 }

  const timeBlocks = [
    { label: 'DAYS', value: isMounted ? pad(time.days) : '00' },
    { label: 'HOURS', value: isMounted ? pad(time.hours) : '00' },
    { label: 'MINUTES', value: isMounted ? pad(time.minutes) : '00' },
    { label: 'SECONDS', value: isMounted ? pad(time.seconds) : '00' },
  ]

  return (
    <div
      className="w-full max-w-3xl mx-auto my-6"
      aria-label="Hackathon countdown timer"
    >
      <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6">
        {timeBlocks.map((block, idx) => (
          <div key={block.label} className="flex items-center">
            {/* Number Card */}
            <div className="relative group">
              {/* Outer cyber glow border */}
              <div
                className="relative bg-surface/90 border border-primary/25 rounded-md
                           px-3 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 min-w-[70px] sm:min-w-[96px] md:min-w-[110px]
                           flex flex-col items-center justify-center
                           shadow-[0_4px_20px_rgba(0,0,0,0.6)]
                           transition-all duration-200 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(114,255,117,0.2)]"
              >
                {/* Subtle corner ticks */}
                <span className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-primary/40 pointer-events-none" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-primary/40 pointer-events-none" />
                <span className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-primary/40 pointer-events-none" />
                <span className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-primary/40 pointer-events-none" />

                {/* Digital Value */}
                <span className="text-2xl sm:text-4xl md:text-5xl font-mono font-black tracking-tight text-white group-hover:text-primary transition-colors">
                  {block.value}
                </span>

                {/* Metric Label */}
                <span className="text-[9px] sm:text-[11px] font-mono tracking-[0.2em] text-muted/80 mt-1 uppercase">
                  {block.label}
                </span>
              </div>
            </div>

            {/* Separator Colon */}
            {idx < timeBlocks.length - 1 && (
              <span className="text-primary font-mono text-xl sm:text-2xl font-bold ml-2 sm:ml-4 md:ml-6 select-none opacity-60 animate-pulse motion-reduce:animate-none">
                :
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-3">
        <span className="text-[10px] font-mono text-muted/60 tracking-widest uppercase">
          T-Minus To SyntaxHeist Launch · 10:00 AM IST
        </span>
      </div>
    </div>
  )
}
