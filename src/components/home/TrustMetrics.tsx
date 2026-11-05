"use client";

import { CountUp } from "@/components/ui/CountUp";
import { ScrollScene } from "@/components/motion/ScrollScene";
import { Magnetic } from "@/components/motion/Magnetic";
import { SignalOrbit } from "@/components/motion/SignalOrbit";

const metrics = [
  { value: 7, suffix: "", label: "Core platforms", note: "Cards to lending" },
  { value: 4, suffix: "+", label: "Delivery modes", note: "Squad to support" },
  { value: 1, suffix: "", label: "Operating model", note: "UAT as the clock" },
  { value: 24, suffix: "h", label: "First response", note: "Business-day SLA" },
];

export function TrustMetrics() {
  return (
    <section className="relative overflow-hidden border-b border-navy/10 bg-white" aria-label="Trust metrics">
      <SignalOrbit className="opacity-40" />
      <div className="section-bg-drift pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <ScrollScene scrub={0.65} className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div data-motion="wipe" className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal-deep">
            Built for regulated institutions
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-navy md:text-5xl md:leading-[1.05]">
            What goes live — with governance still in the room.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <Magnetic key={metric.label} strength={10}>
              <article
                data-motion="blur-up"
                data-motion-delay={index * 0.06}
                className="group relative overflow-hidden rounded-[1.1rem] border border-navy/10 bg-[#f6f8fc] p-6"
              >
                <div
                  className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-teal/10 blur-2xl transition group-hover:bg-teal/25"
                  aria-hidden="true"
                />
                <p className="font-display text-5xl tracking-tight text-navy md:text-6xl">
                  <CountUp value={metric.value} suffix={metric.suffix} />
                </p>
                <h3 className="mt-3 font-display text-xl text-navy">{metric.label}</h3>
                <p className="mt-1 text-sm text-mist">{metric.note}</p>
              </article>
            </Magnetic>
          ))}
        </div>
      </ScrollScene>
    </section>
  );
}
