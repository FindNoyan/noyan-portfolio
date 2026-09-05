const SOCIALS = [
  { label: "GitHub", href: "https://github.com/FindNoyan" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/noyan-tanveer-0595152b6/" },
  { label: "Upwork", href: "https://www.upwork.com/freelancers/~0142802c1da34c8e5f" },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-24">
      <div className="rounded-lg border border-line bg-surface px-8 py-14 text-center">
        <h2 className="font-display text-3xl font-semibold text-ink">
          Let's build something.
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
          Open to freelance projects and long-term collaborations — reach out
          directly and I'll get back to you within a day.
        </p>
        <a
          href="mailto:noyantanveer35@gmail.com"
          className="mt-7 inline-block rounded-md bg-cyan px-6 py-3 text-sm font-medium text-base transition-opacity hover:opacity-90 focus-ring"
        >
          noyantanveer35@gmail.com
        </a>
        <div className="mt-8 flex justify-center gap-6">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted transition-colors hover:text-cyan focus-ring rounded"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
