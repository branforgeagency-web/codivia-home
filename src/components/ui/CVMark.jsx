import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'

/**
 * Animated CODIVIA Brand Logo Banner Animation with Transparent Background.
 * Fully responsive and scalable across all screen sizes.
 * 
 * Pixel animation & energy flow are positioned high up and to the right,
 * directly tracking the upper crest of the 'V' pixel cloud.
 */
export default function CVMark({ size = 420, className = '', theme = 'light' }) {
  const [isHovered, setIsHovered] = useState(false)
  const isDark = theme === 'dark'
  const markDark = '/codivia-mark-dark.png'
  const markLight = '/codivia-mark.png'

  // Floating pixel particles shifted higher up along the top-right ascending pixel cloud
  const pixelParticles = useMemo(() => [
    { id: 1, x: 76, y: 34, size: 8, delay: 0.1, duration: 2.2, color: '#F26722' },
    { id: 2, x: 82, y: 26, size: 9, delay: 0.3, duration: 2.5, color: '#FF7F3F' },
    { id: 3, x: 79, y: 42, size: 7, delay: 0.6, duration: 2.1, color: '#F26722' },
    { id: 4, x: 88, y: 18, size: 8, delay: 0.2, duration: 2.4, color: '#FF9E66' },
    { id: 5, x: 92, y: 28, size: 7, delay: 0.8, duration: 2.6, color: '#F26722' },
    { id: 6, x: 94, y: 10, size: 7, delay: 0.4, duration: 2.8, color: '#FF7F3F' },
    { id: 7, x: 97, y: 4, size: 6, delay: 1.0, duration: 2.5, color: '#FFA877' },
    { id: 8, x: 85, y: 38, size: 8, delay: 0.5, duration: 2.3, color: '#FF7F3F' },
    { id: 9, x: 91, y: 44, size: 6, delay: 0.7, duration: 2.7, color: '#F26722' },
    { id: 10, x: 98, y: 15, size: 5, delay: 0.9, duration: 2.2, color: '#FDEBD9' },
  ], [])

  return (
    <div
      className={`relative flex items-center justify-center select-none bg-transparent aspect-square w-full ${className}`}
      style={{ maxWidth: size, maxHeight: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Soft ambient radial orange aura centered around the V glyph */}
      <motion.div
        className="pointer-events-none absolute inset-6 rounded-full"
        animate={{
          opacity: isHovered ? [0.35, 0.6, 0.35] : [0.18, 0.38, 0.18],
          scale: isHovered ? [0.95, 1.12, 0.95] : [0.95, 1.05, 0.95],
        }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
        style={{
          background: isDark
            ? 'radial-gradient(circle at 70% 45%, rgba(242, 103, 34, 0.42) 0%, rgba(242, 103, 34, 0.08) 55%, transparent 75%)'
            : 'radial-gradient(circle at 70% 45%, rgba(242, 103, 34, 0.32) 0%, rgba(242, 103, 34, 0.05) 55%, transparent 75%)',
          filter: 'blur(26px)',
        }}
      />

      {/* 2. Outer architectural rotation ring */}
      <motion.div
        className={`pointer-events-none absolute inset-0 rounded-full border ${
          isDark ? 'border-bone/10' : 'border-charcoal/15'
        }`}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 40 }}
      >
        {/* Precision orbital notches */}
        <div className="absolute top-0 left-1/2 h-2.5 w-0.5 -translate-x-1/2 bg-accent" />
        <div className="absolute bottom-0 left-1/2 h-2.5 w-0.5 -translate-x-1/2 bg-accent" />
        <div className={`absolute left-0 top-1/2 h-0.5 w-2.5 -translate-y-1/2 ${
          isDark ? 'bg-bone/30' : 'bg-charcoal/30'
        }`} />
        <div className={`absolute right-0 top-1/2 h-0.5 w-2.5 -translate-y-1/2 ${
          isDark ? 'bg-bone/30' : 'bg-charcoal/30'
        }`} />
      </motion.div>

      {/* 3. Counter-rotating segmented conic hairline ring */}
      <motion.div
        className="pointer-events-none absolute inset-[5%] rounded-full"
        style={{
          background: 'conic-gradient(from 45deg, #F26722 0deg, #FDEBD9 70deg, transparent 140deg, #F26722 220deg, transparent 320deg, #F26722 360deg)',
          padding: 1.5,
          WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))',
          mask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))',
        }}
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 25 }}
      />

      {/* 4. Dashed secondary ring */}
      <div className={`pointer-events-none absolute inset-[10%] rounded-full border border-dashed ${
        isDark ? 'border-bone/15' : 'border-charcoal/15'
      }`} />

      {/* 5. Center Logo Stage */}
      <div className="relative z-10 flex items-center justify-center w-[72%] h-[72%]">
        {/* Official CODIVIA Logo Mark */}
        <motion.img
          src={isDark ? markDark : markLight}
          alt="CODIVIA Mark"
          className={`w-full h-full object-contain filter ${
            isDark
              ? 'drop-shadow-[0_0_18px_rgba(242,103,34,0.35)]'
              : 'drop-shadow-[0_6px_22px_rgba(242,103,34,0.28)]'
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{
            opacity: 1,
            scale: isHovered ? 1.05 : 1,
          }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* 6. Dynamic Floating Code Pixels shifted higher up */}
        <div className="pointer-events-none absolute inset-0">
          {pixelParticles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-[1px]"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 10px ${p.color}`,
              }}
              animate={{
                y: [-2, -18, -2],
                x: [0, 4, 0],
                opacity: [0.35, 1, 0.35],
                scale: [0.9, 1.3, 0.9],
              }}
              transition={{
                repeat: Infinity,
                duration: p.duration,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Glowing pulse aura on the top-right ascending pixel matrix */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              right: '6%',
              top: '12%',
              width: '42%',
              height: '42%',
              background: 'radial-gradient(circle, rgba(242,103,34,0.38) 0%, rgba(242,103,34,0.08) 50%, transparent 70%)',
              filter: 'blur(12px)',
            }}
            animate={{
              scale: [0.9, 1.25, 0.9],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: 'easeInOut',
            }}
          />

          {/* Shimmering beam focused specifically on the top-right pixel cluster */}
          <motion.div
            className="absolute h-1 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
            style={{
              left: '56%',
              right: '0%',
            }}
            animate={{
              top: ['10%', '52%', '10%'],
              opacity: [0, 0.85, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3.2,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>

      {/* 7. Floating Transparent Telemetry Labels */}
      <div className={`pointer-events-none absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[8px] sm:text-[9px] font-mono tracking-wider backdrop-blur-md rounded-full border whitespace-nowrap ${
        isDark
          ? 'bg-charcoal/60 border-bone/15 text-bone/80'
          : 'bg-white/60 border-charcoal/10 text-charcoal/85 shadow-sm'
      }`}>
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        <span>CODE ENGINE</span>
        <span className="text-accent font-bold">22 DEPTS</span>
      </div>

      <div className={`pointer-events-none absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 text-[7px] sm:text-[8px] font-mono tracking-widest text-accent backdrop-blur-md rounded-full border whitespace-nowrap ${
        isDark
          ? 'bg-charcoal/60 border-accent/30'
          : 'bg-white/60 border-accent/30 font-semibold shadow-sm'
      }`}>
        <span>ICD-10-CM</span>
        <span className={isDark ? 'text-bone/40' : 'text-charcoal/30'}>•</span>
        <span>CPT</span>
        <span className={isDark ? 'text-bone/40' : 'text-charcoal/30'}>•</span>
        <span>HCPCS</span>
      </div>
    </div>
  )
}
