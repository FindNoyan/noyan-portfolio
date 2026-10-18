import { projects } from "../data/content";
import Reveal from "./Reveal";

function CaseStudy({ project, heroCard = false }) {
  const isLiveDemo = project.links.some((link) => link.label === "Live demo");
  return (
    <article
      className={`rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 sm:p-8 ${
        heroCard ? "lg:col-span-2" : ""
      }`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
          {project.name}
        </h3>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            isLiveDemo
              ? "bg-emerald text-white"
              : "border border-white/20 bg-white/5 text-zinc-300"
          }`}
        >
          {project.status}
        </span>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
        {project.description}
      </p>

      <dl className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium uppercase tracking-[0.14em] text-goldLight">
            Problem
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-zinc-400">
            {project.problem}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-[0.14em] text-goldLight">
            Solution
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-zinc-400">
            {project.solution}
          </dd>
        </div>
      </dl>

      <div className="mt-6">
        <h4 className="text-xs font-medium uppercase tracking-[0.14em] text-goldLight">
          What was built
        </h4>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-zinc-400">
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
              className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {project.links.map((link) =>
            link.label === "Live demo" ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald rounded-full px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-ring"
              >
                {link.label} →
              </a>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/50 focus-ring"
              >
                {link.label} →
              </a>
            )
          )}
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const [heroProject, ...rest] = projects;
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <Reveal>
        {/* Black rounded showcase container holding the case studies. */}
        <div className="rounded-[28px] bg-showcase px-5 py-10 shadow-card sm:rounded-[32px] sm:px-8 sm:py-12">
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            <span className="inline-block h-2 w-2 rounded-full bg-gold" />
            Selected work
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Case studies
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-400">
            Real projects — what problem each one solves, what was built, and
            where to see it.
          </p>
          {/* Bento: AutoFlow spans the full row, the other two share one. */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <CaseStudy project={heroProject} heroCard />
            {rest.map((project) => (
              <CaseStudy key={project.name} project={project} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
