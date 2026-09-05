const PROJECTS = [
  {
    name: "AutoFlow",
    description:
      "Dashboard for monitoring automated workflows — runs, failures, and time saved, at a glance.",
    tags: ["Next.js", "Tailwind"],
    href: "https://github.com/FindNoyan/autoflow",
  },
  {
    name: "Tasklane",
    description:
      "A Kanban-style task manager for small teams, with boards, due dates, and activity history.",
    tags: ["Laravel", "Blade", "SQLite"],
    href: "https://github.com/FindNoyan/tasklane",
  },
  {
    name: "Cadence",
    description:
      "Marketing landing page for a scheduling-automation product — built for a fast first impression.",
    tags: ["HTML", "Tailwind", "JS"],
    href: "https://github.com/FindNoyan/cadence",
  },
];

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-4xl px-6 py-20">
      <h2 className="font-display text-2xl font-semibold text-ink">
        Selected work
      </h2>
      <div className="mt-8 divide-y divide-line border-y border-line">
        {PROJECTS.map((project) => (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col gap-2 py-6 transition-colors sm:flex-row sm:items-center sm:justify-between focus-ring rounded"
          >
            <div>
              <h3 className="font-display text-lg text-ink transition-colors group-hover:text-cyan">
                {project.name}
              </h3>
              <p className="mt-1 max-w-sm text-sm text-muted">
                {project.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
