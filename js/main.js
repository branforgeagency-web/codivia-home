/**
 * CODIVIA — Core Vanilla JavaScript Engine
 */
import { renderDepartmentsMatrix } from './departments.js'
import { initPlayground } from './playground.js'

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Intro Video Gate
  initIntroGate()

  // 2. Initialize Canvas Particle Brand Mark
  initCVMarkCanvas('cv-mark-canvas')

  // 3. Render 22 Departments Matrix
  renderDepartmentsMatrix('departments-matrix-container')

  // 4. Initialize Interactive Code Playground
  initPlayground()

  // 5. Initialize IntersectionObserver for Stat Counters & Scroll Animations
  initScrollAnimations()

  // 6. Initialize Pricing & FAQs
  initPricingAndFAQs()

  // 7. Mobile Navigation Menu Toggle
  initMobileNav()
})

/* ==========================================================================
   1. Intro Video Gate Logic
   ========================================================================== */
function initIntroGate() {
  const gate = document.getElementById('intro-gate')
  const video = document.getElementById('intro-video')
  const skipBtn = document.getElementById('skip-intro-btn')
  const soundBtn = document.getElementById('sound-toggle-btn')
  const eqBars = document.querySelector('.equalizer-bars')
  const soundText = document.getElementById('sound-toggle-text')

  if (!gate || !video) return

  // Lock scrolling while intro plays
  document.body.style.overflow = 'hidden'

  // Set autoplay properties
  video.muted = true
  video.defaultMuted = true

  const startPlay = () => {
    video.play().catch(err => console.warn('Autoplay caught:', err))
  }
  startPlay()

  function closeGate() {
    gate.classList.add('hidden-gate')
    document.body.style.overflow = ''
    setTimeout(() => {
      gate.style.display = 'none'
      video.pause()
    }, 600)
  }

  // Skip click
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      closeGate()
    })
  }

  // On video end
  video.addEventListener('ended', () => {
    closeGate()
  })

  // Sound Toggle
  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      video.muted = !video.muted
      if (video.muted) {
        if (soundText) soundText.textContent = 'MUTED'
        if (eqBars) eqBars.classList.add('muted')
      } else {
        if (soundText) soundText.textContent = 'SOUND ON'
        if (eqBars) eqBars.classList.remove('muted')
      }
    })
  }
}

/* ==========================================================================
   2. Animated CVMark Canvas with Floating Orange Pixels
   ========================================================================== */
function initCVMarkCanvas(canvasId) {
  const canvas = document.getElementById(canvasId)
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const size = 440
  canvas.width = size
  canvas.height = size

  const numParticles = 24
  const particles = Array.from({ length: numParticles }, (_, i) => ({
    id: i,
    x: 140 + Math.random() * 160,
    y: 200 + Math.random() * 150,
    size: 4 + Math.random() * 8,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.2 + Math.random() * 0.7,
  }))

  function animate() {
    ctx.clearRect(0, 0, size, size)

    // Draw background aura
    const grad = ctx.createRadialGradient(220, 220, 10, 220, 220, 180)
    grad.addColorStop(0, 'rgba(242, 103, 34, 0.15)')
    grad.addColorStop(1, 'transparent')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(220, 220, 180, 0, Math.PI * 2)
    ctx.fill()

    // Draw stylized 'C' and 'V' brand mark
    ctx.strokeStyle = '#F26722'
    ctx.lineWidth = 18
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    // 'C' curve
    ctx.beginPath()
    ctx.arc(175, 220, 70, Math.PI * 0.35, Math.PI * 1.65, false)
    ctx.stroke()

    // 'V' shape
    ctx.beginPath()
    ctx.moveTo(215, 160)
    ctx.lineTo(260, 280)
    ctx.lineTo(315, 140)
    ctx.stroke()

    // Floating energetic square pixel particles
    particles.forEach(p => {
      p.y -= p.speed
      if (p.y < 80) {
        p.y = 300 + Math.random() * 40
        p.x = 140 + Math.random() * 160
      }

      ctx.fillStyle = `rgba(242, 103, 34, ${p.opacity})`
      ctx.fillRect(p.x, p.y, p.size, p.size)
    })

    requestAnimationFrame(animate)
  }

  animate()
}

/* ==========================================================================
   3. Scroll Animations & Stat Counters
   ========================================================================== */
function initScrollAnimations() {
  const counterElements = document.querySelectorAll('[data-counter-target]')

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target
        const target = parseFloat(el.getAttribute('data-counter-target'))
        const suffix = el.getAttribute('data-counter-suffix') || ''
        const decimals = parseInt(el.getAttribute('data-counter-decimals') || '0', 10)

        animateCounter(el, target, suffix, decimals)
      }
    })
  }, { threshold: 0.2 })

  counterElements.forEach(el => observer.observe(el))
}

function animateCounter(el, target, suffix, decimals) {
  let start = 0
  const duration = 1800
  const startTime = performance.now()

  function update(now) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOut = 1 - Math.pow(1 - progress, 3)
    const current = start + (target - start) * easeOut

    el.textContent = (decimals > 0 ? current.toFixed(decimals) : Math.floor(current).toLocaleString()) + suffix

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

/* ==========================================================================
   4. Pricing & FAQs
   ========================================================================== */
function initPricingAndFAQs() {
  // Pricing toggle
  const billingToggle = document.getElementById('billing-toggle')
  if (billingToggle) {
    billingToggle.addEventListener('change', (e) => {
      const isAnnual = e.target.checked
      document.querySelectorAll('.price-val').forEach(p => {
        p.textContent = isAnnual ? p.getAttribute('data-annual') : p.getAttribute('data-monthly')
      })
    })
  }

  // FAQ Accordion
  window.toggleFAQ = function(id) {
    const item = document.getElementById(`faq-item-${id}`)
    if (item) {
      item.classList.toggle('open')
      const sign = item.querySelector('.faq-toggle-sign')
      if (sign) sign.textContent = item.classList.contains('open') ? '−' : '+'
    }
  }
}

/* ==========================================================================
   5. Mobile Navigation
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-toggle')
  const drawer = document.getElementById('mobile-menu-drawer')

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('open-drawer')
    })
  }
}
