
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  Trophy,
  Code2,
  Laptop,
  ShieldCheck,
  CircleHelp,
  ExternalLink,
  Terminal,
} from 'lucide-react'

import SectionLabel from '@/components/ui/SectionLabel'
import GlowButton from '@/components/ui/GlowButton'
import { EVENT, TRACKS, SCHEDULE, PRIZES, FAQS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Event Guide | SyntaxHeist 2027',
  description:
    'Event guide for SyntaxHeist 2027, a planned 24-hour hackathon organized by IEEE FISAT Student Branch. Event details are subject to organizer confirmation.',
}

const cardHover =
  'transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_12px_35px_rgba(114,255,117,0.07)] motion-reduce:transform-none motion-reduce:transition-none'

const eventDetails = [
  {
    icon: CalendarDays,
    label: 'EVENT DATES',
    value: `${EVENT.date.displayStart} – ${EVENT.date.displayEnd}`,
  },
  {
    icon: Clock3,
    label: 'DURATION',
    value: EVENT.date.duration,
  },
  {
    icon: MapPin,
    label: 'VENUE',
    value: `${EVENT.venue.shortName}, ${EVENT.venue.city}`,
  },
  {
    icon: Users,
    label: 'TEAM SIZE',
    value: EVENT.registration.teamSize,
  },
]

const participationItems = [
  {
    icon: Laptop,
    title: 'Bring Your Equipment',
    description:
      'Participants are generally expected to bring their personal laptops and chargers. Permitted equipment and venue arrangements will be confirmed by the organizers.',
  },
  {
    icon: ShieldCheck,
    title: 'Follow Official Rules',
    description:
      'Eligibility, team formation, pre-event development, and participation guidelines will be confirmed in the official event rules.',
  },
  {
    icon: Code2,
    title: 'Build During the Hackathon',
    description:
      'The planned 24-hour hacking window is scheduled to begin at 10:00 AM IST on 20 March 2027. The final timing and project development guidelines will be announced by the organizing committee.',
  },
]

export default function EventGuidePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-base text-white">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(rgba(114,255,117,0.13) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Hero */}
      <section
        aria-labelledby="guide-heading"
        className="relative px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36"
      >
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-sm text-xs font-mono uppercase tracking-widest text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to Home
          </Link>

          <div className="mx-auto mt-12 max-w-4xl text-center">
            <SectionLabel>OFFICIAL EVENT DOCUMENTATION</SectionLabel>

            <h1
              id="guide-heading"
              className="mt-6 text-5xl font-black uppercase tracking-tighter sm:text-7xl md:text-8xl"
            >
              EVENT
              <span className="text-primary"> GUIDE</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              Everything you need to know about SyntaxHeist 2027.
              Explore the event details, technology tracks, schedule,
              participation information, and frequently asked questions.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="rounded-full border border-primary/30 px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-primary">
                {EVENT.date.duration}
              </span>
              <span className="rounded-full border border-primary/30 px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-primary">
                {EVENT.date.displayStart}
              </span>
              <span className="rounded-full border border-primary/30 px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-primary">
                {EVENT.venue.shortName} · {EVENT.venue.city}
              </span>
            </div>

            <div
              role="note"
              className="mt-8 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4 text-left"
            >
              <p className="text-xs font-mono uppercase tracking-widest text-yellow-400">
                EVENT INFORMATION: PROVISIONAL
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Event dates, timings, venue arrangements, tracks, and
                participation details are currently planned information
                and remain subject to official organizer confirmation.
                Please follow official announcements for final details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Overview */}
      <section
        aria-labelledby="overview-heading"
        className="relative border-t border-primary/10 py-16"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionLabel>01 // EVENT OVERVIEW</SectionLabel>

          <h2
            id="overview-heading"
            className="mt-4 text-3xl font-black uppercase tracking-tight sm:text-4xl"
          >
            Know the <span className="text-primary">Mission</span>
          </h2>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted">
            {EVENT.fullName} is a {EVENT.edition} organized by{' '}
            {EVENT.organizer}. Participants are expected to work on
            innovative solutions, develop prototypes, and collaborate
            across technology domains during an intensive 24-hour event.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {eventDetails.map((detail) => {
              const Icon = detail.icon

              return (
                <div
                  key={detail.label}
                  className={`rounded-lg border border-primary/15 bg-surface p-6 ${cardHover}`}
                >
                  <Icon
                    size={22}
                    className="text-primary"
                    aria-hidden="true"
                  />

                  <p className="mt-5 text-[10px] font-mono uppercase tracking-widest text-muted">
                    {detail.label}
                  </p>

                  <p className="mt-2 break-words text-sm font-bold text-white">
                    {detail.value}
                  </p>
                </div>
              )
            })}
          </div>

          <div
            className={`mt-8 rounded-lg border border-primary/15 bg-surface/60 p-6 ${cardHover}`}
          >
            <p className="text-xs font-mono uppercase tracking-widest text-primary">
              ORGANIZED BY
            </p>
            <p className="mt-2 text-lg font-bold">
              {EVENT.organizer}
            </p>
            <p className="mt-2 text-xs text-muted">
              {EVENT.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section
        id="tracks"
        aria-labelledby="tracks-heading"
        className="relative border-t border-primary/10 bg-surface/20 py-16"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionLabel>02 // TECHNOLOGY DOMAINS</SectionLabel>

          <h2
            id="tracks-heading"
            className="mt-4 text-3xl font-black uppercase sm:text-4xl"
          >
            Innovation <span className="text-primary">Tracks</span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            Explore the proposed technology domains for SyntaxHeist.
            Choose a direction for your innovation and build a meaningful solution.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TRACKS.map((track, index) => (
              <article
                key={track.id}
                className={`rounded-lg border border-primary/15 bg-surface p-6 ${cardHover}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl text-primary" aria-hidden="true">
                    {track.symbol}
                  </span>

                  <span className="text-[10px] font-mono text-muted/60">
                    TRACK_0{index + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  {track.name}
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-muted">
                  {track.description}
                </p>

                {track.tags && (
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-primary/10 pt-4">
                    {track.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-primary/10 bg-base px-2.5 py-1 text-[10px] font-mono text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-xs font-mono text-muted/60">
            Track information is subject to official organizer updates.
          </p>
        </div>
      </section>

      {/* Schedule */}
      <section
        id="schedule"
        aria-labelledby="schedule-heading"
        className="relative border-t border-primary/10 py-16"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionLabel>03 // EVENT TIMELINE</SectionLabel>

          <h2
            id="schedule-heading"
            className="mt-4 text-3xl font-black uppercase sm:text-4xl"
          >
            24-Hour <span className="text-primary">Schedule</span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-muted">
            The planned timeline for the 24-hour hackathon.
            Individual activities and arrangements may be updated
            by the organizing committee.
          </p>

          <div className="mt-8 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
            <p className="text-xs font-mono text-yellow-400">
              SCHEDULE STATUS: PROVISIONAL — SUBJECT TO ORGANIZER CONFIRMATION
            </p>
          </div>

          <div className="mt-10 space-y-12">
            {(
              [
                {
                  day: 1,
                  title: 'DAY 01',
                  date: EVENT.date.displayStart,
                },
                {
                  day: 2,
                  title: 'DAY 02',
                  date: EVENT.date.displayEnd,
                },
              ] as const
            ).map((group) => (
              <div key={group.day}>
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded bg-primary px-4 py-2 text-xs font-mono font-bold text-[#080b08]">
                    {group.title}
                  </div>
                  <span className="text-xs font-mono text-muted">
                    {group.date}
                  </span>
                  <div className="h-px flex-1 bg-primary/15" />
                </div>

                <div className="ml-2 space-y-4 border-l border-primary/20 pl-6">
                  {SCHEDULE.filter((item) => item.day === group.day).map(
                    (item) => (
                      <div
                        key={`${group.day}-${item.time}-${item.label}`}
                        className={`relative rounded-lg border border-primary/15 bg-surface p-5 ${cardHover}`}
                      >
                        <span
                          className="absolute -left-[31px] top-6 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-base"
                          aria-hidden="true"
                        />

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
                          <span className="text-xs font-mono font-bold text-primary sm:min-w-24">
                            {item.time}
                          </span>

                          <h3 className="text-sm font-bold text-white">
                            {item.label}
                          </h3>
                        </div>

                        {item.description && (
                          <p className="mt-3 text-xs leading-relaxed text-muted">
                            {item.description}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Participation */}
      <section
        id="participation"
        aria-labelledby="participation-heading"
        className="relative border-t border-primary/10 bg-surface/20 py-16"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionLabel>04 // PARTICIPANT INFORMATION</SectionLabel>

          <h2
            id="participation-heading"
            className="mt-4 text-3xl font-black uppercase sm:text-4xl"
          >
            Before You <span className="text-primary">Participate</span>
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {participationItems.map((item) => {
              const Icon = item.icon

              return (
                <article
                  key={item.title}
                  className={`rounded-lg border border-primary/15 bg-surface p-6 ${cardHover}`}
                >
                  <Icon
                    size={24}
                    className="text-primary"
                    aria-hidden="true"
                  />

                  <h3 className="mt-5 text-base font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-muted">
                    {item.description}
                  </p>
                </article>
              )
            })}
          </div>

          <div
            className={`mt-8 rounded-lg border border-primary/15 bg-surface p-6 ${cardHover}`}
          >
            <h3 className="text-sm font-bold text-white">
              Eligibility &amp; Team Formation
            </h3>

            <p className="mt-3 text-xs leading-relaxed text-muted">
              {EVENT.registration.eligibility}
            </p>

            <p className="mt-4 text-xs leading-relaxed text-muted">
              {EVENT.registration.teamSizeNotice}
            </p>
          </div>

          <div
            className={`mt-5 rounded-lg border border-primary/15 bg-surface p-6 ${cardHover}`}
          >
            <h3 className="text-sm font-bold text-white">
              Registration Fee
            </h3>

            <p className="mt-3 text-xs leading-relaxed text-muted">
              {EVENT.registration.feeNote}
            </p>

            <p className="mt-3 text-sm font-mono font-bold text-primary">
              {EVENT.registration.fee}
            </p>
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section
        id="prizes"
        aria-labelledby="prizes-heading"
        className="relative border-t border-primary/10 py-16"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionLabel>05 // RECOGNITION &amp; HONORS</SectionLabel>

          <h2
            id="prizes-heading"
            className="mt-4 text-3xl font-black uppercase sm:text-4xl"
          >
            Awards &amp; <span className="text-primary">Recognition</span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-muted">
            The award categories planned for SyntaxHeist.
            Official prize amounts and participant benefits
            will be announced by the organizers.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PRIZES.map((prize) => (
              <article
                key={prize.title}
                className={`rounded-lg border border-primary/15 bg-surface p-6 ${cardHover}`}
              >
                <Trophy
                  size={24}
                  className="text-primary"
                  aria-hidden="true"
                />

                <p className="mt-5 text-xs font-mono text-muted">
                  RANK {prize.rank}
                </p>

                <h3 className="mt-2 text-base font-bold">
                  {prize.title}
                </h3>

                <p className="mt-3 text-xs font-mono text-primary">
                  {prize.status}
                </p>

                <p className="mt-4 text-xs leading-relaxed text-muted">
                  {prize.description}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-6 text-center text-xs font-mono text-muted/60">
            Prize details: To be announced.
          </p>
        </div>
      </section>

      {/* Venue */}
      <section
        id="venue"
        aria-labelledby="venue-heading"
        className="relative border-t border-primary/10 bg-surface/20 py-16"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionLabel>06 // EVENT LOCATION</SectionLabel>

          <h2
            id="venue-heading"
            className="mt-4 text-3xl font-black uppercase sm:text-4xl"
          >
            Find the <span className="text-primary">Venue</span>
          </h2>

          <div
            className={`mt-10 rounded-lg border border-primary/20 bg-surface p-6 sm:p-10 ${cardHover}`}
          >
            <div className="flex items-start gap-4">
              <MapPin
                size={28}
                className="shrink-0 text-primary"
                aria-hidden="true"
              />

              <div className="min-w-0">
                <h3 className="break-words text-xl font-bold">
                  {EVENT.venue.name}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {EVENT.venue.addressLine}
                </p>

                <p className="mt-2 break-words text-xs text-muted">
                  {EVENT.venue.district}, {EVENT.venue.state},{' '}
                  {EVENT.venue.country}
                  {' · '}
                  {EVENT.venue.pincode}
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-primary/10 pt-6">
              <p className="text-xs leading-relaxed text-muted">
                Network connectivity, workspace, power access,
                facilities, and participant arrangements will be
                confirmed by the organizing committee.
              </p>

              <a
                href={EVENT.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 text-xs font-mono font-bold uppercase tracking-widest text-[#080b08] transition-all duration-200 hover:bg-white hover:text-[#080b08] hover:shadow-[0_0_22px_rgba(114,255,117,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base motion-reduce:transition-none"
              >
                Open Google Maps
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="relative border-t border-primary/10 py-16"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionLabel>07 // CLARIFICATIONS</SectionLabel>

          <h2
            id="faq-heading"
            className="mt-4 text-3xl font-black uppercase sm:text-4xl"
          >
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>

          <div className="mt-10 space-y-4">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group overflow-hidden rounded-lg border border-primary/15 bg-surface transition-colors duration-300 open:border-primary/40 motion-reduce:transition-none"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
                  <CircleHelp
                    size={18}
                    className="shrink-0 text-primary"
                    aria-hidden="true"
                  />

                  <span className="min-w-0 flex-1 text-sm font-bold text-white">
                    {faq.question}
                  </span>

                  <span
                    aria-hidden="true"
                    className="shrink-0 text-lg text-primary transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                  >
                    +
                  </span>
                </summary>

                <div className="border-t border-primary/10 px-5 pb-5 pt-4">
                  <p className="text-xs leading-relaxed text-muted">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Registration CTA */}
      <section
        id="registration"
        aria-labelledby="registration-heading"
        className="relative border-t border-primary/10 bg-surface/30 py-20"
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Terminal
            size={30}
            className="mx-auto text-primary"
            aria-hidden="true"
          />

          <SectionLabel>08 // JOIN THE MISSION</SectionLabel>

          <h2
            id="registration-heading"
            className="mt-5 text-3xl font-black uppercase sm:text-5xl"
          >
            Ready to <span className="text-primary">Build?</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted">
            Prepare your ideas, explore the technology tracks,
            and stay connected with IEEE FISAT Student Branch
            for official registration announcements.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/5 px-4 py-2">
            <span
              className="h-2 w-2 rounded-full bg-yellow-400"
              aria-hidden="true"
            />
            <span className="text-xs font-mono uppercase tracking-widest text-yellow-400">
              Registration Opening Soon
            </span>
          </div>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <GlowButton href="/register" size="lg">
              Registration Page
            </GlowButton>

            <GlowButton href="/" variant="outline" size="lg">
              Explore Website
            </GlowButton>
          </div>

          <div className="mt-12 border-t border-primary/10 pt-8">
            <p className="text-xs text-muted">
              {EVENT.contact.helpdesk}
            </p>

            {EVENT.contact.email && (
              <a
                href={`mailto:${EVENT.contact.email}`}
                className="mt-3 inline-flex items-center gap-2 break-all text-xs text-primary transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {EVENT.contact.email}
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            )}

            <p className="mt-8 text-[10px] font-mono uppercase tracking-widest text-muted/50">
              {EVENT.fullName} · {EVENT.organizer}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
