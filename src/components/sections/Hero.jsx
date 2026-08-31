import { motion } from 'framer-motion'

/**
 * About Section / About CODIVIA (2nd Section)
 */
export default function Hero({ onStartFree, onSeeHowItWorks }) {
  return (
    <section
      id="about"
      className="relative isolate flex min-h-[75vh] lg:min-h-[85vh] w-full flex-col justify-between overflow-hidden bg-[#FAF6F2] text-charcoal border-b border-charcoal/10"
    >
      {/* Background Video (aboutbgvideo) & Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Background Video */}
        <video
          src="https://res.cloudinary.com/c2wyo4vs/video/upload/v1788150985/Final_1.mp4"
          poster="/banner-bg.jpg"
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
        >
          <source
            src="https://res.cloudinary.com/c2wyo4vs/video/upload/v1788150985/Final_1.mp4"
            type="video/mp4"
          />
        </video>

        {/* Fallback image behind video if video is loading or not yet pasted */}
        <img
          src="/banner-bg.jpg"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-90"
        />

        {/* Desktop: Gradual left-to-right reduction of white overlay towards the right half */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background: 'linear-gradient(to right, rgba(250, 246, 242, 0.98) 0%, rgba(250, 246, 242, 0.92) 35%, rgba(250, 246, 242, 0.65) 52%, rgba(250, 246, 242, 0.30) 70%, rgba(250, 246, 242, 0.10) 85%, transparent 100%)',
          }}
        />

        {/* Mobile / Tablet vertical blend */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background: 'linear-gradient(to bottom, rgba(250, 246, 242, 0.96) 0%, rgba(250, 246, 242, 0.90) 50%, rgba(250, 246, 242, 0.50) 75%, transparent 100%)',
          }}
        />

        {/* Subtle bottom border blending strip */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FAF6F2]/70 to-transparent" />
      </div>

      {/* Main Content Grid — Content in Left Column as before */}
      <div className="relative z-10 grid flex-1 grid-cols-1 items-center gap-8 px-4 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:px-16 py-10 sm:py-16 lg:py-24 max-w-7xl mx-auto w-full">
        <div>
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white/80 px-3 sm:px-3.5 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-accent backdrop-blur-md shadow-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span>About CODIVIA • Practice-First Platform</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 font-sans text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] sm:leading-[1.04]"
          >
            Code with{' '}
            <span className="bg-gradient-to-r from-accent via-accent-bright to-accent-dim bg-clip-text text-transparent">
              confidence,
            </span>
            <br />
            get placed.
          </motion.h1>

          {/* About CODIVIA Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 sm:mt-5 max-w-xl text-sm sm:text-base lg:text-lg text-charcoal/80 leading-relaxed font-normal"
          >
            CODIVIA is an immersive medical coding platform built to bridge the gap between classroom theory and real-world hospital workflows. Practice on <strong className="font-semibold text-charcoal">13,200+ de-identified patient encounters</strong> across <strong className="font-semibold text-charcoal">22 specialties</strong> with sub-second ICD-10-CM, CPT®-4, and HCPCS Level II validation to become certification-ready and placement-ready.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
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
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-charcoal/20 bg-white/70 px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-charcoal transition-all duration-300 hover:bg-white hover:border-charcoal hover:shadow-md cursor-pointer backdrop-blur-md"
            >
              <span>See How It Works</span>
              <span className="text-charcoal/40 transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </button>
          </motion.div>
        </div>

        {/* Right side spacer keeping video viewable on right */}
        <div className="hidden lg:block" />
      </div>

      {/* Endless Marquee Ticker Strip */}
      <div className="relative z-10 overflow-hidden border-t border-charcoal/10 bg-white/75 py-3.5 backdrop-blur-md">
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
