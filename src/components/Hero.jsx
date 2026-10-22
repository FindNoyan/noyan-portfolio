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
          className="whitespace-nowrap px-[0.3em] font-body text-[clamp(4rem,15vw,18rem)] font-extrabold uppercase leading-none tracking-tight text-forest"
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
      width="20"
      height="20"
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

// Warm sand sampled from the agreed Dennis mockup (median #F8E8CF; brief
// value ≈ #E7D9BE): soft radial warmth — light where the portrait sits,
// deepening to the sand tone at the edges — so the cutout never looks
// pasted on. The rest of the page keeps the cream base.
const HERO_BG =
  "radial-gradient(120% 95% at 50% 12%, #F8E9CF 0%, #F0DFBA 58%, #E7D9BE 100%)";

export default function Hero() {
  const [cutoutOk, setCutoutOk] = useState(true);

  return (
    <>
      {/* DENNIS-STYLE HERO, visual zone (iteration 2, Issue #45): this
          section fills the first screen under the floating pill nav and
          contains ONLY the portrait, the name marquee and the two side
          elements — like the agreed mockup. The H1 + sub + CTAs live in
          the section directly below (fix 6), which is what finally lets
          the portrait be large. */}
      <section
        id="top"
        className="relative h-[100svh] min-h-[640px] overflow-hidden"
        style={{ background: HERO_BG }}
      >
        {/* Portrait (fix 1): the PERSON fills ~85% of the hero height on
            desktop (~70% on mobile), anchored to the hero's bottom edge;
            the lower body is cropped there by the section's
            overflow-hidden. Head starts near the top, like the mockup.
            (The cutout file carries ~8% transparent headroom, so the
            wrapper is 93% / 76% to land the person at 85% / 70%.) */}
        <div className="absolute inset-x-0 bottom-0 flex h-[76%] justify-center lg:h-[93%]">
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

        {/* Name marquee (fix 2): lives in the BOTTOM band of the hero only.
            Translated down so ~25% of the letter height falls below the
            hero's bottom edge and is cropped there. Slides horizontally
            only — the band never rises into the side-text zone. In front
            of the portrait's lower body (z-20), like the mockup. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 translate-y-[25%] select-none overflow-hidden"
        >
          <div className="hero-marquee-track flex w-max">
            <MarqueeHalf />
            <MarqueeHalf />
          </div>
        </div>

        {/* Desktop side elements (mockup layout). Fix 5: the "Located in
            Pakistan" pill sits LEFT at waist level (~57% of hero height).
            Fix 3: the role text sits RIGHT in the mid band (~46%), at
            30px, fully clear of the marquee band at every animation
            frame — the band's top edge stays well below both. */}
        <p className="absolute left-6 top-[57%] z-10 hidden items-center gap-2.5 rounded-full bg-forest py-1.5 pl-1.5 pr-5 text-sm font-medium text-[#FAF7F0] lg:inline-flex xl:left-10">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#9DBEA9] text-forest">
            <GlobeIcon />
          </span>
          {hero.locationPill}
        </p>
        <div className="absolute right-6 top-[46%] z-10 hidden text-right lg:block xl:right-10">
          <span className="mb-3 inline-block">
            <DiagonalArrow />
          </span>
          <p className="text-[30px] font-medium leading-snug text-forest">
            {roleLines().map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        {/* Mobile: pill + role stacked centered near the top — clear of
            the 70%-height portrait and the bottom marquee band, and never
            overlapping each other. */}
        <div className="absolute inset-x-0 top-24 z-10 flex flex-col items-center gap-2 px-6 lg:hidden">
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
