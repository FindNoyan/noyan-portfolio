import { projects } from "../data/content";
import Reveal from "./Reveal";

function CaseStudy({ project }) {
  return (
    <Reveal>
      <article className="rounded-xl border border-line bg-elevated p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/50 hover:shadow-card sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="font-display text-xl text-ink sm:text-2xl">
            {project.name}
          </h3>
          <span className="rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 font-mono text-xs text-cyan">
            {project.status}
          </span>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          {project.description}
        </p>

        <dl className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-xs text-cyan">Problem</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted">
              {project.problem}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-cyan">Solution</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted">
              {project.solution}
            </dd>
          </div>
        </dl>

        <div className="mt-6">
          <h4 className="font-mono text-xs text-cyan">What was built</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted">
            {project.built.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded text-sm font-medium text-cyan transition-opacity hover:opacity-80 focus-ring"
              >
                {link.label} →
              </a>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
          Selected work
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
          Case studies
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Real projects — what problem each one solves, what was built, and
          where to see it.
        </p>
      </Reveal>
      <div className="mt-8 space-y-6">
        {projects.map((project) => (
          <CaseStudy key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
