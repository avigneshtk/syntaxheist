
// VenueSection — Venue information for FISAT, Angamaly.
// Server Component.

import SectionLabel from '@/components/ui/SectionLabel'
import { EVENT } from '@/lib/constants'
import { MapPin, Navigation, Wifi, Zap, Building, Train, Plane } from 'lucide-react'

export default function VenueSection() {
  return (
    <section
      id="venue"
      aria-labelledby="venue-heading"
      className="relative border-t border-primary/10 bg-base py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
          <SectionLabel className="mb-3">06 // THE ARENA</SectionLabel>
          <h2
            id="venue-heading"
            className="text-3xl font-black uppercase tracking-tight text-white sm:text-5xl"
          >
            Hackathon <span className="text-primary">Headquarters</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            SyntaxHeist will take place on the campus of Federal Institute of Science and Technology (FISAT),
            located in Hormis Nagar, Mookkannoor, Angamaly, Kerala.
          </p>
        </div>

        {/* Campus Info + Amenities */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">

          {/* Left Column: Campus Card */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-lg border border-primary/20 bg-surface p-6 sm:p-10 lg:col-span-7">
            {/* Corner cyber tick */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-primary/30"
            />

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded border border-primary/20 bg-base px-3 py-1 font-mono text-xs uppercase text-primary">
                <Building size={14} aria-hidden="true" />
                <span>OFFICIAL VENUE HOST</span>
              </div>

              <div>
                <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                  {EVENT.venue.name}
                </h3>
                <p className="mt-1 font-mono text-sm text-primary">
                  {EVENT.venue.shortName} · Hormis Nagar, Angamaly
                </p>
              </div>

              <address className="space-y-1 text-sm leading-relaxed text-muted not-italic">
                <p>{EVENT.venue.addressLine}</p>
                <p>
                  {EVENT.venue.district}, {EVENT.venue.state} — {EVENT.venue.pincode}
                </p>
              </address>

              {/* Transit Distance Highlights */}
              <div className="grid grid-cols-1 gap-4 border-t border-primary/10 pt-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded border border-primary/10 bg-base/60 p-3">
                  <div className="shrink-0 rounded bg-primary/10 p-2 text-primary">
                    <Train size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      Angamaly Railway Station
                    </h4>
                    <p className="text-[11px] text-muted">
                      ~8 km (Approximate transit distance)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded border border-primary/10 bg-base/60 p-3">
                  <div className="shrink-0 rounded bg-primary/10 p-2 text-primary">
                    <Plane size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      Cochin International Airport
                    </h4>
                    <p className="text-[11px] text-muted">
                      ~14 km (Approximate transit distance)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-primary/10 pt-6">
              <a
                href={EVENT.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open FISAT location in Google Maps (opens in a new tab)"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-[#080b08] transition-[background-color,box-shadow,transform] duration-200 hover:bg-white hover:text-[#080b08] hover:shadow-[0_0_20px_rgba(114,255,117,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base motion-reduce:transition-none"
              >
                <Navigation size={14} aria-hidden="true" />
                <span>Open in Google Maps</span>
              </a>

              <span className="flex items-center gap-1.5 font-mono text-xs text-muted/60">
                <MapPin size={12} className="text-primary" aria-hidden="true" />
                Location: Angamaly, Ernakulam, Kerala
              </span>
            </div>
          </div>

          {/* Right Column: Infrastructure & Amenities */}
          <div className="flex flex-col justify-between gap-4 lg:col-span-5">

            <div className="flex items-start gap-4 rounded-lg border border-primary/15 bg-surface/80 p-6 transition-colors duration-200 hover:border-primary/30 motion-reduce:transition-none">
              <div className="shrink-0 rounded-md border border-primary/20 bg-base p-3 text-primary">
                <Wifi size={20} aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                  Campus Connectivity
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Network connectivity and on-site access arrangements will be confirmed by the organizing committee.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg border border-primary/15 bg-surface/80 p-6 transition-colors duration-200 hover:border-primary/30 motion-reduce:transition-none">
              <div className="shrink-0 rounded-md border border-primary/20 bg-base p-3 text-primary">
                <Zap size={20} aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                  Workspace &amp; Power
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Venue facilities, power access, and workspace arrangements will be confirmed by the organizing committee.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg border border-primary/15 bg-surface/80 p-6 transition-colors duration-200 hover:border-primary/30 motion-reduce:transition-none">
              <div className="shrink-0 rounded-md border border-primary/20 bg-base p-3 text-primary">
                <Building size={20} aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                  Facilities &amp; Logistics
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Venue facilities and participant arrangements will be confirmed by the organizing committee.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
