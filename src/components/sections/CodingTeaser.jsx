import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CARDIOLOGY_CASE = {
  id: 'CV-0447',
  coder: 'J. Miller',
  department: 'Cardiology',
  chartType: 'CLINICAL CHART · OUTPATIENT CARDIOLOGY',
  patient: 'David Wilson · Male · 66 · MRN 2377014 · DOS 04/13/2026',
  chiefComplaint: 'Chest tightness on exertion, relieved by rest.',
  hpi: '66-year-old male, known hypertensive, with three weeks of exertional chest pressure now occurring at rest. Denies prior MI.',
  assessmentPlan:
    'Atherosclerotic heart disease of native coronary artery with unstable angina. 12-lead ECG performed and interpreted in office — cardiology referral placed.',
}

const CODING_OPTIONS = {
  icd: [
    {
      code: 'I25.110',
      label: 'I25.110 — Atherosclerotic heart disease of native coronary artery with unstable angina pectoris',
      correct: true,
      feedback:
        'Correct! ICD-10-CM combination code I25.110 accurately reports CAD with unstable angina in a single code per official coding guidelines.',
    },
    {
      code: 'I20.0',
      label: 'I20.0 — Unstable angina pectoris (without CAD combination)',
      correct: false,
      feedback:
        'Incorrect. An ICD-10-CM Excludes1 note applies: when CAD is documented with angina, combination code family I25.1- must be assigned instead of I20.0.',
    },
    {
      code: 'I25.10',
      label: 'I25.10 — Atherosclerotic heart disease of native coronary artery without angina',
      correct: false,
      feedback:
        'Incorrect. The note specifically documents "with unstable angina" — coding I25.10 misses documented clinical acuity and causes denial.',
    },
  ],
  cpt: [
    {
      code: '93000',
      label: '93000 — Electrocardiogram, routine ECG with at least 12 leads; with interpretation and report (Global)',
      correct: true,
      feedback:
        'Correct! The op note states "performed and interpreted in office" — reporting global code 93000 captures both the technical recording and professional interpretation.',
    },
    {
      code: '93010',
      label: '93010 — Electrocardiogram, routine ECG; interpretation and report only',
      correct: false,
      feedback:
        'Incorrect. 93010 is the professional-only component. Since the tracing was also performed in the physician office, global code 93000 is required.',
    },
    {
      code: '93005',
      label: '93005 — Electrocardiogram, routine ECG; tracing only, without interpretation',
      correct: false,
      feedback:
        'Incorrect. 93005 is the technical-only component. The physician interpreted the ECG in office and documented findings.',
    },
  ],
}

export default function CodingTeaser() {
  const [icdChoice, setIcdChoice] = useState(null)
  const [cptChoice, setCptChoice] = useState(null)
  const [checked, setChecked] = useState(false)
  const [openIcdDropdown, setOpenIcdDropdown] = useState(false)
  const [openCptDropdown, setOpenCptDropdown] = useState(false)

  const selectedIcd = CODING_OPTIONS.icd.find((o) => o.code === icdChoice)
  const selectedCpt = CODING_OPTIONS.cpt.find((o) => o.code === cptChoice)
  const canCheck = Boolean(icdChoice && cptChoice)
  const isAllCorrect = checked && selectedIcd?.correct && selectedCpt?.correct

  const handleValidate = () => {
    if (!canCheck) {
      // Auto open diagnosis dropdown if nothing selected
      if (!icdChoice) setOpenIcdDropdown(true)
      else if (!cptChoice) setOpenCptDropdown(true)
      return
    }
    setChecked(true)
  }

  const handleReset = () => {
    setIcdChoice(null)
    setCptChoice(null)
    setChecked(false)
    setOpenIcdDropdown(false)
    setOpenCptDropdown(false)
  }

  return (
    <section id="demo" className="relative bg-[#FAF6F2] py-20 sm:py-28 lg:py-32 overflow-hidden border-t border-charcoal/10">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[550px] w-[550px] rounded-full bg-[#FF6B00]/5 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-[550px] w-[550px] rounded-full bg-[#101828]/5 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 relative z-10">
        {/* Section Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#FF6B00] mb-4 shadow-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B00] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B00]" />
            </span>
            <span>LIVE INTERACTIVE SIMULATOR</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black text-[#101828] tracking-tight leading-[1.12]"
          >
            Live Coding Validation,{' '}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A33] to-[#FF6B00] bg-clip-text text-transparent">
              Right Here.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#101828]/70 leading-relaxed font-normal"
          >
            Experience the actual Codivia platform interface running live on your screen. Select the diagnosis and procedure codes, then click <strong>Validate &amp; score</strong> to test your instincts.
          </motion.p>
        </div>

        {/* =========================================================================
            HARDWARE COMPUTER SCREEN MOCKUP WITH INSIDE SOFTWARE
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Computer Monitor Bezel / Chassis */}
          <div className="relative rounded-t-[28px] sm:rounded-t-[36px] bg-[#1A1A1E] p-2.5 sm:p-4 pb-0 border border-[#27272A] shadow-[0_30px_90px_-20px_rgba(16,24,40,0.35),0_0_0_1px_rgba(255,255,255,0.08)]">
            {/* Top Bezel Center Camera Dot */}
            <div className="flex items-center justify-center pb-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3F3F46]" />
                <span className="h-2 w-2 rounded-full bg-[#09090B] border border-[#27272A] flex items-center justify-center">
                  <span className="h-0.5 w-0.5 rounded-full bg-[#10B981]" />
                </span>
              </div>
            </div>

            {/* Inside Display Screen */}
            <div className="relative rounded-t-[18px] sm:rounded-t-[24px] overflow-hidden bg-white shadow-inner border border-[#0F172A]/10">
              {/* =========================================================
                  1. CODIVIA SOFTWARE TOP NAVBAR (Dark Navy)
                  ========================================================= */}
              <div className="bg-[#111A3E] px-4 sm:px-6 py-3 text-white flex flex-wrap items-center justify-between gap-3 select-none">
                {/* Left: Codivia Logo + Breadcrumb */}
                <div className="flex items-center gap-3">
                  <img
                    src="/codivia-logo-dark.png"
                    alt="Codivia"
                    className="h-5 sm:h-6 w-auto object-contain"
                  />

                  <span className="text-white/30 hidden sm:inline">|</span>

                  <span className="text-xs sm:text-sm text-white/80 font-medium">
                    Coding · <strong className="text-white">{CARDIOLOGY_CASE.department}</strong>
                  </span>
                </div>

                {/* Right: Chart ID & Coder Identity */}
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="bg-[#1E2958] border border-white/15 px-3 py-1 rounded-full text-white/90 font-bold tracking-wide">
                    CHART {CARDIOLOGY_CASE.id}
                  </span>
                  <span className="text-white/70 hidden sm:inline">
                    Coder: <strong className="text-white">{CARDIOLOGY_CASE.coder}</strong>
                  </span>
                </div>
              </div>

              {/* =========================================================
                  2. SOFTWARE MAIN WORKSPACE: 2 COLUMNS
                  ========================================================= */}
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
                {/* LEFT COLUMN: Clinical Chart (White) */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between">
                  <div>
                    {/* Header: Subtitle & Patient Metadata */}
                    <div className="mb-6">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                        {CARDIOLOGY_CASE.chartType}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                        {CARDIOLOGY_CASE.patient}
                      </p>
                    </div>

                    {/* Section 1: Chief complaint */}
                    <div className="mb-5">
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                        Chief complaint
                      </h4>
                      <p className="mt-1.5 text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                        {CARDIOLOGY_CASE.chiefComplaint}
                      </p>
                    </div>

                    {/* Section 2: History of present illness */}
                    <div className="mb-5">
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                        History of present illness
                      </h4>
                      <p className="mt-1.5 text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                        {CARDIOLOGY_CASE.hpi}
                      </p>
                    </div>

                    {/* Section 3: Assessment & plan */}
                    <div className="mb-5">
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                        Assessment &amp; plan
                      </h4>
                      <p className="mt-1.5 text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                        {CARDIOLOGY_CASE.assessmentPlan}
                      </p>
                    </div>
                  </div>

                  {/* Left Bottom Status */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>EHR SYNC: <strong className="text-emerald-600">CONNECTED</strong></span>
                    <span>SESSION #CV-891</span>
                  </div>
                </div>

                {/* RIGHT COLUMN: Code Assignment & Validate Button (Soft Light Slate) */}
                <div className="lg:col-span-5 p-6 sm:p-8 bg-[#F8FAFC] flex flex-col justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                        ASSIGN CODES
                      </p>
                      {checked && (
                        <button
                          onClick={handleReset}
                          className="text-xs font-mono text-[#FF6B00] hover:underline font-bold"
                        >
                          Reset Case
                        </button>
                      )}
                    </div>

                    {/* 1. DIAGNOSIS CARD (ICD-10-CM) */}
                    <div className="relative mb-4">
                      <div
                        onClick={() => {
                          setOpenIcdDropdown(!openIcdDropdown)
                          setOpenCptDropdown(false)
                        }}
                        className={`rounded-2xl border bg-white p-4 cursor-pointer transition-all shadow-xs ${
                          openIcdDropdown
                            ? 'border-[#FF6B00] ring-2 ring-[#FF6B00]/20'
                            : selectedIcd
                            ? 'border-slate-300'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                            DIAGNOSIS
                          </span>
                          <span className="text-xs font-mono font-bold text-[#FF6B00]">
                            ICD-10-CM
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span
                            className={`text-sm sm:text-base font-medium truncate ${
                              selectedIcd ? 'text-slate-900 font-semibold' : 'text-slate-400'
                            }`}
                          >
                            {selectedIcd ? selectedIcd.code : 'Click to select diagnosis code...'}
                          </span>
                          <span className="text-slate-400 text-xs ml-2">
                            {openIcdDropdown ? '▲' : '▼'}
                          </span>
                        </div>

                        {selectedIcd && (
                          <p className="mt-1 text-xs text-slate-500 truncate">
                            {selectedIcd.label.split('—')[1]}
                          </p>
                        )}
                      </div>

                      {/* Dropdown Options */}
                      <AnimatePresence>
                        {openIcdDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="absolute left-0 right-0 top-full mt-1 z-30 rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden divide-y divide-slate-100"
                          >
                            {CODING_OPTIONS.icd.map((opt) => (
                              <div
                                key={opt.code}
                                onClick={() => {
                                  setIcdChoice(opt.code)
                                  setOpenIcdDropdown(false)
                                  setChecked(false)
                                }}
                                className={`p-3 text-left hover:bg-[#FFF7ED] cursor-pointer transition-colors ${
                                  icdChoice === opt.code ? 'bg-[#FFF7ED]' : ''
                                }`}
                              >
                                <span className="font-mono font-bold text-xs text-[#FF6B00] block">
                                  {opt.code}
                                </span>
                                <span className="text-xs text-slate-700 block mt-0.5 leading-tight">
                                  {opt.label.split('—')[1]}
                                </span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* 2. PROCEDURE CARD (CPT) */}
                    <div className="relative mb-6">
                      <div
                        onClick={() => {
                          setOpenCptDropdown(!openCptDropdown)
                          setOpenIcdDropdown(false)
                        }}
                        className={`rounded-2xl border bg-white p-4 cursor-pointer transition-all shadow-xs ${
                          openCptDropdown
                            ? 'border-[#FF6B00] ring-2 ring-[#FF6B00]/20'
                            : selectedCpt
                            ? 'border-slate-300'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                            PROCEDURE
                          </span>
                          <span className="text-xs font-mono font-bold text-[#FF6B00]">
                            CPT
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span
                            className={`text-sm sm:text-base font-medium truncate ${
                              selectedCpt ? 'text-slate-900 font-semibold' : 'text-slate-400'
                            }`}
                          >
                            {selectedCpt ? selectedCpt.code : 'Click to select procedure code...'}
                          </span>
                          <span className="text-slate-400 text-xs ml-2">
                            {openCptDropdown ? '▲' : '▼'}
                          </span>
                        </div>

                        {selectedCpt && (
                          <p className="mt-1 text-xs text-slate-500 truncate">
                            {selectedCpt.label.split('—')[1]}
                          </p>
                        )}
                      </div>

                      {/* Dropdown Options */}
                      <AnimatePresence>
                        {openCptDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="absolute left-0 right-0 top-full mt-1 z-30 rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden divide-y divide-slate-100"
                          >
                            {CODING_OPTIONS.cpt.map((opt) => (
                              <div
                                key={opt.code}
                                onClick={() => {
                                  setCptChoice(opt.code)
                                  setOpenCptDropdown(false)
                                  setChecked(false)
                                }}
                                className={`p-3 text-left hover:bg-[#FFF7ED] cursor-pointer transition-colors ${
                                  cptChoice === opt.code ? 'bg-[#FFF7ED]' : ''
                                }`}
                              >
                                <span className="font-mono font-bold text-xs text-[#FF6B00] block">
                                  CPT {opt.code}
                                </span>
                                <span className="text-xs text-slate-700 block mt-0.5 leading-tight">
                                  {opt.label.split('—')[1]}
                                </span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* 3. SOLID ORANGE "VALIDATE & SCORE" BUTTON */}
                    <button
                      onClick={handleValidate}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#FF781A] to-[#FF6B00] font-sans font-bold text-base text-white shadow-lg shadow-[#FF6B00]/30 transition-all duration-200 hover:shadow-xl hover:shadow-[#FF6B00]/40 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    >
                      Validate &amp; score
                    </button>
                  </div>

                  {/* Feedback Modal / Slide-down */}
                  <AnimatePresence>
                    {checked && selectedIcd && selectedCpt && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 rounded-2xl p-4 border bg-white shadow-lg text-xs space-y-2.5 font-sans"
                      >
                        {/* Score Banner */}
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{isAllCorrect ? '✅' : '⚠️'}</span>
                            <span
                              className={`font-black text-xs uppercase tracking-wide ${
                                isAllCorrect ? 'text-emerald-600' : 'text-amber-600'
                              }`}
                            >
                              {isAllCorrect ? '100% Correct Submission' : 'Auditor Review Required'}
                            </span>
                          </div>
                          <span
                            className={`font-mono font-black text-xs px-2 py-0.5 rounded-full ${
                              isAllCorrect
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {isAllCorrect ? 'SCORE 100/100' : 'SCORE 50/100'}
                          </span>
                        </div>

                        {/* ICD Feedback */}
                        <div
                          className={`p-2.5 rounded-xl border ${
                            selectedIcd.correct
                              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                              : 'bg-red-50/70 border-red-200 text-red-900'
                          }`}
                        >
                          <strong className="block mb-0.5">ICD-10-CM ({selectedIcd.code}):</strong>
                          {selectedIcd.feedback}
                        </div>

                        {/* CPT Feedback */}
                        <div
                          className={`p-2.5 rounded-xl border ${
                            selectedCpt.correct
                              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                              : 'bg-red-50/70 border-red-200 text-red-900'
                          }`}
                        >
                          <strong className="block mb-0.5">CPT ({selectedCpt.code}):</strong>
                          {selectedCpt.feedback}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Computer Stand / Desktop Neck and Base */}
          <div className="flex flex-col items-center">
            {/* Monitor Neck / Arm */}
            <div className="h-10 sm:h-12 w-28 sm:w-36 bg-gradient-to-b from-[#1F1F23] via-[#27272A] to-[#18181B] border-x border-[#3F3F46]/50 shadow-inner" />
            {/* Monitor Base Plate */}
            <div className="h-3.5 sm:h-4 w-60 sm:w-80 rounded-full bg-gradient-to-r from-[#27272A] via-[#52525B] to-[#27272A] border border-white/20 shadow-[0_20px_35px_rgba(0,0,0,0.3)]" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
