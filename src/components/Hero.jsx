import { useState } from "react";
import { hero, photos } from "../data/content";

// Accent words in the headline get the sunset gradient treatment.
const ACCENT_WORDS = ["get clients", "automate work"];

function renderHeadline(headline) {
  const pattern = new RegExp(`(${ACCENT_WORDS.join("|")})`, "g");
  return headline.split(pattern).map((part, i) =>
    ACCENT_WORDS.includes(part) ? (
      <span key={i} className="text-gradient-sunset">
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
      className="animate-fade-up mx-auto max-w-6xl px-6 pb-24 pt-32 text-center sm:pt-40"
    >
      <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-muted">
        <span className="bg-gradient-sunset inline-block h-2 w-2 rounded-full" />
        {hero.eyebrow}
      </p>
      <h1 className="mx-auto mt-6 max-w-4xl font-display text-[2.75rem] font-semibold leading-[1.05] text-ink sm:text-6xl lg:text-[4.25rem]">
        {renderHeadline(hero.headline)}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        {hero.sub}
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <a
          href={hero.primaryCta.href}
          {...(hero.primaryCta.external
            ? { target: "_blank", rel: "noreferrer" }
            : {})}
          className="bg-gradient-sunset rounded-full px-7 py-3.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-glow focus-ring"
        >
          {hero.primaryCta.label}
        </a>
        <a
          href={hero.secondaryCta.href}
          className="rounded-full border border-line bg-white px-7 py-3.5 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-sunOrange hover:text-sunOrange focus-ring"
        >
          {hero.secondaryCta.label}
        </a>
      </div>

      {/* Portrait anchor: the photo's dark green backdrop is echoed by
          the deep-green panel behind it, so nothing clashes. */}
      {portraitOk && (
        <div className="relative mx-auto mt-16 max-w-lg">
          <div
            aria-hidden="true"
            className="bg-gradient-sunset absolute -inset-6 rounded-[40px] opacity-25 blur-3xl"
          />
          <div className="relative rounded-[32px] bg-deepGreen p-3 shadow-card sm:p-4">
            <div className="overflow-hidden rounded-[24px]">
              <img
                src={photos.portrait.src}
                alt={photos.portrait.alt}
                width={480}
                height={720}
                onError={() => setPortraitOk(false)}
                className="aspect-[2/3] w-full object-cover"
              />
            </div>
            {/* Floating availability chip with the casual photo. */}
            {avatarOk && (
              <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white py-1.5 pl-1.5 pr-4 shadow-card">
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
      )}
    </section>
  );
}
