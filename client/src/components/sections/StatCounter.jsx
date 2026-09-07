import { motion } from 'framer-motion'
import AnimatedCounter from '../ui/AnimatedCounter.jsx'
import { totalCharts, totalDepartments } from '../../data/departments.js'

const stats = [
  { value: totalCharts, suffix: '+', label: 'De-identified practice charts', accent: true },
  { value: totalDepartments, suffix: '', label: 'Clinical departments covered' },
  { value: 3, suffix: '', label: 'Code sets — ICD-10-CM, CPT, HCPCS' },
  { value: 92, suffix: '%', label: 'Coders placement-ready within 90 days' },
]

export default function StatCounter() {
  return (
    <section className="relative bg-charcoal border-y border-bone/10 py-12 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden border border-bone/10 bg-bone/10 px-4 sm:px-8 lg:grid-cols-4 lg:px-16">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: i * 0.08 }}
            className="relative bg-charcoal p-4 sm:p-6 lg:p-8 flex flex-col justify-between"
          >
            {stat.accent && (
              <span className="absolute left-0 top-0 h-1 w-8 sm:w-10 bg-accent" />
            )}
            <div className={`text-2xl sm:text-3xl md:text-4xl lg:text-display-md font-black tracking-tight ${stat.accent ? 'text-accent' : 'text-bone'}`}>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-snug text-bone/60">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
