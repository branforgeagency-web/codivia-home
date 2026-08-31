import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading.jsx'

const breakdown = [
  { label: 'Full platform access — all 22 departments', amount: '₹8,999' },
  { label: 'ICD-10-CM / CPT / HCPCS validation engine', amount: 'Included' },
  { label: 'Certification-readiness assessment', amount: 'Included' },
  { label: 'Placement support', amount: 'Included' },
]

export default function PricingGate({ onPay, authState }) {
  const [processing, setProcessing] = useState(false)

  const handlePay = async () => {
    setProcessing(true)
    try {
      await onPay?.()
    } finally {
      setProcessing(false)
    }
  }

  return (
    <section id="pricing" className="bg-bone py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        <SectionHeading
          dark={false}
          eyebrow="Transparent pricing"
          title="One payment. Full access. No surprise tiers."
          description="Every fee is itemized below. Payment runs through a server-verified Razorpay flow — your account is enrolled automatically the moment the signature check clears."
        />

        <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-0 border border-charcoal/12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Breakdown */}
          <div className="border-b border-charcoal/12 bg-white/40 p-5 sm:p-8 lg:p-12 lg:border-b-0 lg:border-r">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-dim">Fee breakdown</p>
            <div className="mt-4 sm:mt-6 divide-y divide-charcoal/10">
              {breakdown.map((row) => (
                <div key={row.label} className="flex items-center justify-between py-3.5 sm:py-4 gap-4">
                  <span className="text-xs sm:text-sm text-charcoal/75">{row.label}</span>
                  <span className="font-mono-num text-xs sm:text-sm font-bold text-charcoal shrink-0">{row.amount}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 sm:mt-6 flex items-center justify-between border-t-2 border-charcoal pt-4 sm:pt-6">
              <span className="text-base sm:text-lg font-bold text-charcoal">Total (one-time)</span>
              <span className="font-mono-num text-xl sm:text-2xl font-black text-accent">₹8,999</span>
            </div>
            <p className="mt-3 sm:mt-4 text-[11px] sm:text-xs text-charcoal/50">
              Inclusive of applicable taxes. Secured by Razorpay — CODIVIA never stores card details.
            </p>
          </div>

          {/* Auth -> Razorpay gate */}
          <div className="bg-charcoal p-5 sm:p-8 text-bone lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Enrol now</p>
            <h3 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold">Auth → Verify → Pay</h3>
            <ol className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 text-xs sm:text-sm text-bone/70">
              <li className="flex gap-3">
                <span className="font-mono-num font-bold text-accent">1</span>
                Sign in with the shared CODIVIA account (Firebase Auth SSO).
              </li>
              <li className="flex gap-3">
                <span className="font-mono-num font-bold text-accent">2</span>
                We create a Razorpay order server-side via <code className="text-accent">createOrder</code>.
              </li>
              <li className="flex gap-3">
                <span className="font-mono-num font-bold text-accent">3</span>
                Razorpay checkout opens — complete payment securely.
              </li>
              <li className="flex gap-3">
                <span className="font-mono-num font-bold text-accent">4</span>
                A verified webhook confirms the signature and flips <code className="text-accent">paid: true</code>.
              </li>
            </ol>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handlePay}
              disabled={processing}
              className="mt-8 sm:mt-10 w-full bg-accent py-3.5 sm:py-4 text-sm font-bold uppercase tracking-wide text-charcoal transition disabled:opacity-60 hover:bg-accent-bright shadow-lg shadow-accent/20"
            >
              {processing ? 'Opening secure checkout…' : authState?.user ? 'Pay ₹8,999 with Razorpay' : 'Sign in to continue'}
            </motion.button>
            <p className="mt-3 sm:mt-4 text-center text-[10px] sm:text-[11px] uppercase tracking-wide text-bone/40">
              256-bit encrypted · PCI-DSS compliant checkout
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
