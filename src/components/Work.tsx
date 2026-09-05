import { useState } from 'react'
import { moreOnGithub, profile, projects, type Project } from '../data/content'
import { Diagram } from './Diagrams'
import { Arrow, Reveal, SectionHead, Tag } from './Shared'

const allTags = ['All', 'TypeScript', 'C', 'C++', 'Verilog', 'React 19', 'JavaScript']

export function Work() {
  const [filter, setFilter] = useState('All')
  const visible = projects.filter((p) => filter === 'All' || p.tags.some((t) => t === filter || t.startsWith(filter + ' ')))
  return (
    <section className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-36">
      <SectionHead id="work" index="01" label="Selected work" title={<>Rules, silicon,<br />and the space between.</>} lead={<>From a deterministic strategy engine headed for Steam down to a game running on bare FPGA hardware.</>} />

      <div className="mt-12 flex flex-wrap gap-2 min-h-8" role="tablist" aria-label="Filter projects">
        {allTags.map((t) => (
          <button key={t} role="tab" aria-selected={filter === t} onClick={() => setFilter(t)}
            className={`h-8 rounded-full border px-3.5 font-mono text-[0.66rem] tracking-widest uppercase transition-colors focus-ring ${filter === t ? 'border-amber bg-amber text-ink' : 'hairline text-bone-2 hover:border-amber hover:text-amber'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="card-grid mt-8 grid gap-4 md:grid-cols-2 min-h-[40rem]">
        {visible.map((p, i) => <Card key={p.slug} p={p} i={i} />)}
      </div>

      <Reveal className="mt-16 grid gap-6 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-4">
          <p className="label mb-3">Also on GitHub</p>
          <h3 className="display text-3xl font-medium">A closer look at how I build.</h3>
          <a href={profile.github} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 label text-bone hover:text-amber transition-colors focus-ring">
            More on GitHub <Arrow />
          </a>
        </div>
        <ul className="md:col-span-8 grid gap-px border hairline rounded-2xl overflow-hidden bg-line sm:grid-cols-2">
          {moreOnGithub.map((r) => (
            <li key={r.name} className="bg-ink">
              <a href={r.url} target="_blank" rel="noreferrer" className="group flex h-full min-h-[7rem] flex-col justify-between p-5 hover:bg-ink-2 transition-colors focus-ring">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-sm">{r.name}</span>
                  <Arrow className="text-mute group-hover:text-amber transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-bone-2 line-clamp-2">{r.desc}</p>
                  <p className="label mt-2 text-[0.6rem]">{r.lang}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

function Card({ p, i }: { p: Project; i: number }) {
  const Wrapper = p.link ? 'a' : 'article'
  const props = p.link ? { href: p.link, target: '_blank', rel: 'noreferrer' } : {}
  return (
    <Reveal delay={(i % 2) * 0.08} className={p.wide ? 'md:col-span-2' : ''}>
      <Wrapper {...props} className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border hairline bg-ink-2/50 transition-colors hover:border-amber/50 focus-ring ${p.wide ? 'md:grid md:grid-cols-12' : ''}`}>
        {/* diagram plate: fixed aspect, never dictates height */}
        <div className={`relative border-b hairline bg-ink-2 ${p.wide ? 'md:col-span-7 md:border-b-0 md:border-r aspect-[640/260] md:aspect-auto md:min-h-[22rem]' : 'aspect-[320/120]'}`}>
          <div className="absolute inset-0 p-4">
            <Diagram kind={p.diagram} />
          </div>
        </div>
        <div className={`flex flex-1 flex-col p-6 md:p-7 ${p.wide ? 'md:col-span-5' : ''}`}>
          <div className="flex items-center justify-between label">
            <span>{p.index} / {String(projects.length).padStart(2, '0')}</span>
            <span>{p.year}</span>
          </div>
          <p className="label mt-5 text-amber">{p.kicker}</p>
          <h3 className="display mt-2 text-[clamp(1.8rem,2.6vw,2.4rem)] font-medium flex items-start gap-2">
            {p.title}
            {p.link && <Arrow className="mt-2 shrink-0 text-mute group-hover:text-amber transition-colors" />}
          </h3>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-bone-2">{p.blurb}</p>
          {p.stats && (
            <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4 border-t hairline pt-5">
              {p.stats.map((s) => (
                <div key={s.label}>
                  <dt className="display text-3xl font-semibold text-amber tabular-nums">{s.value}</dt>
                  <dd className="label mt-1 normal-case tracking-wide text-[0.66rem]">{s.label}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="mt-auto flex flex-wrap gap-1.5 pt-6 min-h-[3.2rem]">
            {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        </div>
      </Wrapper>
    </Reveal>
  )
}
