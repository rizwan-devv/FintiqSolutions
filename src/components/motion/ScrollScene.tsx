"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type MotionKind = "rise" | "fade" | "scale" | "wipe" | "slide-left" | "slide-right" | "blur-up";

const presets: Record<
  MotionKind,
  { from: gsap.TweenVars; to: gsap.TweenVars }
> = {
  rise: {
    from: { opacity: 0, y: 56 },
    to: { opacity: 1, y: 0 },
  },
  fade: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  scale: {
    from: { opacity: 0, y: 36, scale: 0.92 },
    to: { opacity: 1, y: 0, scale: 1 },
  },
  wipe: {
    from: {
      opacity: 0,
      y: 24,
      clipPath: "inset(0 42% 0 0)",
      webkitClipPath: "inset(0 42% 0 0)",
    },
    to: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0 0% 0 0)",
      webkitClipPath: "inset(0 0% 0 0)",
    },
  },
  "slide-left": {
    from: { opacity: 0, x: -48, filter: "blur(8px)" },
    to: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  "slide-right": {
    from: { opacity: 0, x: 48, filter: "blur(8px)" },
    to: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  "blur-up": {
    from: { opacity: 0, y: 28, filter: "blur(10px)" },
    to: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
};

/**
 * Marks children with data-motion="rise|fade|scale|wipe|slide-left|slide-right|blur-up"
 * and optional data-motion-delay (seconds). Scroll-linked, scrubbed entrances.
 */
export function ScrollScene({
  children,
  className,
  scrub = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** If true, animation tracks scroll position instead of playing once. */
  scrub?: boolean | number;
}) {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce) return;
      const nodes = gsap.utils.toArray<HTMLElement>("[data-motion]", root.current);

      nodes.forEach((node) => {
        const kind = (node.dataset.motion || "rise") as MotionKind;
        const preset = presets[kind] ?? presets.rise;
        const delay = Number(node.dataset.motionDelay || 0);
        const start = node.dataset.motionStart || "top 88%";

        if (scrub) {
          gsap.fromTo(node, preset.from, {
            ...preset.to,
            ease: "none",
            delay,
            scrollTrigger: {
              trigger: node,
              start,
              end: node.dataset.motionEnd || "top 42%",
              scrub: typeof scrub === "number" ? scrub : 0.7,
            },
          });
        } else {
          gsap.fromTo(node, preset.from, {
            ...preset.to,
            duration: 0.85,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: node,
              start,
              toggleActions: "play none none none",
            },
          });
        }
      });
    },
    { scope: root, dependencies: [reduce, scrub] },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
