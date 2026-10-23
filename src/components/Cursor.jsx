import { useEffect, useRef, useState } from "react";

// Step 5 animation layer: custom cursor — gold dot (8px) + trailing gold
// ring. ONLY on devices with (hover: hover) and (pointer: fine): never on
// touch, never under prefers-reduced-motion. The dot follows 1:1, the
// ring trails with 0.16 smoothing in a single transform-only rAF loop.
// The ring grows (0.25s) over links, buttons, form fields and work rows.
// Failure-safe: the elements stay out of the DOM entirely on touch /
// reduced-motion, and the native cursor is hidden ONLY after the custom
// loop is confirmed running (first mousemove adds body.custom-cursor) —
// no invisible-cursor failure mode.
const GROW_TARGETS = "a, button, input, select, textarea, .work-row";

function CursorInner() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    let rafId = 0;
    let running = false;
    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;

    const loop = () => {
      dot.style.transform = `translate(${mx - 4}px,${my - 4}px)`;
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      const half = ring.classList.contains("grow") ? 28 : 18;
      ring.style.transform = `translate(${rx - half}px,${ry - half}px)`;
      if (running) rafId = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      const t = e.target && e.target.closest ? e.target.closest(GROW_TARGETS) : null;
      ring.classList.toggle("grow", !!t);
      // Only now that we know the loop actually runs do we hide the
      // native cursor — if anything above throws, the user keeps it.
      if (!running) {
        running = true;
        document.body.classList.add("custom-cursor");
        rafId = requestAnimationFrame(loop);
      }
    };

    const onLeave = () => {
      mx = my = rx = ry = -100;
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (finePointer && !reduceMotion) setEnabled(true);
  }, []);

  if (!enabled) return null;
  return <CursorInner />;
}
