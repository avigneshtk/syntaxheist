// ─────────────────────────────────────────────────────────────────────────────
// SyntaxHeist — shared TypeScript types
// ─────────────────────────────────────────────────────────────────────────────

export interface Track {
  id: string
  name: string
  description: string
  symbol: string
}

export interface NavLink {
  label: string
  href: string
}

export interface ScheduleItem {
  time: string
  label: string
  day: 1 | 2
}

export interface FAQ {
  question: string
  answer: string
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
