# Noyan — Portfolio Site

Personal portfolio site built with React, Vite, and Tailwind CSS. Live at
**https://findnoyan.me** (custom domain connected via Vercel).

Positioning: Noyan helps businesses get clients and automate work with AI —
chatbots, workflow automation, and web solutions, delivered with a
development team.

## What's on the page

- Hero with clear positioning + calls to action (View my work, Book a call
  → Calendly)
- About (with photo), Services, and "What I work with" sections
- Case studies (Problem → Solution → What was built → Tech → links):
  - **AutoFlow** — automation dashboard, Next.js + Supabase. Live demo linked.
  - **TaskLane** — Laravel + Blade Kanban task manager. Code on GitHub.
  - **Cadence** — HTML/CSS/JS landing page with working signup validation. Code on GitHub.
- Contact form with client-side validation (opens the visitor's mail app —
  the page itself sends nothing)
- "Ask Noyan" chatbot (floating button): answers from portfolio content only — Gemini AI when configured, local FAQ fallback otherwise (see Chatbot below)

All copy lives in `src/data/content.js` — components import from there
instead of hardcoding text, so updates happen in one place.

## Tech stack

- React 19 + Vite
- Tailwind CSS

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build (outputs to dist/)
npm run preview  # preview the production build
```

## Deploy (Vercel)

1. Import the `FindNoyan/noyan-portfolio` repo in Vercel.
2. Framework preset: **Vite**. Build command `npm run build`, output directory
   `dist/` — both are Vercel's defaults for Vite, no custom config needed.
3. Connect the custom domain `findnoyan.me` in the Vercel project settings
   (Domains), and point the domain's DNS to Vercel as Vercel instructs.
4. Every push to `main` redeploys automatically.

## Chatbot — "Ask Noyan"

A floating chat button (bottom-right) lets visitors ask about services,
case studies, process, and booking a call. The bot is **Noyan's AI
assistant** — it never claims to be Noyan himself.

How it works:

- The browser calls same-origin `POST /api/chat` with `{ message }`.
  The frontend never calls Google directly and never sees any API key.
- `api/chat.js` is a Vercel Serverless Function. It reads
  `GEMINI_API_KEY` from the **server** environment only and calls the
  Gemini free-tier API (`gemini-2.0-flash`) with a system prompt that
  restricts answers strictly to this portfolio's real content. If a
  question goes beyond that content, the bot says it doesn't know and
  points to booking a call on Calendly — it never invents prices, years,
  clients, testimonials, or results.
- If `GEMINI_API_KEY` is **not** configured, the API answers
  `{ configured: false }` and the frontend falls back to a local
  rule-based FAQ matcher (`src/lib/chatFaq.js`) built from the same
  portfolio content. Fallback answers are labelled
  "Answered from portfolio info (AI not connected yet)."
- If the Gemini call **fails** for any reason (bad status, timeout,
  malformed response, quota, invalid key), the API falls back to the
  same local FAQ matcher and returns a portfolio answer labelled
  "Answered from portfolio info — AI is temporarily unavailable",
  and logs the Gemini status (only) to the Vercel Function logs.
  The chatbot never dead-ends on an AI failure. Validation (400)
  and rate-limit (429) errors still surface as real errors.
- Stateless: no chat history is stored, no database is used. Messages
  are capped at 500 characters; the API rate-limits to 10 messages per
  minute per IP (best-effort, per serverless instance).

To enable AI answers:

1. Get a free-tier Gemini API key yourself from Google AI Studio.
2. In Vercel → this project → Settings → Environment Variables, add
   `GEMINI_API_KEY` (Production) with your key, then redeploy.
3. Never paste the key into code, chat, or docs — only into Vercel.

## Photos

The Hero shows Noyan's wide hero image and the About section shows his
navy-polo photo. The site references:

- `public/noyan-hero-wide.webp.jpeg` — wide hero image (Hero): same man,
  black shirt + tie, right side, background blending warm cream #FAF7F0
  (left) to deep forest green #14382A (right) INSIDE the image. The seam
  is seamless because the image's own left edge is cream, identical to
  the text column background — no CSS blending is applied to the photo.
- `public/noyan-casual.jpg` — casual photo
- `public/noyan-about.jpg` — navy-blue polo shirt + glasses photo (About)

These are binary image files, so they are added to the repo via the
GitHub web UI (Add file → Upload files → `public/`), not via
automated text commits. **Exact filename matters:** the hero file is
`public/noyan-hero-wide.webp.jpeg` (double extension — `.webp.jpg`).
Do NOT rename it to `noyan-hero-wide.webp` or `noyan-hero-wide.webp.jpg`;
neither file exists and the hero image would break. **To finish the hero:** upload the wide
hero image as `public/noyan-hero-wide.webp.jpeg` (exact filename) via
the GitHub web UI, then Vercel redeploys automatically. Until it is
uploaded, the `<img>` tag hides itself gracefully instead of showing
a broken image. Use a reasonably optimised file (wide, ~1600px) and
keep the exact filename above so the reference resolves.

## Honesty note

This portfolio only shows real projects from Noyan's own repositories, with
no invented clients, testimonials, metrics, or prices. Where work was
delivered with a team, it is described that way. The AutoFlow AI chatbot is
marked "in progress" until it actually ships.
