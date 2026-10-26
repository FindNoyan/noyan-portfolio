import { useState } from "react";
import { contact, site } from "../data/content";
import { validateContactForm } from "../lib/validateContact";
import Reveal from "./Reveal";

// Step 4 redesign: Dennis-style contact layout matching the approved
// mockups — eyebrow, serif heading block (email + Calendly) on the left,
// restyled form card on the right. The FORM ITSELF IS UNCHANGED:
// same state, validation, Web3Forms submit flow, mailto fallback,
// "Sending..." disabled state, field names, options, placeholder and
// note. Only the card/container/label/input styling changed.
const labelClass = "block text-left text-sm font-semibold text-forest";
const inputClass =
  "mt-1.5 w-full rounded-xl border border-line bg-base px-4 py-3 text-base text-ink placeholder:text-ink/40 transition-[border-color,box-shadow] duration-200 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 sm:text-sm";
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
  const [usedFallback, setUsedFallback] = useState(false);
  const [sending, setSending] = useState(false);

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setSent(false);
    setUsedFallback(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (sending) return;
    const problems = validateContactForm(values, contact.form.errors);
    setErrors(problems);
    if (Object.keys(problems).length > 0) return;
    setSending(true);
    try {
      const subject = `Project enquiry — ${values.projectType}`;
      const body =
        `Hi Noyan,\n\n${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`;
      // Fallback: the pre-existing mailto behaviour. Opens the visitor's
      // mail app with the same subject/body, so the form never dead-ends.
      // The form values are kept, so nothing is lost if the mail app fails.
      function openMailApp() {
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;
        setUsedFallback(true);
        setSent(true);
      }
      // The Web3Forms access key comes from the VITE_WEB3FORMS_KEY env var
      // (set in Vercel, never in code). Without it, fall back to mailto.
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
      if (!accessKey) {
        openMailApp();
        return;
      }
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: values.name.trim(),
            email: values.email.trim(),
            subject,
            message: values.message.trim(),
            from_name: values.name.trim(),
            reply_to: values.email.trim(),
            botcheck: "",
            redirect: false,
          }),
        });
        const result = await response.json();
        if (result && result.success) {
          setUsedFallback(false);
          setSent(true);
          setValues(initialValues);
          return;
        }
        openMailApp();
      } catch {
        openMailApp();
      }
    } finally {
      setSending(false);
    }
  }


  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gold">
          05&nbsp;&middot;&nbsp;Contact
        </p>
      </Reveal>

      <div className="mt-6 grid items-start gap-10 lg:mt-8 lg:grid-cols-[1.02fr_1fr] lg:gap-16">
        {/* Left: heading block — real copy from content.js. */}
        <Reveal delay={0}>
          <h2 className="font-display text-4xl font-semibold leading-[1.08] text-forest sm:text-5xl lg:text-[3.75rem]">
            {contact.heading}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            {contact.sub}
          </p>
          <p className="mt-8 sm:mt-9">
            <a
              href={`mailto:${site.email}`}
              className="email-gold-underline inline-block max-w-full break-words font-display text-[1.45rem] font-semibold leading-snug text-forest focus-ring sm:text-4xl lg:text-[2.6rem]"
            >
              {site.email}
            </a>
          </p>
          <p className="mt-8">
            <a
              href={contact.calendly.href}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald px-8 py-4 text-base font-semibold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-12px_rgba(201,162,39,0.65)] focus-ring sm:inline-flex sm:w-auto"
            >
              {contact.calendly.label}
              <span aria-hidden="true">&#8599;</span>
            </a>
          </p>
          <p className="mt-3 text-sm text-muted">{contact.calendly.callNote}</p>
        </Reveal>

        {/* Right: form card. Submission flow is untouched — same Web3Forms
            submit, same env key, same mailto fallback, same "Sending..."
            state, same fields/options/placeholder/note. Only the
            card/container/label/input styling changed to match the mockup. */}
        <Reveal delay={140}>
          <div
            aria-hidden="true"
            className="mb-10 border-t border-line lg:hidden"
          />
          <div className="rounded-[20px] border border-line bg-white p-6 shadow-card sm:p-8">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5 text-left"
            >
              <div className="grid gap-5 sm:grid-cols-2">
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
                disabled={sending}
                className="w-full rounded-full bg-emerald px-6 py-4 text-base font-semibold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 focus-ring disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
              >
                {sending ? "Sending..." : contact.form.submitLabel}
              </button>
              <p className="text-center text-xs text-muted">{contact.form.note}</p>
              {sent && (
                <p role="status" className="text-center text-sm text-green-700">
                  {usedFallback
                    ? contact.form.success
                    : "Thanks — your message has been sent. I'll get back to you within a day."}
                </p>
              )}
              {sent && usedFallback && (
                <p className="text-center text-xs text-muted">
                  Direct sending was not available, so your mail app opened
                  instead. Press send there to deliver your message.
                </p>
              )}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
