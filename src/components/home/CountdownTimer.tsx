
'use client'

// CountdownTimer — Futuristic Digital Chronometer for SyntaxHeist.
// Target: 20 March 2027, 10:00 AM IST
// Mechanical split-flap / digital instrument inspired precision chronometer.
// Client Component with zero hydration mismatch via useSyncExternalStore.

import { useSyncExternalStore, useState, useEffect } from 'react'
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

/**
 * Individual ChronoDigit Cell.
 * Inspired by mechanical split-flap drums and digital aerospace instruments.
 * Smoothly animates ONLY when its specific digit changes.
 */
function ChronoDigit({ digit }: { digit: string }) {
  const [current, setCurrent] = useState(digit)
  const [prev, setPrev] = useState(digit)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Adjust state during render when prop changes (official React recommended pattern)
  if (digit !== current) {
    setPrev(current)
    setCurrent(digit)
    setIsTransitioning(true)
  }

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isTransitioning])

  return (
    <div
      className="relative w-5 h-9 sm:w-7 sm:h-12 md:w-9 md:h-14
                 bg-[#090e09] border border-primary/25 rounded-[3px]
                 overflow-hidden flex items-center justify-center
                 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.8)]"
    >
      {/* Precision split-flap horizontal seam groove */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[1px] bg-black/95 z-20 shadow-[0_1px_0_rgba(114,255,117,0.18)]"
      />

      {/* Top half subtle instrument glass sheen */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none z-10"
      />

      {/* Digit display surface */}
      <div className="relative w-full h-full font-mono font-black text-xl sm:text-3xl md:text-4xl text-white [text-shadow:0_0_14px_rgba(114,255,117,0.4)] flex items-center justify-center select-none">
        {isTransitioning ? (
          <>
            {/* Exiting digit: rolls upwards out of view */}
            <span
              className="absolute inset-0 flex items-center justify-center motion-reduce:hidden"
              style={{
                animation: 'digitRollOut 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            >
              {prev}
            </span>
            {/* Entering digit: rolls in from below */}
            <span
              className="absolute inset-0 flex items-center justify-center motion-reduce:hidden"
              style={{
                animation: 'digitRollIn 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            >
              {current}
            </span>
            {/* Static fallback for reduced-motion */}
            <span className="hidden motion-reduce:flex absolute inset-0 items-center justify-center">
              {current}
            </span>
          </>
        ) : (
          <span className="absolute inset-0 flex items-center justify-center">
            {current}
          </span>
        )}
      </div>
    </div>
  )
}

/**
 * ChronoUnit Card: wraps digits and monospace indicator label.
 */
function ChronoUnit({
  label,
  value,
}: {
  label: string
  value: string
}) {
  const digits = value.split('')

  return (
    <div className="relative group flex w-full flex-col items-center sm:w-auto">
      {/* Outer Chronometer Instrument Housing */}
      <div
        className="relative w-full bg-surface/90 border border-primary/20 rounded-md
                   p-2 sm:w-auto sm:p-3 md:p-3.5
                   flex flex-col items-center justify-center
                   shadow-[0_4px_20px_rgba(0,0,0,0.6)]
                   transition-all duration-300 group-hover:border-primary/45 group-hover:shadow-[0_0_20px_rgba(114,255,117,0.15)]"
      >
        {/* Top edge neon hairline */}
        <span
          aria-hidden="true"
          className="absolute -top-px left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent pointer-events-none"
        />

        {/* Corner micro tick marks */}
        <span className="absolute top-1 left-1 w-1 h-1 border-t border-l border-primary/40 pointer-events-none" />
        <span className="absolute top-1 right-1 w-1 h-1 border-t border-r border-primary/40 pointer-events-none" />
        <span className="absolute bottom-1 left-1 w-1 h-1 border-b border-l border-primary/40 pointer-events-none" />
        <span className="absolute bottom-1 right-1 w-1 h-1 border-b border-r border-primary/40 pointer-events-none" />

        {/* Digit Cells Cluster */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5">
          {digits.map((digit, idx) => (
            <ChronoDigit key={`${idx}-${label}`} digit={digit} />
          ))}
        </div>

        {/* Monospace Unit Label */}
        <span className="text-[9px] sm:text-[10px] md:text-[11px] font-mono tracking-[0.25em] text-muted/80 mt-2 sm:mt-2.5 uppercase font-bold flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
          {label}
        </span>
      </div>
    </div>
  )
}

/**
 * Precision Chronometer LED Separator
 */
function ChronoSeparator() {
  return (
    <div
      aria-hidden="true"
      className="hidden sm:flex flex-col items-center justify-center gap-2 sm:gap-3 py-2 px-0.5 sm:px-1 select-none"
    >
      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary/80 shadow-[0_0_8px_rgba(114,255,117,0.6)] animate-pulse motion-reduce:animate-none" />
      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary/80 shadow-[0_0_8px_rgba(114,255,117,0.6)] animate-pulse motion-reduce:animate-none" />
    </div>
  )
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
      className="w-full max-w-2xl mx-auto my-6 px-2"
      aria-label="Hackathon countdown timer"
    >
      {/* Screen reader only status text */}
      <span className="sr-only">
        {time.days} days, {time.hours} hours, {time.minutes} minutes, {time.seconds} seconds remaining until SyntaxHeist starts on 20 March 2027 at 10:00 AM IST
      </span>

      {/* Visual Digital Chronometer */}
      <div
        aria-hidden="true"
        className="grid grid-cols-2 gap-3 sm:flex sm:flex-nowrap sm:items-center sm:justify-center sm:gap-1.5 md:gap-2.5 lg:gap-4"
      >
        {timeBlocks.map((block, idx) => (
          <div
            key={block.label}
            className="flex min-w-0 items-center justify-center gap-1.5 sm:gap-2.5 md:gap-4"
          >
            <ChronoUnit label={block.label} value={block.value} />
            {idx < timeBlocks.length - 1 && <ChronoSeparator />}
          </div>
        ))}
      </div>

      {/* Chronometer Status Telemetry Footer */}
      <div className="text-center mt-4">
        <span className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 px-3 py-1 rounded-full bg-base/80 border border-primary/20 text-[10px] font-mono text-muted/70 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse motion-reduce:animate-none" />
          T-Minus To Launch · {EVENT.date.displayStart}, {EVENT.date.displayTime}
        </span>
      </div>
    </div>
  )
}
