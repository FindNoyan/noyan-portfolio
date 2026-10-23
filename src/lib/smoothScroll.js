import { useEffect } from "react";

// Step 5 animation layer: Lenis smooth scroll.
// - Gentle/native feel (lerp 0.09, smoothWheel) — exactly the approved preview's settings.
// - Completely skipped on touch devices (iOS Safari keeps native scroll,
//   nothing fights it) and when prefers-reduced-motion is set.
// - If window.Lenis is unavailable (CDN failed to load), silently falls
//   back to the browser's native smooth scroll — navigation never breaks.
// - Intercepts internal anchor clicks and routes them through Lenis so
//   nav anchors (#top #work #services #about #contact) land exactly on
//   their sections (same -120px offset the preview uses; the existing
//   scroll-margin-top: 120px on section[id] covers the native fallback).
export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch =
      "ontouchstart" in window ||
      (navigator.maxTouchPoints > 0 &&
        window.matchMedia("(pointer: coarse)").matches);

    let lenis = null;
    let rafId = 0;

    if (!isTouch && !reduceMotion && typeof window.Lenis !== "undefined") {
      try {
        lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true });
        const raf = (time) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      } catch {
        lenis = null;
      }
    }

    const onClick = (event) => {
      const target = event.target;
      if (!target || typeof target.closest !== "function") return;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash.length < 2) return;
      const el = document.querySelector(hash);
      if (!el) return;
      event.preventDefault();
      if (lenis) {
        lenis.scrollTo(el, { offset: -120, duration: 1.4 });
      } else {
        el.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);
}
