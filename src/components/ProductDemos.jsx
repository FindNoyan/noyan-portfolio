import { useEffect, useRef, useState } from "react";
import { demos } from "../data/content";
import Reveal from "./Reveal";

// Runnable product demos — replaces static screenshots (approved mockup,
// 2026-11-20). Both demos are simulations over demo data, labelled as
// such on the page, with a link to the real live product. No invented
// metrics, prices, or timelines anywhere in the demo copy.
const STEP_DELAY_MS = 500;

function AutoFlowDemo() {
  const data = demos.autoflow;
  const [doneCount, setDoneCount] = useState(0);
  const [running, setRunning] = useState(false);
  const timers = useRef([]);

  const done = doneCount >= data.steps.length;

  // Clear pending timers on unmount so no setState runs after unmount.
  useEffect(
    () => () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
    },
    []
  );

  function run() {
    if (running) return;
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    setDoneCount(0);
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Reduced motion: show the finished log at once, no animation.
    if (reduce) {
      setDoneCount(data.steps.length);
      return;
    }
    setRunning(true);
    data.steps.forEach((_, index) => {
      timers.current.push(
        window.setTimeout(() => {
          setDoneCount(index + 1);
          if (index + 1 >= data.steps.length) setRunning(false);
        }, STEP_DELAY_MS * (index + 1))
      );
    });
  }

  return (
    <div className="flex flex-col rounded-[20px] border border-line bg-white p-6 shadow-card sm:p-8">
      <h3 className="font-display text-2xl font-semibold text-forest">
        {data.name}
      </h3>
      <p className="mt-2 text-base leading-relaxed text-muted">{data.blurb}</p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-goldDeep">
        {data.note}
      </p>

      <div
        aria-live="polite"
        className="mt-5 min-h-[13rem] flex-1 rounded-xl border border-line bg-base p-4 text-left"
      >
        {doneCount === 0 && !running && (
          <p className="text-sm text-muted">
            Press “{data.runLabel}” to see the demo run.
          </p>
        )}
        <ul className="space-y-2 text-sm leading-relaxed text-ink">
          {data.steps.slice(0, doneCount).map((step) => (
            <li key={step} className="flex gap-2.5">
              <span aria-hidden="true" className="shrink-0 font-semibold text-emerald">
                ✓
              </span>
              <span className="min-w-0 break-words">{step}</span>
            </li>
          ))}
          {running && doneCount < data.steps.length && (
            <li className="flex gap-2.5 text-muted">
              <span aria-hidden="true" className="shrink-0">
                …
              </span>
              <span>{data.steps[doneCount]}</span>
            </li>
          )}
        </ul>
        {done && (
          <p role="status" className="mt-4 text-sm font-semibold text-emerald">
            {data.doneLabel}
          </p>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={run}
          disabled={running}
          className="focus-ring rounded-full bg-emerald px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
        >
          {running
            ? data.runningLabel
            : done
              ? data.runAgainLabel
              : data.runLabel}
        </button>
        <a
          href={data.liveHref}
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white px-5 py-2.5 text-sm font-semibold text-forest transition-colors duration-200 hover:border-gold"
        >
          {data.liveLabel}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}

function matchAnswer(text) {
  const lower = text.toLowerCase();
  if (
    lower.includes("service") ||
    lower.includes("offer") ||
    lower.includes("do you do")
  ) {
    return demos.leadflow.answers.services;
  }
  if (
    lower.includes("long") ||
    lower.includes("timeline") ||
    lower.includes("take") ||
    lower.includes("fast")
  ) {
    return demos.leadflow.answers.timeline;
  }
  if (
    lower.includes("cost") ||
    lower.includes("price") ||
    lower.includes("much") ||
    lower.includes("charge")
  ) {
    return demos.leadflow.answers.pricing;
  }
  if (
    lower.includes("start") ||
    lower.includes("begin") ||
    lower.includes("first step")
  ) {
    return demos.leadflow.answers.start;
  }
  return demos.leadflow.fallback;
}

function LeadFlowDemo() {
  const data = demos.leadflow;
  const [messages, setMessages] = useState([
    {
      from: "assistant",
      text: "Hi — ask me about services, timelines, pricing, or how to start.",
    },
  ]);
  const [draft, setDraft] = useState("");

  function ask(text) {
    const question = text.trim();
    if (!question) return;
    setMessages((prev) => [
      ...prev,
      { from: "user", text: question },
      { from: "assistant", text: matchAnswer(question) },
    ]);
    setDraft("");
  }

  return (
    <div className="flex flex-col rounded-[20px] border border-line bg-white p-6 shadow-card sm:p-8">
      <h3 className="font-display text-2xl font-semibold text-forest">
        {data.name}
      </h3>
      <p className="mt-2 text-base leading-relaxed text-muted">{data.blurb}</p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-goldDeep">
        {data.note}
      </p>

      <div
        aria-live="polite"
        className="mt-5 flex min-h-[13rem] flex-1 flex-col justify-end gap-3 overflow-y-auto rounded-xl border border-line bg-base p-4 text-left"
      >
        {messages.map((message, index) => (
          <p
            key={`${message.from}-${index}`}
            className={`max-w-[92%] break-words rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
              message.from === "user"
                ? "self-end bg-emerald text-white"
                : "self-start bg-white text-ink shadow-card"
            }`}
          >
            {message.text}
          </p>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {data.suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => ask(suggestion)}
            className="focus-ring rounded-full border border-line bg-base px-3.5 py-1.5 text-xs font-semibold text-forest transition-colors duration-200 hover:border-gold"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <form
        className="mt-4 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          ask(draft);
        }}
      >
        <label htmlFor="leadflow-demo-input" className="sr-only">
          {data.placeholder}
        </label>
        <input
          id="leadflow-demo-input"
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={data.placeholder}
          className="min-w-0 flex-1 rounded-full border border-line bg-base px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
        <button
          type="submit"
          className="focus-ring shrink-0 rounded-full bg-emerald px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5"
        >
          {data.sendLabel}
        </button>
      </form>

      <div className="mt-5">
        <a
          href={data.liveHref}
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white px-5 py-2.5 text-sm font-semibold text-forest transition-colors duration-200 hover:border-gold"
        >
          {data.liveLabel}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}

export default function ProductDemos() {
  return (
    <section
      id="demos"
      aria-label="Product demos"
      className="mx-auto max-w-6xl px-6 py-20 sm:py-24"
    >
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gold">
          Product Demos
        </p>
        <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-tight tracking-tight text-forest">
          {demos.heading}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          {demos.sub}
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <AutoFlowDemo />
          <LeadFlowDemo />
        </div>
      </Reveal>
    </section>
  );
}
