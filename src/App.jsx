import { useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Services from "./components/Services";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Cursor from "./components/Cursor";
import { useSmoothScroll } from "./lib/smoothScroll";

// Step 3 redesign: section order matches the locked page plan and the
// numbered eyebrows (02 Work, 03 Services, 04 About). Skills stays
// unnumbered between About and Contact; all nav anchors (#about,
// #services, #work, #contact) still land on their sections.
export default function App() {
  useSmoothScroll();

  // Step 5 animation layer: one-time hero entrance. body.loaded is added
  // on first paint (double rAF) so the choreography runs once per page
  // load. With reduced-motion it is added immediately — the CSS forces
  // the final state with no animation. Cleanup included for React 19
  // StrictMode safety.
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      document.body.classList.add("loaded");
      return () => document.body.classList.remove("loaded");
    }
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        document.body.classList.add("loaded");
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);
  return (
    <div id="top" className="min-h-screen bg-base font-body text-ink">
      <Nav />
      <main>
        <Hero />
        <Work />
        <Services />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
      {/* Step 5: custom cursor — gold dot + trailing ring, fine-pointer
          only; renders nothing on touch / reduced-motion. */}
      <Cursor />
    </div>
  );
}
