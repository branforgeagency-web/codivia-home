import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { departmentTiers, getDepartmentCases } from '../../data/departmentCases.js'
import { departments } from '../../data/departments.js'
import CodiviaLogo from '../ui/CodiviaLogo.jsx'

export default function DepartmentLandingPage({ deptId, onBack, onCheckout, user, onSignOut }) {
  const dept = departments.find((d) => d.id === deptId) || departments[0]
  const trialCases = getDepartmentCases(dept.id, dept.name)

  const [activeCaseIndex, setActiveCaseIndex] = useState(0)
  const [userIcd, setUserIcd] = useState('')
  const [userCpt, setUserCpt] = useState('')
  const [userHcpcs, setUserHcpcs] = useState('')
  const [validationResult, setValidationResult] = useState(null)
  const [caseProgress, setCaseProgress] = useState({})
  const [selectedTier, setSelectedTier] = useState('charts-200')
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [checkoutTier, setCheckoutTier] = useState(null)

  const activeCase = trialCases[activeCaseIndex] || trialCases[0]

  // Reset inputs when switching cases
  useEffect(() => {
    setUserIcd('')
    setUserCpt('')
    setUserHcpcs('')
    setValidationResult(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [dept.id, activeCaseIndex])

  // Sub-second validation logic
  const handleValidateCode = (e) => {
    e?.preventDefault()
    if (!activeCase) return

    const enteredIcd = userIcd.toUpperCase().trim()
    const enteredCpt = userCpt.toUpperCase().trim()
    const enteredHcpcs = userHcpcs.toUpperCase().trim()

    // Normalize for comparison
    const expectedIcds = (activeCase.expectedCodes.icd || []).map((c) => c.toUpperCase())
    const expectedCpts = (activeCase.expectedCodes.cpt || []).map((c) => c.toUpperCase())
    const expectedHcpcsList = (activeCase.expectedCodes.hcpcs || []).map((c) => c.toUpperCase())

    const icdMatch = expectedIcds.some((c) => enteredIcd.includes(c) || c.includes(enteredIcd))
    const cptMatch = expectedCpts.some((c) => enteredCpt.includes(c) || c.includes(enteredCpt))
    const hcpcsMatch =
      expectedHcpcsList.length === 0 ||
      expectedHcpcsList.some((c) => enteredHcpcs.includes(c) || c.includes(enteredHcpcs))

    const isCorrect = (icdMatch || !enteredIcd) && (cptMatch || !enteredCpt) && (enteredIcd !== '' || enteredCpt !== '')

    const result = {
      isCorrect,
      icdStatus: icdMatch ? 'correct' : 'mismatch',
      cptStatus: cptMatch ? 'correct' : 'mismatch',
      hcpcsStatus: hcpcsMatch ? 'correct' : 'neutral',
      expectedIcd: activeCase.expectedCodes.icd.join(', '),
      expectedCpt: activeCase.expectedCodes.cpt.join(', '),
      expectedHcpcs: activeCase.expectedCodes.hcpcs.join(', ') || 'None required',
      rationale: activeCase.rationale,
    }

    setValidationResult(result)
    setCaseProgress((prev) => ({
      ...prev,
      [activeCase.id]: isCorrect ? 'passed' : 'attempted',
    }))
  }

  const completedCount = Object.values(caseProgress).filter((status) => status === 'passed').length

  const handleBuyPack = (tier) => {
    setCheckoutTier(tier)
    setShowCheckoutModal(true)
  }

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF6F2] text-charcoal flex flex-col selection:bg-accent selection:text-white">
      {/* =========================================================================
          TOP STICKY NAVBAR
          ========================================================================= */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-charcoal/10 shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8 py-3.5">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 rounded-full bg-charcoal/5 hover:bg-charcoal/10 px-3 py-1.5 text-xs font-bold text-charcoal transition-colors cursor-pointer"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-charcoal/50">
              <span>CODIVIA</span>
              <span>/</span>
              <span>Specialties</span>
              <span>/</span>
              <span className="font-bold text-accent">{dept.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <button
                type="button"
                onClick={onSignOut}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-charcoal/5 hover:bg-charcoal/10 px-3.5 py-1.5 text-xs font-bold text-charcoal/70 hover:text-charcoal transition-colors cursor-pointer"
                title="Sign Out"
              >
                <span>{user.isDemo ? '⚡ Demo Coder' : (user.displayName || user.email?.split('@')[0] || 'Coder')}</span>
                <span className="text-charcoal/30">|</span>
                <span>Sign out</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => scrollToSection('pricing-packs')}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/30 hover:bg-accent hover:text-white px-4 py-1.5 text-xs font-bold text-accent transition-all cursor-pointer"
            >
              <span>Unlock More Charts</span>
              <span>↓</span>
            </button>

            <button
              onClick={() => handleBuyPack(departmentTiers[1])}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent via-accent-bright to-accent px-4 sm:px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-accent/25 hover:shadow-lg hover:shadow-accent/40 transition-all cursor-pointer"
            >
              <span>Get Full Access</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          HERO BANNER SECTION: Linear Gradient Background & 3D Medical Illustration
          ========================================================================= */}
      <section className="relative overflow-hidden bg-[linear-gradient(130deg,#FFFFFF_0%,#FFF7F2_25%,#FFEEE4_55%,#FFE6D8_80%,#FFF5EE_100%)] py-14 sm:py-18 border-b border-charcoal/10">
        {/* Linear Background Dot & Line Matrix Texture */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-60"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, rgba(241, 90, 36, 0.08) 1.5px, transparent 1.5px),
              linear-gradient(to right, rgba(241, 90, 36, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(20, 18, 16, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px, 96px 96px, 96px 96px',
            maskImage: 'linear-gradient(to bottom, #000 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, #000 70%, transparent 100%)',
          }}
        />

        {/* Ambient Linear Directional Glow Orbs */}
        <div className="pointer-events-none absolute -top-28 -right-20 h-[560px] w-[560px] rounded-full bg-gradient-to-br from-accent/25 via-[#FF6B00]/15 to-transparent blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-[480px] w-[480px] rounded-full bg-gradient-to-tr from-amber-400/20 via-accent/10 to-transparent blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Department Curriculum Narrative */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="font-mono text-xs font-black text-accent bg-accent/10 border border-accent/30 px-3 py-1 rounded-full shadow-xs">
                  SPECIALTY #{dept.index}
                </span>
                <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  5 Free Trial Charts Available
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-charcoal tracking-tight leading-[1.1]">
                {dept.name} <span className="text-accent">Coding Sandbox</span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-charcoal/80 leading-relaxed font-normal">
                {dept.focus}
              </p>

              {/* Department Code Range Matrix Badges */}
              <div className="mt-6 grid grid-cols-3 gap-3 font-mono text-xs max-w-xl">
                <div className="rounded-2xl bg-white border border-accent/20 p-3 shadow-xs">
                  <span className="text-[10px] font-extrabold text-accent block uppercase">ICD-10-CM</span>
                  <span className="text-sm font-black text-charcoal mt-0.5 block truncate">{dept.icd}</span>
                </div>
                <div className="rounded-2xl bg-white border border-accent/20 p-3 shadow-xs">
                  <span className="text-[10px] font-extrabold text-accent block uppercase">CPT®-4</span>
                  <span className="text-sm font-black text-charcoal mt-0.5 block truncate">{dept.cpt}</span>
                </div>
                <div className="rounded-2xl bg-white border border-accent/20 p-3 shadow-xs">
                  <span className="text-[10px] font-extrabold text-accent block uppercase">HCPCS LVL II</span>
                  <span className="text-sm font-black text-charcoal mt-0.5 block truncate">{dept.hcpcs}</span>
                </div>
              </div>

              {/* Quick Jump Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollToSection('trial-sandbox')}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-accent/25 hover:bg-accent-bright transition-all cursor-pointer"
                >
                  <span>Practice 5 Free Trial Charts</span>
                  <span>↓</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('pricing-packs')}
                  className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 bg-white px-5 py-3 text-xs sm:text-sm font-bold text-charcoal hover:bg-charcoal/5 transition-all cursor-pointer"
                >
                  <span>Buy {dept.name} Chart Packs</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Right: 3D Transparent Medical Illustration */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                {/* Radiant Backdrop Aura */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent/25 to-amber-300/30 blur-3xl opacity-80" />
                <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                  <img
                    src={`/departments/${dept.id}.png`}
                    alt={dept.name}
                    className="max-h-full max-w-full object-contain drop-shadow-2xl animate-float"
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE 5 FREE TRIAL PRACTICE CHARTS EHR SIMULATOR
          ========================================================================= */}
      <section id="trial-sandbox" className="py-14 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-600 font-mono uppercase tracking-wider mb-2">
              <span>Free Candidate Assessment</span>
              <span>•</span>
              <span>5 Real Encounters</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-charcoal tracking-tight">
              Interactive <span className="text-accent">{dept.name}</span> Trial Sandbox
            </h2>
            <p className="text-sm text-charcoal/70 mt-1 max-w-2xl">
              Code these 5 authentic hospital charts using official ICD-10-CM and CPT® rules. Receive instant validation and clinical rationale.
            </p>
          </div>

          {/* Progress Pill */}
          <div className="flex items-center gap-3 bg-white border border-charcoal/10 rounded-2xl p-3 shadow-xs">
            <div className="text-right">
              <span className="text-[10px] font-mono font-bold text-charcoal/50 uppercase block">Trial Progress</span>
              <span className="text-sm font-mono font-black text-charcoal">
                {completedCount} of {trialCases.length} Solved
              </span>
            </div>
            <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-black font-mono">
              {Math.round((completedCount / trialCases.length) * 100)}%
            </div>
          </div>
        </div>

        {/* Case Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
          {trialCases.map((c, idx) => {
            const isSelected = activeCaseIndex === idx
            const status = caseProgress[c.id]

            return (
              <button
                key={c.id}
                onClick={() => setActiveCaseIndex(idx)}
                className={`flex items-center gap-2.5 rounded-2xl px-4 py-3 text-xs font-mono font-bold border shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-charcoal text-white border-charcoal shadow-md scale-[1.02]'
                    : 'bg-white text-charcoal/80 border-charcoal/10 hover:border-accent hover:bg-white/90'
                }`}
              >
                <span
                  className={`h-5 w-5 rounded-lg flex items-center justify-center text-[10px] ${
                    isSelected
                      ? 'bg-accent text-white'
                      : status === 'passed'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-charcoal/10 text-charcoal'
                  }`}
                >
                  {status === 'passed' ? '✓' : idx + 1}
                </span>
                <span className="font-sans font-bold truncate max-w-[160px] sm:max-w-[200px]">
                  {c.title}
                </span>
              </button>
            )
          })}
        </div>

        {/* 2-Column EHR Chart & Code Entry Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Patient EHR Medical Record Sheet (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-charcoal/15 shadow-xl overflow-hidden">
            {/* EHR Window Header */}
            <div className="bg-[#1E293B] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                <span className="ml-2 text-xs font-mono font-bold text-slate-300">
                  EHR ENCOUNTER #{activeCase.id.toUpperCase()}
                </span>
              </div>
              <span className="text-[11px] font-mono bg-slate-700/80 px-2.5 py-0.5 rounded-md text-emerald-400 font-bold">
                {activeCase.patient.setting}
              </span>
            </div>

            {/* Patient Header Banner */}
            <div className="bg-slate-50 border-b border-slate-200/80 px-5 py-3 flex flex-wrap items-center justify-between text-xs font-mono text-slate-700 gap-2">
              <div>
                <span className="text-slate-400">AGE/SEX: </span>
                <span className="font-bold">{activeCase.patient.age}yo {activeCase.patient.gender}</span>
              </div>
              <div>
                <span className="text-slate-400">SPECIALTY: </span>
                <span className="font-bold text-accent">{dept.name}</span>
              </div>
              <div>
                <span className="text-slate-400">STATUS: </span>
                <span className="font-bold text-emerald-600">Pending Coding Sign-off</span>
              </div>
            </div>

            {/* Clinical Narrative Content */}
            <div className="p-6 space-y-5 text-sm leading-relaxed text-slate-800 font-sans max-h-[460px] overflow-y-auto">
              <div>
                <h4 className="text-xs font-mono font-black uppercase tracking-wider text-slate-400 mb-1">
                  History of Present Illness (HPI)
                </h4>
                <p className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">{activeCase.hpi}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-black uppercase tracking-wider text-slate-400 mb-1">
                  Physical Examination & Diagnostic Diagnostics
                </h4>
                <p className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">{activeCase.exam}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-black uppercase tracking-wider text-slate-400 mb-1">
                  Operative / Clinical Procedure Details
                </h4>
                <p className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">{activeCase.procedure}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-black uppercase tracking-wider text-slate-400 mb-1">
                  Physician Post-Procedure Findings
                </h4>
                <p className="bg-emerald-50/70 text-emerald-950 p-3 rounded-xl border border-emerald-200/60 font-medium">
                  {activeCase.findings}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Code Input & Instant Validation Console (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="rounded-3xl bg-white border border-charcoal/15 shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-charcoal tracking-tight">Code Entry Terminal</h3>
                <span className="text-xs font-mono font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-lg">
                  Sub-second Logic
                </span>
              </div>

              <form onSubmit={handleValidateCode} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-charcoal/70 mb-1.5">
                    1. Primary ICD-10-CM Diagnosis Code
                  </label>
                  <input
                    type="text"
                    placeholder={`e.g. ${activeCase.expectedCodes.icd[0] || 'I21.4'}`}
                    value={userIcd}
                    onChange={(e) => setUserIcd(e.target.value)}
                    className="w-full rounded-xl border border-charcoal/20 bg-slate-50 px-4 py-2.5 font-mono text-sm uppercase text-charcoal font-bold focus:border-accent focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-charcoal/70 mb-1.5">
                    2. CPT® Procedure Code & Modifiers
                  </label>
                  <input
                    type="text"
                    placeholder={`e.g. ${activeCase.expectedCodes.cpt[0] || '92928-LD'}`}
                    value={userCpt}
                    onChange={(e) => setUserCpt(e.target.value)}
                    className="w-full rounded-xl border border-charcoal/20 bg-slate-50 px-4 py-2.5 font-mono text-sm uppercase text-charcoal font-bold focus:border-accent focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-charcoal/70 mb-1.5">
                    3. HCPCS Level II Supply / Device (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. C1761 (if applicable)"
                    value={userHcpcs}
                    onChange={(e) => setUserHcpcs(e.target.value)}
                    className="w-full rounded-xl border border-charcoal/20 bg-slate-50 px-4 py-2.5 font-mono text-sm uppercase text-charcoal font-bold focus:border-accent focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-accent hover:bg-accent-bright py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-accent/30 transition-all cursor-pointer"
                  >
                    Validate & Grade Chart
                  </button>
                </div>
              </form>

              {/* Instant Scoring Feedback Window */}
              <AnimatePresence>
                {validationResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mt-5 rounded-2xl p-4 border text-xs leading-relaxed ${
                      validationResult.isCorrect
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : 'bg-amber-50 border-amber-300 text-amber-950'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold mb-2">
                      <span className="flex items-center gap-1.5 text-sm">
                        {validationResult.isCorrect ? '✓ Verified Clinical Solution' : '⚠️ Guideline Mismatch'}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded">
                        AHA & NCCI Validated
                      </span>
                    </div>

                    <div className="space-y-1 font-mono text-[11px] mb-2 bg-white/60 p-2.5 rounded-xl">
                      <div><strong className="text-accent">Target ICD-10:</strong> {validationResult.expectedIcd}</div>
                      <div><strong className="text-accent">Target CPT®:</strong> {validationResult.expectedCpt}</div>
                      <div><strong className="text-accent">Target HCPCS:</strong> {validationResult.expectedHcpcs}</div>
                    </div>

                    <p className="font-sans font-medium text-charcoal/85">{validationResult.rationale}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIERED CHART PACK PRICING SECTION (Specific to Department)
          ========================================================================= */}
      <section id="pricing-packs" className="bg-gradient-to-b from-[#FAF6F2] via-white to-[#FAF6F2] py-16 sm:py-24 border-t border-charcoal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs font-black uppercase tracking-widest text-accent bg-accent/10 px-3.5 py-1 rounded-full border border-accent/20">
              EXPAND YOUR PRACTICE CORPUS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-charcoal tracking-tight mt-3">
              Buy Authentic <span className="text-accent">{dept.name}</span> Practice Charts
            </h2>
            <p className="text-sm sm:text-base text-charcoal/70 mt-3 leading-relaxed">
              Unlock hundreds of authentic hospital encounters for {dept.name}. Select the chart tier that matches your career goal and gain instant access to the Codivia Software Workspace.
            </p>
          </div>

          {/* 7 Practice Chart Pricing Tier Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {departmentTiers.map((tier) => {
              const isSelected = selectedTier === tier.id

              return (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 cursor-pointer ${
                    tier.popular
                      ? 'bg-[#1E293B] text-white border-2 border-accent shadow-2xl shadow-accent/25 scale-[1.03] lg:-translate-y-2'
                      : 'bg-white text-charcoal border border-charcoal/15 shadow-lg hover:border-accent/50 hover:shadow-xl'
                  }`}
                >
                  {/* Badge */}
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span
                        className={`text-[10px] font-mono font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md ${
                          tier.popular
                            ? 'bg-accent text-white'
                            : 'bg-charcoal text-white'
                        }`}
                      >
                        {tier.badge}
                      </span>
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="pt-2">
                      <h3 className={`text-lg font-black tracking-tight ${tier.popular ? 'text-white' : 'text-charcoal'}`}>
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
                      <p className={`text-xs mt-2 leading-relaxed ${tier.popular ? 'text-slate-300' : 'text-charcoal/70'}`}>
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
                          {tier.chartsCount === 13200 ? 'Hospital Charts' : `${dept.name} Charts`}
                        </span>
                      </div>
                      <span className={`block text-[10px] font-mono font-bold mt-0.5 uppercase tracking-widest ${tier.popular ? 'text-slate-300' : 'text-charcoal/60'}`}>
                        {tier.chartsCount === 13200 ? 'All 22 Clinical Specialties' : 'Instant Practice Access'}
                      </span>
                    </div>

                    {/* Feature List */}
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

                  {/* Buy Button */}
                  <div className="mt-8 pt-4 border-t border-charcoal/10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleBuyPack(tier)
                      }}
                      className={`w-full rounded-full py-3 text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer ${
                        tier.popular
                          ? 'bg-gradient-to-r from-accent via-accent-bright to-accent text-white hover:shadow-accent/40 hover:scale-[1.02]'
                          : 'bg-charcoal hover:bg-black text-white hover:scale-[1.02]'
                      }`}
                    >
                      Buy Pack & Unlock Software
                    </button>
                    <span className="block text-center text-[10px] font-mono text-charcoal/40 mt-2">
                      Instant Access Credentials Provided
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          OTHER CLINICAL DEPARTMENTS EXPLORER STRIP
          ========================================================================= */}
      <section className="bg-charcoal text-white py-12 px-4 sm:px-8 border-t border-charcoal/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest">
                22 CLINICAL TRACKS
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Explore Other Specialized Medical Departments
              </h3>
            </div>
            <button
              onClick={() => {
                if (onBack) {
                  onBack()
                } else {
                  window.location.hash = ''
                }
                setTimeout(() => {
                  const deptSection = document.getElementById('departments')
                  if (deptSection) {
                    deptSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }, 80)
              }}
              className="text-xs font-mono font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
            >
              <span>View All 22 Specialties</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {departments.slice(0, 12).map((other) => (
              <a
                key={other.id}
                href={`#/department/${other.id}`}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  other.id === dept.id
                    ? 'bg-accent text-white border-accent shadow-md'
                    : 'bg-white/5 border-white/10 hover:border-accent/40 hover:bg-white/10 text-slate-300 hover:text-white'
                }`}
              >
                <span className="font-mono text-[10px] text-accent/80 block">#{other.index}</span>
                <span className="text-xs font-bold truncate block mt-0.5">{other.name}</span>
                <span className="text-[9px] font-mono opacity-60 block mt-1">{other.charts} charts</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHECKOUT & SOFTWARE ACCESS UNLOCK MODAL
          ========================================================================= */}
      <AnimatePresence>
        {showCheckoutModal && checkoutTier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 border border-charcoal/15 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-charcoal/5 hover:bg-charcoal/10 flex items-center justify-center text-charcoal font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-emerald-600 uppercase">
                  Secure Checkout & Instant Software Access
                </span>
              </div>

              <h3 className="text-2xl font-black text-charcoal tracking-tight">
                Unlock {checkoutTier.name}
              </h3>
              <p className="text-xs text-charcoal/70 mt-1">
                Gains immediate full access to {checkoutTier.chartsCount} practice charts for {dept.name} in the Codivia EHR Coding Software.
              </p>

              {/* Order Summary Box */}
              <div className="my-5 rounded-2xl bg-slate-50 border border-charcoal/10 p-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Specialty Department:</span>
                  <span className="font-bold text-charcoal">{dept.name} (#{dept.index})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Encounter Package:</span>
                  <span className="font-bold text-charcoal">{checkoutTier.chartsCount} Hospital Charts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Software License:</span>
                  <span className="font-bold text-emerald-600">Codivia EHR Workspace Pro</span>
                </div>
                <div className="pt-2 border-t border-charcoal/10 flex justify-between text-sm font-bold">
                  <span>Total Due Today:</span>
                  <span className="text-accent text-base">{checkoutTier.priceINR} ({checkoutTier.priceUSD})</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowCheckoutModal(false)
                    if (onCheckout) {
                      onCheckout(checkoutTier)
                    } else {
                      alert(`Enrolment for ${dept.name} ${checkoutTier.name} initiated. Please sign in to verify your workspace access!`)
                    }
                  }}
                  className="w-full rounded-full bg-gradient-to-r from-accent via-accent-bright to-accent py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-accent/30 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  Pay with Razorpay / UPI / Card ({checkoutTier.priceINR})
                </button>
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="w-full rounded-full border border-charcoal/15 py-2.5 text-xs font-bold text-charcoal/70 hover:bg-charcoal/5 transition-colors cursor-pointer"
                >
                  Continue Practicing Free Charts
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-mono text-charcoal/40">
                <span>🔒 256-Bit SSL Encrypted</span>
                <span>•</span>
                <span>Instant Software Unlock</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
