// AboutSection — Hackathon narrative & IEEE FISAT Student Branch background.
// Server Component with clean cyber layout.

import SectionLabel from '@/components/ui/SectionLabel'
import { EVENT } from '@/lib/constants'
import { Terminal, Shield, Zap, Cpu } from 'lucide-react'

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-24 sm:py-32 border-t border-primary/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <SectionLabel className="mb-3">01 // THE INITIATIVE</SectionLabel>
          <h2
            id="about-heading"
            className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase"
          >
            Engineered for <span className="text-primary">Disruption</span>
          </h2>
          <p className="mt-4 text-muted text-sm sm:text-base leading-relaxed">
            SyntaxHeist is not just another hackathon. It is a high-intensity, 24-hour innovation sprint
            organized by IEEE FISAT Student Branch to challenge developers, designers, and problem solvers to build meaningful, production-grade solutions.
          </p>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Narrative & Values */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8 bg-surface/50 border border-primary/15 rounded-lg p-6 sm:p-10 relative">
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
                The 24-Hour Crucible
              </h3>
              
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                For 24 straight hours, student innovators from engineering institutions across the state will gather at the Federal Institute of Science and Technology (FISAT), Angamaly. The mission: convert bold concepts into functional prototypes before the timer reaches zero.
              </p>

              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Organized under the auspices of <span className="text-white font-medium">IEEE FISAT Student Branch</span>, SyntaxHeist fosters cross-domain experimentation. Whether your passion lies in intelligent neural networks, decentralized protocols, or cyber defense, this hackathon provides the platform, compute, and mentorship to realize it.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-primary/10">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-primary/10 text-primary shrink-0 mt-0.5">
                  <Cpu size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Unrestricted Tech</h4>
                  <p className="text-[11px] text-muted mt-1 leading-tight">Pick any framework, API, or hardware architecture.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-primary/10 text-primary shrink-0 mt-0.5">
                  <Zap size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Rapid Mentorship</h4>
                  <p className="text-[11px] text-muted mt-1 leading-tight">Active technical feedback rounds from industry veterans.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-primary/10 text-primary shrink-0 mt-0.5">
                  <Shield size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Zero Fee Barrier</h4>
                  <p className="text-[11px] text-muted mt-1 leading-tight">100% free participation including food and workspace.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Terminal Spec Box */}
          <div className="lg:col-span-5 bg-surface border border-primary/20 rounded-lg p-5 sm:p-7 flex flex-col justify-between font-mono relative group">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-primary/15">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary/80 inline-block" />
              </div>
              <span className="text-[10px] text-muted uppercase tracking-widest flex items-center gap-1.5">
                <Terminal size={12} className="text-primary" />
                syntaxheist://manifest
              </span>
            </div>

            {/* Terminal Specs Body */}
            <div className="space-y-4 text-xs leading-relaxed text-muted">
              <div>
                <span className="text-primary">root@syntaxheist:~$</span> cat event_specs.json
              </div>

              <div className="bg-base/80 p-4 rounded border border-primary/10 space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-muted/70">EVENT:</span>
                  <span className="text-white font-bold">{EVENT.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted/70">ORGANIZER:</span>
                  <span className="text-primary">{EVENT.organizer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted/70">WINDOW:</span>
                  <span className="text-white">24 Continuous Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted/70">DATE:</span>
                  <span className="text-white">{EVENT.date.displayStart}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted/70">VENUE:</span>
                  <span className="text-white">{EVENT.venue.shortName}, {EVENT.venue.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted/70">TEAM SIZE:</span>
                  <span className="text-white">{EVENT.registration.teamSizeMin} – {EVENT.registration.teamSizeMax} Members</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted/70">ADMISSION:</span>
                  <span className="text-primary uppercase font-bold">{EVENT.registration.fee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted/70">STATUS:</span>
                  <span className="text-yellow-400 font-bold uppercase">Registration Opening Soon</span>
                </div>
              </div>

              <div className="pt-2 text-muted/60 text-[10px]">
                # Verification hash: SH27-IEEE-FISAT-STB64341
              </div>
            </div>

            {/* System Status Footnote */}
            <div className="pt-4 mt-6 border-t border-primary/10 flex items-center justify-between text-[10px]">
              <span className="text-muted">HOST NODE: KERALA-IN-SOUTH</span>
              <span className="text-primary flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                SYSTEM ONLINE
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
