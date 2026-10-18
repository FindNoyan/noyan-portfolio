# Noyan — Portfolio Site

Personal portfolio site built with React, Vite, and Tailwind CSS. Live at
**https://findnoyan.me** (custom domain connected via Vercel).

Positioning: Noyan helps businesses get clients and automate work with AI —
chatbots, workflow automation, and web solutions, delivered with a
development team.

## What's on the page

- Hero with clear positioning + calls to action (View my work, Book a call)
- About, Services, and "What I work with" sections
- Case studies (Problem → Solution → What was built → Tech → links):
  - **AutoFlow** — automation dashboard, Next.js + Supabase. Live demo linked.
  - **TaskLane** — Laravel + Blade Kanban task manager. Code on GitHub.
  - **Cadence** — HTML/CSS/JS landing page with working signup validation. Code on GitHub.
- Contact form with client-side validation (opens the visitor's mail app —
  the page itself sends nothing)

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

## Honesty note

This portfolio only shows real projects from Noyan's own repositories, with
no invented clients, testimonials, metrics, or prices. Where work was
delivered with a team, it is described that way. The AutoFlow AI chatbot is
marked "in progress" until it actually ships.
