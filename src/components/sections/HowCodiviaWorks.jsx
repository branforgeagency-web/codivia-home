import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'

function PinIcon({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M16 3a1 1 0 0 1 .117 1.993L16 5v4.764l1.894 3.789c.054.108.088.22.1.331L18 14v2a1 1 0 0 1-.883.993L17 17h-4v4a1 1 0 0 1-1.993.117L11 21v-4H7a1 1 0 0 1-.993-.883L6 16v-2c0-.117.02-.23.06-.34l.046-.107L8 9.762V5a1 1 0 0 1-.117-1.993L8 3h8Z" />
    </svg>
  )
}

const PROCESS_STEPS = [
  {
    step: '01',
    badge: 'PROD-READY CHARTS',
    title: 'Break the Catch-22',
    description:
      'Access thousands of authentic, de-identified patient encounters to gain genuine clinical chart experience without waiting for your first job.',
    metric: '13,200+ Encounters',
    accent: 'orange',
    colors: {
      panel: 'bg-[#FFF7ED]',
      ink: 'text-[#FF6B00]',
      line: 'border-[#FF6B00]/30',
      badgeBg: 'bg-[#FF6B00]/10',
    },
  },
  {
    step: '02',
    badge: '22 SPECIALTIES',
    title: 'Real Clinical Note Ingestion',
    description:
      'Parse operative narratives, radiology impressions, pathology summaries, and emergency charts across all major hospital departments.',
    metric: 'Multi-Department EHR',
    accent: 'navy',
    colors: {
      panel: 'bg-[#F0F9FF]',
      ink: 'text-[#0284C7]',
      line: 'border-[#0284C7]/30',
      badgeBg: 'bg-[#0284C7]/10',
    },
  },
  {
    step: '03',
    badge: 'SUB-SECOND VALIDATION',
    title: 'Live Code Assignment & Scoring',
    description:
      'Assign ICD-10-CM, CPT®-4, and HCPCS Level II codes with real-time NCCI edit checks, modifier verification, and instant guideline feedback.',
    metric: 'NCCI Edits & Guidelines',
    accent: 'amber',
    colors: {
      panel: 'bg-[#FEFCE8]',
      ink: 'text-[#D97706]',
      line: 'border-[#D97706]/30',
      badgeBg: 'bg-[#D97706]/10',
    },
  },
  {
    step: '04',
    badge: 'HIRING PORTFOLIO',
    title: 'Verified Experience Credential',
    description:
      'Export your comprehensive, audit-ready accuracy portfolio and share verified specialty scores directly with healthcare recruiters and hiring managers.',
    metric: 'Placement Ready',
    accent: 'emerald',
    colors: {
      panel: 'bg-[#F0FDF4]',
      ink: 'text-[#059669]',
      line: 'border-[#059669]/30',
      badgeBg: 'bg-[#059669]/10',
    },
  },
]

const DESKTOP_PLACEMENTS = [
  'md:absolute md:left-0 lg:-left-[1%] xl:-left-[3%] md:top-0 md:rotate-[5deg]',
  'md:absolute md:right-0 lg:-right-[1%] xl:-right-[3%] md:top-[190px] md:-rotate-[5deg]',
  'md:absolute md:left-0 lg:-left-[1%] xl:-left-[3%] md:top-[530px] md:rotate-[5deg]',
  'md:absolute md:right-0 lg:-right-[1%] xl:-right-[3%] md:top-[720px] md:-rotate-[5deg]',
]

function ProcessCard({ step, index, placement }) {
  const { colors } = step

  return (
    <article
      className={`relative z-10 w-full transition-all duration-300 ease-out hover:z-30 hover:scale-105 hover:rotate-0 md:w-[370px] lg:w-[415px] xl:w-[435px] ${placement}`}
    >
      <div className="rounded-[28px] border border-charcoal/10 bg-white p-3 shadow-[0_15px_30px_-10px_rgba(20,18,16,0.12)]">
        {/* Pinned Head */}
        <PinIcon className={`mx-auto mb-3 h-8 w-8 ${colors.ink} drop-shadow-sm`} />

        {/* Card Content Panel */}
        <div
          className={`relative flex h-full flex-col overflow-hidden rounded-[18px] border p-5 ${colors.panel} ${colors.line}`}
        >
          {/* Top Row: Number & Badge */}
          <div className="flex items-center justify-between mb-3">
            <span
              className={`text-3xl font-black ${colors.ink} font-mono`}
            >
              {step.step}
            </span>
            <span
              className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${colors.badgeBg} ${colors.ink}`}
            >
              {step.badge}
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-2 text-xl font-black text-charcoal leading-tight">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-xs leading-relaxed text-charcoal/70 mb-4 font-normal">
            {step.description}
          </p>

          {/* Footer Metric */}
          <div className="pt-3 border-t border-charcoal/10 flex items-center justify-between mt-auto">
            <span className={`font-mono text-xs font-bold ${colors.ink}`}>
              {step.metric}
            </span>
            <span className="flex h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
          </div>
        </div>
      </div>
    </article>
  )
}

export default function HowCodiviaWorks() {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }

  const toggleFullscreen = () => {
    if (!videoRef.current) return
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current || !videoRef.current.duration) return
    const current = videoRef.current.currentTime
    const total = videoRef.current.duration
    setProgress((current / total) * 100)
  }

  // Connecting route path between 4 zig-zagged cards
  const route =
    'M 380 130 C 680 130, 720 310, 980 310 C 1220 310, 520 480, 380 660 C 380 840, 720 860, 980 860'

  return (
    <section
      id="how-it-works"
      className="relative bg-[#FAF6F2] py-20 sm:py-28 lg:py-32 overflow-hidden border-t border-charcoal/10"
      style={{
        backgroundImage: 'radial-gradient(rgba(20, 18, 16, 0.04) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[550px] w-[550px] rounded-full bg-[#FF6B00]/5 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-[550px] w-[550px] rounded-full bg-[#101828]/5 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 relative z-10">
        {/* 1. Header Block */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#FF6B00] shadow-xs mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B00] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B00]" />
            </span>
            <span>PRODUCT TOUR &amp; WORKFLOW</span>
          </motion.div>

          {/* Main Tagline / H2 */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black text-[#101828] tracking-tight leading-[1.12]"
          >
            How Codivia Works:{' '}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A33] to-[#FF6B00] bg-clip-text text-transparent">
              Bridge the Experience Gap
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#101828]/70 leading-relaxed font-normal"
          >
            Experience authentic patient chart coding and real-time guideline validation before your first company interview.
          </motion.p>
        </div>

        {/* 2. Video Player Component with 50px Margin (Starts Paused by Default) */}
        <div className="my-[50px] relative">
          
          {/* Floating Animated Origami "BUY CHARTS NOW" Badge (Hero Scale ~20% Screen Width) */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.15, y: -14, rotate: 0 }}
            whileTap={{ scale: 0.96 }}
            animate={{
              y: [0, -10, 0],
              rotate: [-1.2, 1.2, -1.2],
            }}
            transition={{
              y: { repeat: Infinity, duration: 3.4, ease: 'easeInOut' },
              rotate: { repeat: Infinity, duration: 4.8, ease: 'easeInOut' },
              scale: { type: 'spring', stiffness: 350, damping: 22 },
            }}
            onClick={() => {
              const pricingEl = document.getElementById('pricing')
              if (pricingEl) {
                pricingEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            className="absolute -top-10 -right-3 sm:-top-14 sm:-right-6 md:-top-16 md:-right-8 z-30 cursor-pointer select-none group origin-bottom-right"
            title="Buy Practice Charts Now"
          >
            {/* Radiant Glowing Background Halo (Substantial coverage) */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-red-600/70 via-[#FF4A00]/80 to-red-600/70 blur-3xl opacity-85 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 pointer-events-none" />

            {/* Origami Structure Container (Scaled to 20% Screen Width) */}
            <div className="relative flex flex-col items-center drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)] group-hover:drop-shadow-[0_35px_60px_rgba(220,38,38,0.7)] transition-all duration-300">
              
              {/* Top Dark Folded Tab ("BUY") */}
              <div className="relative z-20 self-start ml-3 sm:ml-5">
                {/* Folded Corner Dog-Ear */}
                <div className="absolute -left-3 top-0 w-0 h-0 border-t-[10px] sm:border-t-[12px] border-t-transparent border-r-[10px] sm:border-r-[12px] border-r-[#0A0A0C] border-b-[10px] sm:border-b-[12px] border-b-[#0A0A0C]" />
                
                <div className="bg-[#141417] text-white font-black text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase px-5 sm:px-7 py-1.5 sm:py-2 rounded-t-md shadow-md border-t border-x border-white/30">
                  BUY
                </div>
              </div>

              {/* Main Red-Orange Banner ("CHARTS NOW") */}
              <div className="relative z-10 bg-gradient-to-br from-[#DC2626] via-[#EF4444] to-[#B91C1C] text-white px-6 sm:px-9 py-4 sm:py-6 shadow-2xl border-t border-white/40 overflow-hidden w-[210px] sm:w-[270px] md:w-[320px] text-center rounded-sm">
                {/* Diagonal Glass Sweep Reflection */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                <div className="flex flex-col items-center leading-[0.9]">
                  <span className="font-black text-3xl sm:text-4xl md:text-5xl tracking-tighter uppercase drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)]">
                    CHARTS
                  </span>
                  <span className="font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)] mt-1 sm:mt-1.5">
                    NOW
                  </span>
                </div>

                {/* Sub-badge Highlight */}
                <div className="mt-3 pt-2.5 border-t border-white/30 flex items-center justify-center gap-1.5 font-mono text-[10px] sm:text-xs uppercase font-extrabold text-white/95 tracking-wider">
                  <span className="h-2 w-2 rounded-full bg-yellow-300 animate-ping" />
                  <span>Instant EHR Access</span>
                </div>
              </div>

              {/* Bottom 3D Origami Fold Triangle */}
              <div className="self-end mr-5 sm:mr-8 flex">
                {/* Shadow Fold Triangle */}
                <div className="w-0 h-0 border-l-[20px] sm:border-l-[26px] border-l-transparent border-t-[20px] sm:border-t-[26px] border-t-[#6B1414]" />
                {/* Projecting Ribbon Point */}
                <div className="w-0 h-0 border-r-[26px] sm:border-r-[36px] border-r-transparent border-t-[20px] sm:border-t-[26px] border-t-[#B91C1C]" />
              </div>

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="relative overflow-hidden rounded-3xl border border-[#101828]/15 bg-[#101828] shadow-[0_25px_60px_-15px_rgba(16,24,40,0.25),0_0_0_1px_rgba(255,107,0,0.15)] group"
          >
            {/* Top Decorative Browser/Player Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#101828]/90 border-b border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-[11px] text-white/50 hidden sm:inline">
                  codivia-live-walkthrough
                </span>
              </div>
            </div>

            {/* HTML5 Video Container */}
            <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
              <video
                ref={videoRef}
                src="https://res.cloudinary.com/c2wyo4vs/video/upload/v1788154241/upscaled-video_2.mp4"
                poster="/banner-bg.jpg"
                loop
                muted={isMuted}
                playsInline
                webkit-playsinline="true"
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                className="h-full w-full object-contain sm:object-cover object-center cursor-pointer"
                onClick={togglePlay}
              >
                <source
                  src="https://res.cloudinary.com/c2wyo4vs/video/upload/v1788154241/upscaled-video_2.mp4"
                  type="video/mp4"
                />
              </video>

            {/* Frosted Glass Overlay Play Button (when paused) */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute z-20 flex h-20 w-20 items-center justify-center rounded-full bg-[#FF6B00] text-white shadow-2xl shadow-[#FF6B00]/50 transition-transform duration-300 hover:scale-110 cursor-pointer"
                aria-label="Play video"
              >
                <svg className="h-8 w-8 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            )}

            {/* Custom Sleek Controls Bar at Bottom */}
            <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 opacity-90 group-hover:opacity-100">
              {/* Progress Line */}
              <div className="w-full h-1.5 bg-white/20 rounded-full mb-3 overflow-hidden cursor-pointer">
                <div
                  className="h-full bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Play / Pause Toggle */}
                  <button
                    onClick={togglePlay}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-[#FF6B00] transition backdrop-blur-md cursor-pointer"
                    title={isPlaying ? 'Pause' : 'Play'}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  {/* Mute / Unmute Toggle */}
                  <button
                    onClick={toggleMute}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-[#FF6B00] transition backdrop-blur-md cursor-pointer"
                    title={isMuted ? 'Unmute' : 'Mute'}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    )}
                  </button>

                  <span className="font-mono text-xs text-white/70 hidden sm:inline">
                    Simulated Patient Encounter • Live Interactive Demo
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Fullscreen Toggle */}
                  <button
                    onClick={toggleFullscreen}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-[#FF6B00] transition backdrop-blur-md cursor-pointer"
                    title="Toggle Fullscreen"
                    aria-label="Toggle Fullscreen"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

        {/* 3. Pinned Process Board Section with Connecting Route */}
        <div className="relative mt-12">
          <div className="text-center mb-8">
            <span className="font-mono text-xs font-black uppercase tracking-widest text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/25 px-4 py-1.5 rounded-full shadow-2xs">
              ✦ CLINICAL READINESS PATHWAY
            </span>
          </div>

          <section className="relative mx-auto flex h-auto w-full max-w-[1340px] flex-col gap-6 md:block md:h-[1060px]">
            {/* Animated Dashed Connecting Route */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-0 hidden h-full w-full md:block"
              viewBox="0 0 1340 1060"
              preserveAspectRatio="none"
            >
              <motion.path
                d={route}
                fill="none"
                stroke="#FF6B00"
                strokeWidth="2.5"
                strokeDasharray="8 8"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="opacity-40"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -160 }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </svg>

            {/* Pinned Process Cards */}
            {PROCESS_STEPS.map((step, index) => (
              <ProcessCard
                key={step.step}
                step={step}
                index={index}
                placement={DESKTOP_PLACEMENTS[index]}
              />
            ))}
          </section>
        </div>
      </div>
    </section>
  )
}
