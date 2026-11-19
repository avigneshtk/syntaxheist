// Home page — Phase 1 state.
// Demonstrates the design foundation: tokens, monogram, GlowButton,
// SectionLabel, TerminalText, GridBackground, and responsive Navbar.
// The full landing page (all sections) is built in Phase 2.

import type { Metadata } from "next";
import GridBackground from "@/components/ui/GridBackground";
import GlowButton     from "@/components/ui/GlowButton";
import SHMonogram     from "@/components/ui/SHMonogram";
import SectionLabel   from "@/components/ui/SectionLabel";
import TerminalText   from "@/components/ui/TerminalText";
import { EVENT }      from "@/lib/constants";

export const metadata: Metadata = {
  title: "SyntaxHeist 2027 — 24-Hour Hackathon",
};

const TERMINAL_PHRASES = [
  "24 hours. Limitless innovation.",
  `${EVENT.date.displayStart} · ${EVENT.venue.shortName}, ${EVENT.venue.city}`,
  "Open to all engineering students.",
  "Registration opening soon.",
  "Break the code. Build the future.",
];

export default function Home() {
  return (
    /*
      min-h-[calc(100vh-4rem)] — fills the viewport below the fixed navbar
      (which is h-16 = 4rem). The extra pt-safe ensures content is not
      clipped on devices with top safe-area insets.
    */
    <section
      aria-label="SyntaxHeist hero"
      className="relative flex flex-col items-center justify-center
                 min-h-[calc(100vh-4rem)] px-6 py-24 text-center overflow-hidden"
    >
      {/* Dot-grid background */}
      <GridBackground />

      {/* Faint radial spotlight behind the monogram */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(114,255,117,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">

        {/* Monogram */}
        <SHMonogram size={72} aria-hidden="true" />

        {/* Eyebrow label */}
        <SectionLabel>IEEE FISAT Student Branch Presents</SectionLabel>

        {/* Main heading */}
        <h1 className="text-[clamp(4rem,15vw,9rem)] font-black tracking-tighter leading-none">
          SYNTAX
          <br className="sm:hidden" />
          <span className="text-primary">HEIST</span>
        </h1>

        {/* Tagline */}
        <p className="text-muted text-sm md:text-base tracking-[0.2em] uppercase font-mono">
          {EVENT.tagline}
        </p>

        {/* Animated typewriter — fixed height to prevent layout shift */}
        <div className="h-5 flex items-center">
          <TerminalText
            phrases={TERMINAL_PHRASES}
            className="text-primary text-xs"
          />
        </div>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <GlowButton href="/register" size="lg">
            Register Now
          </GlowButton>
          <GlowButton href="/guide" variant="outline" size="lg">
            Event Guide
          </GlowButton>
        </div>

        {/* Event badge */}
        <div className="pt-2">
          <span
            className="border border-primary/40 px-5 py-2 rounded-full
                       text-[10px] text-primary font-mono tracking-[0.25em] uppercase"
          >
            24 Hours &nbsp;·&nbsp; {EVENT.date.displayStart} &nbsp;·&nbsp;{" "}
            {EVENT.venue.shortName}, {EVENT.venue.city}
          </span>
        </div>

      </div>

      {/* Scroll hint arrow */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-2 text-primary/40 animate-bounce motion-reduce:animate-none"
        aria-hidden="true"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-primary/40" />
        <span className="text-[8px] font-mono tracking-widest uppercase rotate-0">
          scroll
        </span>
      </div>
    </section>
  );
}
