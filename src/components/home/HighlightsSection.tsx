// HighlightsSection — Key event statistics & architectural highlights.
// Server Component.

import SectionLabel from '@/components/ui/SectionLabel'
import { HIGHLIGHTS } from '@/lib/constants'

export default function HighlightsSection() {
  return (
    <section
      id="highlights"
      aria-labelledby="highlights-heading"
      className="relative py-20 sm:py-28 border-t border-primary/10 bg-surface/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <SectionLabel className="mb-3">03 // KEY PARAMETERS</SectionLabel>
          <h2
            id="highlights-heading"
            className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase"
          >
            The SyntaxHeist <span className="text-primary">Experience</span>
          </h2>
        </div>

        {/* 4-Chip Stat Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HIGHLIGHTS.map((item, idx) => (
            <div
              key={item.label}
              className="bg-surface/80 border border-primary/15 rounded-lg p-6 sm:p-7
                         flex flex-col justify-between relative group
                         transition-all duration-300 hover:border-primary/40 hover:bg-surface hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-muted/60 tracking-widest uppercase">
                  METRIC_0{idx + 1}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
              </div>

              <div>
                <span className="text-4xl sm:text-5xl font-mono font-black text-primary tracking-tight">
                  {item.number}
                </span>
                <h3 className="mt-2 text-base font-bold text-white tracking-wide">
                  {item.label}
                </h3>
                <p className="mt-2 text-muted text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
