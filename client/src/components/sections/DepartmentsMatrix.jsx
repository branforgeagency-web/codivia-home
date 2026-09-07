import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading.jsx'
import { departments } from '../../data/departments.js'

/**
 * 22 Clinical Departments Full-Width Horizontal Carousel (50px Inset with Nav Arrows)
 */
export default function DepartmentsMatrix({ onTrySandbox, onOpenDepartmentPage }) {
  const [selectedDept, setSelectedDept] = useState(departments[0])
  const [activeCategory, setActiveCategory] = useState('all')
  const carouselRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const categories = [
    { id: 'all', label: 'All 22 Departments', count: 22 },
    {
      id: 'surgical',
      label: 'Surgical & Procedural',
      count: 6,
      depts: ['general-surgery', 'orthopedics', 'urology', 'ent', 'ophthalmology', 'obgyn'],
    },
    {
      id: 'acute',
      label: 'Critical & Inpatient',
      count: 7,
      depts: ['emergency', 'cardiology', 'neurology', 'pulmonology', 'nephrology', 'anesthesiology', 'infectious-disease'],
    },
    {
      id: 'medicine',
      label: 'Diagnostic & Outpatient',
      count: 9,
      depts: ['radiology', 'oncology', 'gastroenterology', 'endocrinology', 'dermatology', 'pediatrics', 'psych', 'pmr', 'ambulatory'],
    },
  ]

  const filteredDepts =
    activeCategory === 'all'
      ? departments
      : departments.filter((d) => {
          const cat = categories.find((c) => c.id === activeCategory)
          return cat?.depts?.includes(d.id)
        })

  // Check scroll boundary to update arrow button states
  const checkScrollBounds = () => {
    if (!carouselRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
    setCanScrollLeft(scrollLeft > 15)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15)
  }

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    checkScrollBounds()
    el.addEventListener('scroll', checkScrollBounds, { passive: true })
    window.addEventListener('resize', checkScrollBounds)
    return () => {
      el.removeEventListener('scroll', checkScrollBounds)
      window.removeEventListener('resize', checkScrollBounds)
    }
  }, [filteredDepts])

  // Smooth Scroll Left / Right
  const scroll = (direction) => {
    if (!carouselRef.current) return
    const cardWidth = 330
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  // Handle Category Filter Change
  const handleSelectCategory = (cat) => {
    setActiveCategory(cat.id)
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
    const matches =
      cat.id === 'all'
        ? departments
        : departments.filter((d) => cat.depts?.includes(d.id))
    if (matches.length > 0) {
      setSelectedDept(matches[0])
    }
  }

  return (
    <section
      id="departments"
      className="relative bg-white py-16 sm:py-24 overflow-hidden border-y border-charcoal/10"
      style={{
        backgroundImage: 'radial-gradient(rgba(20, 18, 16, 0.04) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Soft Ambient Background Auras */}
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />

      {/* Top Header Container (Aligned to 50px padding) */}
      <div className="w-full px-4 sm:px-8 lg:px-[50px] relative z-10">
        {/* Section Heading */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-widest text-accent mb-3 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span>Full Clinical Spectrum</span>
          </div>
          <SectionHeading
            dark={false}
            eyebrow="Specialty matrix"
            title="22 departments. Every code set that matters."
            description="Swipe through all 22 specialty departments — explore 3D clinical models, practice chart volumes, and real-time code suites."
          />
        </div>

        {/* Category Filters & Top Carousel Navigation Header */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-charcoal/10 pb-4">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-accent text-white shadow-md shadow-accent/20 scale-[1.02]'
                      : 'bg-charcoal/[0.04] text-charcoal/70 hover:text-charcoal hover:bg-charcoal/[0.08]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-charcoal/10 text-charcoal/60'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Arrow Navigation Controls in Header */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-charcoal/50 mr-1 hidden sm:inline">
              Swipe or use arrows
            </span>
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`h-10 w-10 rounded-full border flex items-center justify-center transition shadow-xs cursor-pointer ${
                canScrollLeft
                  ? 'border-charcoal/20 bg-white text-charcoal hover:border-accent hover:text-accent hover:shadow-md active:scale-95'
                  : 'border-charcoal/10 bg-charcoal/[0.02] text-charcoal/25 cursor-not-allowed'
              }`}
              title="Previous Departments"
              aria-label="Previous Departments"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`h-10 w-10 rounded-full border flex items-center justify-center transition shadow-xs cursor-pointer ${
                canScrollRight
                  ? 'border-charcoal/20 bg-white text-charcoal hover:border-accent hover:text-accent hover:shadow-md active:scale-95'
                  : 'border-charcoal/10 bg-charcoal/[0.02] text-charcoal/25 cursor-not-allowed'
              }`}
              title="Next Departments"
              aria-label="Next Departments"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Track Stage with Left and Right Margins */}
      <div className="relative w-full mt-6 px-4 sm:px-8 lg:px-[50px] group/track">
        {/* Floating Left Navigation Arrow Overlay (Hidden on Mobile for Clean Swipe, Visible on Desktop) */}
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`hidden md:flex absolute -left-2 lg:left-2 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full border shadow-xl items-center justify-center transition-all duration-300 backdrop-blur-md cursor-pointer ${
            canScrollLeft
              ? 'border-charcoal/15 bg-white/95 text-charcoal hover:bg-accent hover:text-white hover:border-accent hover:scale-110 shadow-black/10'
              : 'opacity-0 pointer-events-none'
          }`}
          title="Scroll Left"
          aria-label="Scroll Left"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Floating Right Navigation Arrow Overlay (Hidden on Mobile for Clean Swipe, Visible on Desktop) */}
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`hidden md:flex absolute -right-2 lg:right-2 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full border shadow-xl items-center justify-center transition-all duration-300 backdrop-blur-md cursor-pointer ${
            canScrollRight
              ? 'border-charcoal/15 bg-white/95 text-charcoal hover:bg-accent hover:text-white hover:border-accent hover:scale-110 shadow-black/10'
              : 'opacity-0 pointer-events-none'
          }`}
          title="Scroll Right"
          aria-label="Scroll Right"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Left & Right Soft Fade Edges */}
        <div className="pointer-events-none absolute left-4 lg:left-[50px] inset-y-0 w-10 bg-gradient-to-r from-white via-white/70 to-transparent z-20" />
        <div className="pointer-events-none absolute right-4 lg:right-[50px] inset-y-0 w-10 bg-gradient-to-l from-white via-white/70 to-transparent z-20" />

        {/* The Carousel Track with Left and Right Margins */}
        <div
          ref={carouselRef}
          className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth py-5 px-1 cursor-grab active:cursor-grabbing select-none rounded-3xl"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {filteredDepts.map((dept) => {
            const isSelected = selectedDept?.id === dept.id

            return (
              <div
                key={dept.id}
                onClick={() => setSelectedDept(dept)}
                style={{ scrollSnapAlign: 'start' }}
                className={`dept-uicard group ${isSelected ? 'is-selected' : ''}`}
              >
                {/* Diagonal Glass Sweep Reflection */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-10" />

                {/* Top-Left Specialty Track Tag */}
                <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 pointer-events-none">
                  <span className="flex items-center gap-1 font-mono text-[10px] font-black text-charcoal/70 bg-white/90 border border-charcoal/10 backdrop-blur-md px-2.5 py-0.5 rounded-full shadow-2xs uppercase tracking-wider">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    EHR Track
                  </span>
                </div>

                {/* Top-Right Specialty Index Badge */}
                <div className="top-badge flex items-center gap-1.5">
                  <span className="font-mono text-xs font-black text-accent bg-white/95 border border-accent/25 backdrop-blur-md px-2.5 py-0.5 rounded-full shadow-xs tracking-tight">
                    #{dept.index}
                  </span>
                </div>

                {/* Profile Pic / 3D Medical Icon Area — Morphs into Top-Left Circle on Hover */}
                <div className="profile-pic">
                  {/* Glowing Ambient Halo behind the 3D Model */}
                  <div className="pointer-events-none absolute top-12 h-36 w-36 rounded-full bg-accent/15 blur-2xl" />

                  <img
                    src={`/departments/${dept.id}.png`}
                    alt={dept.name}
                    className="dept-img relative z-1"
                    loading="lazy"
                    draggable="false"
                  />
                  <h3 className="dept-title-front">
                    {dept.name}
                  </h3>
                  <span className="dept-cases-front flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
                    {dept.charts} Practice Cases
                  </span>
                </div>

                {/* Sliding Drawer Bottom Panel — Reveals on Hover */}
                <div className="bottom">
                  {/* Unhovered Peek Bar */}
                  <div className="peek-bar">
                    <span className="text-[11px] font-bold text-charcoal/75 uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Clinical Code Sets
                    </span>
                    <span className="flex items-center gap-1 text-xs font-black text-accent">
                      Inspect
                      <svg className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>

                  {/* Hover Revealed Content */}
                  <div className="content">
                    {/* Top Header beside floating circular avatar */}
                    <div className="pl-20 sm:pl-22 pr-1 min-h-[58px] flex flex-col justify-center">
                      <h4 className="text-sm sm:text-base font-black text-charcoal leading-tight truncate">
                        {dept.name}
                      </h4>
                      <span className="font-mono text-[11px] font-extrabold text-accent flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {dept.charts} Verified Cases
                      </span>
                    </div>

                    {/* Focus narrative */}
                    <p className="text-[11px] sm:text-xs text-charcoal/80 line-clamp-3 leading-relaxed font-medium mt-1">
                      {dept.focus}
                    </p>

                    {/* Code Sets Mini Badges (Creative Color-Coded Coding Chips) */}
                    <div className="grid grid-cols-3 gap-1.5 font-mono text-[9px] text-center my-2">
                      <div className="rounded-xl bg-emerald-50/90 border border-emerald-500/25 py-1.5 px-1 shadow-2xs">
                        <span className="font-black text-emerald-700 block">ICD-10-CM</span>
                        <span className="text-charcoal/80 truncate block font-medium">{dept.icd.split(',')[0]}</span>
                      </div>
                      <div className="rounded-xl bg-amber-50/90 border border-amber-500/25 py-1.5 px-1 shadow-2xs">
                        <span className="font-black text-amber-700 block">CPT®-4</span>
                        <span className="text-charcoal/80 truncate block font-medium">{dept.cpt.split('–')[0]}...</span>
                      </div>
                      <div className="rounded-xl bg-sky-50/90 border border-sky-500/25 py-1.5 px-1 shadow-2xs">
                        <span className="font-black text-sky-700 block">HCPCS II</span>
                        <span className="text-charcoal/80 truncate block font-medium">Level II</span>
                      </div>
                    </div>

                    {/* Bottom Action Footer with Enlarged Try Charts CTA */}
                    <div className="flex items-center justify-between pt-2 border-t border-accent/15 mt-1">
                      <span className="text-[11px] font-mono font-bold text-emerald-600 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        5 Free Charts
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          if (onOpenDepartmentPage) {
                            onOpenDepartmentPage(dept.id)
                          } else {
                            window.location.hash = `#/department/${dept.id}`
                          }
                        }}
                        className="group/btn relative overflow-hidden bg-gradient-to-r from-[#FF6B00] via-[#FF8A33] to-[#FF5500] hover:brightness-110 text-white font-black text-xs sm:text-sm px-4.5 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-[0_4px_18px_rgba(242,103,34,0.4)] hover:shadow-[0_6px_25px_rgba(242,103,34,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer border border-white/25"
                      >
                        {/* Shimmer Light Glare */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                        <span className="relative z-10 flex items-center gap-1.5">
                          <span>Try Charts</span>
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-[10px] font-black transition-transform group-hover/btn:translate-x-1">
                            →
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Active Department Clinical Inspector Tray (50px Inset) */}
      <div className="w-full px-4 sm:px-8 lg:px-[50px] relative z-10 mt-6">
        <AnimatePresence mode="wait">
          {selectedDept && (
            <motion.div
              key={selectedDept.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-accent/25 bg-gradient-to-r from-white via-[#FFF8F4] to-[#FFF0E7] p-6 sm:p-8 shadow-md"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left Thumbnail & Title */}
                <div className="lg:col-span-4 flex items-center gap-4">
                  <div className="relative h-20 w-20 shrink-0 rounded-2xl border border-accent/25 bg-white p-2 shadow-md">
                    <img
                      src={`/departments/${selectedDept.id}.png`}
                      alt={selectedDept.name}
                      className="h-full w-full object-contain"
                    />
                    <span className="absolute -top-2 -right-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-mono font-bold text-white shadow-xs">
                      #{selectedDept.index}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-extrabold text-charcoal">
                      {selectedDept.name}
                    </h4>
                    <p className="text-xs font-mono font-bold text-accent mt-0.5">
                      {selectedDept.charts} Verified Practice Encounters
                    </p>
                    <p className="text-xs text-charcoal/70 mt-1 line-clamp-2">
                      {selectedDept.focus}
                    </p>
                  </div>
                </div>

                {/* Middle Code Sets Badges */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="rounded-xl border border-charcoal/10 bg-white p-3 shadow-xs">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent">
                      ICD-10-CM
                    </p>
                    <p className="text-xs font-mono font-bold text-charcoal mt-1 truncate">
                      {selectedDept.icd}
                    </p>
                    <p className="text-[10px] text-charcoal/50">Diagnostic</p>
                  </div>

                  <div className="rounded-xl border border-charcoal/10 bg-white p-3 shadow-xs">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent">
                      CPT®-4
                    </p>
                    <p className="text-xs font-mono font-bold text-charcoal mt-1 truncate">
                      {selectedDept.cpt}
                    </p>
                    <p className="text-[10px] text-charcoal/50">Procedural</p>
                  </div>

                  <div className="rounded-xl border border-charcoal/10 bg-white p-3 shadow-xs">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent">
                      HCPCS II
                    </p>
                    <p className="text-xs font-mono font-bold text-charcoal mt-1 truncate">
                      {selectedDept.hcpcs}
                    </p>
                    <p className="text-[10px] text-charcoal/50">Supplies</p>
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col justify-end gap-2">
                  <button
                    onClick={() => {
                      if (onOpenDepartmentPage) {
                        onOpenDepartmentPage(selectedDept.id)
                      } else {
                        window.location.hash = `#/department/${selectedDept.id}`
                      }
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-accent/25 hover:bg-accent-bright transition-all cursor-pointer"
                  >
                    <span>Open {selectedDept.name} Page</span>
                    <span>→</span>
                  </button>
                  <span className="text-center text-[10px] font-mono text-emerald-600 font-bold">
                    ✓ Includes 5 Free Trial Charts
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
