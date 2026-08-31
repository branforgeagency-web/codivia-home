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

// Firebase / Razorpay wiring is intentionally optional at runtime: if
// VITE_FIREBASE_API_KEY isn't set (e.g. previewing the UI without backend
// credentials yet), the app still renders and the CTAs fall back to
// smooth-scrolling instead of throwing. Both modules are dynamically
// imported (not at module scope) so a missing/invalid Firebase config never
// breaks the initial render.
let firebaseModule = null
let razorpayModule = null

export default function App() {
  const [authState, setAuthState] = useState({ user: null, loading: true })
  const pricingRef = useRef(null)
  const journeyRef = useRef(null)

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

  const handlePay = useCallback(async () => {
    if (!firebaseModule) {
      alert('Payment requires Firebase configuration — see .env.example.')
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
        alert('Payment submitted — enrolment confirms automatically once verified.')
      },
      onError: (err) => {
        console.error('Payment error', err)
        alert('Something went wrong starting payment. Please try again.')
      },
    })
  }, [authState.user])

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
      <DepartmentsMatrix />

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
