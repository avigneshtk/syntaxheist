
'use client'

// ─────────────────────────────────────────────────────────────────────────────
// TermsModal — Accessible Guidelines & Provisional Policies Dialog
// Clearly distinguishes provisional from confirmed organizer terms.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react'
import { X, ShieldAlert, CheckCircle2, Clock } from 'lucide-react'
import { REGISTRATION_CONFIG } from '@/lib/registration-config'
import { cn } from '@/lib/utils'

interface TermsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    const previousBodyOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 50)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements =
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )

      if (!focusableElements?.length) {
        event.preventDefault()
        dialogRef.current?.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (
        event.shiftKey &&
        (document.activeElement === firstElement ||
          !dialogRef.current?.contains(document.activeElement))
      ) {
        event.preventDefault()
        lastElement.focus()
      } else if (
        !event.shiftKey &&
        (document.activeElement === lastElement ||
          !dialogRef.current?.contains(document.activeElement))
      ) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)

      document.body.style.overflow = previousBodyOverflow

      if (previouslyFocusedElement?.isConnected) {
        previouslyFocusedElement.focus()
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-modal-title"
        tabIndex={-1}
        className={cn(
          'relative w-full max-w-2xl max-h-[85vh] overflow-y-auto',
          'bg-surface border border-primary/30 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.9)]',
          'p-5 sm:p-7 flex flex-col gap-5 text-white z-10'
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-primary/15 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[10px] font-mono tracking-widest text-primary uppercase">
                SyntaxHeist 2027 // Protocol
              </span>
            </div>

            <h2
              id="terms-modal-title"
              className="text-lg sm:text-xl font-mono font-bold tracking-tight"
            >
              Event Guidelines &amp; Provisional Terms
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close guidelines dialog"
            className="p-1.5 rounded text-muted hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            <X size={18} />
          </button>
        </div>

        {/* Notice alert */}
        <div className="p-3.5 rounded-sm bg-primary/[0.06] border border-primary/20 flex items-start gap-3">
          <ShieldAlert
            className="text-primary shrink-0 mt-0.5"
            size={18}
            aria-hidden="true"
          />

          <div className="text-xs text-muted leading-relaxed">
            <span className="font-bold text-white block mb-0.5 font-mono">
              Organizer Confirmation Status
            </span>

            These guidelines outline expectations for SyntaxHeist. Policies designated as{' '}
            <strong className="text-primary font-mono font-semibold">
              TBA
            </strong>{' '}
            or{' '}
            <strong className="text-[#e5c07b] font-mono font-semibold">
              Provisional
            </strong>{' '}
            are subject to final ratification by IEEE FISAT Student Branch prior to official event commencement.
          </div>
        </div>

        {/* Terms list */}
        <div className="flex flex-col gap-4 divide-y divide-white/5">
          {REGISTRATION_CONFIG.provisionalTerms.map((term, idx) => (
            <div
              key={term.title}
              className="pt-3 first:pt-0 flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-white">
                  {idx + 1}. {term.title}
                </span>

                <span
                  className={cn(
                    'text-[9px] font-mono px-2 py-0.5 rounded uppercase tracking-wider font-semibold flex items-center gap-1',
                    term.status === 'Confirmed' &&
                      'bg-primary/10 text-primary border border-primary/30',
                    term.status === 'Provisional' &&
                      'bg-[#e5c07b]/10 text-[#e5c07b] border border-[#e5c07b]/30',
                    term.status === 'TBA' &&
                      'bg-white/10 text-muted border border-white/20'
                  )}
                >
                  {term.status === 'Confirmed' && (
                    <CheckCircle2 size={10} aria-hidden="true" />
                  )}

                  {term.status === 'Provisional' && (
                    <Clock size={10} aria-hidden="true" />
                  )}

                  {term.status}
                </span>
              </div>

              <p className="text-xs text-muted leading-relaxed">
                {term.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-primary/15 pt-4 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-sm bg-primary text-[#080b08] font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            Acknowledge &amp; Return
          </button>
        </div>
      </div>
    </div>
  )
}
