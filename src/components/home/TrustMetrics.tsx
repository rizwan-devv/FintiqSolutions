"use client";

import { CountUp } from "@/components/ui/CountUp";
import { ScrollScene } from "@/components/motion/ScrollScene";

const metrics = [
  { value: 7, suffix: "", label: "Core platforms", note: "Cards to lending" },
  { value: 4, suffix: "+", label: "Delivery modes", note: "Squad to support" },
  { value: 1, suffix: "", label: "Operating model", note: "UAT as the clock" },
  { value: 24, suffix: "h", label: "First response", note: "Business-day SLA" },
];

export function TrustMetrics() {
  return (
    <section
      className="relative overflow-hidden border-b border-navy/10 bg-white"
      aria-label="Trust metrics"
    >
      <ScrollScene scrub={0.65} className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div data-motion="wipe" className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal-deep">
            Built for regulated institutions
          </p>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-navy md:text-5xl md:leading-[1.05]">
            What goes live — with governance still in the room.
          </h2>
        </div>

        <div className="mt-14 grid border-t border-navy/10 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <article
              key={metric.label}
              data-motion="blur-up"
              data-motion-delay={index * 0.06}
              className={`border-navy/10 px-0 py-8 sm:px-6 ${
                index > 0 ? "border-t sm:border-t-0 sm:border-l" : ""
              } ${index > 1 ? "lg:border-t-0" : ""} ${index === 2 ? "sm:border-t lg:border-t-0" : ""}`}
            >
              <p className="font-display text-5xl tracking-tight text-navy md:text-6xl">
                <CountUp value={metric.value} suffix={metric.suffix} />
              </p>
              <h3 className="mt-4 font-display text-xl text-navy">{metric.label}</h3>
              <p className="mt-1 text-sm text-mist">{metric.note}</p>
            </article>
          ))}
        </div>
      </ScrollScene>
    </section>
  );
}
