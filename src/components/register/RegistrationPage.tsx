
'use client'

// ─────────────────────────────────────────────────────────────────────────────
// RegistrationPage — Orchestrator for THE ENTRY PROTOCOL Registration Experience
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import InvitationEnvelope from './InvitationEnvelope'
import RegistrationForm from './RegistrationForm'
import RegistrationResult from './RegistrationResult'
import GridBackground from '@/components/ui/GridBackground'
import { submitRegistration } from '@/app/register/actions'
import type { RegistrationActionResponse } from '@/lib/types'

export default function RegistrationPage() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false)
  const [result, setResult] = useState<RegistrationActionResponse | null>(null)

  const handleReset = () => {
    setResult(null)
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] pt-16 flex flex-col">
      {/* ── Slim Secondary Status Bar (Directly below fixed Navbar) ── */}
      <div className="sticky top-16 z-30 w-full border-b border-primary/10 bg-[#080b08]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between gap-4">
          {/* Left: Back to Home Link */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm px-1 py-0.5"
            aria-label="Back to home page"
          >
            <ArrowLeft
              size={13}
              aria-hidden="true"
              className="text-primary transition-transform duration-150 group-hover:-translate-x-1"
            />
            <span className="font-bold">BACK TO HOME</span>
          </Link>

          {/* Right: Registration Preview Status */}
          <div
            className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase"
            aria-label="Registration preview. Submissions are disabled."
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-muted/70"
              aria-hidden="true"
            />
            <span className="text-muted font-bold">REGISTRATION</span>
            <span className="text-primary/60 font-mono">{'//'}</span>
            <span className="text-muted">PREVIEW 2027</span>
          </div>
        </div>
      </div>

      {/* ── Page Content Container ──────────────────────────────────── */}
      <div className="relative flex-1 py-10 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Cyber Grid */}
        <GridBackground />

        {/* Radial green spotlight */}
        <div
          aria-hidden="true"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(114,255,117,0.05) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-6">
          {/* Dynamic Display: Result Screen vs Invitation/Form */}
          {result ? (
            <RegistrationResult result={result} onReset={handleReset} />
          ) : (
            <InvitationEnvelope
              isOpen={isInvitationOpen}
              onToggle={setIsInvitationOpen}
            >
              <RegistrationForm
                onSubmitAction={submitRegistration}
                onSuccess={(res) => setResult(res)}
              />
            </InvitationEnvelope>
          )}
        </div>
      </div>
    </div>
  )
}
