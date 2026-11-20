
// ─────────────────────────────────────────────────────────────────────────────
// SyntaxHeist — Shared Utility Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Lightweight class name joiner.
 * Filters out falsy values and joins valid class names.
 */
export function cn(
  ...classes: (string | undefined | null | false | 0)[]
): string {
  return classes.filter(Boolean).join(' ')
}

// ─── Countdown Helpers ───────────────────────────────────────────────────────

export interface TimeRemaining {
  total: number
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

/**
 * Returns the time remaining until a target date.
 * Returns zero values when the target date has passed.
 */
export function getTimeRemaining(target: Date): TimeRemaining {
  const targetTime = target.getTime()

  if (!Number.isFinite(targetTime)) {
    return {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
    }
  }

  const total = Math.max(0, targetTime - Date.now())

  if (total === 0) {
    return {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
    }
  }

  return {
    total,
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total / 3_600_000) % 24),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1_000) % 60),
    isPast: false,
  }
}

/**
 * Zero-pads a number to at least two digits.
 */
export function pad(value: number): string {
  return String(value).padStart(2, '0')
}

// ─── Validation Helpers ──────────────────────────────────────────────────────

/**
 * Checks whether a string contains non-whitespace characters.
 */
export function isNonEmpty(value: string): boolean {
  return typeof value === 'string' && value.trim().length > 0
}

/**
 * Validates a basic email address format.
 */
export function isValidEmail(value: string): boolean {
  if (typeof value !== 'string') return false

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

/**
 * Validates a 10-digit Indian mobile number.
 * Accepts an optional +91 country code and spaces or hyphens.
 */
export function isValidPhone(value: string): boolean {
  if (typeof value !== 'string') return false

  const normalized = value.trim().replace(/[\s-]/g, '')

  return /^(?:\+91)?[6-9]\d{9}$/.test(normalized)
}
