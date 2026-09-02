import { motion } from 'framer-motion'

/**
 * About Section / About CODIVIA (2nd Section)
 * Left: Narrative content, value highlights & CTAs
 * Right: Realistic Tablet Screen Device Mockup containing the platform video
 */
export default function Hero({ onStartFree, onSeeHowItWorks }) {
  return (
    <section
      id="about"
      className="relative isolate w-full overflow-hidden bg-gradient-to-b from-[#FFFDFB] via-[#FAF4EE] to-[#F5ECE2] text-charcoal border-b border-charcoal/10"
    >
      {/* Background Architectural Grid Pattern with Radial Falloff */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(241, 90, 36, 0.07) 1.5px, transparent 1.5px),
            linear-gradient(to right, rgba(20, 18, 16, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(20, 18, 16, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px, 112px 112px, 112px 112px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 60%, transparent 100%)',
        }}
      />

      {/* Dynamic Floating Radiant Ambient Glow Orbs */}
      <div className="pointer-events-none absolute -top-32 -left-20 h-[580px] w-[580px] rounded-full bg-gradient-to-br from-accent/20 via-accent/8 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 right-[-8%] h-[640px] w-[640px] rounded-full bg-gradient-to-tl from-[#FF6B00]/22 via-[#FF8A65]/12 to-transparent blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-[420px] w-[420px] rounded-full bg-amber-400/10 blur-[130px]" />

      {/* Decorative Curvature Soundwave / Contour Line SVG in Background */}
      <svg
        className="pointer-events-none absolute -right-20 top-1/4 h-[500px] w-[600px] opacity-[0.06] text-accent stroke-current"
        fill="none"
        viewBox="0 0 600 500"
      >
        <path d="M0 250 Q150 100 300 250 T600 250" strokeWidth="2" strokeDasharray="6 6" />
        <path d="M0 290 Q150 140 300 290 T600 290" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M0 210 Q150 60 300 210 T600 210" strokeWidth="1" strokeDasharray="8 8" />
        <circle cx="300" cy="250" r="180" strokeWidth="1.5" strokeDasharray="4 8" />
        <circle cx="300" cy="250" r="240" strokeWidth="1" strokeDasharray="6 12" />
      </svg>

      {/* Main 2-Column Content Grid */}
      <div className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12 py-14 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          
          {/* =========================================================================
              LEFT COLUMN: Editorial Copy, Badges & CTAs (5 cols)
              ========================================================================= */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center">
            {/* Eyebrow Pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white/90 px-3.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-accent backdrop-blur-md shadow-xs self-start mb-4"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span>About CODIVIA • Practice-First Platform</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="font-sans text-3xl sm:text-5xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight leading-[1.1] text-charcoal"
            >
              Code with{' '}
              <span className="bg-gradient-to-r from-accent via-accent-bright to-accent-dim bg-clip-text text-transparent">
                confidence,
              </span>
              <br />
              get placed.
            </motion.h1>

            {/* Narrative Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-5 text-sm sm:text-base lg:text-base xl:text-lg text-charcoal/80 leading-relaxed font-normal"
            >
              CODIVIA is an immersive medical coding workspace built to bridge the experience gap between certification and your first hospital job. Practice on{' '}
              <strong className="font-semibold text-charcoal">13,200+ authentic de-identified patient encounters</strong> across{' '}
              <strong className="font-semibold text-charcoal">22 clinical specialties</strong> with sub-second ICD-10-CM, CPT®-4, and HCPCS Level II validation logic.
            </motion.p>

            {/* Key Platform Pillars / Feature Badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 font-mono text-xs"
            >
              <div className="flex items-center gap-2.5 rounded-xl border border-charcoal/10 bg-white/80 p-3 shadow-xs">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent font-bold">
                  ✓
                </span>
                <div>
                  <p className="font-bold text-charcoal">Live EHR Charts</p>
                  <p className="text-[10px] text-charcoal/55 font-sans">Full hospital encounters</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl border border-charcoal/10 bg-white/80 p-3 shadow-xs">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 font-bold">
                  ⚡
                </span>
                <div>
                  <p className="font-bold text-charcoal">Instant Scoring</p>
                  <p className="text-[10px] text-charcoal/55 font-sans">NCCI guideline checks</p>
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <button
                onClick={onStartFree}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-accent via-accent-bright to-accent px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 shadow-xl shadow-accent/25 hover:shadow-2xl hover:shadow-accent/40 hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="relative z-10">Start Free Practice</span>
                <svg
                  className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <button
                onClick={onSeeHowItWorks}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-charcoal/20 bg-white/80 px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-charcoal transition-all duration-300 hover:bg-white hover:border-charcoal hover:shadow-md cursor-pointer backdrop-blur-md"
              >
                <span>See How It Works</span>
                <span className="text-charcoal/40 transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </button>
            </motion.div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Tablet Screen Device Frame with Video (7 cols - Larger)
              ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 xl:col-span-7 flex justify-center items-center relative"
          >
            {/* Ambient Multi-Hue Aura Halo behind Tablet */}
            <div className="pointer-events-none absolute -inset-3 sm:-inset-6 rounded-[36px] sm:rounded-[48px] bg-gradient-to-tr from-accent/30 via-[#FF6B00]/20 to-amber-300/25 blur-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Slim Modern Tablet Chassis - Larger Presentation */}
            <div className="relative w-full max-w-[720px] rounded-[24px] sm:rounded-[32px] bg-[#141417] p-2 sm:p-2.5 border border-[#2E2E33] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)] group">
              
              {/* Tablet Top Subtle Camera Dot */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center gap-1 z-30 opacity-70">
                <span className="h-1 w-1 rounded-full bg-[#3F3F46]" />
              </div>

              {/* Edge-to-Edge Tablet Display Screen */}
              <div className="relative w-full overflow-hidden rounded-[16px] sm:rounded-[22px] bg-black border border-white/10 shadow-inner">
                {/* Embedded Clinical Video matching exact dimensions */}
                <video
                  src="https://res.cloudinary.com/c2wyo4vs/video/upload/v1788235447/13.mp4"
                  poster="/banner-bg.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  webkit-playsinline="true"
                  preload="auto"
                  disablePictureInPicture
                  disableRemotePlayback
                  className="w-full h-auto block object-contain"
                >
                  <source
                    src="https://res.cloudinary.com/c2wyo4vs/video/upload/v1788235447/13.mp4"
                    type="video/mp4"
                  />
                </video>

                {/* Top-Right Floating Status Pill */}
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 rounded-full bg-black/60 border border-white/20 px-2.5 py-1 text-[10px] font-mono font-bold text-white backdrop-blur-md shadow-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>EHR WORKSPACE</span>
                </div>

                {/* Subtle Diagonal Glass Gloss Highlight */}
                <div
                  className="pointer-events-none absolute inset-0 z-10 opacity-30"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 60%)',
                  }}
                />
              </div>

              {/* Tablet Bottom Slim Home Indicator Bar */}
              <div className="flex justify-center pt-1.5 pb-0.5">
                <span className="h-0.5 w-20 sm:w-28 rounded-full bg-white/20" />
              </div>
            </div>

            {/* Creative Floating High-Converting "Get Access / Buy Charts" Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              animate={{ y: [0, -8, 0] }}
              transition={{
                y: { repeat: Infinity, duration: 3.8, ease: 'easeInOut' },
                opacity: { duration: 0.6, delay: 0.4 },
              }}
              onClick={() => {
                const departmentsEl = document.getElementById('departments')
                if (departmentsEl) {
                  departmentsEl.scrollIntoView({ behavior: 'smooth' })
                } else if (onStartFree) {
                  onStartFree()
                }
              }}
              className="absolute -bottom-6 -left-3 sm:-bottom-8 sm:-left-6 z-30 flex items-center gap-3.5 rounded-2xl bg-white/95 border-2 border-accent/40 p-3 sm:p-3.5 shadow-[0_20px_50px_rgba(241,90,36,0.3)] backdrop-blur-2xl hover:border-accent hover:shadow-[0_25px_60px_rgba(241,90,36,0.45)] hover:scale-[1.03] transition-all duration-300 cursor-pointer group select-none"
            >
              {/* Luminous Animated Key / Unlock Orb */}
              <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent via-accent-bright to-accent text-white shadow-md shadow-accent/40 group-hover:scale-110 transition-transform">
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400 border border-white" />
                </span>
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>

              {/* Conversion Pitch */}
              <div className="flex flex-col pr-1 text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded-md">
                    PRO ACCESS PASS
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Instant Unlock
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-black text-charcoal tracking-tight mt-0.5 group-hover:text-accent transition-colors flex items-center gap-1">
                  <span>Unlock 13,200+ Practice Charts</span>
                  <svg className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <p className="text-[10px] sm:text-[11px] text-charcoal/65 font-medium">
                  22 Specialties • Instant Hospital Placement Ready
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Endless Marquee Ticker Strip */}
      <div className="relative z-10 overflow-hidden border-t border-charcoal/10 bg-white/80 py-3.5 backdrop-blur-md">
        <div className="flex w-max animate-marquee space-x-8 text-xs font-mono font-bold uppercase tracking-widest text-charcoal/60">
          <span>ICD-10-CM</span>
          <span className="text-accent">•</span>
          <span>CPT®-4</span>
          <span className="text-accent">•</span>
          <span>HCPCS LEVEL II</span>
          <span className="text-accent">•</span>
          <span>22 DEPARTMENTS</span>
          <span className="text-accent">•</span>
          <span>13,200+ PRACTICE CHARTS</span>
          <span className="text-accent">•</span>
          <span>ICD-10-CM</span>
          <span className="text-accent">•</span>
          <span>CPT®-4</span>
          <span className="text-accent">•</span>
          <span>HCPCS LEVEL II</span>
          <span className="text-accent">•</span>
          <span>22 DEPARTMENTS</span>
          <span className="text-accent">•</span>
          <span>13,200+ PRACTICE CHARTS</span>
        </div>
      </div>
    </section>
  )
}
