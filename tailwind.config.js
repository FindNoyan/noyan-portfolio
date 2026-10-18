/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0B0E14",
        surface: "#10141C",
        elevated: "#141A26",
        line: "#1E2430",
        ink: "#E7ECF2",
        muted: "#9AA6B5",
        cyan: "#4FD8E8",
        violet: "#9D7BFF",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(0, 0, 0, 0.6)",
        glow: "0 0 44px -12px rgba(79, 216, 232, 0.45)",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
