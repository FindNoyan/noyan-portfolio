import { useState } from "react";
import { projects } from "../data/content";
import Reveal from "./Reveal";

// Interactive case studies — replaces static testimonials (approved
// mockup, 2026-11-20). Tabbed panels with Problem / What was built /
// Outcome, using only the real project data from content.js: no clients
// named, no metrics invented. Tab order follows the approved mockup
// (AutoFlow, LeadFlow, TaskLane) with Cadence added as the fourth tab —
// Cadence is part of the standing four-project lineup and must not be
// dropped from the site.
const TAB_ORDER = ["AutoFlow", "LeadFlow", "TaskLane", "Cadence"];

const orderedProjects = TAB_ORDER.map((name) =>
  projects.find((project) => project.name === name)
).filter(Boolean);

function CaseStudyPanel({ project }) {
  return (
    <div
      role="tabpanel"
      id={`case-study-${project.name}`}
      aria-label={`${project.name} case study`}
      className="mt-6 rounded-[20px] border border-line bg-white p-6 shadow-card sm:p-8"
    >
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h3 className="font-display text-2xl font-semibold text-forest sm:text-3xl">
          {project.name}
        </h3>
        <p className="text-sm text-forest/60">{project.category}</p>
        <span className="rounded-full border border-line bg-base px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald">
          {project.status}
        </span>
      </div>

      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-goldDeep">
            Problem
          </h4>
          <p className="mt-2 text-base leading-relaxed text-ink">
            {project.problem}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-goldDeep">
            Outcome
          </h4>
          <p className="mt-2 text-base leading-relaxed text-ink">
            {project.outcome}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-goldDeep">
          What was built
        </h4>
        <ul className="mt-3 space-y-2 text-base leading-relaxed text-ink">
          {project.built.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span aria-hidden="true" className="shrink-0 font-semibold text-gold">
                ✓
              </span>
              <span className="min-w-0 break-words">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white px-5 py-2.5 text-sm font-semibold text-forest transition-colors duration-200 hover:border-gold"
          >
            {link.label}
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const [active, setActive] = useState(orderedProjects[0]?.name ?? "");

  return (
    <div className="mt-16 sm:mt-20">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gold">
          Case Studies
        </p>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-forest sm:text-4xl">
          What each project actually does.
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Pick a project to see the problem it solves, what was built, and
          where it stands now — real projects only, no client stories made
          up for the page.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div
          role="tablist"
          aria-label="Case studies"
          className="mt-8 flex flex-wrap gap-2"
        >
          {orderedProjects.map((project) => {
            const selected = project.name === active;
            return (
              <button
                key={project.name}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`case-study-${project.name}`}
                onClick={() => setActive(project.name)}
                className={`focus-ring rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                  selected
                    ? "bg-forest text-white shadow-card"
                    : "border border-line bg-white text-forest hover:border-gold"
                }`}
              >
                {project.name}
              </button>
            );
          })}
        </div>

        {orderedProjects
          .filter((project) => project.name === active)
          .map((project) => (
            <CaseStudyPanel key={project.name} project={project} />
          ))}
      </Reveal>
    </div>
  );
}
