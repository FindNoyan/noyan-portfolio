import { calendly, site, socials } from "../data/content";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-4xl border-t border-line/60 px-6 py-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-center text-xs text-muted">
          Built by {site.name} · {new Date().getFullYear()}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="rounded text-xs text-muted transition-colors hover:text-cyan focus-ring"
            >
              {social.label}
            </a>
          ))}
          <a
            href={calendly.href}
            target="_blank"
            rel="noreferrer"
            className="rounded text-xs font-medium text-cyan transition-opacity hover:opacity-80 focus-ring"
          >
            {calendly.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
