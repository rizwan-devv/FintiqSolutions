"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { services } from "@/content/site";
import { buttonGhost } from "@/components/ui/styles";

const SLIDE_MS = 7000;

export function ServiceSlideshow() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const service = services[index];

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % services.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [reduce, index]);

  function go(next: number) {
    setIndex((next + services.length) % services.length);
  }

  return (
    <section className="section-wash" aria-roledescription="carousel" aria-label="FintiQ services">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase text-signal-deep">Services</p>
            <h2 className="mt-3 max-w-lg text-4xl md:text-5xl">
              Platforms. <span className="text-gradient">People after go-live.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Previous service" onClick={() => go(index - 1)} className="inline-flex size-11 items-center justify-center rounded-full border border-navy/15">
              ←
            </button>
            <button type="button" aria-label="Next service" onClick={() => go(index + 1)} className="inline-flex size-11 items-center justify-center rounded-full border border-navy/15">
              →
            </button>
            <Link href="/services" className={buttonGhost}>
              All services
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-2">
            {services.map((item, itemIndex) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => go(itemIndex)}
                className={`rounded-2xl px-4 py-3 text-left transition duration-200 ${
                  itemIndex === index
                    ? "pill-active"
                    : "text-navy hover:bg-white/70"
                }`}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] opacity-70">
                  {String(itemIndex + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 block text-lg font-semibold">{item.name}</span>
              </button>
            ))}
          </div>

          <div className="panel-gradient-rich relative min-h-80 overflow-hidden rounded-[1.7rem] p-8 text-white md:p-10">
            <div className="aurora pointer-events-none absolute -right-10 top-0 size-56 rounded-full blur-3xl opacity-50" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.div
                key={service.slug}
                className="relative"
                initial={reduce ? false : { opacity: 0, x: 36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -36 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-teal">{service.eyebrow}</p>
                <h3 className="mt-4 text-4xl text-white">{service.name}</h3>
                <p className="mt-4 max-w-md text-base leading-7 text-white/80">{service.summary}</p>
                <Link href={`/services/${service.slug}`} className="mt-8 inline-flex h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-navy transition duration-150 hover:-translate-y-0.5 motion-reduce:transform-none">
                  View {service.name}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
