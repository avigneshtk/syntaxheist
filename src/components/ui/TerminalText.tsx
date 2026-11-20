
'use client'

// TerminalText — accessible typewriter effect cycling through phrases.

import { useState, useEffect, useSyncExternalStore } from 'react'
import { cn } from '@/lib/utils'

interface TerminalTextProps {
  phrases: string[]
  typingSpeed?: number
  erasingSpeed?: number
  pauseDuration?: number
  className?: string
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
  typingSpeed = 75,
  erasingSpeed = 35,
  pauseDuration = 2200,
  className = '',
}: TerminalTextProps) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  )

  const [displayed, setDisplayed] = useState(phrases[0] ?? '')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isErasing, setIsErasing] = useState(false)

  // Typewriter animation
  useEffect(() => {
    if (reducedMotion || phrases.length === 0) return

    const currentPhrase = phrases[phraseIndex] ?? ''

    if (!isErasing) {
      if (displayed.length < currentPhrase.length) {
        const id = setTimeout(
          () => setDisplayed(currentPhrase.slice(0, displayed.length + 1)),
          typingSpeed,
        )
        return () => clearTimeout(id)
      }

      const id = setTimeout(() => setIsErasing(true), pauseDuration)
      return () => clearTimeout(id)
    }

    if (displayed.length > 0) {
      const id = setTimeout(
        () => setDisplayed(displayed.slice(0, -1)),
        erasingSpeed,
      )
      return () => clearTimeout(id)
    }

    const id = setTimeout(() => {
      setIsErasing(false)
      setPhraseIndex((i) => (i + 1) % phrases.length)
    }, erasingSpeed)

    return () => clearTimeout(id)
  }, [
    displayed,
    isErasing,
    phraseIndex,
    phrases,
    typingSpeed,
    erasingSpeed,
    pauseDuration,
    reducedMotion,
  ])

  if (reducedMotion) {
    return (
      <span className={cn('font-mono', className)}>
        {phrases[0] ?? ''}
      </span>
    )
  }

  return (
    <>
      {/* Visual animation: hidden from screen readers */}
      <span
        className={cn('font-mono', className)}
        aria-hidden="true"
      >
        {displayed}
        <span className="inline-block w-[2px] h-[1.1em] bg-current ml-[2px] align-middle animate-pulse motion-reduce:animate-none" />
      </span>

      {/* Screen-reader text: updates only when the phrase changes */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {phrases[phraseIndex] ?? ''}
      </span>
    </>
  )
}
