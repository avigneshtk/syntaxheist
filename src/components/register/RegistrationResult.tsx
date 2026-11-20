
'use client'

// ─────────────────────────────────────────────────────────────────────────────
// RegistrationResult — SyntaxHeist Registration Result & Receipt
// ─────────────────────────────────────────────────────────────────────────────

import Link from 'next/link'
import {
  CheckCircle2,
  AlertTriangle,
  Printer,
  ArrowLeft,
  RefreshCw,
  FileText,
} from 'lucide-react'
import type { RegistrationActionResponse } from '@/lib/types'
import { TRACKS } from '@/lib/constants'

interface RegistrationResultProps {
  result: RegistrationActionResponse
  onReset: () => void
}

export default function RegistrationResult({
  result,
  onReset,
}: RegistrationResultProps) {
  if (!result.success) {
    return (
      <div
        role="alert"
        className="no-print w-full max-w-xl mx-auto p-6 sm:p-8 rounded-sm bg-surface border border-[#ff5f56]/40 shadow-[0_0_30px_rgba(255,95,86,0.15)] flex flex-col items-center text-center gap-5 animate-fadeIn"
      >
        <div className="w-12 h-12 rounded-full bg-[#ff5f56]/10 border border-[#ff5f56]/40 flex items-center justify-center text-[#ff5f56]">
          <AlertTriangle size={24} aria-hidden="true" />
        </div>

        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#ff5f56] uppercase block mb-1">
            Submission Halted // Error
          </span>
          <h2 className="text-xl sm:text-2xl font-mono font-bold text-white">
            Registration Unsuccessful
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-2 max-w-md leading-relaxed">
            {result.error}
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-sm bg-primary text-[#080b08] font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <RefreshCw size={14} aria-hidden="true" />
          Modify &amp; Try Again
        </button>
      </div>
    )
  }

  const track = TRACKS.find((t) => t.id === result.trackId)

  const submittedDate = new Date(result.submittedAt)
  const isValidDate = !Number.isNaN(submittedDate.getTime())

  const formattedDate = isValidDate
    ? submittedDate.toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Kolkata',
      })
    : 'Timestamp unavailable'

  return (
    <div className="w-full max-w-2xl mx-auto p-6 sm:p-8 rounded-sm bg-surface border border-primary/40 shadow-[0_0_40px_rgba(114,255,117,0.15)] flex flex-col gap-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="no-print flex flex-col items-center text-center border-b border-primary/15 pb-6 gap-3">
        <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/50 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(114,255,117,0.3)]">
          <CheckCircle2 size={32} aria-hidden="true" />
        </div>

        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-primary uppercase font-bold block mb-1">
            Submission Recorded
          </span>
          <h2 className="text-2xl sm:text-3xl font-mono font-black text-white tracking-tight">
            Registration Received
          </h2>
          <p className="text-xs text-muted mt-1 max-w-md">
            Your team registration details were successfully stored.
            This receipt confirms submission, not final team approval.
          </p>
        </div>
      </div>

      {/* Printable Receipt */}
      <div className="print-receipt p-4 sm:p-5 rounded-sm bg-[#090e09] border border-primary/20 flex flex-col gap-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <FileText
              size={15}
              className="text-primary"
              aria-hidden="true"
            />
            <span className="text-muted uppercase text-[10px] tracking-wider">
              SyntaxHeist // Submission Receipt
            </span>
          </div>
          <span className="text-primary text-[10px] font-bold">
            SH27
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-muted uppercase text-[10px] tracking-wider">
            Reference Code
          </span>
          <span className="text-primary font-black text-base tracking-widest break-all">
            {result.registrationId}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-muted uppercase text-[10px] tracking-wider block mb-0.5">
              Team Name
            </span>
            <span className="text-white font-bold text-sm">
              {result.teamName}
            </span>
          </div>

          <div>
            <span className="text-muted uppercase text-[10px] tracking-wider block mb-0.5">
              Innovation Track
            </span>
            <span className="text-white font-bold">
              {track ? `${track.symbol} ${track.name}` : result.trackId}
            </span>
          </div>

          <div>
            <span className="text-muted uppercase text-[10px] tracking-wider block mb-0.5">
              Total Team Size
            </span>
            <span className="text-white font-bold">
              {result.teamSize} {result.teamSize === 1 ? 'Person' : 'People'}
            </span>
          </div>

          <div>
            <span className="text-muted uppercase text-[10px] tracking-wider block mb-0.5">
              Submission Timestamp (IST)
            </span>
            <span className="text-white text-[11px]">
              {formattedDate}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
          <span className="text-muted">Submission Status:</span>
          <span className="text-primary font-bold uppercase tracking-wider">
            Received
          </span>
        </div>

        <p className="text-[10px] text-muted leading-relaxed border-t border-white/5 pt-3">
          This receipt confirms that the submission was stored successfully.
          It does not represent eligibility verification, team confirmation,
          or final event acceptance.
        </p>
      </div>

      {/* Additional Information */}
      <p className="no-print text-xs text-muted text-center leading-relaxed">
        Keep your reference code for future communication.
        Any confirmation process and official updates will be communicated
        by the organizers through channels they announce.
      </p>

      {/* Actions */}
      <div className="no-print flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => window.print()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm border border-primary/40 bg-transparent text-primary font-mono text-xs font-bold uppercase tracking-wider hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
        >
          <Printer size={14} aria-hidden="true" />
          Print / Save Receipt
        </button>

        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm bg-primary text-[#080b08] font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Return to SyntaxHeist
        </Link>
      </div>
    </div>
  )
}
