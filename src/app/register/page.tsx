// ─────────────────────────────────────────────────────────────────────────────
// /register — The Entry Protocol Route (Server Component)
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next'
import RegistrationPage from '@/components/register/RegistrationPage'
import { EVENT } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Register | The Entry Protocol',
  description: `Initiate your team entry for ${EVENT.fullName}, a 24-hour hackathon organized by ${EVENT.organizer}. ${EVENT.tagline}`,
  openGraph: {
    title: `Register | The Entry Protocol — ${EVENT.fullName}`,
    description: `Initiate your team entry for ${EVENT.fullName}. ${EVENT.date.displayStart} · ${EVENT.venue.shortName}, ${EVENT.venue.city}.`,
    type: 'website',
  },
}

export default function Register() {
  return <RegistrationPage />
}
