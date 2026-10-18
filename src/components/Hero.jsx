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
      className="animate-fade-up relative min-h-[100svh] overflow-hidden bg-base"
    >
      {/* TRUE FULL-BLEED: ONE image fills the whole hero, and the text
          sits ON TOP of it. No split panels, no text-column background,
          no gradient overlays, no mask-image, no fade divs anywhere.
          The old split layout (flat-cream panel + photo) always showed
          a vertical join where cream met the photo; the CSS-fade
          attempts always left a grey-beige band (alpha-blending). The
          text reads directly off the image’s own cream left area, with
          only a soft cream text-shadow for legibility (see
          .hero-text-shadow in index.css). The whole hero is exactly one
          viewport tall (100svh). */}
      {heroOk && (
        <img
          src={photos.heroWide.src}
          alt={photos.heroWide.alt}
          width={1600}
          height={900}
          onError={() => setHeroOk(false)}
          // object-cover, full-bleed. Desktop: bias the crop toward
          // the LEFT (25%) so the image’s cream portion stays under
          // the text while the man’s face (right side) stays fully
          // visible. Mobile: bias toward the RIGHT (72%) so the face
          // stays in frame on narrow screens; the cream text-shadow
          // keeps the dark text legible over the blend zone.
          className="absolute inset-0 h-full w-full object-cover object-[72%_50%] lg:object-[25%_50%]"
        />
      )}

      {/* Text ON TOP of the image — NO background panel, NO card, NO
          cream div behind it. Constrained to the left ~50% on desktop
          so it sits over the image’s cream left area. */}
      <div className="hero-text-shadow relative z-10 flex min-h-[100svh] flex-col justify-center px-6 pb-8 pt-24 sm:px-10 lg:max-w-[55%] lg:px-16 lg:pb-10 lg:pt-24 xl:px-24">
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

      {/* Book a Call, resting on the photo’s green area (bottom-right).
          Same Calendly link as the other Book a Call CTAs. bottom-24
          keeps it clear of the fixed chatbot button. No
          “Open to new projects” pill — intentionally removed. */}
      <a
        href={hero.primaryCta.href}
        target="_blank"
        rel="noreferrer"
        className="bg-emerald absolute bottom-24 right-6 z-10 rounded-full px-5 py-2.5 text-sm font-medium text-white shadow-card transition-all hover:-translate-y-0.5 hover:opacity-90 focus-ring"
      >
        {hero.primaryCta.label}
      </a>
    </section>
  );
}
