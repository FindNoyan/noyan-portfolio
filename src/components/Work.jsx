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

function ProjectRow({ project, index, onHover, onFocus, onLeave }) {
  const { label, href } = rowLink(project);
  const number = String(index + 1).padStart(2, "0");
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${project.name} — open ${label.toLowerCase()}`}
      onMouseEnter={(e) => onHover(index, e)}
      onFocus={(e) => onFocus(index, e.currentTarget)}
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

// Cursor-following preview (Option 1, approved 2026-10-29). Fixed to the
// viewport and placed near the cursor, so it appears wherever the user
// hovers — including Cadence at the bottom of a scrolled page. This
// replaces the old row-relative absolute positioning, which measured
// against each row's own Reveal wrapper and always landed near the top
// of the list. Pointer-events none, transform and opacity only, so
// hovering never shifts page layout.
const PREVIEW_GAP = 24;
const PREVIEW_MARGIN = 16;
// Image is 392 x 245 (16/10); the gold VIEW badge overflows 28px to the
// right and 28px above it, so the full footprint is 420 wide and
// 273 tall, starting 28px above the element's top edge. Clamp that
// footprint, not just the image box, so the badge never clips either.
const BADGE_OVERFLOW = 28;
const PREVIEW_WIDTH = 392 + BADGE_OVERFLOW;
const PREVIEW_HEIGHT = 245 + BADGE_OVERFLOW;

// Place the card near (x, y) in viewport coordinates: right/below the
// cursor by default, flipped left/above when it would cross the right
// or bottom edge, then clamped so the whole footprint (badge included)
// stays at least PREVIEW_MARGIN inside the window.
function previewPosition(x, y) {
  const minLeft = PREVIEW_MARGIN;
  const maxLeft = window.innerWidth - PREVIEW_MARGIN - PREVIEW_WIDTH;
  // Element top = footprint top + badge overflow.
  const minTop = PREVIEW_MARGIN + BADGE_OVERFLOW;
  const maxTop =
    window.innerHeight - PREVIEW_MARGIN - PREVIEW_HEIGHT + BADGE_OVERFLOW;
  let left = x + PREVIEW_GAP;
  if (left > maxLeft) left = x - PREVIEW_GAP - PREVIEW_WIDTH;
  let top = y + PREVIEW_GAP + BADGE_OVERFLOW;
  if (top > maxTop) top = y - PREVIEW_GAP - PREVIEW_HEIGHT + BADGE_OVERFLOW;
  return {
    left: Math.max(minLeft, Math.min(left, maxLeft)),
    top: Math.max(minTop, Math.min(top, maxTop)),
  };
}

function HoverPreview({ project, x, y, visible }) {
  const { left, top } = previewPosition(x, y);
  return (
    <div
      aria-hidden="true"
      style={{ left, top }}
      className={`pointer-events-none fixed z-50 w-[392px] rotate-[1.5deg] transition-opacity duration-200 ${
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
  // x/y are viewport (client) coordinates: the cursor while hovering,
  // or the row centre for keyboard focus (which has no cursor).
  const [hover, setHover] = useState({ index: -1, x: 0, y: 0 });

  const handleHover = (index, e) => {
    if (!finePointer) return;
    setHover({ index, x: e.clientX, y: e.clientY });
  };

  // Keyboard focus has no cursor, so anchor the preview at the row
  // centre; previewPosition still flips/clamps it inside the viewport.
  const handleFocus = (index, el) => {
    if (!finePointer) return;
    const rect = el.getBoundingClientRect();
    setHover({
      index,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  const handleMove = (e) => {
    if (!finePointer) return;
    setHover((h) =>
      h.index >= 0 ? { ...h, x: e.clientX, y: e.clientY } : h,
    );
  };

  const handleLeave = () => setHover((h) => ({ ...h, index: -1 }));

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

      <div
        className="relative mt-10 border-t border-forest/15"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {/* Step 5: each work row gets its own Reveal so the list
            cascades as one unified system (matches the approved
            preview's reveal demo). The preview itself is fixed to the
            viewport and follows the cursor, so it is no longer
            positioned against this list container. */}
        {projects.map((project, index) => (
          <Reveal key={project.name}>
            <ProjectRow
              project={project}
              index={index}
              onHover={handleHover}
              onFocus={handleFocus}
              onLeave={handleLeave}
            />
          </Reveal>
        ))}
        {/* Desktop hover preview — only on fine-pointer devices. */}
        {finePointer && (
          <HoverPreview
            project={hovered}
            x={hover.x}
            y={hover.y}
            visible={hover.index >= 0}
          />
        )}
      </div>

      <Reveal>
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
