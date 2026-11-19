// ─────────────────────────────────────────────────────────────────────────────
// SyntaxHeist — utility helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Lightweight class name joiner — merges conditional Tailwind classes safely.
 * Avoids adding clsx/tailwind-merge as dependencies for simple use cases.
 */
export function cn(
  ...classes: (string | undefined | null | false | 0)[]
): string {
  return classes.filter(Boolean).join(' ')
}

// ─── Countdown helpers ───────────────────────────────────────────────────────

export interface TimeRemaining {
  total:   number
  days:    number
  hours:   number
  minutes: number
  seconds: number
  isPast:  boolean
}

/** Returns the time remaining until a target Date. */
export function getTimeRemaining(target: Date): TimeRemaining {
  const total = target.getTime() - Date.now()

  if (total <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  }

  return {
    total,
    days:    Math.floor(total / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
    isPast:  false,
  }
}

/** Zero-pads a number to at least 2 digits. */
export function pad(n: number): string {
  return String(n).padStart(2, '0')
}

// ─── Validation helpers (used by registration form) ──────────────────────────

/** Checks that a string is non-empty after trimming. */
export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0
}

/** Basic email format check. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

/** Accepts 10-digit Indian mobile numbers with optional +91 prefix. */
export function isValidPhone(value: string): boolean {
  return /^(\+91[\s-]?)?[6-9]\d{9}$/.test(value.trim().replace(/\s/g, ''))
}
