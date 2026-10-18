import { useState } from "react";
import { contact, site, socials } from "../data/content";
import { validateContactForm } from "../lib/validateContact";

const labelClass = "block text-left text-sm font-medium text-ink";
const inputClass =
  "mt-1 w-full rounded-md border border-line bg-base px-3 py-2.5 text-sm text-ink placeholder:text-muted focus-ring";
const errorInputClass = " border-red-400";
const errorTextClass = "mt-1 text-left text-sm text-red-400";

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
    <section id="contact" className="mx-auto max-w-4xl px-6 py-24">
      <div className="rounded-lg border border-line bg-surface px-8 py-14 text-center">
        <h2 className="font-display text-3xl font-semibold text-ink">
          {contact.heading}
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
          {contact.sub}
        </p>
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
              aria-describedby={errors.email ? "contact-email-error" : undefined}
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
            className="w-full rounded-md bg-cyan px-6 py-3 text-sm font-medium text-base transition-opacity hover:opacity-90 focus-ring"
          >
            {contact.form.submitLabel}
          </button>
          <p className="text-center text-xs text-muted">{contact.form.note}</p>
          {sent && (
            <p role="status" className="text-center text-sm text-cyan">
              {contact.form.success}
            </p>
          )}
        </form>
        <p className="mt-8 text-sm text-muted">
          Prefer email directly?{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-cyan hover:opacity-90 focus-ring rounded"
          >
            {site.email}
          </a>
        </p>
        <div className="mt-6 flex justify-center gap-6">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted transition-colors hover:text-cyan focus-ring rounded"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
