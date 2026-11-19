// SyntaxHeist Landing Page — Complete Phase 2 implementation.
// Assembles: Hero with live Countdown, About, Tracks, Highlights, Schedule,
// Prizes, Venue, FAQ, and Contact sections.

import type { Metadata } from 'next'
import GridBackground from '@/components/ui/GridBackground'
import GlowButton from '@/components/ui/GlowButton'
import SHMonogram from '@/components/ui/SHMonogram'
import SectionLabel from '@/components/ui/SectionLabel'
import TerminalText from '@/components/ui/TerminalText'
import CountdownTimer from '@/components/home/CountdownTimer'
import AboutSection from '@/components/home/AboutSection'
import TracksSection from '@/components/home/TracksSection'
import HighlightsSection from '@/components/home/HighlightsSection'
import ScheduleSection from '@/components/home/ScheduleSection'
import PrizesSection from '@/components/home/PrizesSection'
import VenueSection from '@/components/home/VenueSection'
import FAQSection from '@/components/home/FAQSection'
import ContactSection from '@/components/home/ContactSection'
import { EVENT } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'SyntaxHeist 2027 — 24-Hour Hackathon | IEEE FISAT',
  description:
    'Join SyntaxHeist 2027: A premier 24-hour hackathon organized by IEEE FISAT Student Branch. 20–21 March 2027 at FISAT, Angamaly, Kerala. Break the code. Build the future.',
}

const TERMINAL_PHRASES = [
  '24 hours. Limitless innovation.',
  `${EVENT.date.displayStart} · ${EVENT.venue.shortName}, ${EVENT.venue.city}`,
  'Open to all engineering students.',
  'Registration opening soon.',
  'Break the code. Build the future.',
]

export default function Home() {
  return (
    <div className="relative">
      
      {/* ── 1. HERO SECTION ────────────────────────────────────────────── */}
      <section
        aria-label="SyntaxHeist Hero"
        className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 py-20 sm:py-24 text-center overflow-hidden"
      >
        {/* Dot-grid background */}
        <GridBackground />

        {/* Faint radial spotlight behind monogram */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(114,255,117,0.06) 0%, transparent 70%)',
          }}
        />

        {/* Hero Content Stack */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-5 sm:gap-6">
          
          {/* Monogram */}
          <SHMonogram size={72} aria-hidden="true" />

          {/* Eyebrow Label */}
          <SectionLabel>IEEE FISAT Student Branch Presents</SectionLabel>

          {/* Main Heading */}
          <h1 className="text-[clamp(3.5rem,14vw,8.5rem)] font-black tracking-tighter leading-none">
            SYNTAX
            <br className="sm:hidden" />
            <span className="text-primary">HEIST</span>
          </h1>

          {/* Tagline */}
          <p className="text-muted text-xs sm:text-base tracking-[0.2em] uppercase font-mono max-w-xl">
            {EVENT.tagline}
          </p>

          {/* Animated Typewriter — fixed height to prevent layout shift */}
          <div className="h-5 flex items-center">
            <TerminalText
              phrases={TERMINAL_PHRASES}
              className="text-primary text-xs"
            />
          </div>

          {/* Live Countdown Timer */}
          <CountdownTimer />

          {/* Primary CTA Row */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <GlowButton href="/register" size="lg">
              Register Now
            </GlowButton>
            <GlowButton href="/guide" variant="outline" size="lg">
              Event Guide
            </GlowButton>
          </div>

          {/* Event Badge */}
          <div className="pt-2">
            <span
              className="border border-primary/40 px-5 py-2 rounded-full
                         text-[10px] text-primary font-mono tracking-[0.25em] uppercase inline-block"
            >
              24 Hours &nbsp;·&nbsp; {EVENT.date.displayStart} &nbsp;·&nbsp; {EVENT.venue.shortName}, {EVENT.venue.city}
            </span>
          </div>

        </div>

        {/* Scroll hint arrow */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2
                     flex flex-col items-center gap-2 text-primary/40 animate-bounce motion-reduce:animate-none"
          aria-hidden="true"
        >
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-primary/40" />
          <span className="text-[8px] font-mono tracking-widest uppercase">
            scroll
          </span>
        </div>
      </section>

      {/* ── 2. ABOUT SECTION ───────────────────────────────────────────── */}
      <AboutSection />

      {/* ── 3. TRACKS SECTION ──────────────────────────────────────────── */}
      <TracksSection />

      {/* ── 4. HIGHLIGHTS SECTION ──────────────────────────────────────── */}
      <HighlightsSection />

      {/* ── 5. SCHEDULE / TIMELINE SECTION ─────────────────────────────── */}
      <ScheduleSection />

      {/* ── 6. PRIZES SECTION ──────────────────────────────────────────── */}
      <PrizesSection />

      {/* ── 7. VENUE SECTION ───────────────────────────────────────────── */}
      <VenueSection />

      {/* ── 8. FAQ SECTION ─────────────────────────────────────────────── */}
      <FAQSection />

      {/* ── 9. CONTACT SECTION ─────────────────────────────────────────── */}
      <ContactSection />

    </div>
  )
}
