import { useState } from "react";
import { hero, photos } from "../data/content";

// Accent words in the headline: emerald + deep gold, drawn from the
// portrait’s own palette (green backdrop, warm gold tones).
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

export default function Hero() {
  const [heroOk, setHeroOk] = useState(true);

  return (
    <section
      id="top"
      className="animate-fade-up relative overflow-hidden bg-base"
    >
      {/* Layout: text on top, photo band below (mobile/tablet); on
          desktop the photo is absolutely positioned over the right side
          and overlaps the text column. No CSS blending is applied to
          the photo at all: the cream-to-green blend is BAKED INTO the
          wide hero image itself, and the image's own left edge is
          cream (#FAF7F0), identical to the text column background, so
          the seam is seamless with zero blend effect. (The old CSS
          approach failed live: alpha-blending the deep-green photo
          over cream produced a grey-beige band.)
          The whole hero is exactly one viewport tall (100svh). */}
      <div className="flex min-h-[100svh] flex-col lg:block">
        {/* LEFT — text on cream. z-10 keeps it above the photo. */}
        <div className="relative z-10 flex flex-col justify-center px-6 pb-8 pt-24 sm:px-10 lg:min-h-[100svh] lg:w-[55%] lg:px-16 lg:pb-10 lg:pt-24 xl:px-24">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-muted">
            <span className="inline-block h-2 w-2 rounded-full bg-gold" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 max-w-xl font-display text-[clamp(2.25rem,4.2vw,3.9rem)] font-semibold leading-[1.05] text-ink">
            {renderHeadline(hero.headline)}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            {hero.sub}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
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

        {/* RIGHT — wide hero image, full-bleed. The wrapper is
            transparent and carries no blend effect — the photo is
            shown exactly as generated. On mobile the photo is a
            compact band below the text; on desktop it fills the
            right 55%, flush to the top, right and bottom edges.
            Crop is Elora-style: head / shoulders / upper torso,
            face never cropped, hands out of frame. The image is
            wide with the man on the right, so the crop anchors
            toward the right. */}
        <div className="relative h-[30svh] max-h-[320px] min-h-[180px] overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:max-h-none lg:min-h-0 lg:w-[55%]">
          {heroOk && (
            <img
              src={photos.heroWide.src}
              alt={photos.heroWide.alt}
              width={1600}
              height={900}
              onError={() => setHeroOk(false)}
              // The wide image has the man on the right: bias the crop
              // toward the right so the head is never cut off, at any width.
              className="absolute inset-0 h-full w-full object-cover object-[75%_50%]"
            />
          )}
          {/* Book a Call, sitting on the photo's lower area. Same
              Calendly link as the other Book a Call CTAs. */}
          <a
            href={hero.primaryCta.href}
            target="_blank"
            rel="noreferrer"
            className="bg-emerald absolute bottom-5 left-5 z-10 rounded-full px-5 py-2.5 text-sm font-medium text-white shadow-card transition-all hover:-translate-y-0.5 hover:opacity-90 focus-ring lg:left-[32%]"
          >
            {hero.primaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
