
import { z } from 'zod'
import { TRACKS } from './constants'
import { REGISTRATION_CONFIG } from './registration-config'

// Extract valid track IDs dynamically from the TRACKS constant.
const VALID_TRACK_IDS = TRACKS.map((track) => track.id)

const {
  minTeamSize,
  maxTeamSize,
  technicalMaxTeamSize,
} = REGISTRATION_CONFIG

// Apply the official limit when announced; otherwise use the technical ceiling.
const effectiveMaxTeamSize = Math.min(
  maxTeamSize ?? technicalMaxTeamSize,
  technicalMaxTeamSize
)

/**
 * Sub-schema for an additional team member.
 */
export const teamMemberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Member name must be at least 2 characters')
    .max(100, 'Member name cannot exceed 100 characters'),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please enter a valid member email address')
    .max(120, 'Email cannot exceed 120 characters'),

  college: z
    .string()
    .trim()
    .min(2, 'Member college/institution is required')
    .max(150, 'Institution name cannot exceed 150 characters'),
})

/**
 * Primary registration validation schema.
 */
export const registrationSchema = z
  .object({
    teamName: z
      .string()
      .trim()
      .min(2, 'Team name must be at least 2 characters')
      .max(60, 'Team name cannot exceed 60 characters'),

    teamSize: z.coerce
      .number({
        message: 'Team size must be a number',
      })
      .int('Team size must be an integer')
      .min(
        minTeamSize,
        `Total team size must be at least ${minTeamSize}`
      )
      .max(
        effectiveMaxTeamSize,
        `The application currently supports a maximum of ${effectiveMaxTeamSize} total participants per team. This is a technical preview limit, not the official event team-size policy.`
      ),

    trackId: z
      .string()
      .min(1, 'Please select a preferred innovation track')
      .refine(
        (value) => VALID_TRACK_IDS.includes(value),
        {
          message: 'Please select a valid innovation track from the list',
        }
      ),

    leaderName: z
      .string()
      .trim()
      .min(2, 'Team leader name must be at least 2 characters')
      .max(100, 'Leader name cannot exceed 100 characters'),

    leaderEmail: z
      .string()
      .trim()
      .toLowerCase()
      .email('Please enter a valid leader email address')
      .max(120, 'Email cannot exceed 120 characters'),

    leaderPhone: z
      .string()
      .trim()
      .regex(
        /^(\+91[\s-]?)?[6-9]\d{9}$/,
        'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210 or +91 9876543210)'
      ),

    leaderCollege: z
      .string()
      .trim()
      .min(2, 'Team leader college/institution is required')
      .max(150, 'Institution name cannot exceed 150 characters'),

    members: z
      .array(teamMemberSchema)
      .max(
        effectiveMaxTeamSize - 1,
        `A maximum of ${effectiveMaxTeamSize - 1} additional members can be entered in this technical preview`
      )
      .default([]),

    agreedToTerms: z.literal(true, {
      message: 'Please acknowledge the registration preview notice to continue',
    }),

    // Honeypot field — MUST remain empty or undefined.
    honeypot: z
      .string()
      .optional()
      .refine((value) => !value || value.length === 0, {
        message: 'Bot submission detected',
      }),
  })
  .superRefine((data, ctx) => {
    // 1. Enforce: members.length MUST equal teamSize - 1.
    const expectedAdditionalMembers = data.teamSize - 1

    if (data.members.length !== expectedAdditionalMembers) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['teamSize'],
        message: `Total team size of ${data.teamSize} requires exactly ${expectedAdditionalMembers} additional ${
          expectedAdditionalMembers === 1 ? 'member' : 'members'
        } (currently ${data.members.length})`,
      })
    }

    // 2. Ensure leader email does not match any member email.
    const emailsSeen = new Set<string>([data.leaderEmail])

    data.members.forEach((member, index) => {
      const email = member.email

      if (email === data.leaderEmail) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['members', index, 'email'],
          message: 'Member email cannot be the same as the team leader email',
        })
      } else if (emailsSeen.has(email)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['members', index, 'email'],
          message: 'Duplicate email detected among team members',
        })
      } else {
        emailsSeen.add(email)
      }
    })
  })

export type RegistrationSchemaInput = z.input<typeof registrationSchema>
export type RegistrationSchemaOutput = z.output<typeof registrationSchema>
