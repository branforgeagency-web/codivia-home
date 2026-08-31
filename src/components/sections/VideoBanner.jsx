import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CodiviaLogo from '../ui/CodiviaLogo.jsx'

/**
 * VideoBanner — 1st Section with Highlighted Black Glass Navbar
 */
export default function VideoBanner({ onStartFree, onSeeHowItWorks }) {
  const videoRef = useRef(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredNav, setHoveredNav] = useState(null)

  const navLinks = [
    { label: 'Departments', href: '#departments', badge: '22' },
    { label: 'How it works', href: '#journey' },
    { label: 'Try a code', href: '#demo', isDemo: true },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ]

  const handleScrollToHero = () => {
    const heroEl = document.getElementById('hero-section')
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="banner-section" className="relative h-screen w-full overflow-hidden bg-[#0d0c0b] text-bone">
      {/* Full Floating Black Glass Navbar with Luminous Highlights */}
      <header className="absolute top-0 left-0 right-0 z-40 w-full px-4 sm:px-8 lg:px-16 pt-4 sm:pt-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/20 bg-black/80 p-2 sm:p-2.5 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.08),0_0_24px_rgba(242,103,34,0.2)] text-bone">
          {/* Brand Logo with micro-interaction */}
          <a
            href="#banner-section"
            className="flex items-center pl-2 sm:pl-3 group transition-transform duration-300 hover:scale-[1.02]"
          >
            <CodiviaLogo variant="compact" theme="dark" height={32} showTagline={false} />
          </a>

          {/* Desktop Interactive Magnetic Nav */}
          <nav
            className="hidden items-center gap-1 md:flex"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {navLinks.map((link) => {
              const isHovered = hoveredNav === link.label
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setHoveredNav(link.label)}
                  className="relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-bone/80 transition-colors duration-200 hover:text-white"
                >
                  {isHovered && (
                    <motion.div
                      layoutId="navHoverPill"
                      className="absolute inset-0 rounded-full bg-white/[0.12] border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                  {link.badge && (
                    <span className="relative z-10 flex h-4 items-center justify-center rounded-full bg-accent px-1.5 font-mono text-[9px] font-bold text-white shadow-xs">
                      {link.badge}
                    </span>
                  )}
                  {link.isDemo && (
                    <span className="relative z-10 flex h-1.5 w-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#F26722]" />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 pr-1 sm:pr-1.5">
            <button
              onClick={onStartFree}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-bone transition-all duration-300 hover:border-white/40 hover:bg-white/20 hover:text-white cursor-pointer shadow-xs"
            >
              Sign in
            </button>

            <button
              onClick={onStartFree}
              className="group relative inline-flex items-center overflow-hidden rounded-full bg-gradient-to-r from-accent via-accent-bright to-accent px-4 sm:px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-white transition shadow-lg shadow-accent/30 hover:opacity-95 cursor-pointer"
            >
              <span className="relative z-10">Start Free</span>
              <span className="absolute inset-0 -translate-x-full bg-charcoal transition-transform duration-300 group-hover:translate-x-0" />
              <span className="absolute inset-0 z-10 flex items-center justify-center text-xs font-bold uppercase tracking-wider text-bone opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Start Free
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-bone transition md:hidden hover:border-accent hover:text-accent cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Glass Drawer Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative z-20 mx-4 mt-2 overflow-hidden rounded-2xl border border-white/20 bg-black/90 backdrop-blur-2xl p-5 shadow-2xl md:hidden text-bone"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-bone/50">NAVIGATION</span>
                <span className="text-[10px] font-mono text-accent font-semibold">22 DEPARTMENTS</span>
              </div>
              <nav className="flex flex-col gap-2.5 text-sm font-bold text-bone">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-accent/20 hover:text-accent"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="flex h-4 items-center justify-center rounded-full bg-accent px-1.5 font-mono text-[9px] font-bold text-white">
                        {link.badge}
                      </span>
                    )}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Fullscreen Video Element */}
      <div className="relative h-full w-full flex items-center justify-center overflow-hidden bg-black">
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/c2wyo4vs/video/upload/v1788150952/upscaled-video_1.mp4"
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source
            src="https://res.cloudinary.com/c2wyo4vs/video/upload/v1788150952/upscaled-video_1.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Bottom Scroll Down CTA Pill */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center">
        <button
          onClick={handleScrollToHero}
          className="group flex items-center gap-2.5 rounded-full border border-white/15 bg-black/60 hover:bg-black/80 hover:border-white/30 px-5 py-2 backdrop-blur-xl text-xs font-bold uppercase tracking-widest text-bone/90 transition-all duration-300 shadow-xl cursor-pointer"
        >
          <span>Explore Platform</span>
          <svg
            className="h-4 w-4 text-accent transition-transform duration-300 group-hover:translate-y-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  )
}
