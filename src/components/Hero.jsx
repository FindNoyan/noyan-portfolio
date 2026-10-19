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
  const [portraitOk, setPortraitOk] = useState(true);

  return (
    <section
      id="top"
      className="animate-fade-up relative min-h-[100svh] overflow-hidden bg-base"
    >
      {/* SPLIT HERO (revert): text LEFT on a SOLID cream column, the
          REAL original portrait RIGHT. No full-bleed overlay, no text
          on top of the image, no text-shadow halo — the full-bleed
          version caused text-shadow complaints on iPhone, an on-photo
          button overlapping "View My Work" on mobile, and the on-photo
          button colliding with the fixed chatbot button on desktop.
          The seam uses a soft cream gradient confined to the seam zone
          only (vertical on desktop, horizontal on mobile). No
          mask-image — it caused the grey-beige wash band. */}
      <div className="flex min-h-[100svh] flex-col lg:flex-row">
        {/* Text column: SOLID cream. Buttons live here only — no
            on-photo button anywhere in the hero. */}
        <div
          className={`flex flex-col justify-center bg-base px-6 pb-8 pt-24 sm:px-10 lg:max-w-[55%] lg:px-16 lg:pb-10 lg:pt-24 xl:px-24 ${
            portraitOk ? "" : "lg:max-w-none"
          }`}
        >
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

        {/* Photo column: the REAL original portrait (black shirt +
            tie, green background). No on-photo button, no pill. */}
        {portraitOk && (
          <div className="relative min-h-[30svh] flex-1 overflow-hidden lg:min-h-[100svh]">
            <img
              src={photos.portrait.src}
              alt={photos.portrait.alt}
              width={1200}
              height={1800}
              onError={() => setPortraitOk(false)}
              // object-cover; bias toward the upper third (28%) where
              // the head sits, so the face stays fully visible.
              className="absolute inset-0 h-full w-full object-cover object-[50%_28%]"
            />
            {/* Seam blend, confined to the seam zone only: a soft
                cream gradient at the photo’s left edge on desktop
                (where it meets the text column) and at its top edge
                on mobile (where it meets the text above). No bottom
                fade — the earlier bottom fade washed over the
                pants/hands. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-base to-transparent lg:block lg:w-40"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 block h-16 bg-gradient-to-b from-base to-transparent lg:hidden"
            />
          </div>
        )}
      </div>
    </section>
  );
}
