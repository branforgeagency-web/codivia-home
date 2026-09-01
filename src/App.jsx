import { useEffect, useRef, useState, useCallback } from 'react'
import VideoBanner from './components/sections/VideoBanner.jsx'
import Hero from './components/sections/Hero.jsx'
import StatCounter from './components/sections/StatCounter.jsx'
import HowCodiviaWorks from './components/sections/HowCodiviaWorks.jsx'
import DepartmentsMatrix from './components/sections/DepartmentsMatrix.jsx'
import JourneyTimeline from './components/sections/JourneyTimeline.jsx'
import CodingTeaser from './components/sections/CodingTeaser.jsx'
import PricingGate from './components/sections/PricingGate.jsx'
import TrustFAQ from './components/sections/TrustFAQ.jsx'
import Footer from './components/sections/Footer.jsx'
import DepartmentLandingPage from './components/department/DepartmentLandingPage.jsx'

// Firebase / Razorpay wiring is intentionally optional at runtime
let firebaseModule = null
let razorpayModule = null

export default function App() {
  const [authState, setAuthState] = useState({ user: null, loading: true })
  const pricingRef = useRef(null)
  const journeyRef = useRef(null)

  // Dynamic Department Route state based on URL hash: #/department/:deptId
  const [activeDeptId, setActiveDeptId] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#/department/')) {
      return window.location.hash.replace('#/department/', '')
    }
    return null
  })

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash.startsWith('#/department/')) {
        setActiveDeptId(hash.replace('#/department/', ''))
      } else {
        setActiveDeptId(null)
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    let unsubscribe = () => {}
    ;(async () => {
      try {
        firebaseModule = await import('./firebase.js')
        unsubscribe = firebaseModule.watchAuthState((user) => {
          setAuthState({ user, loading: false })
        })
      } catch (e) {
        console.warn('Firebase module not initialized — configure .env.local to enable auth.', e)
        setAuthState({ user: null, loading: false })
      }
    })()
    return () => unsubscribe()
  }, [])

  const scrollTo = useCallback((el) => {
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleStartFree = useCallback(async () => {
    if (!firebaseModule) {
      scrollTo(document.getElementById('demo'))
      return
    }
    if (!authState.user) {
      try {
        await firebaseModule.signInWithGoogle()
      } catch (err) {
        console.error('Sign-in failed', err)
      }
    } else {
      scrollTo(document.getElementById('demo'))
    }
  }, [authState.user, scrollTo])

  const handleSeeHowItWorks = useCallback(() => {
    scrollTo(document.getElementById('journey'))
  }, [scrollTo])

  const handleOpenDepartment = useCallback((deptId) => {
    window.location.hash = `#/department/${deptId}`
    setActiveDeptId(deptId)
  }, [])

  const handleBackToHome = useCallback(() => {
    window.location.hash = ''
    setActiveDeptId(null)
  }, [])

  const handlePay = useCallback(async (tier) => {
    if (!firebaseModule) {
      alert(`Enrolment for ${tier?.name || 'Pro Practice Package'} initiated. Please configure Firebase to enable live payment processing!`)
      return
    }
    if (!authState.user) {
      try {
        await firebaseModule.signInWithGoogle()
      } catch (err) {
        console.error('Sign-in failed', err)
        return
      }
    }
    if (!razorpayModule) {
      razorpayModule = await import('./lib/razorpay.js')
    }
    await razorpayModule.startEnrolmentPayment({
      onSuccess: () => {
        alert('Payment confirmed! Your Codivia Coding Studio EHR Workspace access is now unlocked.')
      },
      onError: (err) => {
        console.error('Payment error', err)
        alert('Something went wrong starting payment. Please try again.')
      },
    })
  }, [authState.user])

  // Render Dedicated Department Landing Page when active
  if (activeDeptId) {
    return (
      <DepartmentLandingPage
        deptId={activeDeptId}
        onBack={handleBackToHome}
        onCheckout={handlePay}
      />
    )
  }

  return (
    <div className="min-h-screen bg-charcoal">
      {/* 1st Section: Fullscreen Video Banner Section */}
      <VideoBanner onStartFree={handleStartFree} onSeeHowItWorks={handleSeeHowItWorks} />

      {/* 2nd Section: Hero Section (Headline, CVMark Canvas, Marquee Ticker) */}
      <div id="hero-section">
        <Hero onStartFree={handleStartFree} onSeeHowItWorks={handleSeeHowItWorks} />
      </div>

      {/* 3rd Section: Live Matrix Counters */}
      <StatCounter />

      {/* Product Tour & Workflow: How Codivia Works */}
      <HowCodiviaWorks />

      {/* 4th Section: 22 Departments Matrix */}
      <DepartmentsMatrix onOpenDepartmentPage={handleOpenDepartment} />

      {/* 5th Section: 5-Step Frictionless Onboarding */}
      <div ref={journeyRef}>
        <JourneyTimeline />
      </div>

      {/* 6th Section: Interactive Live Code Playground */}
      <CodingTeaser />

      {/* 7th Section: Transparent Pricing */}
      <div ref={pricingRef}>
        <PricingGate onPay={handlePay} authState={authState} />
      </div>

      {/* 8th Section: Trust & FAQ */}
      <TrustFAQ />

      {/* Footer */}
      <Footer />
    </div>
  )
}

