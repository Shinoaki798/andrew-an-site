import { experience, profile } from '../data/content'
import { Arrow, Reveal, SectionHead, Tag } from './Shared'

export function Experience() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-36">
      <SectionHead id="experience" index="03" label="Experience" title={<>Leading.<br />Building.<br />Shipping.</>} lead={<>
        Hands-on engineering with real constraints: course deadlines, hardware limits, and clients who need to understand the thing.
        <a href={profile.resume} download className="mt-4 inline-flex items-center gap-2 label text-bone hover:text-amber transition-colors focus-ring">View full résumé <Arrow /></a>
      </>} />

      <ol className="mt-14 border-t hairline">
        {experience.map((e, i) => (
          <li key={e.index} className="border-b hairline">
            <Reveal delay={i * 0.04} className="grid gap-4 py-8 md:grid-cols-12 md:gap-6 md:py-10">
              <div className="md:col-span-3 flex items-baseline gap-4">
                <span className="font-mono text-xs text-amber">{e.index}</span>
                <span className="label text-bone-2">{e.when}</span>
              </div>
              <div className="md:col-span-6">
                <h3 className="display text-2xl font-medium md:text-3xl">{e.title}</h3>
                <p className="mt-1 text-bone-2">{e.org}</p>
                <p className="mt-4 text-[0.95rem] text-bone-2 leading-relaxed">{e.body}</p>
                <ul className="mt-3 space-y-1.5">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[0.95rem] text-bone-2 leading-relaxed"><span className="mt-[0.7em] h-px w-3 shrink-0 bg-amber" />{p}</li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-3 flex flex-wrap content-start gap-1.5 md:justify-end">
                {e.tags.map((t) => <Tag key={t}>{t}</Tag>)}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
