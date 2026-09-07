import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CVMark from '../ui/CVMark.jsx'

const faqs = [
  {
    q: 'Is there a refund policy before starting practice?',
    a: 'Yes. Refund eligibility is documented in the enrolment agreement shown before payment. Requests within the 7-day window, before extensive chart practice is undertaken, are honored per policy with zero penalty fees.',
  },
  {
    q: 'Who is eligible to enrol in CODIVIA?',
    a: 'CODIVIA is built for learners with foundational healthcare, life-sciences, biotechnology, or nursing backgrounds, as well as working coders upskilling into new surgical specialties. No prior CPC/CCS credential is required to start practicing.',
  },
  {
    q: 'Are the practice charts authentic patient data?',
    a: 'Every single chart on the platform is derived from authentic hospital encounter narratives, de-identified and strictly scrubbed of all Protected Health Information (PHI) per HIPAA guidelines before entering the active practice corpus.',
  },
  {
    q: 'What are the placement statistics based on?',
    a: 'Placement figures reflect graduates who complete their chosen specialty tracks and opt into our placement support network, tracked over their first 90 days post-verification.',
  },
  {
    q: 'Can I use one login across all CODIVIA products?',
    a: 'Yes. Authentication runs through a single secure Firebase project with Single Sign-On (SSO). Your login session, practice progress, and chart metrics persist seamlessly across the web app and the EHR Coding Studio.',
  },
  {
    q: 'Are annual ICD-10 and CPT® code updates included?',
    a: 'All chart packs automatically receive continuous updates corresponding to the annual CMS, AHA Coding Clinic, and AMA CPT code revisions at zero extra cost.',
  },
]

function MinimalFaqRow({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/[0.08] transition-colors">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 sm:py-6 text-left cursor-pointer group"
      >
        <span className="text-sm sm:text-base lg:text-[17px] font-normal text-white/90 group-hover:text-white transition-colors leading-relaxed pr-2">
          {item.q}
        </span>
        <div
          className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-md border transition-all ${
            isOpen
              ? 'bg-white/10 border-white/30 text-white shadow-xs'
              : 'bg-white/[0.03] border-white/10 text-white/50 group-hover:border-white/20 group-hover:text-white'
          }`}
        >
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm sm:text-base font-light leading-none"
          >
            {isOpen ? '✕' : '+'}
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 text-xs sm:text-sm leading-relaxed text-white/60 font-normal">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function TrustFAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="relative bg-[#141210] text-white py-20 sm:py-28 lg:py-32 overflow-hidden border-t border-white/[0.08]">
      {/* Background Soft Ambient Light Halos */}
      <div className="pointer-events-none absolute top-1/4 -left-20 h-[500px] w-[500px] rounded-full bg-accent/[0.07] blur-[150px]" />
      <div className="pointer-events-none absolute bottom-10 right-[-10%] h-[500px] w-[500px] rounded-full bg-amber-500/[0.05] blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* =========================================================================
              LEFT COLUMN: Clean Floating CODIVIA CV Animation
              ========================================================================= */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-[420px] flex items-center justify-center">
              {/* Soft Ambient Glow Halo behind the logo */}
              <div className="pointer-events-none absolute inset-0 rounded-full bg-radial from-accent/20 via-transparent to-transparent blur-2xl opacity-70" />

              {/* Animated CV Mark */}
              <div className="relative z-10 flex items-center justify-center w-full py-4">
                <CVMark size={380} theme="dark" className="scale-100 sm:scale-105" />
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Editorial Headline & Minimalist Accordion (Reference Style)
              ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Editorial Title */}
            <div className="mb-8 sm:mb-10">
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-[52px] font-normal text-white tracking-tight leading-[1.1]">
                Straight answers, <br />
                <span className="font-sans font-extrabold text-accent">before you pay.</span>
              </h2>
            </div>

            {/* Accordion List matching the screenshot structure */}
            <div className="divide-y divide-white/[0.08] border-t border-white/[0.08]">
              {faqs.map((item, i) => (
                <MinimalFaqRow
                  key={item.q}
                  item={item}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

