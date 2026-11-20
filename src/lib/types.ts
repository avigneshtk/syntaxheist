// ─────────────────────────────────────────────────────────────────────────────
// SyntaxHeist — shared TypeScript types
// ─────────────────────────────────────────────────────────────────────────────

export interface Track {
  id: string
  name: string
  description: string
  symbol: string
  tags?: readonly string[]
}

export interface NavLink {
  label: string
  href: string
}

export interface ScheduleItem {
  time: string
  label: string
  description?: string
  day: 1 | 2
  type?: 'keynote' | 'hack' | 'food' | 'review' | 'deadline'
}

export interface FAQ {
  question: string
  answer: string
}

export interface HighlightItem {
  number: string
  label: string
  description: string
}

export interface PrizeItem {
  rank: string
  title: string
  status: string
  description: string
  perks: readonly string[]
}

// ─── Registration form & backend ─────────────────────────────────────────────

export interface TeamMember {
  name: string
  email: string
  college: string
}

export interface RegistrationFormData {
  teamName: string
  teamSize: number
  trackId: string
  leaderName: string
  leaderEmail: string
  leaderPhone: string
  leaderCollege: string
  members: TeamMember[]
  agreedToTerms: boolean
  honeypot?: string
}

export type RegistrationStatus = 'coming_soon' | 'preview' | 'open' | 'closed'

export type RegistrationActionResponse =
  | {
      success: true
      registrationId: string
      teamName: string
      trackId: string
      teamSize: number
      submittedAt: string
      status: string
      message?: string
    }
  | {
      success: false
      error: string
      fieldErrors?: Record<string, string[]>
    }

// ─── UI helpers ──────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'
