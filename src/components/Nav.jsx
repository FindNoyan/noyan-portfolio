import { useState } from "react";
import { brandName, brandTld, navLinks, socials } from "../data/content";

export default function Nav() {
  const upwork = socials.find((social) => social.label === "Upwork");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-base/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="rounded font-mono text-sm text-ink focus-ring"
        >
          {brandName}
          <span className="text-cyan">.</span>
          {brandTld}
        </a>
        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded text-sm text-muted transition-colors hover:text-ink focus-ring"
            >
              {link.label}
            </a>
          ))}
          <a
            href={upwork.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-line px-3 py-2 text-sm text-ink transition-colors hover:border-cyan hover:text-cyan focus-ring"
          >
            Hire me
          </a>
        </div>
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="rounded-md border border-line px-3 py-2 text-sm text-ink focus-ring md:hidden"
        >
          {menuOpen ? "✕" : "Menu"}
        </button>
      </nav>
      {/* Mobile menu panel */}
      {menuOpen && (
        <nav className="border-t border-line/60 px-6 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded px-2 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-ink focus-ring"
              >
                {link.label}
              </a>
            ))}
            <a
              href={upwork.href}
              target="_blank"
              rel="noreferrer"
              className="mt-1 rounded-md border border-line px-3 py-2.5 text-center text-sm text-ink transition-colors hover:border-cyan hover:text-cyan focus-ring"
            >
              Hire me
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
