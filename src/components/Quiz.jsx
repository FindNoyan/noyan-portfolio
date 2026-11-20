import { useState } from "react";
import { quiz, services, calendly } from "../data/content";

// Project-fit quiz — the first step of the contact section (approved
// mockup, 2026-11-20). Three questions, progress, back/restart, a
// tailored recommendation, an answers summary, and a copy button. The
// quiz never sends anything itself: Continue hands the visitor to the
// existing contact form with the answers + project type prefilled, so
// leads still go through the same Web3Forms flow.
const optionClass =
  "w-full rounded-xl border border-line bg-base px-4 py-3 text-left text-base text-ink transition-[border-color,background-color] duration-200 hover:border-gold hover:bg-white focus-ring sm:text-sm";
const ghostButtonClass =
  "rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-forest transition-colors duration-200 hover:border-gold focus-ring";
const primaryButtonClass =
  "w-full rounded-full bg-emerald px-6 py-4 text-base font-semibold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 focus-ring disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60";

function summaryLines(answers) {
  return quiz.questions.map((question) => {
    const answer = answers[question.id];
    return `${question.question} ${answer || "—"}`;
  });
}

export default function Quiz({ onComplete, onSkip }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [copied, setCopied] = useState(false);

  const total = quiz.questions.length;
  const finished = step >= total;
  const question = finished ? null : quiz.questions[step];
  const picked = question ? answers[question.id] : null;

  // Recommendation comes from Q1 only: the picked option names one of
  // the three real services.
  const needOption = quiz.questions[0].options.find(
    (option) => option.label === answers.need
  );
  const service = needOption
    ? services.find((item) => item.title === needOption.service)
    : null;

  function pick(option) {
    setAnswers((prev) => ({ ...prev, [question.id]: option.label }));
    setStep((prev) => prev + 1);
  }

  function goBack() {
    if (step === 0) return;
    setStep((prev) => prev - 1);
  }

  function restart() {
    setAnswers({});
    setCopied(false);
    setStep(0);
  }

  async function copyAnswers() {
    const lines = summaryLines(answers);
    if (service) lines.push(`Recommended service: ${service.title}`);
    const text = `My answers:\n${lines.map((line) => `- ${line}`).join("\n")}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
      return;
    } catch {
      // Clipboard API unavailable (older browsers, non-secure contexts):
      // fall back to a selectable textarea the visitor can copy by hand.
      const area = document.createElement("textarea");
      area.value = text;
      area.readOnly = true;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch {
        // Last resort: leave the text visible in the summary above.
      }
      document.body.removeChild(area);
    }
  }

  function continueToForm() {
    if (!needOption || !service) return;
    const message = `Quiz answers:\n${summaryLines(answers)
      .map((line) => `- ${line}`)
      .join("\n")}`;
    onComplete({ projectType: needOption.projectType, message });
  }

  return (
    <div className="rounded-[20px] border border-line bg-white p-6 shadow-card sm:p-8">
      {!finished && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gold">
            {quiz.heading}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{quiz.sub}</p>

          {/* Progress: transform/opacity-friendly width transition only. */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs font-semibold text-muted">
              <span>
                Question {step + 1} of {total}
              </span>
              <span>{Math.round(((step + 1) / total) * 100)}%</span>
            </div>
            <div
              className="mt-2 h-1.5 overflow-hidden rounded-full bg-line"
              role="progressbar"
              aria-valuenow={step + 1}
              aria-valuemin={1}
              aria-valuemax={total}
              aria-label={`Question ${step + 1} of ${total}`}
            >
              <div
                className="h-full rounded-full bg-emerald transition-[width] duration-300"
                style={{ width: `${((step + 1) / total) * 100}%` }}
              />
            </div>
          </div>

          <fieldset className="mt-6">
            <legend className="text-left text-lg font-semibold text-forest">
              {question.question}
            </legend>
            <div className="mt-4 space-y-3">
              {question.options.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => pick(option)}
                  aria-pressed={picked === option.label}
                  className={optionClass}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              className={`${ghostButtonClass} disabled:cursor-not-allowed disabled:opacity-40`}
            >
              {quiz.backLabel}
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="text-sm font-semibold text-emerald underline-offset-4 hover:underline focus-ring"
            >
              {quiz.skipLabel}
            </button>
          </div>
        </div>
      )}

      {finished && service && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gold">
            {quiz.resultHeading}
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold leading-snug text-forest sm:text-3xl">
            {service.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-muted">
            {service.description}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {quiz.resultIntro}
          </p>

          <ul className="mt-5 space-y-2 rounded-xl border border-line bg-base p-4 text-left text-sm text-ink">
            {summaryLines(answers).map((line) => (
              <li key={line} className="break-words">
                {line}
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={continueToForm}
              className={primaryButtonClass}
            >
              {quiz.continueLabel}
            </button>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <button
                type="button"
                onClick={copyAnswers}
                className="text-sm font-semibold text-emerald underline-offset-4 hover:underline focus-ring"
              >
                {copied ? quiz.copiedLabel : quiz.copyLabel}
              </button>
              <button
                type="button"
                onClick={restart}
                className="text-sm font-semibold text-emerald underline-offset-4 hover:underline focus-ring"
              >
                {quiz.restartLabel}
              </button>
              <a
                href={calendly.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-emerald underline-offset-4 hover:underline focus-ring"
              >
                {quiz.bookLabel}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
