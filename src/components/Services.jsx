import { services } from "../data/content";
import Reveal from "./Reveal";

// Step 3 redesign: compact bento matching the approved mockup — one large
// tile (first service) + two smaller tiles stacked in the second column.
// Every service: gold italic index, serif title, real description and real
// tag chips from content.js. Mobile: tiles stack full-width. Subtle
// desktop hover lift; light staggered scroll-reveal via Reveal.
function ServiceTile({ service, index, large }) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:p-7 ${
        large ? "sm:justify-center" : ""
      }`}
    >
      {/* Gold top accent like the mockup. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-6 top-0 h-[3px] rounded-b bg-gold"
      />
      <p
        aria-hidden="true"
        className="font-display text-base italic text-gold"
      >
        {number}
      </p>
      <h3 className="mt-2 font-display text-2xl font-semibold text-forest">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {service.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-forest/25 px-3 py-1 text-xs font-semibold text-emerald"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function Services() {
  const [first, ...rest] = services;

  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gold">
          03&nbsp;&middot;&nbsp;Services
        </p>
        <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
          What I do
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Reveal className="sm:row-span-2" delay={0}>
          <ServiceTile service={first} index={0} large />
        </Reveal>
        {rest.map((service, i) => (
          <Reveal key={service.title} delay={(i + 1) * 120}>
            <ServiceTile service={service} index={i + 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
