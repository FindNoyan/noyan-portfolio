// Local rule-based FAQ matcher — fallback when the Gemini API key is
// not configured. Answers ONLY from the portfolio content in
// src/data/content.js. Pure function (no network, no secrets) so the
// chatbot still works on the live site without an API key.
//
// Returns { reply, matched } — matched=false means "don't know", and
// the caller should point the visitor to the Contact section.

import { services, projects, site, socials } from "../data/content.js";

const CONTACT_HINT =
  "You can book a call via the Contact section on this page, or email Noyan at " +
  site.email +
  ".";

function includesAny(text, words) {
  return words.some((word) => text.includes(word));
}

export function answerLocalFaq(rawMessage) {
  const text = (rawMessage || "").toLowerCase();

  if (
    includesAny(text, [
      "service",
      "offer",
      "what do you do",
      "what can you",
      "help with",
    ])
  ) {
    const list = services
      .map((service) => `- ${service.title}: ${service.description}`)
      .join("\n");
    return {
      matched: true,
      reply: `Noyan offers:\n${list}\n\n${CONTACT_HINT}`,
    };
  }

  if (includesAny(text, ["autoflow", "automation dashboard", "dashboard"])) {
    const project = projects.find((item) => item.name === "AutoFlow");
    return {
      matched: true,
      reply:
        `AutoFlow — ${project.description} ` +
        `${project.solution} Live demo: ${project.links[0].href}. ` +
        `Note: its AI chatbot is still in progress — not yet shipped.`,
    };
  }

  if (includesAny(text, ["tasklane", "kanban", "task manager"])) {
    const project = projects.find((item) => item.name === "TaskLane");
    return {
      matched: true,
      reply:
        `TaskLane — ${project.description} ` +
        `${project.solution} Code on GitHub: ${project.links[0].href}. ` +
        `There is no live demo for TaskLane.`,
    };
  }

  if (includesAny(text, ["cadence", "landing page", "scheduling"])) {
    const project = projects.find((item) => item.name === "Cadence");
    return {
      matched: true,
      reply:
        `Cadence — ${project.description} ` +
        `${project.solution} Code on GitHub: ${project.links[0].href}. ` +
        `There is no live demo for Cadence.`,
    };
  }

  if (
    includesAny(text, [
      "project",
      "work",
      "portfolio",
      "case stud",
      "built",
      "show me",
    ])
  ) {
    const list = projects
      .map(
        (project) =>
          `- ${project.name} (${project.status}): ${project.description}`
      )
      .join("\n");
    return {
      matched: true,
      reply: `Recent projects:\n${list}\n\nAsk me about any of them by name for details.`,
    };
  }

  if (
    includesAny(text, [
      "book",
      "call",
      "contact",
      "email",
      "hire",
      "start",
      "process",
      "how do i",
      "work with",
    ])
  ) {
    return {
      matched: true,
      reply:
        `To start a project, tell Noyan about your business and what you ` +
        `want automated via the Contact section — he gets back within a ` +
        `day. The form opens your mail app with your message prefilled. ` +
        `Direct email: ${site.email}.`,
    };
  }

  if (
    includesAny(text, [
      "price",
      "pricing",
      "cost",
      "charge",
      "rate",
      "fee",
      "how much",
      "timeline",
      "how long",
      "deadline",
    ])
  ) {
    return {
      matched: true,
      reply:
        `I don't have pricing or timeline info — those depend on the ` +
        `project. ${CONTACT_HINT}`,
    };
  }

  if (
    includesAny(text, [
      "who are you",
      "about",
      "yourself",
      "experience",
      "background",
      "skill",
      "tool",
      "stack",
    ])
  ) {
    return {
      matched: true,
      reply:
        `Noyan works in business development for AI and web projects: he ` +
        `talks to clients, scopes the work, and keeps delivery on track ` +
        `with the developers who build it. His focus is AI automation, ` +
        `chatbots, web solutions, and lead generation — and he builds his ` +
        `own demos like AutoFlow so you can see how the automation works ` +
        `before committing.`,
    };
  }

  if (includesAny(text, ["social", "github", "linkedin", "upwork"])) {
    const list = socials
      .map((social) => `${social.label}: ${social.href}`)
      .join("\n");
    return { matched: true, reply: `Find Noyan here:\n${list}` };
  }

  if (includesAny(text, ["hi", "hello", "hey", "salam", "assalam"])) {
    return {
      matched: true,
      reply:
        `Hi! Ask me about Noyan's services, his projects (AutoFlow, ` +
        `TaskLane, Cadence), or how to book a call.`,
    };
  }

  return {
    matched: false,
    reply:
      `I don't have that info — ${CONTACT_HINT}`,
  };
}
