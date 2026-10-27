"use client";

import { motion, useReducedMotion } from "motion/react";

const beats = [
  { label: "AI for systems", note: "Assist ops inside live platforms" },
  { label: "Agentic delivery", note: "Faster build, human release" },
  { label: "Secure platforms", note: "Built for regulated environments" },
  { label: "Integration-ready", note: "Core, rails, and channel APIs" },
  { label: "UAT-led", note: "Live journey is the clock" },
];

export function MomentumStrip() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y border-navy/10 bg-white" aria-label="What you get">
      <div className="relative mx-auto max-w-6xl px-6 py-10">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none md:grid md:grid-cols-5 md:overflow-visible md:pb-0">
          {beats.map((beat, index) => (
            <motion.article
              key={beat.label}
              className="min-w-[11rem] rounded-[1.25rem] border border-navy/10 bg-[#f7f9fc] p-5"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="live-dot inline-block size-2 rounded-full bg-teal" />
              <h3 className="mt-3 font-display text-lg tracking-tight text-navy">{beat.label}</h3>
              <p className="mt-1 text-sm leading-6 text-mist">{beat.note}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
