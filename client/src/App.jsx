import { useEffect, useRef, useState, useCallback } from 'react'
import SignInModal from './components/ui/SignInModal.jsx'
import Navbar from './components/sections/Navbar.jsx'
import NewHeroBanner from './components/sections/NewHeroBanner.jsx'
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
import { getStoredUser, getMe, signOutUser } from './lib/api.js'
import { startEnrolmentPayment } from './lib/razorpay.js'

// Firebase wiring is optional at runtime if configured in environment
let firebaseModule = null

export default function App() {
  const [authState, setAuthState] = useState(() => ({
    user: getStoredUser(),
    loading: false,
  }))
  const userRef = useRef(null)
  userRef.current = authState.user

  const [signInOpen, setSignInOpen] = useState(false)
  const [pendingDeptId, setPendingDeptId] = useState(null)
  const pricingRef = useRef(null)
  const journeyRef = useRef(null)

  // Dynamic Department Route state based on URL hash: #/department/:deptId
  const [activeDeptId, setActiveDeptId] = useState(null)

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash.startsWith('#/department/')) {
        const deptId = hash.replace('#/department/', '')
        const currentUser = userRef.current || authState.user
        // Only set active department if authenticated; never pop modal automatically
        if (currentUser) {
          setActiveDeptId(deptId)
        } else {
          setActiveDeptId(null)
        }
      } else {
        setActiveDeptId(null)
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [authState.user, authState.loading])

  useEffect(() => {
    // 1. Restore MERN auth session
    const stored = getStoredUser()
    if (stored) {
      setAuthState({ user: stored, loading: false })
      getMe()
        .then((res) => {
          if (res?.user) {
            setAuthState({ user: res.user, loading: false })
          }
        })
        .catch(() => {})
    }

    // 2. Optional Firebase SDK listener if configured
    let unsubscribe = () => {}
    ;(async () => {
      try {
        firebaseModule = await import('./firebase.js')
        if (firebaseModule.isFirebaseConfigured) {
          unsubscribe = firebaseModule.watchAuthState((user) => {
            if (user) {
              setAuthState({ user, loading: false })
            }
          })
        }
      } catch (e) {
        // Firebase optional fallback
      }
    })()
    return () => unsubscribe()
  }, [])

  const scrollTo = useCallback((el) => {
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleStartFree = useCallback(async () => {
    if (!authState.user) {
      setSignInOpen(true)
    } else {
      scrollTo(document.getElementById('demo'))
    }
  }, [authState.user, scrollTo])

  const handleSeeHowItWorks = useCallback(() => {
    scrollTo(document.getElementById('how-it-works') || document.getElementById('journey'))
  }, [scrollTo])

  // Department "Try Charts" button & department click handler:
  // Requires client login before opening the department page!
  const handleOpenDepartment = useCallback((deptId) => {
    if (!authState.user) {
      setPendingDeptId(deptId)
      setSignInOpen(true)
    } else {
      window.location.hash = `#/department/${deptId}`
      setActiveDeptId(deptId)
    }
  }, [authState.user])

  // Demo Login (Developer Direct Access):
  // Instantly sets demo user & unlocks the department page without typing credentials
  const handleDemoSignIn = useCallback(() => {
    const demoUser = {
      uid: 'demo-developer-101',
      email: 'developer@codivia.com',
      displayName: 'Demo Developer Coder',
      isDemo: true,
    }
    userRef.current = demoUser
    setAuthState({ user: demoUser, loading: false })
    setSignInOpen(false)

    const targetDept = pendingDeptId || 'cardiology'
    setPendingDeptId(null)
    setActiveDeptId(targetDept)
    window.location.hash = `#/department/${targetDept}`
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pendingDeptId])

  const handleSuccessfulAuth = useCallback((user) => {
    userRef.current = user
    setAuthState({ user, loading: false })
    setSignInOpen(false)

    const targetDept = pendingDeptId || 'cardiology'
    setPendingDeptId(null)
    setActiveDeptId(targetDept)
    window.location.hash = `#/department/${targetDept}`
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pendingDeptId])

  const handleSignOut = useCallback(() => {
    signOutUser()
    if (firebaseModule && firebaseModule.signOut) {
      firebaseModule.signOut()
    }
    userRef.current = null
    setAuthState({ user: null, loading: false })
    setActiveDeptId(null)
    window.location.hash = ''
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleBackToHome = useCallback(() => {
    setActiveDeptId(null)
    window.location.hash = ''
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handlePay = useCallback(async (tier) => {
    if (!authState.user) {
      setSignInOpen(true)
      return
    }

    await startEnrolmentPayment({
      user: authState.user,
      onSuccess: () => {
        alert('Payment confirmed! Your Codivia Coding Studio EHR Workspace access is now unlocked.')
      },
      onError: (err) => {
        console.error('Payment error', err)
        alert(err.message || 'Something went wrong starting payment. Please try again.')
      },
    })
  }, [authState.user])

  // Render Dedicated Department Landing Page when active (user must be authenticated)
  if (activeDeptId && (authState.user || userRef.current)) {
    return (
      <DepartmentLandingPage
        deptId={activeDeptId}
        onBack={handleBackToHome}
        onCheckout={handlePay}
        user={authState.user || userRef.current}
        onSignOut={handleSignOut}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Floating Black Glass Global Navigation Header */}
      <Navbar
        user={authState.user}
        onStartFree={handleStartFree}
        onSignIn={() => setSignInOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* Interactive Medical Coder Sign In Modal */}
      <SignInModal
        isOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
        onGoogleSignIn={handleStartFree}
        onDemoSignIn={handleDemoSignIn}
        onSuccessfulAuth={handleSuccessfulAuth}
        pendingDeptId={pendingDeptId}
      />

      {/* 1st Section: Brand New Hero Banner Section */}
      <div id="hero-section">
        <NewHeroBanner
          onStartFree={handleStartFree}
          onSeeHowItWorks={handleSeeHowItWorks}
          onSignIn={() => setSignInOpen(true)}
        />
      </div>

      {/* 2nd Section: Product Tour & Workflow: How Codivia Works (Bridge the Experience Gap) */}
      <HowCodiviaWorks />

      {/* 3rd Section: About / Clinical Experience Deep Dive */}
      <Hero onStartFree={handleStartFree} onSeeHowItWorks={handleSeeHowItWorks} />

      {/* 4th Section: Live Matrix Counters */}
      <StatCounter />

      {/* 5th Section: 22 Departments Matrix */}
      <DepartmentsMatrix onOpenDepartmentPage={handleOpenDepartment} />

      {/* 5th Section: 5-Step Frictionless Onboarding */}
      <div ref={journeyRef}>
        <JourneyTimeline />
      </div>

      {/* 6th Section: Interactive Live Code Playground */}
      <CodingTeaser onStartFree={handleStartFree} onSignIn={() => setSignInOpen(true)} />

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

