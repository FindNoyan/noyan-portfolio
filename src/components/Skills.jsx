import { skillGroups } from "../data/content";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
          Toolbox
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
          What I work with
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="rounded-xl border border-line bg-elevated p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/50 hover:shadow-card"
            >
              <p className="font-mono text-xs text-violet">{group.label}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
