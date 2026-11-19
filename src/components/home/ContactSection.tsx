// ContactSection — Official organizer communication channels with clear placeholders.
// Server Component. Respects: "Never invent contact information or official announcements."

import SectionLabel from '@/components/ui/SectionLabel'
import GlowButton from '@/components/ui/GlowButton'
import { EVENT } from '@/lib/constants'
import { Mail, MapPin, MessageSquare } from 'lucide-react'

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-24 sm:py-32 border-t border-primary/10 bg-base"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <SectionLabel className="mb-3">08 // TRANSMISSION & DISPATCH</SectionLabel>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase"
          >
            Connect With the <span className="text-primary">Organizers</span>
          </h2>
          <p className="mt-4 text-muted text-sm sm:text-base leading-relaxed">
            SyntaxHeist is organized by IEEE FISAT Student Branch. Official communication channels,
            participant helpline, and partner desks will be announced prior to registration opening.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Organizer Identity */}
          <div className="bg-surface border border-primary/15 rounded-lg p-6 sm:p-7 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="p-3 rounded-md bg-base text-primary border border-primary/20 w-fit">
                <MessageSquare size={20} />
              </div>
              <h3 className="text-base font-bold text-white uppercase font-mono tracking-wider">
                Student Branch
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                {EVENT.contact.ieeeBranch}
              </p>
              <p className="text-xs text-muted/70">
                Federal Institute of Science and Technology, Angamaly, Kerala.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-primary/10 text-[11px] font-mono text-primary">
              ORGANIZING BODY
            </div>
          </div>

          {/* Card 2: Email & Helpdesk */}
          <div className="bg-surface border border-primary/15 rounded-lg p-6 sm:p-7 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="p-3 rounded-md bg-base text-primary border border-primary/20 w-fit">
                <Mail size={20} />
              </div>
              <h3 className="text-base font-bold text-white uppercase font-mono tracking-wider">
                Electronic Mail
              </h3>
              {EVENT.contact.email ? (
                <a
                  href={`mailto:${EVENT.contact.email}`}
                  className="text-xs text-primary font-mono hover:underline block"
                >
                  {EVENT.contact.email}
                </a>
              ) : (
                <div className="space-y-2">
                  <span className="inline-block px-2.5 py-1 rounded bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-mono text-[11px]">
                    [Official Email TBA]
                  </span>
                  <p className="text-xs text-muted leading-relaxed">
                    Official email dispatch will be published alongside registration rollout.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-primary/10 text-[11px] font-mono text-muted/60">
              COMMUNICATION CHANNEL
            </div>
          </div>

          {/* Card 3: Physical Venue */}
          <div className="bg-surface border border-primary/15 rounded-lg p-6 sm:p-7 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="p-3 rounded-md bg-base text-primary border border-primary/20 w-fit">
                <MapPin size={20} />
              </div>
              <h3 className="text-base font-bold text-white uppercase font-mono tracking-wider">
                Venue Location
              </h3>
              <address className="not-italic text-xs text-muted leading-relaxed space-y-1">
                <p className="text-white font-medium">{EVENT.venue.shortName} Campus</p>
                <p>Mookkannoor P.O., Angamaly</p>
                <p>Ernakulam, Kerala — 683577</p>
              </address>
            </div>

            <div className="mt-6 pt-4 border-t border-primary/10">
              <a
                href={EVENT.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-primary hover:underline"
              >
                View on Google Maps →
              </a>
            </div>
          </div>

        </div>

        {/* Global CTA Box */}
        <div className="mt-16 bg-surface/90 border border-primary/30 rounded-xl p-8 sm:p-12 text-center relative overflow-hidden shadow-[0_0_40px_rgba(114,255,117,0.08)]">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Ready to <span className="text-primary">Break the Code</span>?
            </h3>
            <p className="text-muted text-xs sm:text-sm leading-relaxed">
              Form your team, review the event guide, and prepare for 24 hours of intense problem-solving.
              Registration opens soon for all qualifying engineering students.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <GlowButton href="/register" size="lg">
                Register Your Team
              </GlowButton>
              <GlowButton href="/guide" variant="outline" size="lg">
                Read Event Guide
              </GlowButton>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
