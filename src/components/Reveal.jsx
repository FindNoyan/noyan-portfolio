import { useEffect, useRef, useState } from "react";

// Subtle scroll-reveal wrapper: children fade + slide up once when they
// enter the viewport. Respects prefers-reduced-motion (renders visible
// immediately, no animation) and works without JavaScript-driven layout
// shifts — content is visible by default if the observer never fires.
//
// `delay` adds a small stagger (ms) for grouped reveals (e.g. bento tiles,
// fact cards). It is only applied while animating — reduced-motion and
// no-observer environments get visible content with no delay.
export default function Reveal({
  children,
  className = "",
  as = "div",
  delay = 0,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noObserver =
      typeof window === "undefined" || !("IntersectionObserver" in window);
    if (reduce || noObserver) {
      setAnimate(false);
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={
        animate && visible && delay ? { transitionDelay: `${delay}ms` } : undefined
      }
    >
      {children}
    </Tag>
  );
}
