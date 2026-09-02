import { motion } from 'framer-motion'
import CodiviaLogo from '../ui/CodiviaLogo.jsx'

/**
 * NewHeroBanner
 * Light-themed, high-converting Hero Banner section for Codivia.
 * Uses the user's high-resolution background asset featuring the 3D laptop with Codivia tool screen.
 */
export default function NewHeroBanner({ onStartFree, onSeeHowItWorks, onSignIn }) {
  const scrollToPricing = () => {
    const el = document.getElementById('pricing')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToDepartments = () => {
    const el = document.getElementById('departments')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#FAF7F2] text-charcoal pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24 border-b border-charcoal/10">
      
      {/* =========================================================================
          USER-PROVIDED HERO BANNER BACKGROUND IMAGE
          ========================================================================= */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-100"
        style={{
          backgroundImage: 'url(/hero-clean-bg.png)',
        }}
      />

      {/* 3D Origami "TRY 5 FREE TRIAL CHARTS" Badge — pinned to the top-right corner of the banner */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: [0, -8, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{
          opacity: { duration: 0.6 },
          y: { repeat: Infinity, duration: 3.6, ease: 'easeInOut' },
          rotate: { repeat: Infinity, duration: 5, ease: 'easeInOut' },
        }}
        whileHover={{ scale: 1.08, rotate: 0 }}
        whileTap={{ scale: 0.96 }}
        onClick={scrollToDepartments}
        className="absolute top-[82px] right-8 sm:top-[94px] sm:right-12 md:top-[102px] md:right-16 z-30 cursor-pointer select-none group origin-top-right scale-[0.34] xs:scale-[0.4] sm:scale-[0.5] md:scale-[0.6] lg:scale-[0.68]"
        title="Choose a department & buy charts"
      >
        {/* Origami Structure Container */}
        <div className="relative flex flex-col items-center drop-shadow-[0_22px_45px_rgba(0,0,0,0.38)] group-hover:drop-shadow-[0_30px_60px_rgba(220,38,38,0.58)] transition-all duration-300">

          {/* Top Dark Folded Tab ("TRY 5" with Glowing Highlight & Dog-Ear) */}
          <div className="relative z-20 self-start ml-2 sm:ml-4">
            {/* Folded Corner Dog-Ear */}
            <div className="absolute -left-3.5 sm:-left-4 top-0 w-0 h-0 border-t-[12px] sm:border-t-[15px] border-t-transparent border-r-[12px] sm:border-r-[15px] border-r-[#0A0A0C] border-b-[12px] sm:border-b-[15px] border-b-[#0A0A0C]" />

            <div className="bg-[#141417] font-black text-sm sm:text-lg md:text-xl tracking-[0.22em] uppercase px-6 sm:px-8 py-1.5 sm:py-2 rounded-t-lg shadow-xl border-t-2 border-x-2 border-white/40 flex items-center justify-center gap-2">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1],
                  filter: [
                    'drop-shadow(0 0 4px #FFE600)',
                    'drop-shadow(0 0 16px #FFE600)',
                    'drop-shadow(0 0 4px #FFE600)',
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: 'easeInOut',
                }}
                className="flex items-center gap-1.5 text-[#FFE600] font-black tracking-[0.2em]"
              >
                <span>TRY</span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-black text-yellow-300 leading-none drop-shadow-[0_0_12px_#FFE600]">
                  5
                </span>
              </motion.div>
              <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#FFE600] animate-ping" />
            </div>
          </div>

          {/* Main Red Banner ("5 FREE TRIAL CHARTS" with Giant Number 5) */}
          <div className="relative z-10 bg-gradient-to-br from-[#DC2626] via-[#EF4444] to-[#B91C1C] text-white px-6 sm:px-9 py-5 sm:py-6 shadow-2xl border-t border-white/40 overflow-hidden w-[250px] sm:w-[320px] md:w-[360px] text-center rounded-sm">
            {/* Diagonal Glass Sweep Reflection */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

            <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 leading-[0.88]">
              {/* Extra Giant Number 5 */}
              <span className="font-black text-6xl sm:text-7xl md:text-8xl text-yellow-300 drop-shadow-[0_5px_15px_rgba(0,0,0,0.7)] leading-none inline-block transform -translate-y-0.5">
                5
              </span>
              <div className="flex flex-col items-start text-left leading-[0.9]">
                <span className="font-black text-2xl sm:text-3xl md:text-4xl tracking-tight uppercase drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)]">
                  FREE TRIAL
                </span>
                <span className="font-black text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)] mt-0.5 sm:mt-1">
                  CHARTS
                </span>
              </div>
            </div>

            {/* Sub-badge Highlight */}
            <div className="mt-3.5 pt-2.5 border-t border-white/30 flex items-center justify-center gap-1.5 font-mono text-[10px] sm:text-xs uppercase font-extrabold text-white/95 tracking-wider">
              <span className="h-2 w-2 rounded-full bg-yellow-300 animate-ping" />
              <span>Instant EHR Access • Free Practice</span>
            </div>
          </div>

          {/* Bottom 3D Origami Fold Triangle */}
          <div className="self-end mr-5 sm:mr-8 flex">
            {/* Shadow Fold Triangle */}
            <div className="w-0 h-0 border-l-[18px] sm:border-l-[24px] border-l-transparent border-t-[18px] sm:border-t-[24px] border-t-[#6B1414]" />
            {/* Projecting Ribbon Point */}
            <div className="w-0 h-0 border-r-[24px] sm:border-r-[34px] border-r-transparent border-t-[18px] sm:border-t-[24px] border-t-[#B91C1C]" />
          </div>

        </div>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-14">
        
        {/* =========================================================================
            MAIN 2-COLUMN HERO LAYOUT: CONTENT ON LEFT, WHOLE LAPTOP ON RIGHT
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* =======================================================================
              LEFT COLUMN: Headlines, Value Prop, CTAs & 4 Feature Pillars (6 cols)
              ======================================================================= */}
          <div className="lg:col-span-6 flex flex-col text-left">
            
            {/* Top Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-accent shadow-xs mb-5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span>BREAK THE EXPERIENCE GAP • REAL CLINICAL PRACTICE</span>
            </motion.div>

            {/* Main Headline Requested by User */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-charcoal leading-[1.12]"
            >
              Break the experience gap.{' '}
              <span className="relative block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#FF6B00] to-amber-500 drop-shadow-xs">
                Master clinical coding.
                <motion.span
                  className="absolute -bottom-1 left-0 h-[4px] w-full rounded-full bg-gradient-to-r from-accent to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </motion.h1>

            {/* Subheading / Value Prop Requested by User */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 max-w-xl text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans"
            >
              Practice on thousands of <strong className="text-charcoal font-bold">authentic de-identified clinical encounters</strong> with real-time coding validation before your first hospital job.
            </motion.p>

            {/* Micro Trust Bullet */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-3 flex items-center gap-2 text-xs font-mono font-semibold text-emerald-700"
            >
              <svg className="h-4 w-4 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Instant EHR unlock • 22 Hospital Specialties • Real-Time Answer Scoring</span>
            </motion.div>

            {/* Action Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-7 flex flex-wrap items-center gap-4"
            >
              {/* Primary Vibrant Orange CTA Button */}
              <button
                onClick={scrollToPricing}
                className="group relative inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-accent via-accent-bright to-accent px-7 py-4 text-sm sm:text-base font-black uppercase tracking-wider text-white shadow-lg shadow-accent/35 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-accent/45 cursor-pointer active:scale-[0.98]"
              >
                <span>Start Coding Live Charts</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1 font-mono text-lg">→</span>
              </button>

              {/* Secondary Frosted Glass Watch Demo Button */}
              <button
                onClick={scrollToHowItWorks}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-charcoal/20 bg-white/70 backdrop-blur-md px-6 py-4 text-sm sm:text-base font-bold text-charcoal transition-all duration-300 hover:bg-white hover:border-charcoal/40 shadow-xs cursor-pointer active:scale-[0.98]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-charcoal/10 text-xs text-charcoal font-bold">
                  ▶
                </span>
                <span>Watch Demo</span>
              </button>
            </motion.div>

            {/* 4 Feature Pillars (Aligned with Experience Gap & Real-time Validation) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-charcoal/10"
            >
              {/* Feature 1 */}
              <div className="flex flex-col">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-accent/30 text-accent shadow-xs mb-2.5">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-charcoal leading-snug">
                  Authentic Encounters
                </h4>
                <p className="text-[11px] text-charcoal/65 mt-1 leading-relaxed">
                  Real de-identified charts from 22 hospital specialties.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-accent/30 text-accent shadow-xs mb-2.5">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-charcoal leading-snug">
                  Real-Time Validation
                </h4>
                <p className="text-[11px] text-charcoal/65 mt-1 leading-relaxed">
                  Instant answer keys and rationale feedback.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-accent/30 text-accent shadow-xs mb-2.5">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-charcoal leading-snug">
                  First-Job Ready
                </h4>
                <p className="text-[11px] text-charcoal/65 mt-1 leading-relaxed">
                  Bridge the gap to your first hospital job.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-accent/30 text-accent shadow-xs mb-2.5">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-charcoal leading-snug">
                  100% HIPAA Safe
                </h4>
                <p className="text-[11px] text-charcoal/65 mt-1 leading-relaxed">
                  Completely de-identified clinical records.
                </p>
              </div>
            </motion.div>

          </div>

          {/* =======================================================================
              RIGHT COLUMN: TRANSPARENT PNG 3D LAPTOP (100% VISIBLE, ZERO BLUR)
              ======================================================================= */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-full max-w-[660px] flex items-center justify-center group"
            >
              {/* Subtle Ambient Radial Lighting Behind Transparent Laptop */}
              <div
                className="pointer-events-none absolute -inset-6 rounded-full blur-[80px] opacity-45"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 107, 0, 0.35) 0%, rgba(254, 215, 170, 0.2) 50%, transparent 70%)',
                }}
              />

              {/* ===================================================================
                  ORIGAMI "BUY CHARTS NOW" BADGE (Top-Right of Laptop - Scaled Down)
                  =================================================================== */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{
                  y: [0, -8, 0],
                  rotate: [-1, 1, -1],
                }}
                transition={{
                  y: { repeat: Infinity, duration: 3.4, ease: 'easeInOut' },
                  rotate: { repeat: Infinity, duration: 4.8, ease: 'easeInOut' },
                  scale: { type: 'spring', stiffness: 350, damping: 22 },
                }}
                whileHover={{ scale: 1.1, y: -10, rotate: 0 }}
                whileTap={{ scale: 0.96 }}
                onClick={scrollToDepartments}
                className="absolute -top-[45px] right-[5px] sm:-top-[60px] sm:right-[15px] md:-top-[75px] md:right-[20px] lg:-top-[85px] lg:right-[25px] z-30 cursor-pointer select-none group origin-bottom-right"
                title="Choose a department & buy charts"
              >
                {/* Radiant Glowing Background Halo */}
                <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-red-600/70 via-[#FF4A00]/80 to-red-600/70 blur-2xl opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 pointer-events-none" />

                {/* Origami Structure Container */}
                <div className="relative flex flex-col items-center drop-shadow-[0_18px_35px_rgba(0,0,0,0.55)] group-hover:drop-shadow-[0_25px_45px_rgba(220,38,38,0.65)] transition-all duration-300">
                  
                  {/* Top Dark Folded Tab ("BUY" with Highlight) */}
                  <div className="relative z-20 self-start ml-2 sm:ml-3">
                    {/* Folded Corner Dog-Ear */}
                    <div className="absolute -left-2.5 sm:-left-3 top-0 w-0 h-0 border-t-[9px] sm:border-t-[12px] border-t-transparent border-r-[9px] sm:border-r-[12px] border-r-[#0A0A0C] border-b-[9px] sm:border-b-[12px] border-b-[#0A0A0C]" />
                    
                    <div className="bg-[#141417] font-black text-xs sm:text-base md:text-lg tracking-[0.2em] uppercase px-4 sm:px-6 py-1 sm:py-1.5 rounded-t-md shadow-lg border-t-2 border-x-2 border-white/40 flex items-center justify-center gap-2">
                      <motion.span
                        animate={{
                          scale: [1, 1.25, 1],
                          opacity: [1, 0.4, 1],
                          filter: [
                            'drop-shadow(0 0 3px #FFE600)',
                            'drop-shadow(0 0 12px #FFE600)',
                            'drop-shadow(0 0 3px #FFE600)',
                          ],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.1,
                          ease: 'easeInOut',
                        }}
                        className="inline-block text-[#FFE600] font-black tracking-[0.2em]"
                      >
                        BUY
                      </motion.span>
                      <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#FFE600] animate-ping" />
                    </div>
                  </div>

                  {/* Main Red-Orange Banner ("CHARTS NOW") */}
                  <div className="relative z-10 bg-gradient-to-br from-[#DC2626] via-[#EF4444] to-[#B91C1C] text-white px-4 sm:px-6 py-3 sm:py-4 shadow-xl border-t border-white/40 overflow-hidden w-[155px] sm:w-[190px] md:w-[225px] text-center rounded-sm">
                    {/* Diagonal Glass Sweep Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                    <div className="flex flex-col items-center leading-[0.9]">
                      <span className="font-black text-2xl sm:text-3xl md:text-4xl tracking-tighter uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        CHARTS
                      </span>
                      <span className="font-black text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] mt-0.5 sm:mt-1">
                        NOW
                      </span>
                    </div>

                    {/* Sub-badge Highlight */}
                    <div className="mt-2 pt-1.5 border-t border-white/30 flex items-center justify-center gap-1 font-mono text-[9px] sm:text-[10px] uppercase font-extrabold text-white/95 tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-yellow-300 animate-ping" />
                      <span>Instant EHR Access</span>
                    </div>
                  </div>

                  {/* Bottom 3D Origami Fold Triangle */}
                  <div className="self-end mr-3 sm:mr-5 flex">
                    {/* Shadow Fold Triangle */}
                    <div className="w-0 h-0 border-l-[14px] sm:border-l-[18px] border-l-transparent border-t-[14px] sm:border-t-[18px] border-t-[#6B1414]" />
                    {/* Projecting Ribbon Point */}
                    <div className="w-0 h-0 border-r-[18px] sm:border-r-[26px] border-r-transparent border-t-[14px] sm:border-t-[18px] border-t-[#B91C1C]" />
                  </div>

                </div>
              </motion.div>

              {/* ===================================================================
                  SECOND ORIGAMI "TRY 5 FREE TRIAL CHARTS" BADGE (Bottom-Left of Laptop - Scaled Down)
                  =================================================================== */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{
                  y: [0, 6, 0],
                  rotate: [1, -1, 1],
                }}
                transition={{
                  y: { repeat: Infinity, duration: 3.8, ease: 'easeInOut' },
                  rotate: { repeat: Infinity, duration: 5.2, ease: 'easeInOut' },
                  scale: { type: 'spring', stiffness: 350, damping: 22 },
                }}
                whileHover={{ scale: 1.1, y: 0, rotate: 0 }}
                whileTap={{ scale: 0.96 }}
                onClick={scrollToDepartments}
                className="absolute -bottom-[15px] -left-[5px] sm:-bottom-[25px] sm:-left-[15px] md:-bottom-[35px] md:-left-[20px] lg:-bottom-[40px] lg:-left-[25px] z-30 cursor-pointer select-none group origin-top-left"
                title="Choose a department & buy charts"
              >
                {/* Radiant Glowing Background Halo */}
                <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-orange-500/70 via-[#FF6B00]/80 to-amber-500/70 blur-2xl opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 pointer-events-none" />

                {/* Origami Structure Container */}
                <div className="relative flex flex-col items-center drop-shadow-[0_18px_35px_rgba(0,0,0,0.4)] group-hover:drop-shadow-[0_25px_45px_rgba(242,103,34,0.6)] transition-all duration-300">
                  
                  {/* Top Dark Folded Tab ("TRY 5") */}
                  <div className="relative z-20 self-start ml-2 sm:ml-3">
                    {/* Folded Corner Dog-Ear */}
                    <div className="absolute -left-2.5 sm:-left-3 top-0 w-0 h-0 border-t-[9px] sm:border-t-[12px] border-t-transparent border-r-[9px] sm:border-r-[12px] border-r-[#0A0A0C] border-b-[9px] sm:border-b-[12px] border-b-[#0A0A0C]" />
                    
                    <div className="bg-[#141417] font-black text-[11px] sm:text-xs md:text-sm tracking-[0.18em] uppercase px-3.5 sm:px-5 py-1 sm:py-1.5 rounded-t-md shadow-lg border-t-2 border-x-2 border-white/40 flex items-center justify-center gap-1.5">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.5, 1],
                          filter: [
                            'drop-shadow(0 0 3px #FFE600)',
                            'drop-shadow(0 0 12px #FFE600)',
                            'drop-shadow(0 0 3px #FFE600)',
                          ],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.2,
                          ease: 'easeInOut',
                        }}
                        className="flex items-center gap-1 text-[#FFE600] font-black tracking-[0.16em]"
                      >
                        <span>TRY</span>
                        <span className="text-base sm:text-lg md:text-xl font-black text-yellow-300 leading-none drop-shadow-[0_0_10px_#FFE600]">
                          5
                        </span>
                      </motion.div>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FFE600] animate-ping" />
                    </div>
                  </div>

                  {/* Main Orange-Red Origami Card ("FREE TRIAL CHARTS" with Giant 5) */}
                  <div className="relative z-10 bg-gradient-to-br from-[#FF6B00] via-[#F26722] to-[#D94F00] text-white px-3.5 sm:px-5 py-2.5 sm:py-3.5 shadow-xl border-t border-white/40 overflow-hidden w-[155px] sm:w-[190px] md:w-[225px] text-center rounded-sm">
                    {/* Diagonal Glass Sweep Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                    <div className="flex items-center justify-center gap-2 sm:gap-2.5 leading-[0.88]">
                      {/* Giant Number 5 */}
                      <span className="font-black text-4xl sm:text-5xl md:text-6xl text-yellow-300 drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)] leading-none inline-block">
                        5
                      </span>
                      <div className="flex flex-col items-start text-left leading-[0.9]">
                        <span className="font-black text-base sm:text-lg md:text-xl tracking-tight uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                          FREE TRIAL
                        </span>
                        <span className="font-black text-lg sm:text-xl md:text-2xl tracking-tight uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] mt-0.5">
                          CHARTS
                        </span>
                      </div>
                    </div>

                    {/* Sub-badge Highlight */}
                    <div className="mt-2 pt-1.5 border-t border-white/30 flex items-center justify-center gap-1 font-mono text-[8px] sm:text-[9px] uppercase font-extrabold text-white/95 tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-yellow-300 animate-ping" />
                      <span>Instant Access • No Card</span>
                    </div>
                  </div>

                  {/* Bottom 3D Origami Fold Triangle */}
                  <div className="self-end mr-3 sm:mr-4 flex">
                    {/* Shadow Fold Triangle */}
                    <div className="w-0 h-0 border-l-[12px] sm:border-l-[16px] border-l-transparent border-t-[12px] sm:border-t-[16px] border-t-[#8C2C00]" />
                    {/* Projecting Ribbon Point */}
                    <div className="w-0 h-0 border-r-[16px] sm:border-r-[22px] border-r-transparent border-t-[12px] sm:border-t-[16px] border-t-[#D94F00]" />
                  </div>

                </div>
              </motion.div>

              {/* Transparent PNG Laptop Asset */}
              <img
                src="/codivia-laptop-transparent.png"
                alt="Codivia Clinical EHR Coding Platform"
                className="relative z-10 w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.14)] transition-transform duration-500 hover:scale-[1.02] translate-y-[50px]"
              />
            </motion.div>
          </div>

        </div>

        {/* =========================================================================
            BOTTOM TRUST & ACCREDITATION STRIP (Light Theme)
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 sm:mt-20 pt-8 border-t border-charcoal/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-center"
        >
          <span className="text-xs sm:text-sm font-medium text-charcoal/60 tracking-wider">
            Used and trusted by coders worldwide
          </span>
          <span className="hidden sm:inline text-charcoal/20">|</span>

          {/* Official Accreditation Badges */}
          <div className="flex items-center gap-6 sm:gap-10">
            {/* AHIMA */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-serif font-black tracking-widest text-charcoal/80 hover:text-charcoal transition">
              <span>☤</span>
              <span>AHIMA</span>
            </div>

            {/* AAPC */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-sans font-black tracking-widest text-charcoal/80 hover:text-charcoal transition">
              <span className="h-4 w-4 rounded-full border border-charcoal/40 flex items-center justify-center text-[9px] font-bold">A</span>
              <span>AAPC</span>
            </div>

            {/* Caduceus Seal */}
            <div className="hidden md:flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800">
              <span className="text-accent text-sm">⚕</span>
              <span>HIPAA CERTIFIED</span>
            </div>

            {/* CHIMA */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-serif font-black tracking-widest text-charcoal/80 hover:text-charcoal transition">
              <span>CHIMA</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
