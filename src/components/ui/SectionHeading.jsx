import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, description, align = 'left', dark = true }) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] ${align === 'center' ? 'justify-center' : ''} ${dark ? 'text-accent' : 'text-accent-dim'}`}
        >
          <span className="h-px w-8 bg-accent" />
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 0.05 }}
        className={`text-display-md font-extrabold text-balance ${dark ? 'text-bone' : 'text-charcoal'}`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.1 }}
          className={`mt-4 text-base leading-relaxed ${dark ? 'text-bone/65' : 'text-charcoal/65'}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
