"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ScrollScene } from "@/components/motion/ScrollScene";
import { Magnetic } from "@/components/motion/Magnetic";
import { buttonGhostLight, buttonPrimary } from "@/components/ui/styles";

const pillars = [
  {
    title: "AI for banking systems",
    body: "Assist underwriting queues, reconciliation, and ops triage inside your existing platforms.",
  },
  {
    title: "Agentic delivery",
    body: "Speed analysis, tests, and documentation so squads reach UAT sooner — with humans on release.",
  },
  {
    title: "Intelligent automation",
    body: "Workflow copilots for payments, remittance, and lending desks — governed, auditable, optional.",
  },
];

const floats = [
  { label: "UAT-led", className: "top-10 right-[8%] bg-teal text-ink" },
  { label: "Agentic AI", className: "top-28 right-[18%] bg-[#E8B86D] text-ink" },
  { label: "Secure rails", className: "bottom-24 right-[6%] bg-white/15 text-white backdrop-blur-sm" },
];

export function AiStrip() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink-raised text-white">
      <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true">
        <div className="aurora absolute -left-20 top-0 size-72 rounded-full blur-3xl" />
        <div className="aurora-soft absolute -right-16 bottom-0 size-80 rounded-full blur-3xl" />
      </div>

      {!reduce
        ? floats.map((item, index) => (
            <motion.span
              key={item.label}
              className={`float-tag pointer-events-none absolute z-[1] hidden rounded-full px-3 py-1.5 text-[11px] font-semibold shadow-lg md:inline-flex ${item.className}`}
              style={{ animationDelay: `${index * 0.6}s` }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
            >
              {item.label}
            </motion.span>
          ))
        : null}

      <ScrollScene scrub={0.7} className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div data-motion="wipe" className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase text-teal">AI solutions</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              AI that strengthens systems — not replaces governance.
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-white/75">
              We provide AI solutions for financial systems: agentic delivery on the build side, and
              practical automation inside cards, payments, cash, remittance, and lending platforms.
              Licensed institutions keep the decision.
            </p>
          </div>
          <div data-motion="slide-right" data-motion-delay={0.08} className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Link href="/contact" className={buttonPrimary}>
              Discuss AI solutions
            </Link>
            <Link href="/products" className={buttonGhostLight}>
              See platforms
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Magnetic key={pillar.title} strength={9}>
              <article
                data-motion="scale"
                data-motion-delay={0.05 + index * 0.08}
                className="h-full rounded-[1.4rem] border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm transition duration-300 hover:border-teal/40 hover:bg-white/[0.09]"
              >
                <h3 className="font-display text-xl">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">{pillar.body}</p>
              </article>
            </Magnetic>
          ))}
        </div>
      </ScrollScene>
    </section>
  );
}
