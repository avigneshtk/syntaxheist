// Footer — site-wide footer.
// Server Component — no client interactivity needed.

import Link from 'next/link'
import { MapPin, Mail } from 'lucide-react'
import SHMonogram from '@/components/ui/SHMonogram'
import { NAV_LINKS, EVENT } from '@/lib/constants'

const CURRENT_YEAR = 2026

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-primary/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* ── Main grid ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">

          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <SHMonogram size={34} />
              <span className="font-black text-sm tracking-wider">
                SYNTAX<span className="text-primary">HEIST</span>
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              A 24-hour hackathon organized by IEEE FISAT Student Branch.
              Break the code. Build the future.
            </p>
            <p className="text-muted/50 text-xs font-mono">
              {EVENT.date.displayStart} – {EVENT.date.displayEnd}
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-5">
            <h2 className="text-primary text-xs font-mono tracking-[0.3em] uppercase">
              Navigate
            </h2>
            <ul className="space-y-3" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/register"
                  className="text-primary text-sm hover:text-white transition-colors duration-150 inline-flex items-center gap-1.5"
                >
                  Register <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / venue */}
          <div className="space-y-5">
            <h2 className="text-primary text-xs font-mono tracking-[0.3em] uppercase">
              Venue & Contact
            </h2>
            <address className="not-italic space-y-3">
              <p className="flex items-start gap-2 text-muted text-sm">
                <MapPin size={14} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  {EVENT.venue.name},<br />
                  {EVENT.venue.city}, {EVENT.venue.state} — {EVENT.venue.pincode}
                </span>
              </p>

              {EVENT.contact.email ? (
                <p className="flex items-center gap-2 text-muted text-sm">
                  <Mail size={14} className="text-primary shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${EVENT.contact.email}`}
                    className="hover:text-white transition-colors duration-150"
                  >
                    {EVENT.contact.email}
                  </a>
                </p>
              ) : (
                <p className="text-muted/50 text-xs font-mono">
                  Contact details coming soon.
                </p>
              )}
            </address>
          </div>

        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────────── */}
        <div className="border-t border-primary/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-muted/50 text-xs font-mono">
            © {CURRENT_YEAR} IEEE FISAT Student Branch. All rights reserved.
          </p>
          <p className="text-muted/35 text-xs font-mono text-center sm:text-right">
            Event details are provisional and subject to change.
          </p>
        </div>

      </div>
    </footer>
  )
}
