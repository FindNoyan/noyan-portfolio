import { useState } from "react";
import { about, facts, photos } from "../data/content";
import Reveal from "./Reveal";

export default function About() {
  const [photoOk, setPhotoOk] = useState(true);

  return (
    <section id="about" className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
          About
        </p>
        <div className="mt-4 grid items-start gap-10 md:grid-cols-[240px_1fr_1fr]">
          {photoOk && (
            <figure className="mx-auto w-full max-w-[240px] md:mx-0">
              <img
                src={photos.portrait.src}
                alt={photos.portrait.alt}
                loading="lazy"
                width={480}
                height={720}
                onError={() => setPhotoOk(false)}
                className="aspect-[2/3] w-full rounded-xl border border-line object-cover shadow-card"
              />
              <figcaption className="mt-2 text-center text-xs text-muted">
                Noyan
              </figcaption>
            </figure>
          )}
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              {about.heading}
            </h2>
            {about.paragraphs.map((paragraph, i) => (
              <p key={i} className="mt-4 text-base leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
          <dl className="space-y-4 border-l border-line pl-6">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-xs text-cyan">{fact.label}</dt>
                <dd className="mt-1 text-sm text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
