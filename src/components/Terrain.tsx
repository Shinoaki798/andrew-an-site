import { useEffect, useRef } from 'react'
import { DEFAULTS, Field, render, type Palette } from '../art/isoline'

type Props = { paused: boolean; palette: Palette }

/** Isoline Drift — canvas component. Fills its parent; parent must be position:relative with a fixed aspect. */
export default function Terrain({ paused, palette }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)
  const pointer = useRef<{ x: number; y: number } | null>(null)
  const smooth = useRef<{ x: number; y: number } | null>(null)
  const pal = useRef(palette)
  pal.current = palette
  const pausedRef = useRef(paused)
  pausedRef.current = paused

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const field = new Field(DEFAULTS)
    let w = 0, h = 0, dpr = 1
    let raf = 0
    let t = 0
    let last = performance.now()

    const fit = () => {
      const r = canvas.parentElement!.getBoundingClientRect()
      w = Math.max(1, Math.round(r.width)); h = Math.max(1, Math.round(r.height))
      dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px'
      field.resize(w, h)
      draw(0)
    }
    const draw = (dt: number) => {
      if (!pausedRef.current) t += dt
      // pointer eases toward target so the terrain breathes rather than snaps
      const tgt = pointer.current
      if (tgt) {
        const s = smooth.current ?? { x: tgt.x, y: tgt.y }
        s.x += (tgt.x - s.x) * 0.12; s.y += (tgt.y - s.y) * 0.12
        smooth.current = s
      } else if (smooth.current) {
        smooth.current = null
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      render(ctx, field, w, h, t, smooth.current, pal.current)
    }
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      draw(dt)
      raf = requestAnimationFrame(loop)
    }

    const ro = new ResizeObserver(fit)
    ro.observe(canvas.parentElement!)
    fit()
    raf = requestAnimationFrame(loop)

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      pointer.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onLeave = () => { pointer.current = null }
    const host = canvas.parentElement!
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf); ro.disconnect()
      host.removeEventListener('pointermove', onMove); host.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 block" aria-hidden />
}
