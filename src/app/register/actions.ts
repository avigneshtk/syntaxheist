'use server'

// ─────────────────────────────────────────────────────────────────────────────
// SyntaxHeist — Registration Server Action (THE ENTRY PROTOCOL)
// ─────────────────────────────────────────────────────────────────────────────

import { registrationSchema } from '@/lib/validation'
import { REGISTRATION_CONFIG } from '@/lib/registration-config'
import { getSupabaseAdmin, isSupabaseConfigured, generateReferenceCode } from '@/lib/supabase'
import type { RegistrationActionResponse, RegistrationFormData } from '@/lib/types'

/**
 * Authoritative Server Action for processing registration submissions.
 * Handles:
 * 1. Payload size boundaries
 * 2. Spam / Honeypot detection
 * 3. Lifecycle gate checks (coming_soon, preview, closed, open)
 * 4. Server-authoritative Zod validation
 * 5. Secure Supabase insertion via service-role key
 */
export async function submitRegistration(
  formData: RegistrationFormData
): Promise<RegistrationActionResponse> {
  try {
    // 1. Payload size check
    const serialized = JSON.stringify(formData)
    if (new TextEncoder().encode(serialized).length > REGISTRATION_CONFIG.maxPayloadBytes) {
      return {
        success: false,
        error: 'Registration payload exceeded maximum allowed size. Please simplify input.',
      }
    }

    // 2. Honeypot check (anti-bot)
    if (formData.honeypot && formData.honeypot.trim().length > 0) {
      // Intentionally delay slightly to disincentivize automated spam bots
      await new Promise((resolve) => setTimeout(resolve, 800))
      return {
        success: false,
        error: 'Automated request rejected.',
      }
    }

    // 3. Registration lifecycle gate
    if (REGISTRATION_CONFIG.status === 'closed') {
      return {
        success: false,
        error: 'Registration for SyntaxHeist 2027 has officially concluded.',
      }
    }

    if (REGISTRATION_CONFIG.status === 'coming_soon') {
      return {
        success: false,
        error: 'Registration has not officially opened yet. Please check back when dates are announced.',
      }
    }

    if (REGISTRATION_CONFIG.status === 'preview') {
      return {
        success: false,
        error:
          'PROTOCOL PREVIEW MODE: Live registration submissions are currently paused until IEEE FISAT Student Branch publishes organizer-approved event rules, team policies, and fee structures.',
      }
    }

    // 4. Server-authoritative Zod validation
    const parseResult = registrationSchema.safeParse(formData)
    if (!parseResult.success) {
      const fieldErrors: Record<string, string[]> = {}

      for (const issue of parseResult.error.issues) {
        const path = issue.path.join('.') || 'general'
        if (!fieldErrors[path]) {
          fieldErrors[path] = []
        }
        fieldErrors[path].push(issue.message)
      }

      return {
        success: false,
        error: 'Please correct the highlighted errors in the form.',
        fieldErrors,
      }
    }

    const validData = parseResult.data

    // 5. Check Supabase credentials
    if (!isSupabaseConfigured()) {
      return {
        success: false,
        error:
          'Registration database is currently being initialized by the organizing team. Please verify setup instructions or contact IEEE FISAT.',
      }
    }

    const supabase = getSupabaseAdmin()
    if (!supabase) {
      return {
        success: false,
        error: 'Unable to establish connection to registration service. Please try again shortly.',
      }
    }

    // 6. Insert record into PostgreSQL 'registrations' table
    const { data, error } = await supabase
      .from('registrations')
      .insert({
        team_name: validData.teamName,
        team_size: validData.teamSize,
        track_id: validData.trackId,
        leader_name: validData.leaderName,
        leader_email: validData.leaderEmail,
        leader_phone: validData.leaderPhone,
        leader_college: validData.leaderCollege,
        members: validData.members,
        agreed_to_terms: validData.agreedToTerms,
        status: 'pending',
      })
      .select('id, created_at')
      .single()

    if (error) {
      // Keep sensitive database internal error details private
      console.error('[SyntaxHeist Registration Error]', {
        code: error.code,
        message: error.message,
      })

      // Check for PostgreSQL unique constraint violations gracefully
      if (error.code === '23505') {
        if (error.message.includes('team_name')) {
          return {
            success: false,
            error: 'A team with this name has already been registered. Please select another name.',
            fieldErrors: {
              teamName: ['This team name is already taken.'],
            },
          }
        }
        if (error.message.includes('leader_email')) {
          return {
            success: false,
            error: 'A registration has already been submitted under this leader email address.',
            fieldErrors: {
              leaderEmail: ['This email is already registered as a team leader.'],
            },
          }
        }
      }

      return {
        success: false,
        error: 'An unexpected database error occurred while recording your registration. Please try again.',
      }
    }

    // 7. Successful registration
    const refCode = generateReferenceCode(data.id)
    return {
      success: true,
      registrationId: refCode,
      teamName: validData.teamName,
      trackId: validData.trackId,
      teamSize: validData.teamSize,
      submittedAt: data.created_at || new Date().toISOString(),
      status: 'pending',
      message: 'Registration successfully received and queued for review.',
    }
  } catch (err) {
    console.error('[SyntaxHeist Action Unhandled Error]', err)
    return {
      success: false,
      error: 'An unexpected internal error occurred. Please try again later.',
    }
  }
}
