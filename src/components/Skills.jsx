import { skillGroups } from "../data/content";
import Reveal from "./Reveal";

// Label colours with enough contrast on white.
const labelColors = [
  "text-royal",
  "text-[#C2410C]",
  "text-grape",
  "text-[#166534]",
];

export default function Skills() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <Reveal>
        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted">
          <span className="bg-gradient-sunset inline-block h-2 w-2 rounded-full" />
          Toolbox
        </p>
        <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
          What I work with
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <div
              key={group.label}
              className="rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sunOrange/50 hover:shadow-card"
            >
              <p
                className={`text-xs font-medium uppercase tracking-[0.14em] ${labelColors[i % labelColors.length]}`}
              >
                {group.label}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line bg-white px-2.5 py-1 text-xs text-muted"
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
