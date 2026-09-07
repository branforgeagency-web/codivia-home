import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CodiviaLogo from './CodiviaLogo.jsx'

/**
 * SiteIntroOverlay
 * Plays the cinematic introduction video once upon website entry.
 * Smoothly transitions out upon video completion or user skip.
 */
export default function SiteIntroOverlay({ onComplete }) {
  const videoRef = useRef(null)
  const [isVisible, setIsVisible] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)

  // Start playing immediately on mount
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch((err) => {
        console.warn('Autoplay prevented or interrupted:', err)
      })
    }
  }, [])

  // Listen to keyboard shortcuts (Esc or Space to skip)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.code === 'Space') {
        e.preventDefault()
        handleDismiss()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (video && video.duration) {
      setProgress((video.currentTime / video.duration) * 100)
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => {
      onComplete?.()
    }, 600)
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    const video = videoRef.current
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden select-none"
        >
          {/* Fullscreen Video Canvas */}
          <div className="relative h-full w-full flex items-center justify-center bg-black">
            <video
              ref={videoRef}
              src="https://res.cloudinary.com/c2wyo4vs/video/upload/v1788150952/upscaled-video_1.mp4"
              autoPlay
              muted={isMuted}
              playsInline
              webkit-playsinline="true"
              preload="auto"
              disablePictureInPicture
              disableRemotePlayback
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleDismiss}
              className="h-full w-full object-cover object-center"
            >
              <source
                src="https://res.cloudinary.com/c2wyo4vs/video/upload/v1788150952/upscaled-video_1.mp4"
                type="video/mp4"
              />
            </video>

            {/* Subtle Vignette Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
          </div>

          {/* Top Brand Tag */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-30 flex items-center gap-3">
            <CodiviaLogo variant="compact" theme="dark" height={32} showTagline={false} />
            <span className="hidden sm:inline-block font-mono text-[10px] text-white/50 border-l border-white/20 pl-3 uppercase tracking-widest">
              Site Experience Intro
            </span>
          </div>

          {/* Top-Right Audio Toggle */}
          <div className="absolute top-6 right-36 sm:top-8 sm:right-44 z-30">
            <button
              onClick={toggleMute}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 hover:bg-black/90 px-3.5 py-1.5 backdrop-blur-xl text-xs font-mono text-white/80 hover:text-white transition cursor-pointer shadow-lg"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? (
                <>
                  <svg className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                  <span className="hidden sm:inline">Unmute</span>
                </>
              ) : (
                <>
                  <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  <span className="hidden sm:inline">Sound On</span>
                </>
              )}
            </button>
          </div>

          {/* Top-Right "Skip Intro →" CTA */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-30">
            <button
              onClick={handleDismiss}
              className="group flex items-center gap-2 rounded-full border border-white/25 bg-black/70 hover:bg-black/90 hover:border-accent px-4 sm:px-5 py-1.5 sm:py-2 backdrop-blur-xl text-xs font-bold uppercase tracking-wider text-white shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <span>Skip Intro</span>
              <svg
                className="h-3.5 w-3.5 text-accent transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Bottom Progress Line & Video Indicator */}
          <div className="absolute bottom-0 inset-x-0 z-30 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
            <div className="max-w-7xl mx-auto flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  CODIVIA CLINICAL WORKSPACE INTRO
                </span>
                <span className="hidden sm:inline text-white/40">
                  Press [Space] or [Esc] to enter site
                </span>
              </div>
              
              {/* Progress Track */}
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent via-accent-bright to-accent"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
