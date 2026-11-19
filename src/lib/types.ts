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

// ─── Registration form ───────────────────────────────────────────────────────

export interface TeamMember {
  name: string
  email: string
  college: string
}

export interface RegistrationFormData {
  teamName: string
  teamSize: 1 | 2 | 3 | 4
  trackId: string
  leaderName: string
  leaderEmail: string
  leaderPhone: string
  leaderCollege: string
  members: TeamMember[]
  agreedToTerms: boolean
}

// ─── UI helpers ──────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'
