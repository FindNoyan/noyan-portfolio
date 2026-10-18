import { useState } from "react";
import { brandName, brandTld, calendly, navLinks } from "../data/content";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="relative w-full max-w-2xl">
        <nav
          aria-label="Main"
          className="flex items-center justify-between gap-2 rounded-full border border-line bg-white/85 py-2 pl-5 pr-2 shadow-card backdrop-blur-md"
        >
          <a
            href="#top"
            className="rounded-full font-display text-lg font-bold text-ink focus-ring"
          >
            {brandName}
            <span className="text-emerald">.{brandTld}</span>
          </a>
          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-ink focus-ring"
              >
                {link.label}
              </a>
            ))}
            <a
              href={calendly.href}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald ml-1 rounded-full px-4 py-2 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-glow focus-ring"
            >
              Book a Call
            </a>
          </div>
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="rounded-full border border-line px-4 py-2 text-sm font-medium text-ink focus-ring md:hidden"
          >
            {menuOpen ? "✕" : "Menu"}
          </button>
        </nav>
        {/* Mobile menu panel */}
        {menuOpen && (
          <nav
            aria-label="Mobile"
            className="mt-2 rounded-3xl border border-line bg-white p-2 shadow-card md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-4 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-ink focus-ring"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={calendly.href}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald mt-1 rounded-2xl px-4 py-2.5 text-center text-sm font-medium text-white transition-opacity hover:opacity-90 focus-ring"
              >
                Book a Call
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
