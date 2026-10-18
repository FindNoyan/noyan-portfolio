import { useState } from "react";
import { about, facts, photos } from "../data/content";
import Reveal from "./Reveal";

export default function About() {
  const [photoOk, setPhotoOk] = useState(true);

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <Reveal>
        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted">
          <span className="inline-block h-2 w-2 rounded-full bg-gold" />
          About
        </p>
        <div className="mt-6 grid items-start gap-10 md:grid-cols-[280px_1fr]">
          {photoOk && (
            <figure className="mx-auto w-full max-w-[280px] md:mx-0">
              <div className="rounded-2xl bg-forest p-1.5 shadow-card">
                <img
                  src={photos.portrait.src}
                  alt={photos.portrait.alt}
                  loading="lazy"
                  width={480}
                  height={720}
                  onError={() => setPhotoOk(false)}
                  className="photo-warm aspect-[2/3] w-full rounded-xl object-cover"
                />
              </div>
              <figcaption className="mt-2 text-center text-xs text-muted">
                Noyan
              </figcaption>
            </figure>
          )}
          <div>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              {about.heading}
            </h2>
            {about.paragraphs.map((paragraph, i) => (
              <p key={i} className="mt-4 text-base leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-2xl border border-line bg-surface p-4"
                >
                  <dt className="text-xs font-medium uppercase tracking-[0.14em] text-emerald">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
