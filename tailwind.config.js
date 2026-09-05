/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0B0E14",
        surface: "#10141C",
        line: "#1E2430",
        ink: "#E7ECF2",
        muted: "#8B96A5",
        cyan: "#4FD8E8",
        violet: "#9D7BFF",
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
