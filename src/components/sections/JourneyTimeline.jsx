import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading.jsx'

const steps = [
  {
    n: '01',
    title: 'Land & Explore',
    tag: 'EXPLORATION',
    body: 'Browse 22 specialty departments, test real medical charts in the interactive coding sandbox, and inspect ICD-10-CM, CPT, and HCPCS coverage before committing.',
    detail: 'No payment or credentials required to sample live practice cases.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="14 2 14 8 20 8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 13h1.5l1-2 1.8 3.5 1.2-2H14" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="15.5" cy="15.5" r="3.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 18l3 3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Sign Up',
    tag: 'AUTHENTICATION',
    body: 'Create your account via Firebase Auth. One secure single sign-on session keeps your practice records, performance analytics, and mastery metrics synchronized across all devices.',
    detail: 'Standardized SSO session management across web and mobile.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor">
        <circle cx="9" cy="7" r="3.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 20v-1.5a4.5 4.5 0 0 1 4.5-4.5h3a4.5 4.5 0 0 1 4.5 4.5V20" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 9.5l3.5-1.5V12c0 2.5-2 4.5-3.5 5.5-1.5-1-3.5-3-3.5-5.5V8l3.5 1.5z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 11.5v2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Transparent Payment',
    tag: 'CHECKOUT',
    body: 'Complete a single, upfront payment through a server-verified Razorpay flow. No recurring subscription traps, hidden seat charges, or locked specialty modules.',
    detail: 'Server-side verification with UPI, Cards, and NetBanking.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor">
        <rect x="2" y="4" width="20" height="13" rx="2.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="2" y1="8.5" x2="22" y2="8.5" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="5.5" y1="13" x2="9.5" y2="13" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="17.5" cy="17" r="4.2" className="fill-white" strokeWidth="1.8" />
        <polyline points="15.5 17 17 18.5 19.8 15.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    n: '04',
    title: 'Instant Auto-Enrol',
    tag: 'PROVISIONING',
    body: 'A server-verified webhook automatically flips your Firestore record to enrolled status. Practice workspace provisioning is immediate with zero manual waiting time.',
    detail: 'Automated real-time database provisioning.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor">
        <path d="M17.5 18H9a5.5 5.5 0 0 1-1.2-10.85A6.5 6.5 0 0 1 19.5 9a4.8 4.8 0 0 1-2 9z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <polygon points="12 9.5 9.5 14 13 14 11 18.5 16 13 12.5 13 14.5 9.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    n: '05',
    title: 'Enter CODIVIA',
    tag: 'WORKSPACE READY',
    body: 'Access your full clinical workspace: all 22 specialty departments, 13,200+ practice charts, real-time code validators, and placement benchmarking.',
    detail: 'Complete workspace access unlocked from day one.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor">
        <rect x="2.5" y="3" width="19" height="13.5" rx="2.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 6.5v4M10 8.5h4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 20.5h8M12 16.5v4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 11v3.5a2.5 2.5 0 0 1-5 0V13" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="13" r="0.8" strokeWidth="1.6" />
      </svg>
    ),
  },
]

export default function JourneyTimeline() {
  const [active, setActive] = useState(0)

  return (
    <section
      id="journey"
      className="relative bg-bone py-20 sm:py-28 lg:py-32 border-b border-charcoal/10 text-charcoal overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(rgba(20, 18, 16, 0.045) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Ambient Orange Glows */}
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[500px] w-[500px] rounded-full bg-accent/8 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-[500px] w-[500px] rounded-full bg-accent/8 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-widest text-accent mb-3 shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span>Milestone Roadmap</span>
            </div>
            <SectionHeading
              dark={false}
              eyebrow="The path in"
              title="Five steps. Zero friction."
              description="From your first click to your first coded chart — here's exactly what happens, in order."
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="max-w-xs text-xs sm:text-sm text-charcoal/65"
          >
            Click through each milestone to inspect the onboarding workflow.
          </motion.p>
        </div>

        {/* Desktop Interactive Stepper Timeline */}
        <div className="mt-14 sm:mt-18">
          <div className="relative hidden items-center justify-between md:flex">
            {/* Background line */}
            <div className="absolute left-8 right-8 top-7 h-[2px] bg-charcoal/10" />

            {/* Active progress line */}
            <motion.div
              className="absolute left-8 top-7 h-[2px] bg-accent shadow-[0_0_10px_rgba(242,103,34,0.4)]"
              initial={{ width: '0%' }}
              animate={{ width: `${(active / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            />

            {steps.map((step, i) => {
              const isActive = i === active
              const isPast = i < active

              return (
                <button
                  key={step.n}
                  onClick={() => setActive(i)}
                  className="group relative z-10 flex flex-col items-center gap-3.5 focus:outline-none cursor-pointer"
                >
                  {/* Step Node */}
                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border p-3.5 transition-all duration-300 ${
                      isActive
                        ? 'border-accent bg-accent text-white shadow-lg shadow-accent/25 ring-4 ring-accent/15 scale-105'
                        : isPast
                        ? 'border-accent/40 bg-accent/10 text-accent hover:border-accent/60'
                        : 'border-charcoal/15 bg-white text-charcoal/40 group-hover:border-accent/40 group-hover:text-accent group-hover:shadow-md shadow-xs'
                    }`}
                  >
                    {step.icon}

                    <span
                      className={`absolute -bottom-2.5 rounded-full px-2 py-0.5 font-mono text-[9px] font-bold transition-all shadow-xs ${
                        isActive
                          ? 'bg-charcoal text-white border border-charcoal font-black scale-105'
                          : isPast
                          ? 'bg-white text-accent border border-accent/40 font-bold'
                          : 'bg-white text-charcoal/60 border border-charcoal/15 font-semibold'
                      }`}
                    >
                      {step.n}
                    </span>
                  </div>

                  {/* Step Label */}
                  <div className="mt-1 text-center">
                    <span
                      className={`block text-xs font-bold uppercase tracking-wider transition-colors ${
                        isActive ? 'text-accent' : 'text-charcoal/70 group-hover:text-charcoal'
                      }`}
                    >
                      {step.title}
                    </span>
                    <span
                      className={`block text-[9px] font-mono uppercase tracking-widest mt-0.5 ${
                        isActive ? 'text-accent/80 font-bold' : 'text-charcoal/40'
                      }`}
                    >
                      {step.tag}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active Step Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mt-12 rounded-2xl border border-charcoal/10 bg-white p-6 sm:p-8 lg:p-10 shadow-xl shadow-charcoal/5 ring-1 ring-charcoal/5"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr] md:items-center">
                {/* Left Side: Icon Container */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-gradient-to-b from-accent/15 to-accent/5 p-4 text-accent shadow-inner">
                    {steps[active].icon}
                  </div>

                  <div className="md:hidden">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
                      STEP {steps[active].n} • {steps[active].tag}
                    </span>
                    <h3 className="text-xl font-bold text-charcoal mt-0.5">
                      {steps[active].title}
                    </h3>
                  </div>
                </div>

                {/* Right Side: Step Description */}
                <div>
                  <div className="hidden md:flex items-center gap-3 mb-1.5">
                    <span className="rounded-full bg-accent/10 border border-accent/25 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
                      STEP {steps[active].n} • {steps[active].tag}
                    </span>
                  </div>

                  <h3 className="hidden md:block text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight">
                    {steps[active].title}
                  </h3>

                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-charcoal/75 max-w-3xl">
                    {steps[active].body}
                  </p>

                  <p className="mt-4 text-xs font-mono text-charcoal/60 border-t border-charcoal/10 pt-3 flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                    {steps[active].detail}
                  </p>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="mt-8 flex items-center justify-between pt-4 border-t border-charcoal/10">
                <button
                  onClick={() => setActive((a) => Math.max(0, a - 1))}
                  disabled={active === 0}
                  className={`rounded-lg border px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                    active === 0
                      ? 'border-charcoal/10 text-charcoal/25 cursor-not-allowed bg-charcoal/[0.02]'
                      : 'border-charcoal/20 text-charcoal bg-white hover:border-accent hover:text-accent hover:bg-accent/5 shadow-xs'
                  }`}
                >
                  Previous
                </button>

                <div className="flex gap-1.5">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        i === active ? 'w-6 bg-accent' : 'w-1.5 bg-charcoal/20 hover:bg-charcoal/40'
                      }`}
                      aria-label={`Go to step ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))}
                  disabled={active === steps.length - 1}
                  className={`rounded-lg border px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                    active === steps.length - 1
                      ? 'border-charcoal/10 text-charcoal/25 cursor-not-allowed bg-charcoal/[0.02]'
                      : 'border-accent bg-accent text-white shadow-md shadow-accent/20 hover:bg-accent-bright hover:shadow-lg hover:shadow-accent/30'
                  }`}
                >
                  {active === steps.length - 1 ? 'Completed' : 'Next'}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile Stacked List */}
          <div className="mt-8 flex flex-col gap-2.5 md:hidden">
            {steps.map((step, i) => {
              const isCurrent = active === i
              return (
                <button
                  key={step.n}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-3.5 rounded-xl border p-3 text-left transition-all cursor-pointer ${
                    isCurrent
                      ? 'border-accent bg-white shadow-md shadow-accent/10 ring-1 ring-accent/25'
                      : 'border-charcoal/10 bg-white/80 text-charcoal/70 hover:border-charcoal/20 hover:bg-white'
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border p-2.5 ${
                      isCurrent
                        ? 'border-accent bg-accent text-white shadow-sm'
                        : 'border-charcoal/10 bg-accent/5 text-accent'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-xs font-bold truncate ${isCurrent ? 'text-accent' : 'text-charcoal'}`}>
                        {step.title}
                      </p>
                      <span className={`font-mono text-[10px] ${isCurrent ? 'text-accent font-bold' : 'text-charcoal/40'}`}>{step.n}</span>
                    </div>
                    <p className={`text-[11px] truncate ${isCurrent ? 'text-accent/80' : 'text-charcoal/50'}`}>{step.tag}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
