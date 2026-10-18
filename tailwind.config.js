/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Light palette.
        base: "#FFFFFF",
        surface: "#F3F3F4",
        elevated: "#F3F3F4",
        line: "#E6E6E7",
        ink: "#111111",
        // #565656 on white ≈ 7:1 — accessible body copy.
        muted: "#565656",
        cream: "#FFF8EC",
        showcase: "#111111",
        // Echoes the deep green backdrop of Noyan's portrait photo.
        deepGreen: "#1C3A2A",
        // Sunset gradient stops: yellow → orange → coral-pink → magenta.
        sunYellow: "#FFC93C",
        sunOrange: "#FF7A00",
        sunPink: "#FF5E8A",
        sunMagenta: "#E93DFF",
        // Solid accent blocks.
        royal: "#2B4EFF",
        gold: "#FFC93C",
        grape: "#7C3AED",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(17, 17, 17, 0.14)",
        glow: "0 0 44px -12px rgba(255, 122, 0, 0.45)",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
