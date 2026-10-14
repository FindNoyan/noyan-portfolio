import { about, facts } from "../data/content";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-6 py-20">
      <div className="grid gap-10 sm:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">
            {about.heading}
          </h2>
          {about.paragraphs.map((paragraph, i) => (
            <p key={i} className="mt-4 text-base leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>
        <dl className="space-y-4 border-l border-line pl-6">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="font-mono text-xs text-cyan">{fact.label}</dt>
              <dd className="mt-1 text-sm text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
