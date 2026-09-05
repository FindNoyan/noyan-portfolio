export default function Nav() {
  const links = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-base/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm text-ink focus-ring rounded">
          noyan<span className="text-cyan">.</span>dev
        </a>
        <div className="flex items-center gap-7">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-ink focus-ring rounded"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.upwork.com/freelancers/~0142802c1da34c8e5f"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-line px-3 py-1.5 text-sm text-ink transition-colors hover:border-cyan hover:text-cyan focus-ring"
          >
            Hire me
          </a>
        </div>
      </nav>
    </header>
  );
}
