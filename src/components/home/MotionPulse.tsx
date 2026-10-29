"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const beats = [
  "Cards",
  "Corporate",
  "Gateway",
  "Cash",
  "Remittance",
  "LOS",
  "LMS",
];

/** Horizontal signal strip — words dock/scale as they pass center (unique scroll feel). */
export function MotionPulse() {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-pulse-item]", root.current);
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0.25, scale: 0.88, y: 18 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 92%",
              end: "top 55%",
              scrub: 0.55,
            },
          },
        );
      });

      gsap.fromTo(
        "[data-pulse-line]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 85%",
            end: "top 40%",
            scrub: 0.4,
          },
        },
      );
    },
    { scope: root, dependencies: [reduce] },
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden border-y border-navy/10 bg-white"
      aria-label="Platform operating model"
    >
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal-deep">
          One operating model
        </p>
        <div
          data-pulse-line
          className="mt-4 h-px origin-left bg-gradient-to-r from-navy via-teal to-transparent"
        />
        <div className="mt-6 flex flex-wrap gap-3">
          {beats.map((beat, index) => (
            <span
              key={beat}
              data-pulse-item
              className="inline-flex items-center gap-2 rounded-full border border-navy/12 bg-[#f4f7fb] px-4 py-2 font-display text-sm font-semibold text-navy shadow-[0_8px_20px_rgb(16_36_88/0.06)]"
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              <span className="live-dot size-1.5 rounded-full bg-teal" />
              {beat}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
