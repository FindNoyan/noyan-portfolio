import { services } from "../data/content";

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-4xl px-6 py-20">
      <h2 className="font-display text-2xl font-semibold text-ink">
        What I do
      </h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        {services.map((service) => (
          <div key={service.title} className="border-l border-line pl-6">
            <h3 className="font-display text-lg text-ink">{service.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {service.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-line px-2.5 py-1 text-sm text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
