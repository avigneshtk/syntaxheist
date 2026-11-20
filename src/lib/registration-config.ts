
// ─────────────────────────────────────────────────────────────────────────────
// SyntaxHeist — Registration Configuration & Policy Controller
// Centralizes availability, validation limits, and provisional guidelines.
// Update this file when IEEE FISAT Student Branch confirms official policies.
// ─────────────────────────────────────────────────────────────────────────────

import type { RegistrationStatus } from './types'

export interface RegistrationPolicyConfig {
  /**
   * Current lifecycle state of registration.
   * - 'coming_soon': Registration not yet opened; reveals informational countdown/invitation.
   * - 'preview': Interactive protocol preview enabled; form can be explored & validated,
   *              actual database submissions remain disabled.
   * - 'open': Live submissions accepted into Supabase database.
   * - 'closed': Registration window has concluded.
   */
  status: RegistrationStatus

  /** Minimum total team size (inclusive of team leader) */
  minTeamSize: number

  /** Official maximum team size (null = To Be Announced by organizers) */
  maxTeamSize: number | null

  /**
   * Technical application safety ceiling for total team size.
   * This is NOT an official event team-size policy.
   */
  technicalMaxTeamSize: number

  /** Name of the invisible anti-spam honeypot field */
  honeypotField: string

  /** Maximum payload size in bytes accepted by server action (safety ceiling) */
  maxPayloadBytes: number

  /** User-facing policy notice based on unconfirmed organizer details */
  notice: {
    badge: string
    title: string
    description: string
  }

  /** Provisional event information and pending organizer guidelines */
  provisionalTerms: readonly {
    title: string
    description: string
    status: 'Provisional' | 'Confirmed' | 'TBA'
  }[]
}

export const REGISTRATION_CONFIG: RegistrationPolicyConfig = {
  // Current state: 'preview' allows exploring the full Entry Protocol UI
  // while keeping actual database submissions disabled.
  status: 'preview',

  // Form-level minimum for preview purposes; official eligibility is TBA.
  minTeamSize: 1,

  // Official team size limit is pending organizer confirmation.
  maxTeamSize: null,

  // Application safety ceiling only; not an official event team-size limit.
  technicalMaxTeamSize: 51,

  honeypotField: 'website_security_token',
  maxPayloadBytes: 32 * 1024, // 32 KB safety threshold

  notice: {
    badge: 'PROTOCOL PREVIEW // STAGE 01',
    title: 'Interactive Registration Preview',
    description:
      'Explore the Entry Protocol interface and test its form validation. This is a preview only: submissions are disabled, and no registration is being accepted or stored. Official event rules, eligibility criteria, team limits, and fee details will be published by IEEE FISAT Student Branch.',
  },

  provisionalTerms: [
    {
      title: 'Event Timeline & Attendance',
      status: 'Provisional',
      description:
        'The current event information lists a 24-hour hackathon from 20 March 2027, 10:00 AM IST to 21 March 2027, 10:00 AM IST at FISAT, Angamaly. Final details are subject to organizer confirmation.',
    },
    {
      title: 'Pre-event Preparation & Intellectual Property',
      status: 'TBA',
      description:
        'Official guidelines regarding pre-event preparation, use of existing code and assets, intellectual property, and attribution will be published by the organizing committee before registration opens.',
    },
    {
      title: 'Team Composition & Eligibility',
      status: 'TBA',
      description:
        'Team size limits and official student eligibility criteria have not yet been announced. These details will be confirmed in the published IEEE FISAT event guidelines.',
    },
    {
      title: 'Registration Fee & Participation Terms',
      status: 'TBA',
      description:
        'Registration fee structures and participant arrangements have not yet been announced. Official details will be published before live registration opens.',
    },
    {
      title: 'Code of Conduct & Professional Ethics',
      status: 'TBA',
      description:
        'The organizing committee will publish the official code of conduct, reporting procedures, and applicable consequences before registration opens.',
    },
  ],
}
