// TracksSection — 6 provisional innovation tracks.
// Server Component showcasing domain cards with cyber aesthetics.

import SectionLabel from '@/components/ui/SectionLabel'
import { TRACKS } from '@/lib/constants'

export default function TracksSection() {
  return (
    <section
      id="tracks"
      aria-labelledby="tracks-heading"
      className="relative py-24 sm:py-32 border-t border-primary/10 bg-base"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <SectionLabel className="mb-3">02 // TRACK DOMAINS</SectionLabel>
          <h2
            id="tracks-heading"
            className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase"
          >
            Choose Your <span className="text-primary">Vector</span>
          </h2>
          <p className="mt-4 text-muted text-sm sm:text-base leading-relaxed">
            Six distinct technological frontiers. Whether you are building intelligent neural systems,
            fortifying software security, or pioneering cross-domain solutions, select your arena.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-xs font-mono">
            <span>PROVISIONAL DOMAINS — OFFICIAL TRACK SPECIFICATIONS TO BE CONFIRMED</span>
          </div>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TRACKS.map((track, idx) => (
            <div
              key={track.id}
              className="relative group bg-surface border border-primary/15 rounded-lg p-6 sm:p-8
                         flex flex-col justify-between overflow-hidden
                         transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(114,255,117,0.15)]
                         hover:-translate-y-1"
            >
              {/* Corner accent lines */}
              <span className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/20 group-hover:border-primary transition-colors duration-300 pointer-events-none" />
              <span className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/20 group-hover:border-primary transition-colors duration-300 pointer-events-none" />

              <div>
                {/* Track Number & Symbol */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-mono text-primary select-none" aria-hidden="true">
                    {track.symbol}
                  </span>
                  <span className="text-xs font-mono text-muted/60 tracking-widest uppercase">
                    TRACK_0{idx + 1}
                  </span>
                </div>

                {/* Track Title */}
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-200">
                  {track.name}
                </h3>

                {/* Description */}
                <p className="mt-3 text-muted text-xs sm:text-sm leading-relaxed">
                  {track.description}
                </p>
              </div>

              {/* Tag Pills */}
              {track.tags && (
                <div className="mt-6 pt-5 border-t border-primary/10 flex flex-wrap gap-1.5">
                  {track.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-sm bg-base border border-primary/10 text-[10px] font-mono text-muted group-hover:text-white group-hover:border-primary/25 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footnote on Open Innovation */}
        <div className="mt-12 text-center">
          <p className="text-muted/60 text-xs font-mono">
            Have a game-changing idea that crosses multiple domains? Build in the <span className="text-white">Open Innovation</span> track.
          </p>
        </div>

      </div>
    </section>
  )
}
