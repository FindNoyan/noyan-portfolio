import { useEffect, useState } from "react";
import { projects } from "../data/content";
import Reveal from "./Reveal";

// Row link label shown on the right side of each row. Source URLs come
// from content.js only; these display labels match the approved mockups.
function rowLink(project) {
  const demo = project.links.find((link) => link.label === "Live demo");
  if (demo) return { label: "LIVE DEMO", href: demo.href };
  const code = project.links.find((link) => link.label === "Code");
  return { label: "GITHUB", href: code.href };
}

// true only on devices with a fine pointer that supports hover — the
// floating preview is disabled on touch screens.
function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFine(mq.matches);
    const onChange = (e) => setFine(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return fine;
}

function ProjectRow({ project, index, onHover, onLeave }) {
  const { label, href } = rowLink(project);
  const number = String(index + 1).padStart(2, "0");
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${project.name} — open ${label.toLowerCase()}`}
      onMouseEnter={(e) => onHover(index, e.currentTarget)}
      onFocus={(e) => onHover(index, e.currentTarget)}
      onMouseLeave={onLeave}
      onBlur={onLeave}
      className="focus-ring group relative block border-b border-forest/15 px-2 py-7 transition-colors duration-200 hover:bg-[#F3EDDD] sm:py-8 lg:rounded-md"
    >
      {/* Mobile: static thumbnail card above the name (approved mockup). */}
      <div className="mb-5 overflow-hidden rounded-2xl border border-forest/10 lg:hidden">
        <img
          src={project.preview.src}
          alt={project.preview.alt}
          width={project.preview.width}
          height={project.preview.height}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover object-top"
        />
      </div>

      <div className="flex items-center gap-6 sm:gap-7">
        <span
          aria-hidden="true"
          className="w-10 shrink-0 font-display text-lg italic text-gold"
        >
          {number}
        </span>
        <span className="min-w-0">
          <span className="block font-display text-[clamp(2rem,6vw,3.375rem)] font-semibold leading-none tracking-tight text-forest transition-colors duration-200 group-hover:text-emerald">
            {project.name}
          </span>
          <span className="mt-1.5 block text-sm text-forest/60">
            {project.category}
          </span>
        </span>
        <span className="flex-1" aria-hidden="true" />
        <span className="flex shrink-0 items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-emerald">
          <span aria-hidden="true" className="text-lg text-gold">
            ↗
          </span>
          {label}
        </span>
      </div>
    </a>
  );
}

// Desktop-only floating preview that follows the hovered row. Absolutely
// positioned over the list with pointer-events none — transform and
// opacity only, so hovering never shifts page layout.
function HoverPreview({ project, top, visible }) {
  return (
    <div
      aria-hidden="true"
      style={{ top }}
      className={`pointer-events-none absolute left-[52%] z-10 w-[392px] max-w-[42%] -translate-y-1/2 rotate-[1.5deg] transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative">
        <div className="overflow-hidden rounded-2xl shadow-card">
          {project && (
            <img
              key={project.name}
              src={project.preview.src}
              alt=""
              width={project.preview.width}
              height={project.preview.height}
              loading="lazy"
              className="animate-preview-in aspect-[16/10] w-full object-cover object-top"
            />
          )}
        </div>
        <span className="absolute -right-7 -top-7 flex h-[88px] w-[88px] -rotate-[8deg] items-center justify-center rounded-full bg-gold text-xs font-semibold tracking-[0.1em] text-forest shadow-card">
          VIEW&nbsp;↗
        </span>
      </div>
    </div>
  );
}

export default function Work() {
  const finePointer = useFinePointer();
  const [hover, setHover] = useState({ index: -1, top: 0 });

  const handleHover = (index, el) => {
    if (!finePointer) return;
    const list = el.parentElement;
    const listTop = list ? list.getBoundingClientRect().top : 0;
    const rect = el.getBoundingClientRect();
    setHover({ index, top: rect.top - listTop + rect.height / 2 });
  };

  const hovered = hover.index >= 0 ? projects[hover.index] : null;

  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gold">
          02&nbsp;&middot;&nbsp;Selected Projects
        </p>
        <h2 className="mt-4 font-display text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-none tracking-tight text-forest">
          Recent{" "}
          <em className="font-medium italic text-emerald">Work</em>
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-forest/60">
          Real projects — what problem each one solves, what was built, and
          where to see it.
        </p>
      </Reveal>

      <Reveal>
        <div className="relative mt-10 border-t border-forest/15">
          {projects.map((project, index) => (
            <ProjectRow
              key={project.name}
              project={project}
              index={index}
              onHover={handleHover}
              onLeave={() => setHover((h) => ({ ...h, index: -1 }))}
            />
          ))}
          {/* Desktop hover preview — only on fine-pointer devices. */}
          {finePointer && (
            <HoverPreview
              project={hovered}
              top={hover.top}
              visible={hover.index >= 0}
            />
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <a
            href="https://github.com/FindNoyan"
            target="_blank"
            rel="noreferrer"
            className="focus-ring flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-emerald"
          >
            <span aria-hidden="true" className="text-lg text-gold">
              ↗
            </span>
            Everything on GitHub
          </a>
        </div>
      </Reveal>
    </section>
  );
}
