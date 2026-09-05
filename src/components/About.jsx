const FACTS = [
  { label: "Focus", value: "Full-stack web apps + AI-powered automation" },
  { label: "Currently", value: "Studying Web Development at Virtual University" },
  { label: "Freelance", value: "Top Rated Plus on Upwork (top 3%)" },
  { label: "Agency", value: "Founder, Automation Consulting Services" },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-6 py-20">
      <div className="grid gap-10 sm:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">
            About
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            I'm a full-stack developer who ended up specializing in the part
            most people skip: the workflow behind the product. I build the
            app, then automate the parts of the business that used to run on
            spreadsheets and manual follow-ups. Most of my work lives across
            React, Next.js, Laravel, and Shopify — whatever the project
            actually calls for.
          </p>
        </div>
        <dl className="space-y-4 border-l border-line pl-6">
          {FACTS.map((fact) => (
            <div key={fact.label}>
              <dt className="font-mono text-xs text-cyan">{fact.label}</dt>
              <dd className="mt-1 text-sm text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
