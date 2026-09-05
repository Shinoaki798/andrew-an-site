import { stackMarquee } from '../data/content'

/** Eight-spoked asterisk as SVG — the U+2733 glyph turns into a green emoji on iOS. */
function Spark() {
  return (
    <svg viewBox="0 0 24 24" className="h-[0.5em] w-[0.5em] text-amber" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1" />
    </svg>
  )
}

export function Marquee() {
  const row = (
    <div className="marquee-track" aria-hidden>
      {stackMarquee.map((s) => (
        <span key={s} className="display flex items-center gap-8 pr-8 text-[clamp(2rem,5vw,4.2rem)] font-medium whitespace-nowrap">
          {s} <Spark />
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
