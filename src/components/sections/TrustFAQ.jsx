import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading.jsx'
import AnimatedCounter from '../ui/AnimatedCounter.jsx'

const trustStats = [
  { value: 92, suffix: '%', label: 'Placement-track completion rate' },
  { value: 14, suffix: ' days', label: 'Median time to first certified chart' },
  { value: 4.8, suffix: '/5', label: 'Average learner rating', decimals: 1 },
]

const faqs = [
  {
    q: 'Is the ₹8,999 fee refundable?',
    a: 'Refund eligibility is documented in the enrolment agreement shown before payment. Requests within the stated window, before platform access is used substantively, are honored per that policy.',
  },
  {
    q: 'Who is eligible to enrol?',
    a: 'CODIVIA is built for learners with a foundational healthcare, life-sciences, or nursing background, and for working coders upskilling into new specialties. No prior CPC certification is required to start.',
  },
  {
    q: 'Are the charts real patient data?',
    a: 'No. Every chart on the platform is de-identified and either synthetically constructed or fully scrubbed of protected health information before it enters the practice corpus.',
  },
  {
    q: 'What are the placement statistics based on?',
    a: 'Placement figures reflect learners who complete the full 22-department track and opt into placement support, tracked over their first 90 days post-certification.',
  },
  {
    q: 'Can I use one login across CODIVIA products?',
    a: 'Yes. Authentication runs through a single shared Firebase project, so your session persists across the landing app and the main CODIVIA platform.',
  },
]

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-bone/10">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-4 sm:py-6 text-left"
      >
        <span className="text-sm sm:text-lg font-semibold text-bone">{item.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center border border-bone/20 text-base sm:text-lg text-bone"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-5 sm:pb-6 text-xs sm:text-sm leading-relaxed text-bone/65">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function TrustFAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="bg-charcoal py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        {/* Trust stats strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px overflow-hidden border border-bone/10 bg-bone/10">
          {trustStats.map((stat) => (
            <div key={stat.label} className="bg-charcoal-soft p-6 sm:p-8 lg:p-10 text-center">
              <div className="text-2xl sm:text-3xl lg:text-display-md font-black text-accent">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
              </div>
              <p className="mt-2 text-xs sm:text-sm text-bone/60">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-20 grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <SectionHeading
            eyebrow="Trust & policies"
            title="Straight answers, before you pay."
            description="No hidden clauses. If it matters to your decision, it's answered here — not buried in a support ticket after enrolment."
          />
          <div>
            {faqs.map((item, i) => (
              <AccordionItem
                key={item.q}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
