import { about, facts } from "../data/content";
import Reveal from "./Reveal";

// Step 3 redesign: TEXT-ONLY About, matching the approved mockup. The
// portrait lives only in the hero now (single-photo rule) — the
// /noyan-about.jpg file itself stays in public/ until the Step 6 cleanup,
// because the hero cutout derives from it.
export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl border-t border-line px-6 py-20 sm:py-24"
    >
      <div className="grid gap-10 md:grid-cols-[1fr_340px] md:gap-14">
        <div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gold">
              04&nbsp;&middot;&nbsp;About
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
              {about.heading}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-muted">
              {about.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-2.5">
          {facts.map((fact, i) => (
            <Reveal key={fact.label} delay={i * 90}>
              <div className="rounded-xl border border-line bg-white px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-gold">
                  {fact.label}
                </p>
                <p className="mt-1 text-sm font-medium leading-snug text-ink">
                  {fact.value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
