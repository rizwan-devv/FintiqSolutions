"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

type BubbleDef = {
  label: string;
  note: string;
  size: number;
  tone: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
};

const DEFS: Omit<BubbleDef, "x" | "y" | "z" | "vx" | "vy" | "vz">[] = [
  { label: "Cards", note: "Payments", size: 140, tone: "gold" },
  { label: "Corporate", note: "Banking", size: 125, tone: "blue" },
  { label: "Gateway", note: "Collect", size: 135, tone: "teal" },
  { label: "Cash", note: "Treasury", size: 110, tone: "cyan" },
  { label: "Remit", note: "Transfer", size: 115, tone: "steel" },
  { label: "LOS", note: "Originate", size: 105, tone: "blue" },
  { label: "LMS", note: "Service", size: 100, tone: "steel" },
  { label: "AI Ops", note: "Systems", size: 122, tone: "teal" },
  { label: "Agentic", note: "Delivery", size: 118, tone: "cyan" },
  { label: "Copilot", note: "Desk", size: 108, tone: "blue" },
  { label: "Agent", note: "Channel", size: 100, tone: "gold" },
  { label: "Wallet", note: "Channel", size: 96, tone: "teal" },
  { label: "UAT", note: "Go-live", size: 78, tone: "blue" },
  { label: "API", note: "Integrate", size: 74, tone: "steel" },
  { label: "KYC", note: "Identity", size: 86, tone: "cyan" },
  { label: "Core", note: "Ledger", size: 92, tone: "blue" },
];

function seed(): BubbleDef[] {
  return DEFS.map((def, index) => ({
    ...def,
    x: (index * 17 + 8) % 100,
    y: (index * 23 + 12) % 100,
    z: 0.35 + ((index * 13) % 65) / 100,
    vx: (index % 2 === 0 ? 1 : -1) * (0.008 + (index % 5) * 0.003),
    vy: (index % 3 === 0 ? 1 : -1) * (0.006 + (index % 4) * 0.0025),
    vz: (index % 2 === 0 ? 1 : -1) * (0.0012 + (index % 3) * 0.0006),
  }));
}

export function FintechBubbles() {
  const reduce = useReducedMotion();
  const layerRef = useRef<HTMLDivElement>(null);
  const state = useRef(seed());

  useEffect(() => {
    if (reduce) return;
    const layer = layerRef.current;
    if (!layer) return;
    const nodes = [...layer.querySelectorAll<HTMLElement>("[data-bubble]")];
    let frame = 0;

    const tick = () => {
      const bubbles = state.current;
      bubbles.forEach((bubble, index) => {
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;
        bubble.z += bubble.vz;

        if (bubble.x < -8 || bubble.x > 108) bubble.vx *= -1;
        if (bubble.y < -8 || bubble.y > 108) bubble.vy *= -1;
        if (bubble.z < 0.28 || bubble.z > 1.15) bubble.vz *= -1;

        bubble.x = Math.min(108, Math.max(-8, bubble.x));
        bubble.y = Math.min(108, Math.max(-8, bubble.y));
        bubble.z = Math.min(1.15, Math.max(0.28, bubble.z));

        const node = nodes[index];
        if (!node) return;
        const depth = bubble.z;
        const scale = 0.55 + depth * 0.7;
        const opacity = 0.28 + depth * 0.62;
        const blur = Math.max(0, (1 - depth) * 2.2);
        node.style.transform = `translate3d(${bubble.x}vw, ${bubble.y}vh, 0) scale(${scale})`;
        node.style.opacity = String(opacity);
        node.style.filter = blur > 0.15 ? `blur(${blur}px)` : "none";
        node.style.zIndex = String(Math.round(depth * 100));
      });
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [reduce]);

  return (
    <div
      ref={layerRef}
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {state.current.map((bubble) => (
        <div
          key={bubble.label}
          data-bubble
          className={`fintech-bubble fintech-bubble-${bubble.tone}`}
          style={{
            width: bubble.size,
            height: bubble.size,
            left: 0,
            top: 0,
            transform: `translate3d(${bubble.x}vw, ${bubble.y}vh, 0) scale(${0.55 + bubble.z * 0.7})`,
            opacity: 0.28 + bubble.z * 0.62,
          }}
        >
          <span className="fintech-bubble-label">{bubble.label}</span>
          <span className="fintech-bubble-note">{bubble.note}</span>
        </div>
      ))}
    </div>
  );
}
