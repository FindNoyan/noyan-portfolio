import { services } from "../data/content";
import Reveal from "./Reveal";

// Solid accent blocks, one per service card.
const accents = ["bg-forest", "bg-emerald", "bg-goldDeep"];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <Reveal>
        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted">
          <span className="inline-block h-2 w-2 rounded-full bg-gold" />
          Services
        </p>
        <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
          What I do
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald/50 hover:shadow-card"
            >
              <span
                aria-hidden="true"
                className={`flex h-11 w-11 items-center justify-center rounded-xl font-display text-lg font-bold text-white ${accents[i % accents.length]}`}
              >
                {service.title.charAt(0)}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line bg-white px-2.5 py-1 text-xs text-muted"
                  >
                    {tag}
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
