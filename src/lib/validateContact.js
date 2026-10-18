// Pure validation for the contact form — no React, no DOM.
// Takes the form values and the error copy from the data layer and
// returns an object keyed by field name. Empty object means valid.
// Kept separate so the rules can be tested without rendering anything.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_MESSAGE_LENGTH = 10;

export function validateContactForm(values, errors) {
  const problems = {};

  if (!values.name.trim()) {
    problems.name = errors.name;
  }

  if (!values.email.trim()) {
    problems.email = errors.emailRequired;
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    problems.email = errors.emailInvalid;
  }

  if (!values.message.trim()) {
    problems.message = errors.messageRequired;
  } else if (values.message.trim().length < MIN_MESSAGE_LENGTH) {
    problems.message = errors.messageTooShort;
  }

  return problems;
}
