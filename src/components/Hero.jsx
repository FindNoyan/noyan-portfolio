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
      className="animate-fade-up relative overflow-hidden bg-base"
    >
      {/* Layout: text on top, photo band below (mobile/tablet); on
          desktop the photo is absolutely positioned over the right side
          and overlaps the text column, so the mask fade dissolves the
          photo into the cream — no hard seam, no tint over the photo.
          The whole hero is exactly one viewport tall (100svh). */}
      <div className="flex min-h-[100svh] flex-col lg:block">
        {/* LEFT — text on cream. z-10 keeps it above the photo; the
            text itself ends before the photo’s fade zone begins. */}
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

        {/* RIGHT — portrait, full-bleed. The wrapper is transparent:
            the mask on the <img> dissolves the photo’s edges into the
            cream behind it. No overlay divs — nothing tints the photo,
            so it keeps its true colours right up to the fade.
            On mobile the photo is a compact band below the text;
            on desktop it fills the right 55%, flush to the top, right
            and bottom edges. Crop is Elora-style: head / shoulders /
            upper torso, face never cropped, hands out of frame. */}
        <div className="relative h-[30svh] max-h-[320px] min-h-[180px] overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:max-h-none lg:min-h-0 lg:w-[55%]">
          {portraitOk && (
            <img
              src={photos.portrait.src}
              alt={photos.portrait.alt}
              width={1200}
              height={1800}
              onError={() => setPortraitOk(false)}
              // Face sits in the upper third of the photo: bias the crop
              // toward the top so the head is never cut off, at any width.
              className="hero-photo-mask absolute inset-0 h-full w-full object-cover object-[50%_12%]"
            />
          )}
          {/* Book a Call, sitting on the photo’s lower area. Past the
              left fade zone on desktop (left-[32%]) so it rests on solid
              photo, not on the dissolve. Same Calendly link as the
              other Book a Call CTAs. */}
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
