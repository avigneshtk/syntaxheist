'use client'

// Navbar — fixed top navigation bar with responsive in-page anchors & pages.
// Client Component: scroll detection via useSyncExternalStore and mobile menu state.

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import SHMonogram from '@/components/ui/SHMonogram'
import GlowButton from '@/components/ui/GlowButton'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'

function subscribeScroll(callback: () => void) {
  window.addEventListener('scroll', callback, { passive: true })
  return () => window.removeEventListener('scroll', callback)
}

function getScrollSnapshot() {
  return window.scrollY > 20
}

function getScrollServerSnapshot() {
  return false
}

export default function Navbar() {
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    getScrollSnapshot,
    getScrollServerSnapshot
  )
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Close on Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && mobileOpen) setMobileOpen(false)
  }, [mobileOpen])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href.startsWith('/#')) return false
    return pathname.startsWith(href)
  }

  const linkClasses = (href: string) =>
    cn(
      'text-xs font-mono tracking-wider uppercase transition-colors duration-150',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm px-1 py-0.5',
      isActive(href)
        ? 'text-primary'
        : 'text-muted hover:text-white',
    )

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-16',
          'transition-all duration-300',
          scrolled
            ? 'bg-surface/90 backdrop-blur-md border-b border-primary/10 shadow-[0_2px_20px_rgba(0,0,0,0.5)]'
            : 'bg-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">

          {/* ── Brand / Logo ───────────────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 group focus-visible:outline-none"
            aria-label="SyntaxHeist — go to home"
          >
            <SHMonogram size={34} className="transition-transform duration-200 group-hover:scale-105" />
            <span className="font-black text-sm tracking-wider hidden sm:block">
              SYNTAX<span className="text-primary">HEIST</span>
            </span>
          </Link>

          {/* ── Desktop nav ────────────────────────────────────────────── */}
          <nav
            className="hidden xl:flex items-center gap-6"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={linkClasses(link.href)}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Tablet nav (Compact view for md to xl) ───────────────────── */}
          <nav
            className="hidden md:flex xl:hidden items-center gap-4 text-xs font-mono"
            aria-label="Primary navigation compact"
          >
            <Link href="/#about" className={linkClasses('/#about')}>About</Link>
            <Link href="/#tracks" className={linkClasses('/#tracks')}>Tracks</Link>
            <Link href="/#schedule" className={linkClasses('/#schedule')}>Schedule</Link>
            <Link href="/#prizes" className={linkClasses('/#prizes')}>Prizes</Link>
            <Link href="/#venue" className={linkClasses('/#venue')}>Venue</Link>
            <Link href="/#faq" className={linkClasses('/#faq')}>FAQ</Link>
            <Link href="/guide" className={linkClasses('/guide')}>Guide</Link>
          </nav>

          {/* ── Desktop CTA ────────────────────────────────────────────── */}
          <div className="hidden md:block shrink-0">
            <GlowButton href="/register" size="sm">
              Register
            </GlowButton>
          </div>

          {/* ── Mobile hamburger ───────────────────────────────────────── */}
          <button
            type="button"
            className={cn(
              'md:hidden p-2 -mr-2 rounded-sm transition-colors',
              'text-muted hover:text-primary',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary',
            )}
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </header>

      {/* ── Mobile menu ──────────────────────────────────────────────────── */}
      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Panel */}
      <nav
        id="mobile-nav"
        aria-label="Mobile navigation"
        className={cn(
          'fixed top-16 left-0 right-0 z-40 md:hidden',
          'bg-surface border-b border-primary/10',
          mobileOpen ? 'max-h-[calc(100vh-4rem)] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden pointer-events-none',
        )}
      >
        <div className="flex flex-col px-6 py-6 gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(linkClasses(link.href), 'text-base py-1')}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-primary/10">
            <GlowButton href="/register" size="md" className="w-full justify-center" onClick={() => setMobileOpen(false)}>
              Register Now
            </GlowButton>
          </div>
        </div>
      </nav>
    </>
  )
}
