import { footer, site, socials } from "../data/content";
import Reveal from "./Reveal";

// Step 4 redesign: dark forest footer strip matching the approved mockups —
// real tagline, "© 2026 Noyan", LinkedIn + GitHub (real links from
// content.js), and a gold BACK TO TOP link. Footer links brighten to gold
// on hover. Gentle one-time scroll reveal via the existing system.
const footerSocialLabels = ["LinkedIn", "GitHub"];

export default function Footer() {
  const links = footerSocialLabels
    .map((label) => socials.find((social) => social.label === label))
    .filter(Boolean);

  return (
    <footer className="bg-forest">
      <Reveal className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
        <p className="font-display text-xl font-semibold text-base sm:text-2xl">
          {footer.line}
        </p>
        <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-base/70">
            &copy; {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {links.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="rounded text-sm text-base/70 transition-colors hover:text-goldLight focus-ring"
              >
                {social.label}
              </a>
            ))}
          </div>
          <a
            href="#top"
            className="rounded text-xs font-semibold uppercase tracking-[0.14em] text-goldLight transition-colors hover:text-gold focus-ring"
          >
            Back to top <span aria-hidden="true">&uarr;</span>
          </a>
        </div>
      </Reveal>
    </footer>
  );
}
