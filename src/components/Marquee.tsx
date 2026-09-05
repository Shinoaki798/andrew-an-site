import { stackMarquee } from '../data/content'

export function Marquee() {
  const row = (
    <div className="marquee-track" aria-hidden>
      {stackMarquee.map((s) => (
        <span key={s} className="display flex items-center gap-8 pr-8 text-[clamp(2rem,5vw,4.2rem)] font-medium whitespace-nowrap">
          {s} <span className="text-amber text-[0.55em]">✳</span>
        </span>
      ))}
    </div>
  )
  return (
    <div className="border-y hairline py-5 bg-ink-2/40">
      <p className="label mx-auto max-w-7xl px-5 md:px-8 mb-3">Built across the stack</p>
      <div className="marquee">
        {row}
        {row}
      </div>
    </div>
  )
}
