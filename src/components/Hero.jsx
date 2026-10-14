import { useEffect, useState } from "react";
import { hero, heroLines } from "../data/content";

function useTypedLines(lines, speed = 28, lineDelay = 350) {
  const [rendered, setRendered] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const completed = [];

    async function run() {
      for (const line of lines) {
        if (cancelled) return;
        const text = line.cmd ?? line.out;
        let current = "";
        for (const char of text) {
          if (cancelled) return;
          current += char;
          setRendered([...completed, current]);
          await new Promise((r) => setTimeout(r, speed));
        }
        completed.push(current);
        setRendered([...completed]);
        await new Promise((r) => setTimeout(r, lineDelay));
      }
    }
    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return rendered;
}

export default function Hero() {
  const typed = useTypedLines(heroLines);

  return (
    <section id="top" className="mx-auto max-w-4xl px-6 pb-20 pt-16 sm:pt-24">
      <div className="grid gap-12 sm:grid-cols-[1.1fr_1fr] sm:items-center">
        <div>
          <p className="font-mono text-sm text-cyan">{hero.eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            {hero.sub}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={hero.primaryCta.href}
              className="rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-base transition-opacity hover:opacity-90 focus-ring"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-cyan hover:text-cyan focus-ring"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-line bg-surface p-5 font-mono text-[13px] leading-relaxed shadow-[0_0_40px_-15px_rgba(79,216,232,0.35)]">
          <div className="mb-3 flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
          </div>
          <div className="min-h-[110px] space-y-1.5">
            {heroLines.map((line, i) => {
              const value = typed[i];
              if (value === undefined) return null;
              return line.cmd ? (
                <p key={i} className="text-muted">
                  <span className="text-violet">{line.prompt}</span> {value}
                </p>
              ) : (
                <p key={i} className="text-cyan">
                  {value}
                </p>
              );
            })}
            <span className="inline-block h-3.5 w-1.5 animate-pulse bg-cyan align-middle" />
          </div>
        </div>
      </div>
    </section>
  );
}
