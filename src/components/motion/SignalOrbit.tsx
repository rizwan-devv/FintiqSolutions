"use client";

import { useReducedMotion } from "motion/react";

/** Unique FintiQ motif — concentric signal rings (not PayFast floating brand pills). */
export function SignalOrbit({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className={`signal-orbit signal-orbit-a ${reduce ? "is-static" : ""}`} />
      <div className={`signal-orbit signal-orbit-b ${reduce ? "is-static" : ""}`} />
      <div className={`signal-orbit signal-orbit-c ${reduce ? "is-static" : ""}`} />
      <div className="signal-orbit-core" />
    </div>
  );
}
