'use client'

// ScheduleSection — Interactive 24-hour event timeline.
// Client Component: tabbed switching between Day 1, Day 2, and All milestones.
// Clean semantic timeline with keyboard accessible tabs.

import { useState } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import { SCHEDULE, EVENT } from '@/lib/constants'
import { Clock, Flag, Terminal, Coffee, Award, AlertCircle } from 'lucide-react'

type TabOption = 'all' | 1 | 2

export default function ScheduleSection() {
  const [activeTab, setActiveTab] = useState<TabOption>('all')

  const filteredItems = SCHEDULE.filter((item) => {
    if (activeTab === 'all') return true
    return item.day === activeTab
  })

  const getIcon = (type?: string) => {
    switch (type) {
      case 'keynote':
        return <Flag size={14} className="text-primary" />
      case 'hack':
        return <Terminal size={14} className="text-yellow-400" />
      case 'food':
        return <Coffee size={14} className="text-blue-400" />
      case 'review':
        return <Clock size={14} className="text-purple-400" />
      case 'deadline':
      default:
        return <Award size={14} className="text-emerald-400" />
    }
  }

  return (
    <section
      id="schedule"
      aria-labelledby="schedule-heading"
      className="relative py-24 sm:py-32 border-t border-primary/10 bg-base"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <SectionLabel className="mb-3">04 // 24-HOUR RUNTIME</SectionLabel>
          <h2
            id="schedule-heading"
            className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase"
          >
            The Execution <span className="text-primary">Timeline</span>
          </h2>
          <p className="mt-4 text-muted text-sm sm:text-base leading-relaxed">
            From the 10:00 AM kickoff to the 24-hour conclusion, here is the provisional roadmap
            for the hackathon. All milestones and activity timings are tentative and subject to organizer confirmation.
          </p>

          {/* Provisional Disclaimer */}
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono">
            <AlertCircle size={14} className="shrink-0" />
            <span>TENTATIVE TIMELINE — MILESTONES & SLOTS SUBJECT TO ORGANIZER CONFIRMATION</span>
          </div>

          {/* Interactive Day Tabs */}
          <div
            role="tablist"
            aria-label="Filter schedule by day"
            className="inline-flex items-center gap-2 p-1 mt-8 bg-surface border border-primary/20 rounded-md"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'all'}
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 text-xs font-mono tracking-wider uppercase rounded-sm transition-all ${
                activeTab === 'all'
                  ? 'bg-primary text-[#080b08] font-bold shadow-[0_0_12px_rgba(114,255,117,0.4)]'
                  : 'text-muted hover:text-white'
              }`}
            >
              Full 24-Hours
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 1}
              onClick={() => setActiveTab(1)}
              className={`px-4 py-1.5 text-xs font-mono tracking-wider uppercase rounded-sm transition-all ${
                activeTab === 1
                  ? 'bg-primary text-[#080b08] font-bold shadow-[0_0_12px_rgba(114,255,117,0.4)]'
                  : 'text-muted hover:text-white'
              }`}
            >
              Day 01 ({EVENT.date.displayStart})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 2}
              onClick={() => setActiveTab(2)}
              className={`px-4 py-1.5 text-xs font-mono tracking-wider uppercase rounded-sm transition-all ${
                activeTab === 2
                  ? 'bg-primary text-[#080b08] font-bold shadow-[0_0_12px_rgba(114,255,117,0.4)]'
                  : 'text-muted hover:text-white'
              }`}
            >
              Day 02 ({EVENT.date.displayEnd})
            </button>
          </div>
        </div>

        {/* Timeline Flow */}
        <div className="relative pl-6 sm:pl-8 border-l border-primary/20 ml-4 sm:ml-8 space-y-8">
          {filteredItems.map((item, index) => (
            <div
              key={`${item.time}-${item.label}-${index}`}
              className="relative group transition-all"
            >
              {/* Timeline Node Dot */}
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-base border-2 border-primary/50 group-hover:border-primary group-hover:scale-125 group-hover:bg-primary transition-all duration-200"
                aria-hidden="true"
              />

              {/* Milestone Card */}
              <div className="bg-surface/70 border border-primary/15 rounded-lg p-5 sm:p-6 transition-all duration-200 group-hover:border-primary/40 group-hover:bg-surface">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded bg-base border border-primary/10">
                      {getIcon(item.type)}
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-primary font-bold tracking-wider">
                      {item.time}
                    </span>
                    <span className="text-[10px] font-mono text-muted/60 tracking-widest uppercase ml-1">
                      [DAY 0{item.day}]
                    </span>
                  </div>

                  {item.type && (
                    <span className="self-start sm:self-auto text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-base border border-primary/10 text-muted">
                      {item.type}
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mt-1 group-hover:text-primary transition-colors">
                  {item.label}
                </h3>

                {item.description && (
                  <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
