"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export function BackToTop() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
      className="fixed bottom-6 right-6 z-50 inline-flex size-12 items-center justify-center rounded-full bg-navy text-white shadow-[0_16px_40px_rgb(16_36_88/0.35)] transition duration-150 hover:-translate-y-1 hover:bg-teal hover:text-ink motion-reduce:transform-none"
    >
      ↑
    </button>
  );
}
