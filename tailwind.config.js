/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Palette derived from Noyan's portrait: black shirt, dark green
        // backdrop, warm skin tones — forest green + gold on warm cream.
        base: "#FAF7F0",
        surface: "#F1EBDF",
        elevated: "#F1EBDF",
        line: "#E3DACB",
        ink: "#141814",
        // #5A5F57 on cream ≈ 6.5:1 — accessible body copy.
        muted: "#5A5F57",
        showcase: "#141814",
        // Echoes the deep green backdrop of Noyan's portrait photo.
        deepGreen: "#1C3A2A",
        forest: "#14382A",
        emerald: "#1E5C3A",
        // Restrained gold/amber accent.
        gold: "#C9A227",
        // Deep gold: small/large accent text on cream (≈ 4.3:1).
        goldDeep: "#8A6D1B",
        // Light gold: text on dark green / black (≈ 7:1+).
        goldLight: "#E3C878",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(20, 24, 20, 0.14)",
        glow: "0 0 44px -12px rgba(30, 92, 58, 0.45)",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
