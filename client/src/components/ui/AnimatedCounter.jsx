import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

/**
 * Scroll-triggered animated counter.
 * Counts from 0 -> value each time the element enters the viewport.
 */
export default function AnimatedCounter({ value, suffix = '', prefix = '', decimals = 0, duration = 1.6 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-10% 0px' })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 24, stiffness: 60, duration })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    } else {
      motionValue.set(0)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplay(
        latest.toLocaleString('en-IN', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      )
    })
    return unsubscribe
  }, [springValue, decimals])

  return (
    <span ref={ref} className="font-mono-num tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
