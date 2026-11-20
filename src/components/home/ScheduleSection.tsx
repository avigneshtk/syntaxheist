
'use client'

// ScheduleSection — Interactive 24-hour event timeline.
// Client Component: filtering between Day 1, Day 2, and all milestones.

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

  const filterButtonClasses =
    'inline-flex min-h-10 items-center justify-center rounded-sm px-4 py-2 font-mono text-xs uppercase tracking-wider transition-[color,background-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface motion-reduce:transition-none'

  return (
    <section
      id="schedule"
      aria-labelledby="schedule-heading"
      className="relative border-t border-primary/10 bg-base py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <SectionLabel className="mb-3">04 // 24-HOUR RUNTIME</SectionLabel>

          <h2
            id="schedule-heading"
            className="text-3xl font-black uppercase tracking-tight text-white sm:text-5xl"
          >
            The Execution <span className="text-primary">Timeline</span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            From the 10:00 AM kickoff to the 24-hour conclusion, here is the provisional roadmap
            for the hackathon. All milestones and activity timings are tentative and subject to organizer confirmation.
          </p>

          {/* Provisional Disclaimer */}
          <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 font-mono text-xs text-yellow-400">
            <AlertCircle size={14} className="shrink-0" aria-hidden="true" />
            <span>
              TENTATIVE TIMELINE — MILESTONES &amp; SLOTS SUBJECT TO ORGANIZER CONFIRMATION
            </span>
          </div>

          {/* Interactive Schedule Filters */}
          <div
            role="group"
            aria-label="Filter schedule by day"
            className="mt-8 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-md border border-primary/20 bg-surface p-2"
          >
            <button
              type="button"
              aria-pressed={activeTab === 'all'}
              onClick={() => setActiveTab('all')}
              className={`${filterButtonClasses} ${
                activeTab === 'all'
                  ? 'bg-primary font-bold text-[#080b08] shadow-[0_0_12px_rgba(114,255,117,0.4)]'
                  : 'text-muted hover:bg-primary/10 hover:text-white'
              }`}
            >
              Full 24-Hours
            </button>

            <button
              type="button"
              aria-pressed={activeTab === 1}
              onClick={() => setActiveTab(1)}
              className={`${filterButtonClasses} ${
                activeTab === 1
                  ? 'bg-primary font-bold text-[#080b08] shadow-[0_0_12px_rgba(114,255,117,0.4)]'
                  : 'text-muted hover:bg-primary/10 hover:text-white'
              }`}
            >
              Day 01 ({EVENT.date.displayStart})
            </button>

            <button
              type="button"
              aria-pressed={activeTab === 2}
              onClick={() => setActiveTab(2)}
              className={`${filterButtonClasses} ${
                activeTab === 2
                  ? 'bg-primary font-bold text-[#080b08] shadow-[0_0_12px_rgba(114,255,117,0.4)]'
                  : 'text-muted hover:bg-primary/10 hover:text-white'
              }`}
            >
              Day 02 ({EVENT.date.displayEnd})
            </button>
          </div>
        </div>

        {/* Timeline Flow */}
        <div className="relative ml-4 space-y-8 border-l border-primary/20 pl-6 sm:ml-8 sm:pl-8">
          {filteredItems.map((item, index) => (
            <div
              key={`${item.time}-${item.label}-${index}`}
              className="group relative"
            >
              {/* Timeline Node Dot */}
              <div
                className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-primary/50 bg-base transition-[border-color,background-color,transform] duration-200 group-hover:scale-125 group-hover:border-primary group-hover:bg-primary motion-reduce:transition-none sm:-left-[39px]"
                aria-hidden="true"
              />

              {/* Milestone Card */}
              <div className="rounded-lg border border-primary/15 bg-surface/70 p-5 transition-[border-color,background-color] duration-200 group-hover:border-primary/40 group-hover:bg-surface motion-reduce:transition-none sm:p-6">
                <div className="flex flex-col justify-between gap-2 pb-2 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2">
                    <span className="rounded border border-primary/10 bg-base p-1.5">
                      {getIcon(item.type)}
                    </span>

                    <span className="font-mono text-xs font-bold tracking-wider text-primary sm:text-sm">
                      {item.time}
                    </span>

                    <span className="ml-1 font-mono text-[10px] uppercase tracking-widest text-muted/60">
                      [DAY 0{item.day}]
                    </span>
                  </div>

                  {item.type && (
                    <span className="self-start rounded border border-primary/10 bg-base px-2 py-0.5 font-mono text-[9px] uppercase text-muted sm:self-auto">
                      {item.type}
                    </span>
                  )}
                </div>

                <h3 className="mt-1 text-base font-bold text-white transition-colors duration-200 group-hover:text-primary motion-reduce:transition-none sm:text-lg">
                  {item.label}
                </h3>

                {item.description && (
                  <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <p className="rounded-lg border border-primary/15 bg-surface p-6 text-center text-sm text-muted">
              No schedule milestones are available for this day yet.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
