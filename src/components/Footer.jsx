import { calendly, footer, site, socials } from "../data/content";

export default function Footer() {
  return (
    <footer className="bg-forest">
      <div className="mx-auto max-w-6xl px-6 py-10 text-center">
        <p className="font-display text-xl font-semibold text-base sm:text-2xl">
          {footer.line}
        </p>
        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs text-base/70">
            Built by {site.name} · {new Date().getFullYear()}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="rounded text-xs text-base/70 transition-colors hover:text-goldLight focus-ring"
              >
                {social.label}
              </a>
            ))}
            <a
              href={calendly.href}
              target="_blank"
              rel="noreferrer"
              className="rounded text-xs font-medium text-goldLight focus-ring"
            >
              {calendly.label}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
