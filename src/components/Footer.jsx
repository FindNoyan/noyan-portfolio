import { calendly, footer, site, socials } from "../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-line/60 bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-10 text-center">
        <p className="font-display text-xl font-semibold text-ink sm:text-2xl">
          {footer.line}
        </p>
        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs text-muted">
            Built by {site.name} · {new Date().getFullYear()}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="rounded text-xs text-muted transition-colors hover:text-sunOrange focus-ring"
              >
                {social.label}
              </a>
            ))}
            <a
              href={calendly.href}
              target="_blank"
              rel="noreferrer"
              className="rounded text-xs font-medium text-[#C2410C] focus-ring"
            >
              {calendly.label}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
