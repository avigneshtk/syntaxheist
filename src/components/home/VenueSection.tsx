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
      className="relative py-24 sm:py-32 border-t border-primary/10 bg-base"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <SectionLabel className="mb-3">06 // THE ARENA</SectionLabel>
          <h2
            id="venue-heading"
            className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase"
          >
            Hackathon <span className="text-primary">Headquarters</span>
          </h2>
          <p className="mt-4 text-muted text-sm sm:text-base leading-relaxed">
            SyntaxHeist will take place on the campus of Federal Institute of Science and Technology (FISAT),
            located in Hormis Nagar, Mookkannoor, Angamaly, Kerala.
          </p>
        </div>

        {/* 2-Column Grid: Campus Info + Amenity Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Campus Card */}
          <div className="lg:col-span-7 bg-surface border border-primary/20 rounded-lg p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Corner cyber ticks */}
            <span className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/30 pointer-events-none" />

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-base border border-primary/20 text-xs font-mono text-primary uppercase">
                <Building size={14} />
                <span>OFFICIAL VENUE HOST</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {EVENT.venue.name}
                </h3>
                <p className="text-primary font-mono text-sm mt-1">
                  {EVENT.venue.shortName} · Hormis Nagar, Angamaly
                </p>
              </div>

              <address className="not-italic text-sm text-muted leading-relaxed space-y-1">
                <p>{EVENT.venue.addressLine}</p>
                <p>{EVENT.venue.district}, {EVENT.venue.state} — {EVENT.venue.pincode}</p>
              </address>

              {/* Transit Distance Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-primary/10">
                <div className="flex items-center gap-3 p-3 rounded bg-base/60 border border-primary/10">
                  <div className="p-2 rounded bg-primary/10 text-primary">
                    <Train size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Angamaly Railway Station</h4>
                    <p className="text-[11px] text-muted">~8 km from campus</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded bg-base/60 border border-primary/10">
                  <div className="p-2 rounded bg-primary/10 text-primary">
                    <Plane size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Cochin International Airport</h4>
                    <p className="text-[11px] text-muted">~14 km from campus</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Maps CTA */}
            <div className="mt-8 pt-6 border-t border-primary/10 flex flex-wrap items-center gap-4">
              <a
                href={EVENT.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-primary text-[#080b08] font-bold font-mono text-xs tracking-widest uppercase hover:bg-white hover:shadow-[0_0_20px_rgba(114,255,117,0.5)] transition-all"
              >
                <Navigation size={14} />
                <span>Open in Google Maps</span>
              </a>
              <span className="text-xs font-mono text-muted/60 flex items-center gap-1.5">
                <MapPin size={12} className="text-primary" />
                Coordinates: 10.2312° N, 76.4103° E
              </span>
            </div>
          </div>

          {/* Right Column: Infrastructure & Hackathon Amenities */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            
            <div className="bg-surface/80 border border-primary/15 rounded-lg p-6 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="p-3 rounded-md bg-base text-primary border border-primary/20 shrink-0">
                <Wifi size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Dedicated High-Speed Network</h4>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  High-bandwidth gigabit Wi-Fi infrastructure configured specifically for concurrent hackathon participants and remote API access.
                </p>
              </div>
            </div>

            <div className="bg-surface/80 border border-primary/15 rounded-lg p-6 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="p-3 rounded-md bg-base text-primary border border-primary/20 shrink-0">
                <Zap size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">24/7 Uninterrupted Power</h4>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Complete laboratory workspace power backup ensuring continuous sprint development through the night without disruptions.
                </p>
              </div>
            </div>

            <div className="bg-surface/80 border border-primary/15 rounded-lg p-6 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="p-3 rounded-md bg-base text-primary border border-primary/20 shrink-0">
                <Building size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Rest & Refreshment Zones</h4>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Dedicated dining halls for scheduled meals, round-the-clock coffee stations, and designated quiet recovery zones.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
