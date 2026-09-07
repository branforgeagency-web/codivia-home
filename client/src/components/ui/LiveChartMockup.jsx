import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * LiveChartMockup — Interactive Live EHR Chart Medical Coding Studio
 * 
 * Simulates a live clinical encounter chart with real-time keyword highlighting,
 * automated ICD-10/CPT/HCPCS code validation, and diagnostic telemetry.
 */
export default function LiveChartMockup() {
  const [activeTab, setActiveTab] = useState('cardiology')
  const [validating, setValidating] = useState(false)
  const [verifiedCount, setVerifiedCount] = useState(3)

  const scenarios = {
    cardiology: {
      dept: 'Cardiology • Cath Lab',
      encounterId: 'ENC-88204',
      patientInfo: '58M • Acute Chest Pain • Inpatient',
      doctorNote:
        'Patient presented with acute non-ST elevated myocardial infarction (NSTEMI). Underwent emergency left heart catheterization with coronary angiography and drug-eluting stent (DES) placement in the proximal LAD.',
      highlights: [
        { text: 'NSTEMI', code: 'I21.4', type: 'ICD-10-CM' },
        { text: 'stent (DES) placement', code: '92928-LD', type: 'CPT' },
        { text: 'drug-eluting stent', code: 'C1769', type: 'HCPCS' },
      ],
      codes: [
        {
          set: 'ICD-10-CM',
          code: 'I21.4',
          desc: 'Acute subendocardial infarction',
          status: 'Valid Primary Dx',
          match: '99.8%',
        },
        {
          set: 'CPT-4',
          code: '92928-LD',
          desc: 'PCI with drug-eluting stent, single vessel',
          status: 'Clean Claim',
          match: '100%',
        },
        {
          set: 'HCPCS II',
          code: 'C1769',
          desc: 'Guide wire / intracoronary stent delivery',
          status: 'Reimbursable',
          match: '99.4%',
        },
      ],
    },
    ortho: {
      dept: 'Orthopedics • Surgical Suite',
      encounterId: 'ENC-79102',
      patientInfo: '34F • Right Knee Instability • Outpatient',
      doctorNote:
        'Patient with complete tear of anterior cruciate ligament (ACL) of right knee. Diagnostic arthroscopy with complete reconstruction using bone-patellar tendon-bone autograft performed without complication.',
      highlights: [
        { text: 'tear of ACL', code: 'S83.511A', type: 'ICD-10-CM' },
        { text: 'arthroscopy reconstruction', code: '29888-RT', type: 'CPT' },
        { text: 'patellar autograft', code: 'L8699', type: 'HCPCS' },
      ],
      codes: [
        {
          set: 'ICD-10-CM',
          code: 'S83.511A',
          desc: 'Sprain of ACL of right knee, initial',
          status: 'Valid Primary Dx',
          match: '100%',
        },
        {
          set: 'CPT-4',
          code: '29888-RT',
          desc: 'Arthroscopically aided ACL reconstruction',
          status: 'Clean Claim',
          match: '99.6%',
        },
        {
          set: 'HCPCS II',
          code: 'L8699',
          desc: 'Prosthetic implant / surgical anchor kit',
          status: 'Reimbursable',
          match: '98.9%',
        },
      ],
    },
  }

  const current = scenarios[activeTab]

  const triggerScan = () => {
    setValidating(true)
    setTimeout(() => setValidating(false), 900)
  }

  return (
    <div className="relative mx-auto w-full max-w-[560px] select-none">
      {/* Floating Ambient Glow Orbs behind card */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-accent/30 via-accent-bright/20 to-accent/10 opacity-70 blur-xl transition-all" />

      {/* Main Glass EHR Coding Studio Window */}
      <div className="relative overflow-hidden rounded-2xl border border-charcoal/15 bg-white/95 backdrop-blur-2xl shadow-2xl">
        {/* Studio Window Titlebar */}
        <div className="flex items-center justify-between border-b border-charcoal/10 bg-[#FAF7F2] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400/80 border border-red-500/20" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80 border border-amber-500/20" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80 border border-emerald-500/20" />
            <span className="ml-2 font-mono text-[11px] font-bold text-charcoal/70 tracking-tight">
              CODIVIA EHR Workspace
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE ENGINE
            </span>
          </div>
        </div>

        {/* Clinical Specialty Switcher Tabs */}
        <div className="flex border-b border-charcoal/10 bg-white px-4 pt-2.5 gap-2">
          <button
            onClick={() => setActiveTab('cardiology')}
            className={`flex items-center gap-1.5 border-b-2 pb-2.5 px-3 font-mono text-xs font-bold transition-all ${
              activeTab === 'cardiology'
                ? 'border-accent text-accent'
                : 'border-transparent text-charcoal/50 hover:text-charcoal'
            }`}
          >
            <span>❤️ Cardiology</span>
            <span className="rounded bg-accent/10 px-1 text-[9px] font-bold text-accent">ENC-882</span>
          </button>

          <button
            onClick={() => setActiveTab('ortho')}
            className={`flex items-center gap-1.5 border-b-2 pb-2.5 px-3 font-mono text-xs font-bold transition-all ${
              activeTab === 'ortho'
                ? 'border-accent text-accent'
                : 'border-transparent text-charcoal/50 hover:text-charcoal'
            }`}
          >
            <span>🦴 Orthopedics</span>
            <span className="rounded bg-accent/10 px-1 text-[9px] font-bold text-accent">ENC-791</span>
          </button>
        </div>

        {/* Patient Encounter Header Banner */}
        <div className="flex flex-wrap items-center justify-between border-b border-charcoal/10 bg-[#FCFBF8] px-4 py-2.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono font-extrabold text-charcoal">{current.dept}</span>
            <span className="text-charcoal/30">•</span>
            <span className="font-mono text-charcoal/50 text-[11px]">{current.patientInfo}</span>
          </div>
          <span className="font-mono text-[10px] font-bold text-accent">{current.encounterId}</span>
        </div>

        {/* Live EHR Medical Chart Document */}
        <div className="p-4 sm:p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-charcoal/50">
              OPERATIVE REPORT / ENCOUNTER NARRATIVE
            </span>
            <button
              onClick={triggerScan}
              className="flex items-center gap-1 font-mono text-[10px] font-bold text-accent hover:text-accent-dim transition"
            >
              <svg className="h-3 w-3 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ display: validating ? 'block' : 'none' }}>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" className="opacity-75" />
              </svg>
              <span>{validating ? 'VALIDATING...' : '⚡ RE-VALIDATE CHART'}</span>
            </button>
          </div>

          <div className="rounded-xl border border-charcoal/10 bg-[#FAF7F2]/80 p-3.5 sm:p-4 text-xs sm:text-[13px] leading-relaxed text-charcoal/90 font-serif shadow-inner">
            <p>
              {current.doctorNote}
            </p>
          </div>

          {/* Real-time Code Extraction Matrix */}
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-charcoal/50">
                LIVE VALIDATED CODE SUITE (100% ACCURACY)
              </span>
              <span className="font-mono text-[10px] text-emerald-600 font-bold">✓ Zero Claim Denials</span>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {current.codes.map((item) => (
                <motion.div
                  key={item.code}
                  whileHover={{ y: -2 }}
                  className="relative overflow-hidden rounded-xl border border-charcoal/10 bg-white p-3 shadow-sm hover:border-accent/50 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between pb-1">
                    <span className="font-mono text-[9px] font-black uppercase tracking-wider text-accent">
                      {item.set}
                    </span>
                    <span className="rounded bg-emerald-50 text-emerald-700 font-mono text-[8px] font-bold px-1.5 py-0.2 border border-emerald-200">
                      {item.match}
                    </span>
                  </div>

                  <p className="font-mono-num text-sm sm:text-base font-black text-charcoal">
                    {item.code}
                  </p>
                  <p className="mt-0.5 text-[10px] text-charcoal/60 line-clamp-1 leading-tight">
                    {item.desc}
                  </p>

                  <div className="mt-2 flex items-center justify-between pt-1.5 border-t border-charcoal/[0.06] text-[9px] font-mono text-emerald-600 font-semibold">
                    <span>✓ {item.status}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Status Telemetry Bar */}
        <div className="flex items-center justify-between border-t border-charcoal/10 bg-[#FAF7F2] px-4 py-2.5 text-[11px] font-mono text-charcoal/70">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
            <span className="font-bold text-accent">CODIVIA Engine:</span> 22 Tracks Connected
          </span>
          <span className="font-semibold text-charcoal/60">Sub-Second Scoring</span>
        </div>
      </div>

      {/* Floating Micro-Badge 1: Live Speed */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute -top-4 -left-4 sm:-left-8 flex items-center gap-2 rounded-xl border border-charcoal/10 bg-white/95 px-3 py-2 shadow-xl backdrop-blur-md"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent font-black text-xs">
          ⚡
        </span>
        <div>
          <p className="text-[10px] font-mono text-charcoal/50 uppercase">VALIDATION SPEED</p>
          <p className="text-xs font-black text-charcoal">0.12s Instant Feedback</p>
        </div>
      </motion.div>

      {/* Floating Micro-Badge 2: De-identified Charts */}
      <motion.div
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute -bottom-4 -right-4 sm:-right-8 flex items-center gap-2 rounded-xl border border-charcoal/10 bg-white/95 px-3.5 py-2 shadow-xl backdrop-blur-md"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 font-black text-xs">
          🏥
        </span>
        <div>
          <p className="text-[10px] font-mono text-charcoal/50 uppercase">REAL CLINICAL CHARTS</p>
          <p className="text-xs font-black text-charcoal">13,200+ De-identified Records</p>
        </div>
      </motion.div>
    </div>
  )
}
