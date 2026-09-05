import { motion as m, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { usePrefs } from './Providers'

export function useAnim() {
  const { motion } = usePrefs()
  const reduced = useReducedMotion()
  return motion && !reduced
}

/** Section header: numbered index + display headline + supporting line. Fixed vertical rhythm. */
export function SectionHead({ index, label, title, lead, id }: { index: string; label: string; title: ReactNode; lead: ReactNode; id: string }) {
  return (
    <div id={id} className="scroll-mt-24 grid gap-8 md:grid-cols-12 md:gap-6">
      <div className="md:col-span-3 flex items-start gap-3">
        <span className="display text-5xl text-amber">{index}</span>
        <span className="label mt-3">/ {label}</span>
      </div>
      <div className="md:col-span-9 grid gap-6 md:grid-cols-9">
        <Reveal className="md:col-span-5">
          <h2 className="display text-[clamp(2.4rem,5.5vw,4.6rem)] font-medium">{title}</h2>
        </Reveal>
        <Reveal className="md:col-span-4 md:pt-3" delay={0.1}>
          <p className="text-lg text-bone-2 leading-snug max-w-md">{lead}</p>
        </Reveal>
      </div>
    </div>
  )
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const anim = useAnim()
  if (!anim) return <div className={className}>{children}</div>
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay }}
    >
      {children}
    </m.div>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-6 items-center rounded-full border hairline px-2.5 font-mono text-[0.66rem] tracking-wider text-bone-2 whitespace-nowrap">
      {children}
    </span>
  )
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`h-3.5 w-3.5 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M3 13 13 3M6 3h7v7" />
    </svg>
  )
}
