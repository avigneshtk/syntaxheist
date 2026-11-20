
// ─────────────────────────────────────────────────────────────────────────────
// SyntaxHeist — Server-Only Supabase Database Client
// ─────────────────────────────────────────────────────────────────────────────
// SECURITY:
// 1. Server-side code only (Server Actions / Route Handlers).
// 2. Uses the service-role key, which bypasses Row Level Security.
// 3. Never import into Client Components.
// 4. Never expose the service-role key to the browser.
// ─────────────────────────────────────────────────────────────────────────────

import 'server-only'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Server-only environment variables
const SUPABASE_URL = process.env.SUPABASE_URL?.trim()
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

/**
 * Validates the Supabase URL.
 * HTTPS is required except for localhost development.
 */
function isValidSupabaseUrl(value: string | undefined): boolean {
  if (!value) return false

  try {
    const url = new URL(value)

    const isLocalhost =
      url.hostname === 'localhost' ||
      url.hostname === '127.0.0.1'

    return (
      (url.protocol === 'https:' ||
        (url.protocol === 'http:' && isLocalhost)) &&
      Boolean(url.hostname)
    )
  } catch {
    return false
  }
}

/**
 * Checks whether all required Supabase credentials are available.
 */
export function isSupabaseConfigured(): boolean {
  return (
    isValidSupabaseUrl(SUPABASE_URL) &&
    Boolean(SUPABASE_SERVICE_ROLE_KEY)
  )
}

let cachedAdminClient: SupabaseClient | null = null

/**
 * Returns a cached server-only Supabase admin client.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!isSupabaseConfigured() || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return null
  }

  if (!cachedAdminClient) {
    cachedAdminClient = createClient(
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    )
  }

  return cachedAdminClient
}

/**
 * Generates a public participant reference code.
 * Example: SH27-8F42B19C3D
 *
 * Uses ten hexadecimal characters from the database UUID.
 * This is a reference identifier, not an authentication token.
 */
export function generateReferenceCode(id: string): string {
  const cleanId = id.replace(/-/g, '').toUpperCase()

  if (!/^[0-9A-F]{10,}$/.test(cleanId)) {
    throw new Error('Invalid registration ID supplied.')
  }

  return `SH27-${cleanId.slice(0, 10)}`
}
