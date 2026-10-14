import { contact, site, socials } from "../data/content";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-24">
      <div className="rounded-lg border border-line bg-surface px-8 py-14 text-center">
        <h2 className="font-display text-3xl font-semibold text-ink">
          {contact.heading}
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
          {contact.sub}
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-7 inline-block rounded-md bg-cyan px-6 py-3 text-sm font-medium text-base transition-opacity hover:opacity-90 focus-ring"
        >
          {site.email}
        </a>
        <div className="mt-8 flex justify-center gap-6">
          {socials.map((social) => (
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
