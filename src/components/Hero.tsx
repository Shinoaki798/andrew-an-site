import { lazy, Suspense, useEffect, useState } from 'react'
import { motion as m } from 'motion/react'
import { profile } from '../data/content'
import { usePrefs } from './Providers'
import { Arrow, useAnim } from './Shared'

const Globe = lazy(() => import('../three/Globe'))

const ease = [0.2, 0.7, 0.2, 1] as const

export function Hero() {
  const { dark, motion } = usePrefs()
  const anim = useAnim()
  const [time, setTime] = useState('')
  useEffect(() => {
    const f = () => setTime(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Toronto', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date()))
    f(); const id = setInterval(f, 1000); return () => clearInterval(id)
  }, [])

  const accent = dark ? '#f2b23a' : '#c9761a'
  const dim = dark ? '#6c8a92' : '#7b8790'

  return (
    <section id="top" className="relative min-h-[100svh] pt-16">
      <div className="ground absolute inset-0 -z-10" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-6 px-5 pt-10 md:grid-cols-12 md:px-8 md:pt-16 lg:pt-20">
        {/* left: type */}
        <div className="md:col-span-7 flex flex-col justify-between">
          <div>
            <m.p className="label mb-6" initial={anim ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
              {profile.role.toUpperCase()} · {profile.location.toUpperCase()}
            </m.p>
            <p className="label mb-2 text-amber">Hello, I’m</p>
            <h1 className="display text-[clamp(4.6rem,15vw,12.5rem)] font-semibold">
              {['Andrew', 'An.'].map((w, i) => (
                <span key={w} className="reveal-line">
                  <m.span className="block" initial={anim ? { y: '110%' } : false} animate={{ y: 0 }} transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.12 }}>
                    {w}
                  </m.span>
                </span>
              ))}
            </h1>
          </div>

          <m.div className="mt-12 max-w-xl" initial={anim ? { opacity: 0, y: 16 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.5 }}>
            <p className="display text-[clamp(1.5rem,2.6vw,2.2rem)] font-medium leading-[1.05]">
              {profile.tagline.map((l) => <span key={l} className="block">{l}</span>)}
            </p>
            <p className="mt-5 max-w-md text-base text-bone-2">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#work" className="group inline-flex h-11 items-center gap-2 rounded-full bg-amber px-5 font-mono text-[0.7rem] tracking-widest uppercase text-ink hover:bg-amber-2 transition-colors focus-ring">
                Explore my work <Arrow className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href={profile.resume} download className="inline-flex h-11 items-center gap-2 rounded-full border hairline px-5 font-mono text-[0.7rem] tracking-widest uppercase hover:border-amber hover:text-amber transition-colors focus-ring">
                Download résumé
              </a>
            </div>
          </m.div>
        </div>

        {/* right: globe plate — fixed aspect so nothing below shifts */}
        <m.div className="md:col-span-5 relative" initial={anim ? { opacity: 0, scale: 0.96 } : false} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease, delay: 0.3 }}>
          <div className="relative aspect-square w-full max-w-[560px] md:ml-auto rounded-3xl border hairline bg-ink-2/60 overflow-hidden">
            <div className="absolute inset-0">
              <Suspense fallback={null}>
                <Globe paused={!motion} accent={accent} dim={dim} />
              </Suspense>
            </div>
            <div className="pointer-events-none absolute inset-0 p-4 font-mono text-[0.62rem] tracking-[0.16em] uppercase text-mute">
              <div className="flex justify-between">
                <span>Fig. 001 / Orbital plot</span>
                <span className="text-amber">● Live</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <span>{profile.coords}</span>
                <span className="tabular-nums">TOR {time || '--:--:--'}</span>
              </div>
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-bone-2">+</span>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-bone-2">+</span>
              <span className="absolute bottom-10 left-1/2 -translate-x-1/2">Move to steer · {motion ? 'rotating' : 'paused'}</span>
            </div>
          </div>
        </m.div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl px-5 md:px-8">
        <div className="flex items-center justify-between border-t hairline pt-4 label">
          <span>{profile.legalName} · {profile.school}</span>
          <span className="hidden sm:inline">Scroll <span className="blink">▾</span></span>
        </div>
      </div>
    </section>
  )
}
