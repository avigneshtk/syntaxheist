'use client'

// TerminalText — typewriter effect cycling through an array of phrases.
// Client Component: uses browser APIs (setTimeout, matchMedia).
//
// Accessibility:
//   - aria-live="polite" so screen readers announce phrase changes.
//   - A visually-hidden <span> provides the full current phrase to screen
//     readers so they're not disrupted by mid-word updates.
//   - prefers-reduced-motion: immediately shows the first phrase, no animation.

import { useState, useEffect, useSyncExternalStore } from 'react'
import { cn } from '@/lib/utils'

interface TerminalTextProps {
  phrases:        string[]
  typingSpeed?:   number  // ms per character while typing
  erasingSpeed?:  number  // ms per character while erasing
  pauseDuration?: number  // ms to hold the completed phrase before erasing
  className?:     string
}

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getReducedMotionServerSnapshot() {
  return false
}

export default function TerminalText({
  phrases,
  typingSpeed   = 75,
  erasingSpeed  = 35,
  pauseDuration = 2200,
  className     = '',
}: TerminalTextProps) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  )
  const [displayed,   setDisplayed]   = useState(phrases[0] ?? '')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isErasing,   setIsErasing]   = useState(false)

  // Typewriter loop
  useEffect(() => {
    if (reducedMotion || phrases.length === 0) return

    const currentPhrase = phrases[phraseIndex] ?? ''

    if (!isErasing) {
      // Still typing
      if (displayed.length < currentPhrase.length) {
        const id = setTimeout(
          () => setDisplayed(currentPhrase.slice(0, displayed.length + 1)),
          typingSpeed,
        )
        return () => clearTimeout(id)
      }
      // Fully typed — wait, then start erasing
      const id = setTimeout(() => setIsErasing(true), pauseDuration)
      return () => clearTimeout(id)
    } else {
      // Still erasing
      if (displayed.length > 0) {
        const id = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          erasingSpeed,
        )
        return () => clearTimeout(id)
      }
      // Fully erased — advance to next phrase asynchronously
      const id = setTimeout(() => {
        setIsErasing(false)
        setPhraseIndex((i) => (i + 1) % phrases.length)
      }, erasingSpeed)
      return () => clearTimeout(id)
    }
  }, [
    displayed, isErasing, phraseIndex, phrases,
    typingSpeed, erasingSpeed, pauseDuration, reducedMotion,
  ])

  if (reducedMotion) {
    return (
      <span className={cn('font-mono', className)}>
        {phrases[0] ?? ''}
      </span>
    )
  }

  return (
    <span
      className={cn('font-mono', className)}
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Visible animated text — hidden from AT to avoid choppy announcements */}
      <span aria-hidden="true">{displayed}</span>

      {/* Full phrase for screen readers */}
      <span className="sr-only">{phrases[phraseIndex]}</span>

      {/* Blinking cursor */}
      <span
        aria-hidden="true"
        className="inline-block w-[2px] h-[1.1em] bg-current ml-[2px] align-middle animate-pulse motion-reduce:animate-none"
      />
    </span>
  )
}
