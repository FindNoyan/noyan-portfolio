import { useEffect, useRef, useState } from "react";
import { chatbot } from "../data/content";
import { answerLocalFaq } from "../lib/chatFaq";

const botAvatarClass =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan font-display text-sm font-semibold text-base";
const userAvatarClass =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface font-display text-sm font-semibold text-ink";

function Message({ role, text, source }) {
  const isBot = role === "bot";
  return (
    <div className={`flex gap-2 ${isBot ? "" : "flex-row-reverse"}`}>
      <span className={isBot ? botAvatarClass : userAvatarClass} aria-hidden="true">
        {isBot ? "N" : "You"}
      </span>
      <div
        className={`max-w-[85%] whitespace-pre-line rounded-lg px-3 py-2 text-sm leading-relaxed ${
          isBot ? "bg-surface text-ink" : "bg-cyan text-base"
        }`}
      >
        {text}
        {source === "portfolio" && (
          <p className="mt-1 text-xs opacity-70">
            Answered from portfolio info (AI not connected yet).
          </p>
        )}
        {source === "fallback" && (
          <p className="mt-1 text-xs opacity-70">
            Answered from portfolio info — AI is temporarily unavailable.
          </p>
        )}
      </div>
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: chatbot.greeting },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open ]);

  useEffect(() => {
    if (!open) return;
    function handleKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open ]);

  async function sendMessage(rawText) {
    const text = rawText.trim();
    if (!text || loading) return;
    setError("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json().catch(() => null);
      if (response.ok && data?.reply) {
        // Covers both AI answers (source "ai") and server-side
        // portfolio fallbacks (source "portfolio" -> "fallback" label).
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: data.reply,
            source: data.source === "portfolio" ? "fallback" : "ai",
          },
        ]);
        return;
      }
      if (response.ok && data?.configured === false) {
        const fallback = answerLocalFaq(text);
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: fallback.reply, source: "portfolio" },
        ]);
        return;
      }
      // 400 (validation) and 429 (rate limit) stay real errors —
      // falling back on those would bypass the guards.
      if (response.status === 400 || response.status === 429) {
        setError(
          data?.error ||
            "Something went wrong — please try again or use the Contact section."
        );
        return;
      }
      // Any other failure (Gemini down, 5xx, malformed response):
      // answer from the local FAQ so the chatbot never dead-ends.
      const fallback = answerLocalFaq(text);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: fallback.reply, source: "fallback" },
      ]);
    } catch {
      // Network failure (e.g. local dev without the API): still answer
      // from the local FAQ so the chatbot never goes fully dead.
      const fallback = answerLocalFaq(text);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: fallback.reply, source: "fallback" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {open && (
        <section
          ref={panelRef}
          role="dialog"
          aria-label="Ask Noyan chat"
          aria-modal="false"
          className="mb-3 flex h-[480px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-lg border border-line bg-base shadow-2xl"
        >
          <header className="flex items-center justify-between border-b border-line bg-surface px-4 py-3">
            <div>
              <p className="font-display text-sm font-semibold text-ink">
                Ask Noyan
              </p>
              <p className="text-xs text-muted">
                Answers from this portfolio — no invented facts.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-md px-2 py-1 text-sm text-muted hover:text-ink focus-ring"
            >
              ✕
            </button>
          </header>

          <div
            className="flex-1 space-y-3 overflow-y-auto px-3 py-3"
            aria-live="polite"
          >
            {messages.map((message, index) => (
              <Message key={index} {...message} />
            ))}
            {loading && (
              <div className="flex gap-2">
                <span className={botAvatarClass} aria-hidden="true">
                  N
                </span>
                <p className="rounded-lg bg-surface px-3 py-2 text-sm text-muted">
                  Typing…
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 border-t border-line px-3 pt-2">
            {chatbot.suggestedQuestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => sendMessage(question)}
                disabled={loading}
                className="rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors hover:border-cyan hover:text-cyan disabled:opacity-50 focus-ring"
              >
                {question}
              </button>
            ))}
          </div>

          {error && (
            <p role="alert" className="px-3 pt-1 text-xs text-red-400">
              {error}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex gap-2 border-t border-line p-3"
          >
            <label htmlFor="chat-input" className="sr-only">
              Type your question
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about services, projects, or booking a call…"
              maxLength={500}
              autoComplete="off"
              className="min-w-0 flex-1 rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted focus-ring"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-md bg-cyan px-4 py-2 text-sm font-medium text-base transition-opacity hover:opacity-90 disabled:opacity-50 focus-ring"
            >
              Send
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? "Close Ask Noyan chat" : "Open Ask Noyan chat"}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan font-display text-lg font-semibold text-base shadow-lg transition-transform hover:scale-105 focus-ring"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}
