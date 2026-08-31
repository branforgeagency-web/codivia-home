import React from 'react'

/**
 * Official CODIVIA Logo component using optimized public assets.
 * 
 * Supports:
 * - variant: 'full' | 'compact' | 'mark'
 * - theme: 'dark' (for dark charcoal background) | 'light' (for light background)
 * - height: custom height in pixels or Tailwind classes
 */
export default function CodiviaLogo({
  variant = 'compact',
  theme = 'dark',
  className = '',
  height = 36,
  showTagline = true,
}) {
  const isDark = theme === 'dark'
  const markSrc = isDark ? '/codivia-mark-dark.png' : '/codivia-mark.png'
  const logoSrc = isDark ? '/codivia-logo-dark.png' : '/codivia-logo.png'

  if (variant === 'mark') {
    return (
      <img
        src={markSrc}
        alt="CODIVIA Mark"
        style={{ height }}
        className={`w-auto object-contain select-none ${className}`}
        loading="eager"
      />
    )
  }

  if (variant === 'full') {
    return (
      <div className={`inline-flex flex-col items-start ${className}`}>
        <img
          src={logoSrc}
          alt="CODIVIA — Code. Validate. Get Hired."
          style={{ height }}
          className="w-auto object-contain select-none"
          loading="eager"
        />
      </div>
    )
  }

  // Compact variant: Crisp mark image + high-res typographic title with brand styling
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <img
        src={markSrc}
        alt="CODIVIA"
        style={{ height: height }}
        className="w-auto object-contain"
        loading="eager"
      />
      <div className="flex flex-col justify-center">
        <div className="flex items-center font-extrabold tracking-tight leading-none text-xl sm:text-2xl">
          <span className={isDark ? 'text-bone' : 'text-charcoal'}>COD</span>
          <span className="text-accent">I</span>
          <span className={isDark ? 'text-bone' : 'text-charcoal'}>V</span>
          <span className="text-accent">I</span>
          <span className="text-accent">A</span>
          <span className="text-accent text-sm font-semibold ml-0.5 relative -top-1">®</span>
        </div>
        {showTagline && (
          <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-bone/50 mt-0.5">
            <span className="h-px w-2 bg-bone/30" />
            <span className={isDark ? 'text-bone/70' : 'text-charcoal/70'}>CODE</span>
            <span className="text-accent">•</span>
            <span className="text-accent">VALIDATE</span>
            <span className="text-accent">•</span>
            <span className={isDark ? 'text-bone/70' : 'text-charcoal/70'}>GET HIRED</span>
            <span className="h-px w-2 bg-bone/30" />
          </div>
        )}
      </div>
    </div>
  )
}
