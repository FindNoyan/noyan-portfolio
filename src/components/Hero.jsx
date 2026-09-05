import { useEffect, useState } from "react";

const LINES = [
  { prompt: "noyan@dev:~$", cmd: "whoami" },
  { out: "Full-stack developer & automation specialist" },
  { prompt: "noyan@dev:~$", cmd: "status --current" },
  { out: "Top Rated Plus on Upwork · open to new projects" },
];

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
  const typed = useTypedLines(LINES);

  return (
    <section id="top" className="mx-auto max-w-4xl px-6 pb-20 pt-16 sm:pt-24">
      <div className="grid gap-12 sm:grid-cols-[1.1fr_1fr] sm:items-center">
        <div>
          <p className="font-mono text-sm text-cyan">Full-stack developer</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Noyan builds web apps that run the busywork for you.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            I design and ship full-stack products — React, Next.js, Laravel —
            then wire up the automation underneath so teams spend less time
            on repetitive work.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#work"
              className="rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-base transition-opacity hover:opacity-90 focus-ring"
            >
              See my work
            </a>
            <a
              href="#contact"
              className="rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-cyan hover:text-cyan focus-ring"
            >
              Get in touch
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
            {LINES.map((line, i) => {
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
