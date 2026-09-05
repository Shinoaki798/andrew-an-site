import { profile } from '../data/content'
import { Arrow, Reveal } from './Shared'

export function Footer() {
  return (
    <footer id="contact" className="border-t hairline">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <p className="label mb-6">05 / Let’s talk</p>
          <a href={`mailto:${profile.email}`} className="display block text-[clamp(2.6rem,8vw,7.5rem)] font-semibold hover:text-amber transition-colors focus-ring">
            Say hello<span className="text-amber">.</span>
          </a>
          <p className="mt-6 max-w-lg text-lg text-bone-2">Open to internships and co-ops for 2027, and to interesting problems any time.</p>
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              ['Email', `mailto:${profile.email}`, profile.email],
              ['GitHub', profile.github, 'Shinoaki798'],
              ['LinkedIn', profile.linkedin, 'andrew-an'],
            ].map(([k, h, v]) => (
              <a key={k} href={h} target={h.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="group inline-flex items-center gap-2 font-mono text-sm hover:text-amber transition-colors focus-ring">
                <span className="label">{k}</span> {v} <Arrow className="text-mute group-hover:text-amber" />
              </a>
            ))}
          </div>
        </Reveal>
        <div className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t hairline pt-6 label">
          <span>© 2026 {profile.legalName}. Built with React 19, Vite and a hand-rolled contour algorithm.</span>
          <span>{profile.coords}</span>
        </div>
      </div>
    </footer>
  )
}
