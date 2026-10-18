import { useState } from "react";
import { contact, site, socials } from "../data/content";
import { validateContactForm } from "../lib/validateContact";
import Reveal from "./Reveal";

const labelClass = "block text-left text-sm font-medium text-ink";
const inputClass =
  "mt-1 w-full rounded-xl border border-line bg-white px-3 py-3 text-base text-ink placeholder:text-muted focus-ring sm:text-sm";
const errorInputClass = " border-red-500";
const errorTextClass = "mt-1 text-left text-sm text-red-600";

const initialValues = {
  name: "",
  email: "",
  projectType: contact.projectTypes[0],
  message: "",
};

export default function Contact() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setSent(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const problems = validateContactForm(values, contact.form.errors);
    setErrors(problems);
    if (Object.keys(problems).length > 0) return;
    const subject = `Project enquiry — ${values.projectType}`;
    const body =
      `Hi Noyan,\n\n${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <Reveal>
        <div className="rounded-[28px] border border-line bg-surface px-5 py-10 text-center shadow-card sm:rounded-[32px] sm:px-8 sm:py-14">
          <p className="flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted">
            <span className="inline-block h-2 w-2 rounded-full bg-gold" />
            Contact
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
            {contact.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
            {contact.sub}
          </p>
          <a
            href={contact.calendly.href}
            target="_blank"
            rel="noreferrer"
            className="bg-emerald mt-6 inline-block rounded-full px-7 py-3.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-glow focus-ring"
          >
            {contact.calendly.label}
          </a>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mx-auto mt-8 max-w-lg space-y-5 text-left"
          >
            <div>
              <label htmlFor="contact-name" className={labelClass}>
                {contact.form.nameLabel}
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(event) => update("name", event.target.value)}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                className={inputClass + (errors.name ? errorInputClass : "")}
              />
              {errors.name && (
                <p id="contact-name-error" role="alert" className={errorTextClass}>
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="contact-email" className={labelClass}>
                {contact.form.emailLabel}
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(event) => update("email", event.target.value)}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={
                  errors.email ? "contact-email-error" : undefined
                }
                className={inputClass + (errors.email ? errorInputClass : "")}
              />
              {errors.email && (
                <p id="contact-email-error" role="alert" className={errorTextClass}>
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="contact-project-type" className={labelClass}>
                {contact.form.projectTypeLabel}
              </label>
              <select
                id="contact-project-type"
                value={values.projectType}
                onChange={(event) => update("projectType", event.target.value)}
                className={inputClass}
              >
                {contact.projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="contact-message" className={labelClass}>
                {contact.form.messageLabel}
              </label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder={contact.form.messagePlaceholder}
                value={values.message}
                onChange={(event) => update("message", event.target.value)}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
                className={inputClass + (errors.message ? errorInputClass : "")}
              />
              {errors.message && (
                <p
                  id="contact-message-error"
                  role="alert"
                  className={errorTextClass}
                >
                  {errors.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-emerald w-full rounded-full px-6 py-3.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:opacity-90 focus-ring"
            >
              {contact.form.submitLabel}
            </button>
            <p className="text-center text-xs text-muted">{contact.form.note}</p>
            {sent && (
              <p role="status" className="text-center text-sm text-green-700">
                {contact.form.success}
              </p>
            )}
          </form>
          <p className="mt-8 text-sm text-muted">
            Prefer email directly?{" "}
            <a
              href={`mailto:${site.email}`}
              className="rounded font-medium text-emerald focus-ring"
            >
              {site.email}
            </a>
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="rounded text-sm text-muted transition-colors hover:text-emerald focus-ring"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
