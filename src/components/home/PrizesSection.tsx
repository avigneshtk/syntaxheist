// PrizesSection — Prize tiers with clear, honest TBA placeholders.
// Server Component. Strictly respects: "Do not invent prize amounts."

import SectionLabel from '@/components/ui/SectionLabel'
import { PRIZES } from '@/lib/constants'
import { Trophy, Medal, Star, CheckCircle2, AlertCircle } from 'lucide-react'

export default function PrizesSection() {
  const getRankIcon = (rank: string) => {
    switch (rank) {
      case '01':
        return <Trophy className="text-yellow-400" size={24} />
      case '02':
        return <Medal className="text-slate-300" size={24} />
      case '03':
        return <Medal className="text-amber-600" size={24} />
      default:
        return <Star className="text-primary" size={24} />
    }
  }

  return (
    <section
      id="prizes"
      aria-labelledby="prizes-heading"
      className="relative py-24 sm:py-32 border-t border-primary/10 bg-surface/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <SectionLabel className="mb-3">05 // RECOGNITION & HONORS</SectionLabel>
          <h2
            id="prizes-heading"
            className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase"
          >
            Prize <span className="text-primary">Pool</span>
          </h2>
          <p className="mt-4 text-muted text-sm sm:text-base leading-relaxed">
            Excellence and engineering craftsmanship will be rewarded. Prize details, award categories,
            and participant benefits will be published once officially confirmed by the organizing committee.
          </p>

          {/* Official Placeholder Disclaimer */}
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono">
            <AlertCircle size={14} className="shrink-0" />
            <span>PRIZE DETAILS & AWARDS ARE SUBJECT TO OFFICIAL CONFIRMATION BY ORGANIZERS</span>
          </div>
        </div>

        {/* Prize Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRIZES.map((prize) => {
            const isWinner = prize.rank === '01'
            return (
              <div
                key={prize.title}
                className={`relative rounded-lg p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group ${
                  isWinner
                    ? 'bg-surface border-2 border-primary shadow-[0_0_30px_rgba(114,255,117,0.15)] -translate-y-2'
                    : 'bg-surface/80 border border-primary/15 hover:border-primary/40'
                }`}
              >
                {/* Winner Top Badge */}
                {isWinner && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-[#080b08] font-mono font-bold text-[10px] tracking-widest uppercase">
                    CHAMPION TIER
                  </span>
                )}

                <div>
                  {/* Top Bar: Icon & Rank */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-2.5 rounded-md bg-base border border-primary/15">
                      {getRankIcon(prize.rank)}
                    </div>
                    <span className="text-2xl font-mono font-black text-muted/40 group-hover:text-primary transition-colors">
                      {prize.rank}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {prize.title}
                  </h3>

                  {/* Status Badge */}
                  <div className="mt-3 inline-block px-3 py-1 rounded bg-base border border-primary/20">
                    <span className="text-xs font-mono font-bold text-primary tracking-wider uppercase">
                      [{prize.status}]
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-xs text-muted leading-relaxed">
                    {prize.description}
                  </p>
                </div>

                {/* Perks Checklist */}
                <div className="mt-6 pt-5 border-t border-primary/10 space-y-2">
                  {prize.perks.map((perk) => (
                    <div key={perk} className="flex items-center gap-2 text-xs text-muted/80">
                      <CheckCircle2 size={13} className="text-primary shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-xs font-mono text-muted/60">
            Participant benefits: Subject to organizer confirmation.
          </p>
        </div>

      </div>
    </section>
  )
}
