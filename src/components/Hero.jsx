import { useState } from "react";
import { hero, photos } from "../data/content";

// Accent words in the headline: emerald + deep gold, drawn from the
// portrait's own palette (green backdrop, warm gold tones).
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
  const [avatarOk, setAvatarOk] = useState(true);

  return (
    <section
      id="top"
      className="animate-fade-up relative overflow-hidden bg-base"
    >
      {/* Desktop: two-column split. Mobile/tablet: stacked (text on top,
          photo band below). The grid stretches so the photo column fills
          the full hero height on desktop. */}
      <div className="grid lg:min-h-[640px] lg:grid-cols-[55fr_45fr]">
        {/* LEFT — text on cream. */}
        <div className="flex flex-col justify-center px-6 pb-14 pt-32 sm:px-10 sm:pt-40 lg:px-16 lg:pb-20 lg:pt-36 xl:px-24">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-muted">
            <span className="inline-block h-2 w-2 rounded-full bg-gold" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 max-w-xl font-display text-[2.75rem] font-semibold leading-[1.05] text-ink sm:text-6xl lg:text-[4.25rem]">
            {renderHeadline(hero.headline)}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            {hero.sub}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
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

        {/* RIGHT — portrait, full-bleed. On desktop it fills the entire
            right side, flush to the top, right and bottom edges of the
            hero: no border, no rounded corners, no gap. On mobile it is
            a full-width band below the text. */}
        <div className="relative min-h-[420px] overflow-hidden bg-deepGreen sm:min-h-[480px] lg:min-h-0">
          {portraitOk && (
            <img
              src={photos.portrait.src}
              alt={photos.portrait.alt}
              width={1200}
              height={1800}
              onError={() => setPortraitOk(false)}
              // Face sits in the upper third of the photo: bias the crop
              // toward the top so the head is never cut off, at any width.
              className="photo-warm absolute inset-0 h-full w-full object-cover object-[50%_28%]"
            />
          )}
          {/* SEAMLESS MERGE — desktop (vertical seam): the cream side
              fades into the photo, with a soft deep-green shadow at the
              seam, so no hard edge is visible where photo meets text. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_right,#FAF7F0_0%,rgba(250,247,240,0.92)_10%,rgba(250,247,240,0)_32%)] lg:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(20,24,20,0.32)_0%,rgba(20,24,20,0)_16%)] lg:block"
          />
          {/* SEAMLESS MERGE — mobile/tablet (horizontal seam): the cream
              text block fades down into the photo band. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#FAF7F0_0%,rgba(250,247,240,0)_28%)] lg:hidden"
          />
          {/* SEAMLESS MERGE — bottom edge: the photo dissolves into the
              cream of the next section instead of ending in a hard line. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#FAF7F0_0%,rgba(250,247,240,0)_18%)]"
          />
          {/* Availability badge, tucked into the photo corner. */}
          {avatarOk && (
            <div className="absolute bottom-5 left-5 flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white py-1.5 pl-1.5 pr-4 shadow-card">
              <img
                src={photos.casual.src}
                alt={photos.casual.alt}
                width={32}
                height={32}
                onError={() => setAvatarOk(false)}
                className="h-8 w-8 rounded-full border border-line object-cover"
              />
              <span className="text-xs font-medium text-ink">
                Open to new projects — book a call
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
