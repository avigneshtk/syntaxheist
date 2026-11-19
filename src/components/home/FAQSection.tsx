'use client'

// FAQSection — Accessible interactive FAQ accordion.
// Client Component: manages item expansion state with ARIA attributes.
// Keyboard friendly, accessible, and responsive.

import { useState } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import { FAQS } from '@/lib/constants'
import { ChevronDown, HelpCircle } from 'lucide-react'

export default function FAQSection() {
  const [openIndices, setOpenIndices] = useState<number[]>([0]) // First question open by default

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    )
  }

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative py-24 sm:py-32 border-t border-primary/10 bg-surface/30"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <SectionLabel className="mb-3">07 // CLARIFICATIONS</SectionLabel>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase"
          >
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="mt-4 text-muted text-sm sm:text-base leading-relaxed">
            Everything you need to know about eligibility, logistics, rules, and participation for SyntaxHeist.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndices.includes(index)
            const buttonId = `faq-btn-${index}`
            const panelId = `faq-panel-${index}`

            return (
              <div
                key={faq.question}
                className="bg-surface border border-primary/15 rounded-lg overflow-hidden transition-all duration-200 hover:border-primary/35"
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleIndex(index)}
                    className="w-full px-6 py-5 text-left text-white flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base"
                  >
                    <span className="text-sm sm:text-base font-bold text-white flex items-center gap-3">
                      <HelpCircle size={16} className="text-primary shrink-0" aria-hidden="true" />
                      <span className="text-white">{faq.question}</span>
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-primary shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-1 text-muted text-xs sm:text-sm leading-relaxed border-t border-primary/10">
                    {faq.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Unresolved Questions Notice */}
        <div className="mt-12 text-center p-6 bg-surface/50 border border-primary/10 rounded-lg">
          <p className="text-xs font-mono text-muted">
            Have a question not listed here? Reach out to the organizing team through our{' '}
            <a href="#contact" className="text-primary underline hover:text-white transition-colors">
              official contact channels below
            </a>
            .
          </p>
        </div>

      </div>
    </section>
  )
}
