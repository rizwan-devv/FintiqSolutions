"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

type Pill = {
  label: string;
  note: string;
  tone: "teal" | "gold" | "blue" | "cyan" | "steel";
  x: string;
  y: string;
  size: "sm" | "md" | "lg";
  delay: number;
  duration: number;
  depth: number;
};

const PILLS: Pill[] = [
  { label: "Cards", note: "CMS", tone: "gold", x: "3%", y: "16%", size: "lg", delay: 0, duration: 5.2, depth: 0.04 },
  { label: "Gateway", note: "Collect", tone: "teal", x: "88%", y: "12%", size: "md", delay: 0.3, duration: 6.1, depth: 0.06 },
  { label: "Core", note: "Ledger", tone: "blue", x: "6%", y: "68%", size: "md", delay: 0.7, duration: 6.8, depth: 0.05 },
  { label: "Wallet", note: "Channel", tone: "cyan", x: "84%", y: "62%", size: "lg", delay: 1.0, duration: 5.4, depth: 0.07 },
  { label: "KYC", note: "Identity", tone: "steel", x: "46%", y: "8%", size: "sm", delay: 0.2, duration: 7.0, depth: 0.03 },
  { label: "API", note: "Integrate", tone: "teal", x: "72%", y: "30%", size: "sm", delay: 0.5, duration: 5.9, depth: 0.045 },
  { label: "AI Ops", note: "Copilot", tone: "gold", x: "28%", y: "78%", size: "md", delay: 1.2, duration: 6.3, depth: 0.055 },
  { label: "UAT", note: "Go-live", tone: "blue", x: "58%", y: "72%", size: "sm", delay: 0.9, duration: 5.7, depth: 0.035 },
];

const sizeClass = {
  sm: "h-[4.1rem] w-[4.1rem]",
  md: "h-[5rem] w-[5rem]",
  lg: "h-[5.75rem] w-[5.75rem]",
};

export function HeroRailPills() {
  const reduce = useReducedMotion();
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    const layer = layerRef.current;
    if (!layer) return;

    const nodes = [...layer.querySelectorAll<HTMLElement>("[data-rail-pill]")];
    let raf = 0;
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;

    const onMove = (event: PointerEvent) => {
      const rect = layer.getBoundingClientRect();
      mx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      my = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const tick = () => {
      tx += (mx - tx) * 0.06;
      ty += (my - ty) * 0.06;
      nodes.forEach((node) => {
        const depth = Number(node.dataset.depth || 0.04);
        node.style.setProperty("--parallax-x", `${tx * depth * 100}px`);
        node.style.setProperty("--parallax-y", `${ty * depth * 100}px`);
      });
      raf = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = window.requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <div
      ref={layerRef}
      className="pointer-events-none absolute inset-0 z-[3] overflow-hidden"
      aria-hidden="true"
    >
      {PILLS.map((pill) => (
        <motion.div
          key={pill.label}
          data-rail-pill
          data-depth={pill.depth}
          className={`hero-rail-pill hero-rail-pill-${pill.tone} absolute hidden sm:flex ${sizeClass[pill.size]}`}
          style={{
            left: pill.x,
            top: pill.y,
            ...(reduce
              ? {}
              : {
                  animationDuration: `${pill.duration}s`,
                  animationDelay: `${pill.delay}s`,
                }),
          }}
          initial={reduce ? false : { opacity: 0, scale: 0.65, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25 + pill.delay * 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero-rail-pill-label">{pill.label}</span>
          <span className="hero-rail-pill-note">{pill.note}</span>
        </motion.div>
      ))}
    </div>
  );
}
