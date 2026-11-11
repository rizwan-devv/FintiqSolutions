"use client";

import Link from "next/link";
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

export function AiStrip() {
  return (
    <section className="relative overflow-hidden bg-ink-raised text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(0,176,164,0.14),transparent_50%)]"
        aria-hidden="true"
      />

      <ScrollScene scrub={0.7} className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div data-motion="wipe" className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-teal">AI solutions</p>
            <h2 className="mt-4 font-display text-4xl tracking-tight md:text-5xl md:leading-[1.05]">
              AI that strengthens systems — not replaces governance.
            </h2>
            <p className="mt-4 max-w-xl border-l-2 border-teal/70 pl-4 leading-7 text-white/75">
              Agentic delivery on the build side, and practical automation inside cards, payments,
              cash, remittance, and lending. Licensed institutions keep the decision.
            </p>
          </div>
          <div
            data-motion="slide-right"
            data-motion-delay={0.08}
            className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end"
          >
            <Link href="/contact" className={buttonPrimary}>
              Discuss AI solutions
            </Link>
            <Link href="/products" className={buttonGhostLight}>
              See platforms
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[1.25rem] border border-white/12 bg-white/12 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Magnetic key={pillar.title} strength={6}>
              <article
                data-motion="blur-up"
                data-motion-delay={0.05 + index * 0.08}
                className="h-full bg-ink-raised/85 p-6 transition hover:bg-ink-raised"
              >
                <h3 className="font-display text-xl tracking-tight">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{pillar.body}</p>
              </article>
            </Magnetic>
          ))}
        </div>
      </ScrollScene>
    </section>
  );
}
