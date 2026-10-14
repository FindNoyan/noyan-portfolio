// Central content for the portfolio.
// Single source of truth: components import from here instead of
// hardcoding copy, so updates happen in one place.

export const brandName = "noyan";
export const brandTld = "dev";

export const site = {
  name: "Noyan",
  title: "Noyan — Full-Stack Developer & Automation Specialist",
  description:
    "Noyan is a full-stack developer and automation specialist building scalable web apps and AI-powered workflows.",
  email: "noyantanveer35@gmail.com",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/FindNoyan" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/noyan-tanveer-0595152b6/" },
  { label: "Upwork", href: "https://www.upwork.com/freelancers/~0142802c1da34c8e5f" },
];

export const hero = {
  eyebrow: "Full-stack developer",
  headline: "Noyan builds web apps that run the busywork for you.",
  sub: "I design and ship full-stack products — React, Next.js, Laravel — then wire up the automation underneath so teams spend less time on repetitive work.",
  primaryCta: { label: "See my work", href: "#work" },
  secondaryCta: { label: "Get in touch", href: "#contact" },
};

export const heroLines = [
  { prompt: "noyan@dev:~$", cmd: "whoami" },
  { out: "Full-stack developer & automation specialist" },
  { prompt: "noyan@dev:~$", cmd: "status --current" },
  { out: "Top Rated Plus on Upwork · open to new projects" },
];

export const about = {
  heading: "About",
  paragraphs: [
    "I'm a full-stack developer who ended up specializing in the part most people skip: the workflow behind the product. I build the app, then automate the parts of the business that used to run on spreadsheets and manual follow-ups. Most of my work lives across React, Next.js, Laravel, and Shopify — whatever the project actually calls for.",
  ],
};

export const facts = [
  { label: "Focus", value: "Full-stack web apps + AI-powered automation" },
  { label: "Currently", value: "Studying Web Development at Virtual University" },
  { label: "Freelance", value: "Top Rated Plus on Upwork (top 3%)" },
  { label: "Agency", value: "Founder, Automation Consulting Services" },
];

export const skillGroups = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "jQuery"],
  },
  {
    label: "Backend",
    items: ["PHP", "Laravel", "Node.js", "MySQL", "MongoDB", "Firebase"],
  },
  {
    label: "Automation & Commerce",
    items: ["Shopify", "n8n", "Zapier", "GraphQL"],
  },
  {
    label: "Design",
    items: ["Figma", "Photoshop"],
  },
];

export const projects = [
  {
    name: "AutoFlow",
    description:
      "Dashboard for monitoring automated workflows — runs, failures, and time saved, at a glance.",
    tags: ["Next.js", "Tailwind"],
    href: "https://github.com/FindNoyan/autoflow",
  },
  {
    name: "Tasklane",
    description:
      "A Kanban-style task manager for small teams, with boards, due dates, and activity history.",
    tags: ["Laravel", "Blade", "SQLite"],
    href: "https://github.com/FindNoyan/tasklane",
  },
  {
    name: "Cadence",
    description:
      "Marketing landing page for a scheduling-automation product — built for a fast first impression.",
    tags: ["HTML", "Tailwind", "JS"],
    href: "https://github.com/FindNoyan/cadence",
  },
];

export const contact = {
  heading: "Let's build something.",
  sub: "Open to freelance projects and long-term collaborations — reach out directly and I'll get back to you within a day.",
};
