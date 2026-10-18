// Vercel Serverless Function: POST /api/chat
// Secure backend for the "Ask Noyan" chatbot.
//
// - The Gemini API key is read from the server environment variable
//   GEMINI_API_KEY ONLY. It is never sent to the browser, never
//   committed, and never appears in this file or any frontend code.
// - If GEMINI_API_KEY is not configured, this endpoint answers with
//   { configured: false } and the frontend falls back to a local,
//   rule-based FAQ matcher built from the same portfolio content.
// - Stateless: no chat history is stored, no database is used.
//
// Knowledge below mirrors src/data/content.js (services, case studies,
// process, contact). Keep the two in sync when portfolio copy changes.

const MODEL = "gemini-2.0-flash";
const MAX_MESSAGE_CHARS = 500;
const MAX_OUTPUT_TOKENS = 300;
const TIMEOUT_MS = 20000;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 10;

// Best-effort per-IP rate limiting (per serverless instance).
const rateLimit = new Map();

const KNOWLEDGE = `
You are "Ask Noyan", the chatbot on Noyan's personal portfolio site
(https://findnoyan.me). Answer ONLY from the facts below. If a question
goes beyond these facts, say you don't know and point the visitor to
Book a Call / the Contact section. NEVER invent prices, years of
experience, clients, testimonials, metrics, results, or availability.

Who Noyan is:
- Noyan works in business development for AI and web projects: he talks
  to clients, scopes the work, and keeps delivery on track with the
  developers who build it.
- Focus: the workflow behind the product — lead generation, follow-ups,
  and repetitive work that used to run on spreadsheets.
- He also builds his own demos and MVPs (like AutoFlow) so visitors can
  see how the automation works before committing to a project.
- Currently studying Web Development at Virtual University.
- How he works: business development + delivery with a development team.
- Open to new client projects — book a call.

Services:
1. AI Chatbots & Automation — Chatbots and automations that answer
   customers, follow up on leads, and take over repetitive work — n8n,
   Zapier, and custom integrations.
2. Web Solutions — Web apps and sites scoped, specced, and shipped with
   a development team — React, Next.js, Laravel, and Shopify, matched
   to what the project actually needs.
3. Lead Generation — Finding the right prospects and starting the right
   conversations — research, outreach, and follow-up systems that keep
   the pipeline full.

What he works with: AI chatbots, n8n, Zapier, workflow design, React,
Next.js, Laravel, Shopify, lead research, outreach, CRM / HubSpot,
follow-up systems, GitHub, Vercel, Supabase, Figma.

Case studies (real projects only):
1. AutoFlow (live demo: https://autoflow-dashboard-eight.vercel.app/)
   - Automation dashboard that shows every workflow, its status, and
     its recent runs in one place.
   - Problem: teams run automations but can't see which ones failed or
     why — failures surface late, in screenshots and spreadsheets.
   - Solution: a dashboard where each signed-in user sees only their
     own workflows and runs, with a clear status for every workflow.
   - Built: sign-up / log-in / log-out with Supabase Auth; per-user
     workflows, runs, and chat history tables with row-level security;
     dashboard reads real data from the database; demo data loads only
     on an explicit click; AI chatbot in progress — not yet shipped.
   - Tech: Next.js, Supabase, Tailwind.
2. TaskLane (code on GitHub: https://github.com/FindNoyan/tasklane-app)
   - A Kanban-style task manager for small teams, with boards, due
     dates, and task editing.
   - Problem: small teams lose track of tasks across chats and
     spreadsheets — no single board for what is due and what is done.
   - Solution: a Kanban board where a team can create boards, add tasks
     with due dates, and edit them in one place.
   - Built: Board and Task models with full create, read, and update
     flow; task descriptions and validation errors shown on the board;
     due-date handling on tasks.
   - Tech: Laravel, Blade, SQLite. No live demo — code on GitHub only.
3. Cadence (code on GitHub: https://github.com/FindNoyan/cadence-landing)
   - Marketing landing page for a scheduling-automation product — built
     for a fast first impression.
   - Problem: a scheduling-automation product needs a landing page
     that earns a signup in seconds — most visitors bounce before
     reading anything.
   - Solution: a fast, single-page landing with a clear headline and a
     signup form that tells visitors immediately what to do.
   - Built: signup form with inline validation, error states, and
     success state; accessible form styles with visible focus states.
   - Tech: HTML, Tailwind, JS. No live demo — code on GitHub only.

Process / how to start:
- Tell Noyan about your business and what you want automated via the
  Contact section (Book a Call). He gets back within a day.
- The contact form opens the visitor's mail app with the message
  prefilled — the page itself sends nothing.

Contact:
- Email: noyantanveer35@gmail.com
- GitHub: https://github.com/FindNoyan
- LinkedIn: https://www.linkedin.com/in/noyan-tanveer-0595152b6/
- Upwork: https://www.upwork.com/freelancers/~0142802c1da34c8e5f

Rules:
- Keep answers short (2-4 sentences) and conversational.
- Do NOT state or guess prices, timelines, years of experience, client
  names, testimonials, or results. If asked, say pricing/timelines
  depend on the project and to book a call for a quote.
- Do NOT claim the AutoFlow AI chatbot is shipped — it is in progress.
- Do NOT claim TaskLane or Cadence have live demos — they are code
  on GitHub only.
- If unsure, say: "I don't have that info — please book a call via
  the Contact section and Noyan will answer."
`;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimit.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + RATE_LIMIT_WINDOW_MS;
  }
  entry.count += 1;
  rateLimit.set(ip, entry);
  return entry.count <= RATE_LIMIT_MAX;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const ip =
    req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      error: "Too many messages — please wait a minute and try again.",
    });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Invalid JSON body." });
    }
  }

  const message = typeof body?.message === "string" ? body.message.trim() : "";
  if (!message) {
    return res.status(400).json({ error: "Please type a message." });
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    return res.status(400).json({
      error: `Please keep your message under ${MAX_MESSAGE_CHARS} characters.`,
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // No key configured — frontend uses the local FAQ fallback.
    return res.status(200).json({ configured: false, reply: null });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: KNOWLEDGE }] },
          contents: [{ role: "user", parts: [{ text: message }] }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: MAX_OUTPUT_TOKENS,
          },
        }),
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      return res.status(502).json({
        error: "The AI service is unavailable right now — please try again later.",
      });
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    if (!reply) {
      return res.status(502).json({
        error: "I couldn't generate an answer — please try again.",
      });
    }
    return res.status(200).json({ configured: true, reply, source: "ai" });
  } catch {
    return res.status(502).json({
      error: "The AI service timed out — please try again.",
    });
  } finally {
    clearTimeout(timeout);
  }
}
