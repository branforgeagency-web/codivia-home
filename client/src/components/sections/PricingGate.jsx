import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading.jsx'
import { departmentTiers } from '../../data/departmentCases.js'

export default function PricingGate({ onPay, authState }) {
  const [selectedTier, setSelectedTier] = useState('charts-200')
  const [processingTier, setProcessingTier] = useState(null)

  const handleSelectPay = async (tier) => {
    setProcessingTier(tier.id)
    try {
      await onPay?.(tier)
    } finally {
      setProcessingTier(null)
    }
  }

  return (
    <section id="pricing" className="relative bg-gradient-to-b from-[#FAF6F2] via-white to-[#FAF6F2] py-16 sm:py-24 lg:py-32 border-t border-charcoal/10 overflow-hidden">
      {/* Background Ambient Glow Orbs */}
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[550px] w-[550px] rounded-full bg-accent/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 left-[-10%] h-[550px] w-[550px] rounded-full bg-amber-400/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <SectionHeading
          dark={false}
          eyebrow="Transparent Practice Packages"
          title="Choose your chart volume. Unlock the Coding Studio."
          description="Practice on authentic de-identified hospital encounters. Every tier grants instant access to the Codivia EHR workspace and real-time sub-second scoring engine."
        />

        {/* 7 Practice Chart Pricing Tier Cards */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {departmentTiers.map((tier) => {
            const isSelected = selectedTier === tier.id
            const isProcessing = processingTier === tier.id

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setSelectedTier(tier.id)}
                className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 transition-all duration-300 cursor-pointer ${
                  tier.popular
                    ? 'bg-[#1E293B] text-white border-2 border-accent shadow-2xl shadow-accent/25 scale-[1.03] lg:-translate-y-2'
                    : 'bg-white text-charcoal border border-charcoal/15 shadow-lg hover:border-accent/50 hover:shadow-xl'
                }`}
              >
                {/* Floating Pill Badge */}
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={`text-[10px] font-mono font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md ${
                        tier.popular
                          ? 'bg-accent text-white shadow-accent/30'
                          : 'bg-charcoal text-white'
                      }`}
                    >
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Tier Title & Pricing */}
                  <div className="pt-2">
                    <h3 className={`text-lg sm:text-xl font-black tracking-tight ${tier.popular ? 'text-white' : 'text-charcoal'}`}>
                      {tier.name}
                    </h3>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className={`text-3xl sm:text-4xl font-black font-mono ${tier.popular ? 'text-accent' : 'text-accent'}`}>
                        {tier.priceINR}
                      </span>
                      <span className="text-xs font-mono text-charcoal/40 line-through">
                        {tier.originalINR}
                      </span>
                      <span className={`text-xs font-mono font-bold ${tier.popular ? 'text-slate-400' : 'text-charcoal/60'}`}>
                        ({tier.priceUSD})
                      </span>
                    </div>
                    <p className={`text-xs mt-2.5 leading-relaxed ${tier.popular ? 'text-slate-300' : 'text-charcoal/70'}`}>
                      {tier.description}
                    </p>
                  </div>

                  {/* High-Impact Highlighted Chart Count Container */}
                  <div className={`mt-5 p-3.5 sm:p-4 rounded-2xl border-2 text-center transition-all ${
                    tier.popular
                      ? 'bg-gradient-to-r from-accent/25 via-accent/15 to-amber-400/20 border-accent text-white shadow-lg shadow-accent/25 ring-1 ring-accent/50'
                      : 'bg-gradient-to-r from-accent/15 via-accent/5 to-amber-500/15 border-accent/35 text-charcoal shadow-sm'
                  }`}>
                    <div className="flex items-center justify-center gap-1.5 font-mono">
                      <span className="text-base sm:text-xl font-black text-accent tracking-tight">
                        {tier.chartsCount === 13200 ? '13,200+' : tier.chartsCount}
                      </span>
                      <span className={`text-xs sm:text-sm font-black uppercase tracking-wider ${tier.popular ? 'text-white' : 'text-charcoal'}`}>
                        {tier.chartsCount === 13200 ? 'Hospital Charts' : 'Practice Charts'}
                      </span>
                    </div>
                    <span className={`block text-[10px] font-mono font-bold mt-0.5 uppercase tracking-widest ${tier.popular ? 'text-slate-300' : 'text-charcoal/60'}`}>
                      {tier.chartsCount === 13200 ? 'All 22 Clinical Specialties' : 'Instant EHR Access'}
                    </span>
                  </div>

                  {/* Feature Bullets */}
                  <ul className="mt-5 space-y-2.5 text-xs">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <span className={`text-sm leading-none font-bold ${tier.popular ? 'text-accent' : 'text-emerald-600'}`}>
                          ✓
                        </span>
                        <span className={tier.popular ? 'text-slate-300' : 'text-charcoal/80'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Enrol & Checkout Button */}
                <div className="mt-8 pt-4 border-t border-charcoal/10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSelectPay(tier)
                    }}
                    disabled={isProcessing}
                    className={`w-full rounded-full py-3.5 text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-60 ${
                      tier.popular
                        ? 'bg-gradient-to-r from-accent via-accent-bright to-accent text-white hover:shadow-accent/40 hover:scale-[1.02]'
                        : 'bg-charcoal hover:bg-black text-white hover:scale-[1.02]'
                    }`}
                  >
                    {isProcessing ? 'Opening Razorpay…' : `Enrol • ${tier.priceINR}`}
                  </button>
                  <span className={`block text-center text-[10px] font-mono mt-2 ${tier.popular ? 'text-slate-400' : 'text-charcoal/40'}`}>
                    🔒 256-Bit SSL · Instant Software Unlock
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
