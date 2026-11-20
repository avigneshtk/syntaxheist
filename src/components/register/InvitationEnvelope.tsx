
'use client'

// ─────────────────────────────────────────────────────────────────────────────
// InvitationEnvelope — The Cinematic 3D Paper-Folding Invitation
// Features physical envelope geometry, 3D hinged flap, emerging paper dossier,
// horizontal fold creases, reversible folding, and accessibility support.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useSyncExternalStore } from 'react'
import SHMonogram from '@/components/ui/SHMonogram'
import { EVENT } from '@/lib/constants'
import { cn } from '@/lib/utils'
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  FileText,
} from 'lucide-react'

interface InvitationEnvelopeProps {
  children: React.ReactNode
  isOpen: boolean
  onToggle: (open: boolean) => void
}

type AnimationStage = 'closed' | 'opening' | 'open' | 'closing'

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
  mql.addEventListener('change', callback)

  return () => mql.removeEventListener('change', callback)
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getReducedMotionServerSnapshot() {
  return false
}

export default function InvitationEnvelope({
  children,
  isOpen,
  onToggle,
}: InvitationEnvelopeProps) {
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  )

  const [stage, setStage] = useState<AnimationStage>(
    isOpen ? 'open' : 'closed'
  )

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen)

  const dossierRef = useRef<HTMLDivElement>(null)
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Clear any pending transition timer.
  const clearTransitionTimer = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  // Focus and scroll to the dossier after it becomes visible.
  const focusDossier = () => {
    requestAnimationFrame(() => {
      dossierRef.current?.focus({ preventScroll: true })
      dossierRef.current?.scrollIntoView({
        behavior: isReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    })
  }

  // Return keyboard focus to the envelope after folding.
  const focusOpenButton = () => {
    requestAnimationFrame(() => {
      openButtonRef.current?.focus({ preventScroll: true })
    })
  }

  // Synchronize external parent-controlled changes.
  // Conditional render-time updates avoid setState inside an effect.
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen)
    setStage(isOpen ? 'open' : 'closed')
  }

  // Clear pending animation timers when the parent changes isOpen.
  useEffect(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [isOpen])

  // Clean up any pending timer when the component unmounts.
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  // ── Open Invitation Handler ────────────────────────────────────────────────
  const handleOpen = () => {
    if (stage === 'opening' || stage === 'open') return

    clearTransitionTimer()

    if (isReducedMotion) {
      setStage('open')
      onToggle(true)
      focusDossier()
      return
    }

    setStage('opening')

    // Timeline:
    // 0ms - 400ms: Seal unlock & pulse
    // 350ms - 900ms: 3D flap rotates open
    // 700ms - 1300ms: Paper emerges from envelope pocket
    // 1200ms - 1700ms: Paper unfolds into the full document
    timerRef.current = setTimeout(() => {
      timerRef.current = null
      setStage('open')
      onToggle(true)
      focusDossier()
    }, 1600)
  }

  // ── Fold Invitation Handler ────────────────────────────────────────────────
  const handleFold = () => {
    if (stage === 'closing' || stage === 'closed') return

    clearTransitionTimer()

    if (isReducedMotion) {
      setStage('closed')
      onToggle(false)
      focusOpenButton()
      return
    }

    setStage('closing')

    // Reverse timeline:
    // 0ms - 600ms: Paper folds up along creases
    // 500ms - 950ms: Paper slides down into pocket
    // 850ms - 1400ms: Flap rotates closed & seal latches
    timerRef.current = setTimeout(() => {
      timerRef.current = null
      setStage('closed')
      onToggle(false)
      focusOpenButton()
    }, 1400)
  }

  // ── Skip Animation Handler ─────────────────────────────────────────────────
  const handleSkipAnimation = () => {
    clearTransitionTimer()
    setStage('open')
    onToggle(true)
    focusDossier()
  }

  const isAnimating = stage === 'opening' || stage === 'closing'
  const isExpanded = stage === 'open' || stage === 'opening'

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Accessibility: Skip Animation Bypass */}
      <button
        type="button"
        onClick={handleSkipAnimation}
        className={cn(
          'sr-only focus:not-sr-only focus:fixed focus:top-20 focus:left-6 focus:z-50',
          'px-4 py-2 bg-primary text-[#080b08] font-mono text-xs font-bold uppercase rounded-sm shadow-xl'
        )}
      >
        Skip animation and jump directly to registration form
      </button>

      {/* ─────────────────────────────────────────────────────────────────────
          STAGE 01 & 02: PHYSICAL 3D ENVELOPE
          ───────────────────────────────────────────────────────────────────── */}
      {(stage === 'closed' ||
        stage === 'opening' ||
        stage === 'closing') && (
        <div
          inert={isAnimating}
          className={cn(
            'relative w-full max-w-2xl mx-auto',
            'perspective-1200 sm:perspective-1600',
            'transition-opacity duration-500',
            stage === 'opening' && 'pointer-events-none'
          )}
        >
          {/* Main Envelope Box with Real 3D Stacking */}
          <div
            className={cn(
              'relative w-full h-[360px] sm:h-[420px] md:h-[450px]',
              'rounded-md border border-primary/30',
              'bg-[#080b08] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(114,255,117,0.08)]',
              'overflow-hidden transform-style-3d select-none'
            )}
          >
            {/* 1. Envelope Interior Back Wall */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#0c120c] via-[#090e09] to-[#070a07] z-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 20%, rgba(114,255,117,0.08) 0%, transparent 60%)',
              }}
            >
              {/* Internal grid texture */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(114,255,117,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(114,255,117,0.15) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
            </div>

            {/* 2. Folded Dossier Paper */}
            <div
              className={cn(
                'absolute left-4 right-4 sm:left-8 sm:right-8 h-[280px] sm:h-[320px]',
                'bg-gradient-to-b from-[#141b14] via-[#0f150f] to-[#0b100b]',
                'border border-primary/40 rounded-sm shadow-[0_4px_25px_rgba(0,0,0,0.8)]',
                'z-15 flex flex-col justify-between p-4 sm:p-6',
                stage === 'opening' &&
                  'animate-[paperSlideUp_800ms_cubic-bezier(0.16,1,0.3,1)_600ms_forwards]',
                stage === 'closing' &&
                  'animate-[paperSlideDown_600ms_cubic-bezier(0.7,0,0.84,0)_forwards]'
              )}
              style={{
                top: '60px',
              }}
            >
              {/* Paper Top Header Tab */}
              <div className="flex items-center justify-between border-b border-primary/20 pb-2">
                <div className="flex items-center gap-2">
                  <FileText
                    className="text-primary"
                    size={14}
                    aria-hidden="true"
                  />
                  <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold">
                    EVENT DOSSIER // SH27-INV
                  </span>
                </div>

                <span className="text-[9px] font-mono text-muted/60 uppercase">
                  INVITATION
                </span>
              </div>

              {/* Embossed Paper Fold Creases */}
              <div className="flex flex-col gap-8 py-2 opacity-60">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent shadow-[0_1px_0_rgba(255,255,255,0.05)]" />
                <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent shadow-[0_1px_0_rgba(255,255,255,0.05)]" />
              </div>

              {/* Peeking Document Teaser */}
              <div className="text-center">
                <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider uppercase block">
                  SYNTAX<span className="text-primary">HEIST</span> 2027
                </span>
                <span className="text-[10px] font-mono text-muted tracking-widest uppercase">
                  Federal Institute of Science and Technology, Angamaly
                </span>
              </div>
            </div>

            {/* 3. Envelope Front Pocket */}
            <div
              className={cn(
                'absolute bottom-0 left-0 right-0 h-[62%]',
                'bg-gradient-to-t from-[#111711] via-[#0d140d] to-[#0a0f0a]',
                'border-t border-primary/30 shadow-[0_-5px_20px_rgba(0,0,0,0.6)]',
                'z-20 flex flex-col justify-between p-4 sm:p-6 md:p-8',
                'clip-pocket'
              )}
            >
              {/* Pocket Corner Decals */}
              <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-muted/80 uppercase">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-pulse" />
                  <span>THE ENTRY PROTOCOL</span>
                </div>
                <span>SYNTAXHEIST // 2027</span>
              </div>

              {/* Envelope Body Centerpiece Information */}
              <div className="flex flex-col items-center text-center my-auto gap-2 sm:gap-3">
                <div className="flex items-center gap-2">
                  <FileText
                    size={14}
                    className="text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-primary uppercase font-bold">
                    Event Invitation
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl md:text-3xl font-black font-mono tracking-tight text-white">
                  SYNTAX<span className="text-primary">HEIST</span> 2027
                </h1>

                <p className="text-[11px] sm:text-xs font-mono tracking-wider text-muted max-w-sm">
                  {EVENT.date.displayStart} · {EVENT.venue.shortName},{' '}
                  {EVENT.venue.city}
                </p>

                {/* Primary OPEN INVITATION Button */}
                <div className="pt-2 sm:pt-3">
                  <button
                    ref={openButtonRef}
                    type="button"
                    onClick={handleOpen}
                    disabled={isAnimating}
                    aria-label="Open the SyntaxHeist event invitation"
                    aria-expanded={isExpanded}
                    className={cn(
                      'inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-sm',
                      'bg-primary text-[#080b08] font-mono font-bold text-xs uppercase tracking-widest',
                      'hover:bg-white hover:shadow-[0_0_28px_rgba(114,255,117,0.7)] active:scale-95',
                      'transition-all duration-200 cursor-pointer',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base',
                      isAnimating && 'opacity-70 cursor-not-allowed'
                    )}
                  >
                    <Sparkles size={14} aria-hidden="true" />
                    Open Invitation
                    <ChevronDown size={14} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Pocket Footer Metadata */}
              <div className="flex items-center justify-between border-t border-white/5 pt-2 text-[9px] font-mono text-muted/60 uppercase">
                <span>Organizer: {EVENT.organizer}</span>
                <span>Duration: {EVENT.date.duration}</span>
              </div>
            </div>

            {/* 4. Top Flap: Hinged 3D Lid */}
            <div
              className={cn(
                'absolute top-0 left-0 right-0 h-[58%] origin-top transform-style-3d',
                'z-35 transition-transform duration-700 ease-in-out',
                stage === 'opening' &&
                  'animate-[flapOpen3D_700ms_cubic-bezier(0.4,0,0.2,1)_350ms_forwards]',
                stage === 'closing' &&
                  'animate-[flapClose3D_700ms_cubic-bezier(0.4,0,0.2,1)_700ms_forwards]'
              )}
            >
              {/* Outer Flap Face */}
              <div
                className="relative w-full h-full bg-gradient-to-b from-[#141b14] via-[#0f150f] to-[#0b100b] border-b border-primary/40 shadow-[0_8px_30px_rgba(0,0,0,0.9)]"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
              >
                {/* Flap Cyber Chevron Hairlines */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                  <div className="w-3/4 h-3/4 border-b border-primary/20 rotate-45 transform" />
                </div>

                {/* Digital Wax Seal / Insignia */}
                <div
                  className={cn(
                    'absolute left-1/2 bottom-3 -translate-x-1/2 translate-y-1/2',
                    'w-14 h-14 sm:w-16 sm:h-16 rounded-full',
                    'bg-[#090e09] border-2 border-primary',
                    'shadow-[0_0_25px_rgba(114,255,117,0.5),inset_0_0_15px_rgba(114,255,117,0.2)]',
                    'flex flex-col items-center justify-center z-40',
                    stage === 'opening' &&
                      'animate-[sealUnlock_500ms_ease-out_forwards]',
                    stage === 'closing' &&
                      'animate-[sealLock_500ms_ease-in_forwards]'
                  )}
                >
                  <SHMonogram size={26} />
                  <span className="text-[7px] font-mono font-bold tracking-widest text-primary uppercase mt-0.5">
                    {stage === 'opening' ? 'UNLOCK' : 'SEALED'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────
          STAGE 03: OPEN DOSSIER — REGISTRATION PREVIEW
          ───────────────────────────────────────────────────────────────────── */}
      {(stage === 'open' ||
        stage === 'opening' ||
        stage === 'closing') && (
        <div
          ref={dossierRef}
          id="registration-dossier"
          tabIndex={-1}
          aria-label="SyntaxHeist registration preview"
          inert={stage !== 'open'}
          className={cn(
            'w-full max-w-4xl mx-auto rounded-md border border-primary/30',
            'bg-gradient-to-b from-[#111711] via-[#0d140d] to-[#080b08]',
            'shadow-[0_15px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(114,255,117,0.08)]',
            'transition-all duration-700 ease-out transform-style-3d',
            stage === 'opening' &&
              'opacity-0 max-h-0 overflow-hidden pointer-events-none',
            stage === 'closing' &&
              'animate-[paperCreaseFold_600ms_ease-in_forwards] overflow-hidden pointer-events-none',
            stage === 'open' &&
              cn(
                'opacity-100 max-h-none overflow-visible visible',
                !isReducedMotion &&
                  'animate-[paperCreaseUnfold_600ms_ease-out_forwards]'
              )
          )}
        >
          {/* Dossier Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 sm:px-8 py-4 border-b border-primary/20 bg-black/50 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded border border-primary/30 bg-primary/10 text-primary">
                <FileText size={18} aria-hidden="true" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold">
                    EVENT DETAILS // REGISTRATION PREVIEW
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide">
                  SYNTAX<span className="text-primary">HEIST</span> 2027
                  Registration
                </h2>
              </div>
            </div>

            {/* Fold Invitation Button */}
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <button
                type="button"
                onClick={handleFold}
                disabled={isAnimating}
                aria-label="Fold invitation back into the envelope"
                aria-expanded={isExpanded}
                aria-controls="registration-dossier"
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-wider',
                  'border border-white/20 hover:border-primary text-muted hover:text-white bg-surface',
                  'transition-all duration-200 cursor-pointer shadow-sm',
                  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary',
                  isAnimating && 'opacity-50 cursor-not-allowed'
                )}
              >
                <ChevronUp
                  size={14}
                  className="text-primary"
                  aria-hidden="true"
                />
                Fold Invitation
              </button>
            </div>
          </div>

          {/* Dossier Document Surface */}
          <div className="p-4 sm:p-8 md:p-10 flex flex-col gap-6 relative">
            {/* Horizontal Paper Crease Guide 01 */}
            <div
              aria-hidden="true"
              className="w-full h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent shadow-[0_1px_0_rgba(114,255,117,0.06)]"
            />

            {/* The Full Interactive Registration Form */}
            <div className="relative z-10">
              {children}
            </div>

            {/* Horizontal Paper Crease Guide 02 */}
            <div
              aria-hidden="true"
              className="w-full h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent shadow-[0_1px_0_rgba(114,255,117,0.06)]"
            />

            {/* Dossier Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-muted/60 uppercase gap-2">
              <span>EVENT INFORMATION // 2027</span>
              <div className="flex items-center gap-2">
                <FileText
                  size={11}
                  className="text-primary/70"
                  aria-hidden="true"
                />
                <span>Registration Preview // Submissions Disabled</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
