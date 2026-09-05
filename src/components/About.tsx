import { profile } from '../data/content'
import { Reveal, SectionHead } from './Shared'

export function About() {
  return (
    <section className="border-t hairline bg-ink-2/30">
      <div className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-36">
        <SectionHead id="about" index="04" label="A little about me" title={<>I like problems where<br />the hardware pushes back.</>} lead={<>Second-year Computer Engineering at U of T. Born in China, based in Oakville, most at home one abstraction layer below whatever I’m building.</>} />

        <div className="mt-14 grid gap-4 md:grid-cols-12">
          <Reveal className="md:col-span-7 rounded-2xl border hairline bg-ink p-7 md:p-9">
            <p className="text-lg leading-relaxed text-bone-2">
              I’m Andrew, also Junlei. Competition math and programming got me started; a Reversi bot that placed 3rd against 400 classmates convinced me that careful search beats clever guesses.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-bone-2">
              Since then I’ve written a 4X game in assembly for an FPGA board, led a team through a real-world map application, and spent this summer building Hegemony 2060: a strategy game whose engine is deterministic enough to replay any match from a seed, and whose hardest rule is that hidden information must never reach the client.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-bone-2">
              Off the keyboard I model in Blender, cut video in DaVinci, and read too many novels, which is why I built my own reader.
            </p>
          </Reveal>

          <div className="md:col-span-5 grid gap-4 content-start">
            <Reveal delay={0.05} className="rounded-2xl border hairline bg-ink p-6 flex gap-5 items-start min-h-[7.5rem]">
              <span className="display grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-amber text-ink text-xl font-semibold">UT</span>
              <div>
                <p className="font-medium">{profile.school}</p>
                <p className="text-sm text-bone-2 mt-0.5">{profile.degree}</p>
                <p className="label mt-3">MacLachlan College · OSSD · 2020–2024</p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="rounded-2xl border hairline bg-ink p-6 min-h-[7.5rem]">
              <p className="label">Algorithmic roots</p>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <p className="display text-3xl font-semibold text-amber">3rd</p>
                  <p className="text-sm text-bone-2">Reversi bot, 400+ cohort</p>
                </div>
                <div>
                  <p className="display text-3xl font-semibold text-amber">Club</p>
                  <p className="text-sm text-bone-2">Co-founded math & CP club</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="rounded-2xl border hairline bg-ink p-6 min-h-[7.5rem]">
              <p className="label">Languages</p>
              <ul className="mt-3 space-y-1.5 text-sm text-bone-2">
                <li className="flex justify-between"><span>Mandarin</span><span className="label">Native</span></li>
                <li className="flex justify-between"><span>English</span><span className="label">Professional</span></li>
                <li className="flex justify-between"><span>TypeScript · C · Verilog</span><span className="label">Fluent</span></li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
