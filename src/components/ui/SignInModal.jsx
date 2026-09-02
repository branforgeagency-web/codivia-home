import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CodiviaLogo from './CodiviaLogo.jsx'
import { departments } from '../../data/departments.js'

/**
 * MedicalCoderIllustration
 * Custom vector illustration depicting a Medical Coding Specialist
 * seated at a clinical EHR workstation with patient charts, stethoscope, and coding guidelines.
 */
function MedicalCoderIllustration() {
  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square flex items-center justify-center select-none">
      {/* Background Decorative Blocks & Grid Accents (Themed in Codivia Palette) */}
      <div className="absolute top-4 left-2 h-14 w-14 rounded-2xl bg-accent/15 -rotate-6 pointer-events-none" />
      <div className="absolute -bottom-2 right-4 h-16 w-16 rounded-3xl bg-amber-500/15 rotate-12 pointer-events-none" />

      {/* Floating Clinical Data Tags */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
        className="absolute -top-1 right-2 z-10 rounded-full bg-accent/10 border border-accent/30 px-2.5 py-0.5 text-[10px] font-mono font-bold text-accent shadow-xs flex items-center gap-1"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
        ICD-10: I21.09
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-12 -left-2 z-10 rounded-full bg-emerald-50 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-700 shadow-xs"
      >
        CPT: 92941-LD
      </motion.div>

      {/* SVG Vector Medical Coder Scene in Codivia Brand Colors */}
      <svg
        viewBox="0 0 320 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Background Digital Wall Accent Tiles */}
        <g opacity="0.45">
          <rect x="70" y="30" width="16" height="8" rx="2" fill="#FED7AA" />
          <rect x="92" y="34" width="12" height="6" rx="2" fill="#FFEDD5" />
          <rect x="210" y="40" width="18" height="8" rx="2" fill="#FED7AA" />
          <rect x="234" y="44" width="14" height="6" rx="2" fill="#FFEDD5" />
          <rect x="218" y="70" width="12" height="7" rx="2" fill="#FFEDD5" />
          <rect x="60" y="80" width="16" height="8" rx="2" fill="#FED7AA" />
          <rect x="80" y="84" width="10" height="6" rx="2" fill="#FFEDD5" />
        </g>

        {/* Ambient Foliage Plant at Left */}
        <path
          d="M48 200 C38 170 42 140 54 130 C58 150 56 180 54 200 Z"
          fill="#EA580C"
          opacity="0.75"
        />
        <path
          d="M56 200 C62 165 72 145 84 138 C80 160 74 185 64 200 Z"
          fill="#F97316"
          opacity="0.85"
        />

        {/* Medical Coder Body - Codivia Themed Clinical Scrubs */}
        {/* Torso */}
        <path
          d="M110 200 L115 145 C116 132 128 124 140 124 L180 124 C192 124 204 132 205 145 L210 200 Z"
          fill="#1E293B"
        />
        {/* Scrub V-Neck Collar with Codivia Accent Orange Trim */}
        <path
          d="M142 124 L160 148 L178 124 Z"
          fill="#FF6B00"
        />
        <path
          d="M146 124 L160 144 L174 124 Z"
          fill="#FFF7ED"
        />

        {/* Stethoscope around Neck */}
        <path
          d="M144 128 C144 145 152 162 160 162 C168 162 176 145 176 128"
          stroke="#475569"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="160" cy="165" r="4.5" fill="#CBD5E1" stroke="#334155" strokeWidth="1.5" />

        {/* Head & Neck */}
        <rect x="150" y="112" width="20" height="18" rx="4" fill="#FED7AA" />
        {/* Head Shape */}
        <circle cx="160" cy="94" r="24" fill="#FED7AA" />

        {/* Hair / Medical Cap in Codivia Terracotta */}
        <path
          d="M136 94 C136 74 146 68 160 68 C174 68 184 74 184 94 C184 88 178 84 160 84 C142 84 136 88 136 94 Z"
          fill="#C2410C"
        />
        <circle cx="160" cy="80" r="14" fill="#9A3412" />

        {/* Coder Headset in Codivia Accent Coral */}
        <path
          d="M134 94 C134 76 144 65 160 65 C176 65 186 76 186 94"
          stroke="#FF6B00"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Ear Cushions */}
        <rect x="130" y="88" width="8" height="18" rx="4" fill="#EA580C" />
        <rect x="182" y="88" width="8" height="18" rx="4" fill="#EA580C" />

        {/* Coder Working Desk */}
        <rect x="55" y="200" width="210" height="12" rx="4" fill="#E2E8F0" />
        <rect x="65" y="212" width="190" height="42" fill="#CBD5E1" />

        {/* Clinical Laptop */}
        <rect x="124" y="162" width="72" height="42" rx="5" fill="#18181B" />
        {/* Laptop Screen with Medical Waves */}
        <rect x="127" y="165" width="66" height="36" rx="3" fill="#09090B" />
        <path
          d="M132 183 L142 183 L146 173 L150 191 L154 179 L158 183 L188 183"
          stroke="#FF6B00"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Laptop Logo - Codivia Accent Dot */}
        <circle cx="160" cy="183" r="3.5" fill="#FF8A33" />
        {/* Laptop Base */}
        <path d="M116 204 L204 204 L196 201 L124 201 Z" fill="#71717A" />

        {/* Patient Chart Binder with Red Cross on Desk */}
        <rect x="74" y="190" width="34" height="14" rx="2" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
        <path d="M74 190 L90 190 L90 204 L74 204 Z" fill="#EA580C" />
        <path d="M82 194 L82 200 M79 197 L85 197" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="94" y1="195" x2="104" y2="195" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="94" y1="199" x2="102" y2="199" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}

/**
 * SignInModal
 * Beautiful, responsive authentication modal themed with Codivia's signature brand design.
 */
export default function SignInModal({
  isOpen,
  onClose,
  onGoogleSignIn,
  onDemoSignIn,
  onSuccessfulAuth,
  pendingDeptId,
}) {
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [specialty, setSpecialty] = useState('Cardiology')
  const [rememberMe, setRememberMe] = useState(true)
  const [agreeTerms, setAgreeTerms] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)

  const targetDepartment = departments.find((d) => d.id === pendingDeptId)

  // Reset fields & lock background scroll when opening modal
  useEffect(() => {
    if (isOpen) {
      setSuccessMessage(null)
      setIsSubmitting(false)
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow || 'unset'
      }
    }
  }, [isOpen])

  // Listen to Escape key to dismiss
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      const user = {
        email,
        displayName: fullName || email.split('@')[0],
        uid: 'user-' + Date.now(),
      }
      if (mode === 'signup') {
        setSuccessMessage(`Account registered for ${fullName || 'Coder'}! Welcome to Codivia practice studio.`)
      } else {
        setSuccessMessage('Welcome back to Codivia! Loading your coding workspace...')
      }
      if (onSuccessfulAuth) {
        onSuccessfulAuth(user)
      }
      setTimeout(() => {
        setSuccessMessage(null)
        onClose()
      }, 1000)
    }, 700)
  }

  const handleDemoClick = () => {
    setIsSubmitting(true)
    if (onDemoSignIn) {
      onDemoSignIn()
    }
  }

  const handleGoogleClick = async () => {
    if (onGoogleSignIn) {
      try {
        await onGoogleSignIn()
        onClose()
      } catch (err) {
        console.error('Google sign in error:', err)
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          {/* Frosted Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
          />

          {/* Floating Viewport-Fixed Close Button (ALWAYS 100% visible regardless of screen height or scroll position) */}
          <button
            type="button"
            onClick={onClose}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[120] flex h-11 w-11 items-center justify-center rounded-full bg-white/95 border-2 border-charcoal/20 text-charcoal shadow-2xl hover:border-accent hover:bg-accent hover:text-white transition-all cursor-pointer group"
            aria-label="Close modal"
            title="Close (Esc)"
          >
            <svg className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Safe Scroll Container (items-start on smaller screens ensures top is NEVER cropped) */}
          <div className="min-h-full flex items-start sm:items-center justify-center p-3 sm:p-6 py-8 sm:py-12">
            {/* Modal Card Themed in Codivia Design Language */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative z-10 w-full max-w-[880px] rounded-[28px] border border-accent/25 bg-white shadow-[0_25px_60px_-15px_rgba(242,103,34,0.25)] p-6 sm:p-10 text-charcoal my-auto"
            >
              {/* Inner Card Top Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 h-10 w-10 rounded-full bg-charcoal/5 hover:bg-accent/15 border border-charcoal/15 hover:border-accent/30 flex items-center justify-center text-charcoal hover:text-accent transition-all cursor-pointer shadow-xs z-20"
                aria-label="Close modal"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

            {/* Header: Codivia Brand Logo + Title */}
            <div className="text-center mb-6 sm:mb-8 flex flex-col items-center">
              <div className="mb-2.5">
                <CodiviaLogo variant="full" theme="light" height={36} showTagline={false} />
              </div>
              <h2 className="font-sans text-2xl sm:text-3xl font-normal text-charcoal">
                {mode === 'signup' ? (
                  <>Coder <span className="font-extrabold text-accent">Registration</span></>
                ) : (
                  <>Clinical <span className="font-extrabold text-accent">Sign In</span></>
                )}
              </h2>
              <p className="text-xs font-mono text-charcoal/60 mt-1">
                {mode === 'signup'
                  ? 'Create your free account to unlock 13,200+ practice charts'
                  : 'Access your 13,200+ patient practice charts & hiring audit score'}
              </p>
            </div>

            {/* Segmented Mode Switcher Tab (Sign In vs Sign Up) */}
            <div className="max-w-xs mx-auto mb-8 p-1 rounded-full bg-charcoal/5 border border-charcoal/10 flex items-center">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold transition-all ${
                  mode === 'signin'
                    ? 'bg-white text-accent shadow-xs font-extrabold'
                    : 'text-charcoal/60 hover:text-charcoal'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold transition-all ${
                  mode === 'signup'
                    ? 'bg-white text-accent shadow-xs font-extrabold'
                    : 'text-charcoal/60 hover:text-charcoal'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* 2-Column Grid (Left: Codivia Themed Medical Coder, Right: Underline Form) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
              
              {/* Left Column: Medical Coding Specialist Character */}
              <div className="md:col-span-5 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-charcoal/10 pb-6 md:pb-0 md:pr-6">
                <MedicalCoderIllustration />
                <div className="mt-2 text-center">
                  <span className="font-mono text-[11px] font-bold text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/25">
                    ✦ Codivia Clinical Workstation
                  </span>
                </div>
              </div>

              {/* Right Column: Clean Underline Form Themed with Codivia Accent */}
              <div className="md:col-span-7 flex flex-col justify-center">
                {/* Department Practice Charts Gate Alert */}
                {pendingDeptId && (
                  <div className="mb-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 p-3.5 flex items-center gap-3 text-left">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white font-black text-sm shadow-xs">
                      🔒
                    </span>
                    <div className="text-xs">
                      <span className="font-mono font-bold uppercase text-amber-900 tracking-wider block text-[10px]">
                        Department Access Gate
                      </span>
                      <p className="text-charcoal/80 font-medium">
                        Sign in or use <strong>⚡ Demo Login</strong> below to unlock <strong>{pendingDeptId.replace('-', ' ').toUpperCase()}</strong> clinical practice charts.
                      </p>
                    </div>
                  </div>
                )}

                {successMessage ? (
                  <div className="p-6 rounded-2xl bg-orange-50 border border-accent/30 text-center">
                    <span className="h-3 w-3 rounded-full bg-accent inline-block animate-ping mb-2" />
                    <p className="font-sans text-sm font-bold text-charcoal">{successMessage}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    {/* Full Name Input (Shown for Sign Up) */}
                    {mode === 'signup' && (
                      <div className="space-y-1">
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-charcoal/70">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Dr. Jordan Mitchell, CPC"
                          className="w-full border-b-2 border-charcoal/20 bg-transparent py-2 text-sm font-medium text-charcoal placeholder-charcoal/40 transition-colors focus:border-accent focus:outline-none"
                        />
                      </div>
                    )}

                    {/* Email Input with Underline Style */}
                    <div className="space-y-1">
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-charcoal/70">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="coder@hospital.org"
                        className="w-full border-b-2 border-charcoal/20 bg-transparent py-2 text-sm font-medium text-charcoal placeholder-charcoal/40 transition-colors focus:border-accent focus:outline-none"
                      />
                    </div>

                    {/* Password Input with Underline Style */}
                    <div className="space-y-1">
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-charcoal/70">
                        Password
                      </label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full border-b-2 border-charcoal/20 bg-transparent py-2 text-sm font-medium text-charcoal placeholder-charcoal/40 transition-colors focus:border-accent focus:outline-none"
                      />
                    </div>

                    {/* Specialty Track (Shown for Sign Up) */}
                    {mode === 'signup' && (
                      <div className="space-y-1">
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-charcoal/70">
                          Primary Specialty Focus
                        </label>
                        <select
                          value={specialty}
                          onChange={(e) => setSpecialty(e.target.value)}
                          className="w-full border-b-2 border-charcoal/20 bg-transparent py-2 text-sm font-medium text-charcoal transition-colors focus:border-accent focus:outline-none cursor-pointer"
                        >
                          <option value="Cardiology">Cardiology (EHR Cath Lab)</option>
                          <option value="Orthopedics">Orthopedics &amp; Sports Surgery</option>
                          <option value="Emergency Medicine">Emergency Medicine (Level 1 Trauma)</option>
                          <option value="Radiology">Radiology &amp; Nuclear Imaging</option>
                          <option value="Neurology">Neurology &amp; Neurosurgery</option>
                          <option value="All Specialties">All 22 Hospital Departments</option>
                        </select>
                      </div>
                    )}

                    {/* Checkbox Options */}
                    {mode === 'signin' ? (
                      <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 rounded border-charcoal/30 accent-[#FF6B00] text-accent focus:ring-accent cursor-pointer"
                          />
                          <span className="text-xs font-medium text-charcoal/70">Remember Me</span>
                        </label>
                        <a
                          href="#forgot"
                          onClick={(e) => {
                            e.preventDefault()
                            alert('Password recovery link sent to your registered email.')
                          }}
                          className="text-xs font-bold text-accent hover:underline"
                        >
                          Forgot?
                        </a>
                      </div>
                    ) : (
                      <div className="pt-1">
                        <label className="flex items-start gap-2 cursor-pointer select-none text-left">
                          <input
                            type="checkbox"
                            required
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            className="h-4 w-4 mt-0.5 rounded border-charcoal/30 accent-[#FF6B00] text-accent focus:ring-accent cursor-pointer"
                          />
                          <span className="text-xs font-medium text-charcoal/70">
                            I agree to the Practice-First Terms and HIPAA Simulated Data Agreement.
                          </span>
                        </label>
                      </div>
                    )}

                    {/* Primary Codivia Accent Button (Sign In / Sign Up) - Creative 3D Glare */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#FF8A33] to-[#FF5500] hover:brightness-105 active:scale-[0.99] text-white font-black text-sm py-4 shadow-[0_8px_25px_rgba(242,103,34,0.38)] hover:shadow-[0_12px_32px_rgba(242,103,34,0.52)] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 border border-white/25"
                    >
                      {/* Diagonal Glass Sweep Reflection */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

                      {isSubmitting ? (
                        <>
                          <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <span>{mode === 'signup' ? 'Creating Account...' : 'Signing In...'}</span>
                        </>
                      ) : (
                        <span className="flex items-center gap-2 relative z-10">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs">
                            {mode === 'signup' ? '🚀' : '✨'}
                          </span>
                          <span>{mode === 'signup' ? 'Create Coder Account (Register)' : 'Sign In to Workspace'}</span>
                          <span className="font-bold transition-transform group-hover:translate-x-1">→</span>
                        </span>
                      )}
                    </button>

                    {/* Quick One-Click Google Authentication - Creative Frosted Card */}
                    <button
                      type="button"
                      onClick={handleGoogleClick}
                      className="group w-full rounded-2xl border border-charcoal/15 bg-white hover:bg-orange-50/40 hover:border-accent/40 text-charcoal font-bold text-xs py-3 px-4 shadow-2xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        <span>{mode === 'signup' ? 'Sign Up with Google' : 'Continue with Google'}</span>
                      </div>
                      <span className="rounded-full bg-charcoal/5 group-hover:bg-accent/10 group-hover:text-accent px-2 py-0.5 text-[10px] font-mono font-bold text-charcoal/60 transition-colors">
                        1-Click OAuth
                      </span>
                    </button>

                    {/* Quick Demo Login for Developer / Client Testing (Creative 3D Cyber Card) */}
                    <div className="pt-2 pb-1">
                      <div className="relative my-2">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-amber-500/20" />
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase font-mono font-black tracking-wider">
                          <span className="bg-[#FAF7F2] px-3 text-amber-800 flex items-center gap-1.5 rounded-full border border-amber-500/30 shadow-2xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
                            <span>Developer &amp; Testing Access</span>
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleDemoClick}
                        disabled={isSubmitting}
                        className="group relative w-full overflow-hidden rounded-2xl border-2 border-amber-500/80 bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-500/25 hover:from-amber-500/30 hover:to-orange-500/25 text-amber-950 font-black text-xs sm:text-sm py-3.5 px-4 shadow-[0_4px_18px_rgba(245,158,11,0.22)] hover:shadow-[0_8px_25px_rgba(245,158,11,0.38)] transition-all flex items-center justify-between cursor-pointer hover:scale-[1.02] active:scale-[0.99]"
                        title={targetDepartment ? `Open ${targetDepartment.name} Landing Page` : 'Instant Developer Direct Login'}
                      >
                        {/* Shimmer Light Reflection Sweep */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-800 ease-in-out pointer-events-none" />

                        <div className="flex items-center gap-2.5 relative z-10 text-left">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white text-sm font-black shadow-xs group-hover:rotate-6 transition-transform">
                            ⚡
                          </div>
                          <div>
                            <span className="block font-black text-amber-950 text-xs sm:text-sm leading-tight">
                              Demo Login
                            </span>
                            <span className="block text-[10px] font-mono font-bold text-amber-800">
                              Instant Direct Access
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 relative z-10">
                          <span className="rounded-xl bg-amber-500 text-white px-2.5 py-1 text-[11px] font-mono font-black tracking-tight shadow-xs group-hover:brightness-110 flex items-center gap-1">
                            <span>{targetDepartment ? targetDepartment.name : 'All Departments'}</span>
                            <span className="transition-transform group-hover:translate-x-1 font-bold">→</span>
                          </span>
                        </div>
                      </button>
                      <p className="text-[10px] text-center text-charcoal/50 mt-1.5 font-mono flex items-center justify-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                        <span>Instant bypass: opens {targetDepartment ? targetDepartment.name : 'department'} clinical charts immediately</span>
                      </p>
                    </div>

                    {/* Dual Mode Switch Footer Link */}
                    <div className="text-center pt-1">
                      {mode === 'signin' ? (
                        <span className="text-xs text-charcoal/60">
                          Don't have an account?{' '}
                          <button
                            type="button"
                            onClick={() => setMode('signup')}
                            className="font-bold text-accent hover:underline cursor-pointer"
                          >
                            Sign Up / Register
                          </button>
                        </span>
                      ) : (
                        <span className="text-xs text-charcoal/60">
                          Already have an account?{' '}
                          <button
                            type="button"
                            onClick={() => setMode('signin')}
                            className="font-bold text-accent hover:underline cursor-pointer"
                          >
                            Sign In
                          </button>
                        </span>
                      )}
                    </div>
                  </form>
                )}
              </div>

            </div>

            {/* Bottom Subtle Copyright in Codivia Theme */}
            <div className="mt-8 pt-4 border-t border-charcoal/10 text-center text-[10px] font-mono text-charcoal/40">
              © 2026 CODIVIA CLINICAL EHR • Practice-First Medical Coding Workstation
            </div>
          </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
