// Central content for the portfolio.
// Single source of truth: components import from there instead of
// hardcoding copy, so updates happen in one place.

export const brandName = "noyan";
export const brandTld = "me";

export const site = {
  name: "Noyan",
  title: "Noyan — AI Automation, Chatbots & Web Solutions",
  description:
    "Noyan helps businesses get clients and automate work with AI — chatbots, workflow automation, and web solutions, delivered with a development team.",
  url: "https://findnoyan.me",
  email: "noyantanveer35@gmail.com",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/FindNoyan" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/noyantanveer/" },
  { label: "Upwork", href: "https://www.upwork.com/freelancers/~0142802c1da34c8e5f" },
];

// Book-a-call destination (Calendly), provided by Noyan. All "Book a call"
// CTAs point here and open in a new tab.
export const calendly = {
  label: "Book a call",
  href: "https://calendly.com/noyantanveer35/30min",
};

export const hero = {
  eyebrow: "AI automation & business development",
  headline: "I help businesses get clients + automate work with AI.",
  sub: "I find the right chatbot, automation, and web solution for your business — and work with a development team to ship it — so your team spends less time on repetitive work and more time closing clients.",
  // Emerald primary CTA first ("Book a Call"), secondary ("View My Work").
  primaryCta: { label: "Book a Call", href: calendly.href, external: true },
  secondaryCta: { label: "View My Work", href: "#work" },
};

export const about = {
  heading: "About",
  paragraphs: [
    "I work in business development for AI and web projects: I talk to clients, scope the work, and keep delivery on track with the developers who build it. My focus is the part most projects skip — the workflow behind the product: lead generation, follow-ups, and the repetitive work that used to run on spreadsheets.",
    "I also build my own demos and MVPs — like AutoFlow below — so you can see exactly how the automation works before committing to a project.",
  ],
};

export const facts = [
  { label: "Focus", value: "AI automation, chatbots & web solutions" },
  { label: "Currently", value: "Studying Web Development at Virtual University" },
  { label: "How I work", value: "Business development + delivery with a development team" },
  { label: "Open to", value: "New client projects — book a call" },
];

export const services = [
  {
    title: "AI Chatbots & Automation",
    description:
      "Chatbots and automations that answer customers, follow up on leads, and take over repetitive work — n8n, Zapier, and custom integrations.",
    tags: ["AI chatbots", "n8n", "Zapier"],
  },
  {
    title: "Web Solutions",
    description:
      "Web apps and sites scoped, specced, and shipped with a development team — React, Next.js, Laravel, and Shopify, matched to what the project actually needs.",
    tags: ["React", "Next.js", "Laravel", "Shopify"],
  },
  {
    title: "Lead Generation",
    description:
      "Finding the right prospects and starting the right conversations — research, outreach, and follow-up systems that keep the pipeline full.",
    tags: ["Research", "Outreach", "CRM"],
  },
];

export const skillGroups = [
  {
    label: "Automation & AI",
    items: ["AI chatbots", "n8n", "Zapier", "Workflow design"],
  },
  {
    label: "Web",
    items: ["React", "Next.js", "Laravel", "Shopify"],
  },
  {
    label: "Growth",
    items: ["Lead research", "Outreach", "CRM / HubSpot", "Follow-up systems"],
  },
  {
    label: "Tools",
    items: ["GitHub", "Vercel", "Supabase", "Figma"],
  },
];

// Case studies: real projects only. Each one states the problem it solves,
// what was built, and where to see it. No invented metrics, clients, or URLs.
export const projects = [
  {
    name: "AutoFlow",
    status: "Live demo",
    description:
      "Automation dashboard that shows every workflow, its status, and its recent runs in one place.",
    problem:
      "Teams run automations but can’t see which ones failed or why — failures surface late, in screenshots and spreadsheets.",
    solution:
      "A dashboard where each signed-in user sees only their own workflows and runs, with a clear status for every workflow.",
    built: [
      "Sign-up / log-in / log-out with Supabase Auth",
      "Per-user workflows, runs, and chat history tables with row-level security",
      "Dashboard reads real data from the database; demo data loads only on an explicit click",
      "AI chatbot in progress — not yet shipped",
    ],
    tags: ["Next.js", "Supabase", "Tailwind"],
    links: [
      { label: "Live demo", href: "https://autoflow-dashboard-eight.vercel.app/" },
      { label: "Code", href: "https://github.com/FindNoyan/autoflow-dashboard" },
    ],
  },
  {
    name: "TaskLane",
    status: "Code on GitHub",
    description:
      "A Kanban-style task manager for small teams, with boards, due dates, and task editing.",
    problem:
      "Small teams lose track of tasks across chats and spreadsheets — no single board for what is due and what is done.",
    solution:
      "A Kanban board where a team can create boards, add tasks with due dates, and edit them in one place.",
    built: [
      "Board and Task models with full create, read, and update flow",
      "Task descriptions and validation errors shown on the board",
      "Due-date handling on tasks",
    ],
    tags: ["Laravel", "Blade", "SQLite"],
    links: [
      { label: "Code", href: "https://github.com/FindNoyan/tasklane-app" },
    ],
  },
  {
    name: "Cadence",
    status: "Code on GitHub",
    description:
      "Marketing landing page for a scheduling-automation product — built for a fast first impression.",
    problem:
      "A scheduling-automation product needs a landing page that earns a signup in seconds — most visitors bounce before reading anything.",
    solution:
      "A fast, single-page landing with a clear headline and a signup form that tells visitors immediately what to do.",
    built: [
      "Signup form with inline validation, error states, and success state",
      "Accessible form styles with visible focus states",
    ],
    tags: ["HTML", "Tailwind", "JS"],
    links: [
      { label: "Code", href: "https://github.com/FindNoyan/cadence-landing" },
    ],
  },
];

export const contact = {
  heading: "Let’s build something.",
  sub: "Tell me about your business and what you want automated — I’ll get back to you within a day.",
  calendly: {
    label: "Book a call on Calendly",
    href: "https://calendly.com/noyantanveer35/30min",
  },
  projectTypes: [
    "AI Chatbot / Automation",
    "Web App / Website",
    "Lead Generation",
    "Something else",
  ],
  form: {
    nameLabel: "Your name",
    emailLabel: "Email",
    projectTypeLabel: "Project type",
    messageLabel: "Message",
    messagePlaceholder:
      "Tell me about your project — what you need, and when you need it.",
    submitLabel: "Send message",
    note: "Your message is sent directly — no mail app needed.",
    success:
      "Your mail app should have opened with your message ready to send.",
    errors: {
      name: "Please enter your name.",
      emailRequired: "Please enter your email.",
      emailInvalid: "Please enter a valid email address.",
      messageRequired: "Please write a short message.",
      messageTooShort: "Please write a little more — at least 10 characters.",
    },
  },
};

export const photos = {
  // Real photos of Noyan. The image files live in public/ and are
  // added to the repo via the GitHub web UI (binary upload) — see README
  // "Photos" section. Until they are added, the <img> tags hide
  // themselves gracefully (onError) instead of showing a broken image.
  // Hero photo: Noyan’s OWN self-made hero image (tight Elora-style
  // zoom: face large, hair touching the top edge, cream left blending
  // to green right). Uploaded by Noyan via the GitHub web UI. The
  // cream-to-green blend is baked into the image itself, so the hero
  // applies NO gradient overlay / fade / mask to the photo.
  hero: {
    src: "/noyan-hero.jpeg",
    alt: "Portrait of Noyan in a black shirt and tie, smiling, on the right side of a wide hero image blending cream to deep green.",
  },
  // Mobile hero photo: tall VERTICAL version of the same self-made
  // hero image (face large, hair near the top edge, cream-to-green
  // blend). Served via <picture> on viewports <=767px so phones get
  // a tall Elora-style card instead of the wide image squeezed into
  // a short horizontal strip. Uploaded by Noyan via the GitHub web UI.
  heroMobile: {
    src: "/noyan-hero-mobile.webp",
    alt: "Portrait of Noyan in a black shirt and tie, smiling, in a tall vertical hero image blending cream to deep green.",
  },
  // Noyan’s earlier formal portrait (black shirt + tie, green
  // background). No longer used by the Hero — kept in public/ for
  // reference. The AI-generated wide hero image
  // (the AI-generated wide hero image) is also still in public/ but
  // unreferenced.
  portrait: {
    src: "/noyan-portrait.jpg",
    alt: "Portrait of Noyan in a black shirt and tie, smiling, seated against a dark green background.",
  },
  // About photo: navy-blue polo shirt + glasses, beige background.
  // Uploaded separately by Noyan via the GitHub web UI (see README).
  about: {
    src: "/noyan-about.jpg",
    alt: "Noyan in a navy blue polo shirt and glasses, standing outdoors.",
  },
  casual: {
    src: "/noyan-casual.jpg",
    alt: "Noyan in a grey sweater with a black collar, smiling.",
  },
};

export const footer = {
  // Original line for this portfolio — not copied from anywhere.
  line: "Turning repetitive work into systems that run on their own.",
};

export const chatbot = {
  greeting:
    "Hi! I’m Noyan’s AI assistant — ask me about his work, services, projects, or how to contact him.",
  suggestedQuestions: [
    "What services do you offer?",
    "Tell me about AutoFlow",
    "How do I book a call?",
  ],
};
