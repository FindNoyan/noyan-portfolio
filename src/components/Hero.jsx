import { useState } from "react";
import { hero, photos } from "../data/content";

// Accent words in the headline, tuned for the warm-sand hero background
// (sampled from the portrait's own sunlit wall so the photo blends in
// with no seam): emerald + deep gold keep large-text contrast on sand.
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
// seamless. Decorative only — the real H1 below carries the headline.
const MARQUEE_REPEATS = 4;

function MarqueeHalf() {
  return (
    <span className="flex w-max shrink-0 items-center">
      {Array.from({ length: MARQUEE_REPEATS }).map((_, i) => (
        <span
          key={i}
          className="whitespace-nowrap px-[0.3em] font-body text-[clamp(3.25rem,11vw,9rem)] font-extrabold uppercase leading-none tracking-tight text-forest"
        >
          {hero.marqueeName}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const [portraitOk, setPortraitOk] = useState(true);

  return (
    <section
      id="top"
      className="animate-fade-up relative flex min-h-[100svh] flex-col overflow-hidden bg-heroSand"
    >
      {/* DENNIS-STYLE HERO (Step 1 redesign): Noyan's own portrait, large
          and centered, on a flat warm-sand background sampled from the
          photo's sunlit wall — no masks, no gradient overlays, no
          text-shadow, no seam. The giant name marquee slides right-to-left
          behind the portrait in a transform-only loop. About still shows
          the same photo for now; it goes text-only in Step 3. */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pb-8 pt-20 sm:px-10">
        {/* Top row: eyebrow pill + "Located in Pakistan" pill. */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-muted">
            <span className="inline-block h-2 w-2 rounded-full bg-gold" />
            {hero.eyebrow}
          </p>
          <p className="inline-flex w-fit items-center rounded-full bg-ink px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-[#FAF7F0]">
            {hero.locationPill}
          </p>
        </div>

        {/* Portrait zone: centered portrait; role text at the side on
            desktop. The marquee breaks out full-bleed and sits behind the
            portrait's lower half. */}
        <div className="relative flex flex-1 items-center justify-center py-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[58%] z-0 w-screen -translate-x-1/2 -translate-y-1/2 select-none overflow-hidden"
          >
            <div className="hero-marquee-track flex w-max">
              <MarqueeHalf />
              <MarqueeHalf />
            </div>
          </div>
          <p className="absolute left-0 top-1/2 hidden w-44 -translate-y-1/2 text-sm font-medium uppercase leading-relaxed tracking-[0.18em] text-ink/70 lg:block">
            {hero.role}
          </p>
          {portraitOk && (
            <img
              src={photos.heroPortrait.src}
              alt={photos.heroPortrait.alt}
              width={1024}
              height={1536}
              loading="eager"
              fetchPriority="high"
              onError={() => setPortraitOk(false)}
              className="relative z-10 aspect-[2/3] h-[34svh] w-auto object-cover sm:h-[42svh] lg:h-[48svh]"
            />
          )}
        </div>

        {/* Role text on mobile: centered under the portrait. */}
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-ink/70 lg:hidden">
          {hero.role}
        </p>

        {/* Real H1 (SEO) + sub + CTAs. Centered, clear of the fixed
            chatbot button (bottom-right). */}
        <div className="mx-auto mt-4 w-full max-w-3xl text-center">
          <h1 className="font-display text-[clamp(1.9rem,4.6vw,3.25rem)] font-semibold leading-[1.08] text-ink">
            {renderHeadline(hero.headline)}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-[#3F443B] sm:text-lg">
            {hero.sub}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
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
      </div>
    </section>
  );
}
