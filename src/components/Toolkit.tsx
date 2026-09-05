import { useState } from 'react'
import { toolkit } from '../data/content'
import { Reveal, SectionHead } from './Shared'

export function Toolkit() {
  const [active, setActive] = useState(0)
  const cur = toolkit[active]
  return (
    <section className="border-t hairline bg-ink-2/30">
      <div className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-36">
        <SectionHead id="stack" index="02" label="The toolkit" title={<>Three layers.<br />One instinct.</>} lead={<>Whatever the layer, the question is the same: can someone predict what this system will do before it does it?</>} />

        <Reveal className="mt-14 grid gap-4 md:grid-cols-12">
          {/* layer selector — fixed row height */}
          <div className="md:col-span-5 grid gap-px rounded-2xl border hairline overflow-hidden bg-line" role="tablist" aria-label="Stack layers">
            {toolkit.map((t, i) => (
              <button key={t.layer} role="tab" aria-selected={active === i} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
                className={`flex h-24 items-center justify-between px-6 text-left transition-colors focus-ring ${active === i ? 'bg-ink-3' : 'bg-ink hover:bg-ink-2'}`}>
                <span className="flex items-center gap-4">
                  <span className={`font-mono text-xs ${active === i ? 'text-amber' : 'text-mute'}`}>{t.index}</span>
                  <span className="display text-3xl font-medium">{t.layer}</span>
                </span>
                <span className={`h-2 w-2 rounded-full transition-colors ${active === i ? 'bg-amber' : 'bg-line'}`} />
              </button>
            ))}
          </div>

          {/* detail plate — min height fixed so switching never reflows */}
          <div className="md:col-span-7 rounded-2xl border hairline bg-ink p-7 md:p-9 min-h-[19rem] flex flex-col">
            <div className="flex items-center justify-between label">
              <span>Silicon → Systems → Surfaces</span>
              <span className="text-amber">{cur.index} — 03</span>
            </div>
            <p className="display mt-6 text-[clamp(1.6rem,2.6vw,2.3rem)] font-medium">{cur.line}</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
              {cur.items.map((it) => (
                <li key={it} className="flex items-center gap-2 text-sm text-bone-2">
                  <span className="h-px w-3 bg-amber" />{it}
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-6 label">Applied in · <span className="text-bone-2 normal-case tracking-wide">{cur.applied}</span></p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
