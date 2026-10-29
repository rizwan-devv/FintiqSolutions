"use client";

import Link from "next/link";
import { delivery, railPartners } from "@/content/site";
import { ScrollScene } from "@/components/motion/ScrollScene";
import { Magnetic } from "@/components/motion/Magnetic";
import { buttonGhostLight, buttonPrimary } from "@/components/ui/styles";

export function DeliveryStrip() {
  return (
    <section className="panel-gradient-rich relative overflow-hidden text-white">
      <div className="aurora pointer-events-none absolute right-0 top-0 size-80 rounded-full blur-3xl opacity-40" aria-hidden="true" />

      <ScrollScene scrub={0.65} className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div data-motion="wipe" className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase text-teal">How we deliver</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              Faster delivery. Clear time.
            </h2>
            <p className="mt-3 text-white/75">
              Domain-ready people. UAT as the clock. Cover after go-live. Connected to the rails your
              institution already runs.
            </p>
          </div>
          <div data-motion="slide-right" className="flex flex-wrap gap-3">
            <Link href="/delivery" className={buttonPrimary}>
              Delivery model
            </Link>
            <Link href="/contact" className={buttonGhostLight}>
              Talk to us
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {delivery.map((item, index) => (
            <Magnetic key={item.title} strength={8}>
              <article
                data-motion="blur-up"
                data-motion-delay={index * 0.07}
                className="glass-panel h-full rounded-[1.5rem] p-6"
              >
                <p className="font-mono text-sm text-teal">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/75">{item.body}</p>
              </article>
            </Magnetic>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p data-motion="fade" className="font-mono text-[11px] uppercase text-teal">
            Connected infrastructure
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {railPartners.map((rail, index) => (
              <div
                key={rail.name}
                data-motion="slide-left"
                data-motion-delay={0.04 + index * 0.06}
                className="rail-float-card rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4"
              >
                <p className="font-display text-lg tracking-tight">{rail.name}</p>
                <p className="mt-1 font-mono text-[11px] uppercase text-teal/90">{rail.note}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollScene>
    </section>
  );
}
