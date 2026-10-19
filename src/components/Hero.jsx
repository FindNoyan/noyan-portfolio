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
      {/* SPLIT HERO: text LEFT on a SOLID cream column, Noyan’s OWN
          self-made hero image RIGHT. No full-bleed overlay, no text
          on top of the image, no text-shadow halo — the full-bleed
          version caused text-shadow complaints on iPhone, an on-photo
          button overlapping "View My Work" on mobile, and the on-photo
          button colliding with the fixed chatbot button on desktop.
          NO seam gradient / fade / mask-image on the photo: the
          cream-to-green blend is baked into Noyan’s own image, and
          the earlier seam gradient + mask caused a grey-beige wash
          band over the photo. */}
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

        {/* Photo column: Noyan’s OWN hero image (tight zoom, face
            large, cream left blending to green right). No on-photo
            button, no pill, no overlay of any kind. */}
        {portraitOk && (
          <div className="relative min-h-[30svh] flex-1 overflow-hidden lg:min-h-[100svh]">
            <img
              src={photos.hero.src}
              alt={photos.hero.alt}
              width={1200}
              height={1800}
              onError={() => setPortraitOk(false)}
              // object-cover; the face sits on the RIGHT side of the
              // source image with hair touching the top edge, so
              // anchor right (75%) and slightly above center (25%)
              // so the head stays fully visible, never cropped.
              className="absolute inset-0 h-full w-full object-cover object-[75%_25%]"
            />
          </div>
        )}
      </div>
    </section>
  );
}
