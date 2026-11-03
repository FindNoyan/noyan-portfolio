import { useEffect } from "react";
import Lenis from "lenis";

// Step 5 animation layer: Lenis smooth scroll (bundled via npm, no CDN).
// - Snappier feel (lerp 0.14, smoothWheel); CSS scroll-behavior is NOT
//   set, so nothing fights Lenis anymore.
// - Completely skipped on touch devices (iOS Safari keeps native scroll,
//   nothing fights it) and when prefers-reduced-motion is set.
// - If Lenis construction throws, silently falls back to the browser's
//   native smooth scroll — navigation never breaks.
// - Intercepts internal anchor clicks and routes them through Lenis so
//   nav anchors (#top #work #services #about #contact) land exactly on
//   their sections (same -140px offset the preview uses; the existing
//   scroll-margin-top: 140px on section[id] covers the native fallback).
// - Also re-applies that offset after page load for a direct landing on
//   a URL like /#work (shared link or refresh): those never pass through
//   the click handler, and the browser's first jump can land before
//   images/fonts settle, leaving the section heading under the pill nav.
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

    if (!isTouch && !reduceMotion) {
      try {
        lenis = new Lenis({ lerp: 0.14, smoothWheel: true });
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
        lenis.scrollTo(el, { offset: -140, duration: 1.4 });
      } else {
        el.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    };

    document.addEventListener("click", onClick);

    // Direct #work-style landing: re-apply the -140px offset once the
    // page has loaded and layout has settled, but only when the target
    // is actually sitting under the nav zone (top < 140px). A target
    // already clear of the nav is left alone, so this never yanks a
    // reader who has already scrolled elsewhere.
    const fixInitialHash = () => {
      const hash = window.location.hash;
      if (!hash || hash.length < 2) return;
      const el = document.querySelector(hash);
      if (!el) return;
      if (el.getBoundingClientRect().top >= 140) return;
      if (lenis) {
        lenis.scrollTo(el, { offset: -140, duration: 1.0 });
      } else {
        window.scrollTo({
          top: window.scrollY + el.getBoundingClientRect().top - 140,
          behavior: reduceMotion ? "auto" : "smooth",
        });
      }
    };
    window.addEventListener("load", fixInitialHash);
    const initialTimer = window.setTimeout(fixInitialHash, 500);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", fixInitialHash);
      window.clearTimeout(initialTimer);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);
}
