import { useState } from "react";
import { hero, photos } from "../data/content";

// Accent words in the headline, tuned for the cream background below the
// hero: emerald + deep gold keep large-text contrast on cream.
const ACCENT_WORDS = {
  "get clients": "text-emerald",
  "automate work": "text-goldDeep",
};

function renderHeadline(headline) {
  const pattern = new RegExp(`(${Object.keys(ACCENT_WORDS).join("|")})`, "g");
  return headline.split(pattern).map((part, i) =>
    part in ACCENT_WORDS ? (
      <span key={i} className={ACCENT_WORDS[part]}>
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

// One identical half of the name-marquee track. The track renders two of
// these and the CSS animation slides it exactly -50%, so the loop is
// seamless. Decorative only — the H1 in the section below carries the
// page headline for SEO.
const MARQUEE_REPEATS = 4;

function MarqueeHalf() {
  return (
    <span className="flex w-max shrink-0 items-center">
      {Array.from({ length: MARQUEE_REPEATS }).map((_, i) => (
        <span
          key={i}
          className="whitespace-nowrap px-[0.3em] font-body text-[clamp(2.75rem,10vw,8rem)] font-extrabold uppercase leading-none tracking-tight text-forest"
        >
          {hero.marqueeName}
        </span>
      ))}
    </span>
  );
}

// Small diagonal arrow above the side role text (mockup detail).
// Inline SVG, not a text character.
function DiagonalArrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className="text-forest"
    >
      <path
        d="M3 15L15 3M15 3H6M15 3v9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Globe mark inside the location pill (mockup: globe in a light circle).
function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M1.5 8h13M8 1.5c-3.6 3.8-3.6 9.2 0 13 3.6-3.8 3.6-9.2 0-13z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

// "AI Automation & Business Development" -> ["AI Automation", "Business Development"]
function roleLines() {
  return hero.role.split(" & ");
}

export default function Hero() {
  const [cutoutOk, setCutoutOk] = useState(true);

  return (
    <>
      {/* DENNIS-STYLE HERO, visual zone (iteration 2, Issue #45, fix 6):
          this section fills the first screen under the floating pill nav
          and contains ONLY the portrait, the name marquee and the two
          side elements — like the agreed mockup. The H1 + sub + CTAs
          moved to the section directly below, which de-crams the hero. */}

      <section
        id="top"
        className="relative flex h-[100svh] min-h-[640px] flex-col overflow-hidden bg-base"
      >
        {/* Spacer clearing the fixed pill nav. */}
        <div className="h-20 shrink-0" aria-hidden="true" />

        {/* Portrait zone: takes all leftover height. */}
        <div className="relative min-h-0 flex-1">
          {/* Cutout portrait: fills the zone height, anchored bottom-center. */}
          <div className="absolute inset-x-0 bottom-0 top-16 flex justify-center lg:top-0">
            {cutoutOk && (
              <img
                src={photos.heroCutout.src}
                alt={photos.heroCutout.alt}
                width={704}
                height={1056}
                loading="eager"
                fetchPriority="high"
                onError={() => setCutoutOk(false)}
                className="h-full w-auto object-contain"
              />
            )}
          </div>

          {/* Name marquee: anchored to the zone bottom, in FRONT of the
              portrait's lower edge (z-20), sliding right-to-left. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-1/2 z-20 w-screen -translate-x-1/2 select-none overflow-hidden"
          >
            <div className="hero-marquee-track flex w-max">
              <MarqueeHalf />
              <MarqueeHalf />
            </div>
          </div>

          {/* Desktop side texts (mockup layout): pill LEFT, role RIGHT,
              both at mid height of the zone, never overlapping anything. */}
          <p className="absolute left-6 top-[34%] z-10 hidden items-center gap-2.5 rounded-full bg-forest py-1.5 pl-1.5 pr-5 text-sm font-medium text-[#FAF7F0] lg:inline-flex xl:left-10">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#9DBEA9] text-forest">
              <GlobeIcon />
            </span>
            {hero.locationPill}
          </p>
          <div className="absolute right-6 top-[34%] z-10 hidden text-right lg:block xl:right-10">
            <span className="mb-3 inline-block">
              <DiagonalArrow />
            </span>
            <p className="text-xl font-medium leading-snug text-forest">
              {roleLines().map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>

          {/* Mobile: pill + role stacked centered at the top of the zone
              (the portrait wrapper starts below them via top-16). */}
          <div className="absolute inset-x-0 top-1 z-10 flex flex-col items-center gap-2 px-6 lg:hidden">
            <p className="inline-flex items-center gap-2 rounded-full bg-forest py-1 pl-1 pr-4 text-xs font-medium text-[#FAF7F0]">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#9DBEA9] text-forest">
                <GlobeIcon />
              </span>
              {hero.locationPill}
            </p>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-forest/80">
              {hero.role}
            </p>
          </div>
        </div>
      </section>

      {/* Headline + CTAs (fix 6): the section directly below the visual
          hero. The H1 stays the page's single H1 (SEO unchanged) — same
          copy, same sub, same Calendly link on "Book a Call". */}
      <section className="bg-base">
        <div className="mx-auto w-full max-w-3xl px-6 py-16 text-center sm:px-10 sm:py-24">
          <h1 className="font-display text-[clamp(1.7rem,3.6vw,2.6rem)] font-semibold leading-[1.1] text-ink">
            {renderHeadline(hero.headline)}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-[#3F443B] sm:text-base">
            {hero.sub}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href={hero.primaryCta.href}
              {...(hero.primaryCta.external
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="bg-emerald rounded-full px-7 py-3.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-glow focus-ring"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="rounded-full border border-line bg-white px-7 py-3.5 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-emerald hover:text-emerald focus-ring"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
