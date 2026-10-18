
import { skillGroups } from "../data/content";

export default function Skills() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <h2 className="font-display text-2xl font-semibold text-ink">
        What I work with
      </h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.label} className="border-l border-line pl-6">
            <p className="font-mono text-xs text-violet">{group.label}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded border border-line px-2.5 py-1 text-sm text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

