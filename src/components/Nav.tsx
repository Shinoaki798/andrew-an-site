import { useEffect, useState } from 'react'
import { motion as m, useScroll, useSpring } from 'motion/react'
import { profile } from '../data/content'
import { usePrefs } from './Providers'

const links = [
  ['Work', '#work'],
  ['Stack', '#stack'],
  ['Experience', '#experience'],
  ['About', '#about'],
]

export function Nav() {
  const { dark, motion, toggleTheme, toggleMotion } = usePrefs()
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40)
    f(); addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid ? 'bg-ink/80 backdrop-blur-md border-b hairline' : ''}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 bg-amber text-ink px-3 py-1 font-mono text-xs">Skip to content</a>
      <m.div className="absolute left-0 top-0 h-[2px] w-full origin-left bg-amber" style={{ scaleX: bar }} />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="display text-2xl font-semibold tracking-tight focus-ring">{profile.handle}</a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map(([t, h]) => (
            <a key={h} href={h} className="label text-bone-2 hover:text-amber transition-colors focus-ring">{t}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={toggleMotion} className="label hidden h-8 items-center rounded-full border hairline px-3 hover:border-amber hover:text-amber transition-colors sm:inline-flex focus-ring" aria-pressed={!motion}>
            {motion ? 'Pause motion' : 'Resume motion'}
          </button>
          <button onClick={() => setOpen((o) => !o)} className="h-8 w-8 rounded-full border hairline grid place-items-center hover:border-amber hover:text-amber transition-colors md:hidden focus-ring" aria-expanded={open} aria-controls="mobile-nav" aria-label="Menu">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">{open ? <path d="M3 3l10 10M13 3 3 13" /> : <path d="M2 4h12M2 8h12M2 12h12" />}</svg>
          </button>
          <button onClick={toggleTheme} className="h-8 w-8 rounded-full border hairline grid place-items-center hover:border-amber hover:text-amber transition-colors focus-ring" aria-label="Toggle theme">
            {dark ? (
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="3" /><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5 13 13M3 13l1.5-1.5M11.5 4.5 13 3" /></svg>
            ) : (
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor"><path d="M13.5 10.2A6 6 0 0 1 5.8 2.5a6 6 0 1 0 7.7 7.7Z" /></svg>
            )}
          </button>
          <a href={`mailto:${profile.email}`} className="ml-1 inline-flex h-8 items-center rounded-full bg-bone px-4 font-mono text-[0.68rem] tracking-widest uppercase text-ink hover:bg-amber transition-colors focus-ring">
            Let’s talk
          </a>
        </div>
      </div>
      <div id="mobile-nav" hidden={!open} className="md:hidden border-t hairline bg-ink/95 backdrop-blur-md">
        <nav className="mx-auto grid max-w-7xl px-5 py-3" aria-label="Mobile">
          {links.map(([t, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="flex h-12 items-center justify-between border-b hairline last:border-b-0 label text-bone hover:text-amber focus-ring">{t}<span className="text-amber">→</span></a>
          ))}
          <button onClick={() => { toggleMotion(); setOpen(false) }} className="flex h-12 items-center label text-bone-2 hover:text-amber focus-ring">{motion ? 'Pause motion' : 'Resume motion'}</button>
        </nav>
      </div>
    </header>
  )
}
