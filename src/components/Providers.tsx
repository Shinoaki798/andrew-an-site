import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'

type Prefs = {
  dark: boolean
  motion: boolean
  toggleTheme: () => void
  toggleMotion: () => void
}
const Ctx = createContext<Prefs>({ dark: true, motion: true, toggleTheme: () => {}, toggleMotion: () => {} })
export const usePrefs = () => useContext(Ctx)

export function Providers({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const [motion, setMotion] = useState(() => {
    try {
      if (localStorage.getItem('motion') === 'off') return false
    } catch {}
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch {}
  }, [dark])

  useEffect(() => {
    document.documentElement.classList.toggle('motion-off', !motion)
    try { localStorage.setItem('motion', motion ? 'on' : 'off') } catch {}
  }, [motion])

  useEffect(() => {
    if (!motion) return
    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true })
    let raf = 0
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [motion])

  return (
    <Ctx.Provider value={{ dark, motion, toggleTheme: () => setDark((d) => !d), toggleMotion: () => setMotion((m) => !m) }}>
      {children}
    </Ctx.Provider>
  )
}
