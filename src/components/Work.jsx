import { projects } from "../data/content";

function CaseStudy({ project }) {
  return (
    <article className="border-b border-line py-10">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-display text-xl text-ink">{project.name}</h3>
        <span className="font-mono text-xs text-cyan">{project.status}</span>
      </div>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
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
              className="rounded border border-line px-2.5 py-1 text-sm text-muted"
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
              className="text-sm font-medium text-cyan transition-opacity hover:opacity-80 focus-ring rounded"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-4xl px-6 py-20">
      <h2 className="font-display text-2xl font-semibold text-ink">
        Case studies
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
        Real projects — what problem each one solves, what was built, and
        where to see it.
      </p>
      <div className="mt-4 border-t border-line">
        {projects.map((project) => (
          <CaseStudy key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
