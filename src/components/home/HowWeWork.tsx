"use client";

import { motion, useReducedMotion } from "motion/react";

const steps = [
  {
    title: "Start from a platform",
    body: "Match the journey to a Fintiq product, or to the core and channels you already run.",
  },
  {
    title: "Brand it and pass UAT",
    body: "Your name, your rails. Done means a live payment, account, card, or transfer.",
  },
  {
    title: "Stay for the roadmap",
    body: "Production support, or engineers placed on your team.",
  },
];

export function HowWeWork() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-[11px] uppercase text-teal">How we work</p>
          <h2 className="mt-4 max-w-xl font-display text-5xl tracking-tight">Three steps. Then a live channel.</h2>
        </motion.div>
        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-3 hidden h-px bg-white/15 md:block" aria-hidden="true" />
          <motion.div
            className="absolute left-0 right-0 top-3 hidden h-px origin-left bg-teal md:block"
            aria-hidden="true"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
          <ol className="grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.li
                key={step.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.15 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="glass-panel hover-lift relative rounded-[1.6rem] p-6"
              >
                <span className="relative z-10 inline-flex size-7 items-center justify-center rounded-full bg-white font-mono text-xs text-signal-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-3xl">{step.title}</h3>
                <p className="mt-3 leading-7 text-white/75">{step.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
