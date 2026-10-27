"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { insights } from "@/content/site";

const SLIDE_MS = 6800;

export function InsightsShelf() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const insight = insights[index];

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % insights.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, index]);

  return (
    <section
      className="section-wash"
      aria-roledescription="carousel"
      aria-label="Insights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-mono text-[11px] uppercase text-signal-deep">Insights</p>
          <h2 className="mt-4 font-display text-5xl tracking-tight">Insights.</h2>
          <div className="mt-8 flex flex-col gap-2">
            {insights.map((item, itemIndex) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => setIndex(itemIndex)}
                aria-current={itemIndex === index ? "true" : undefined}
                className={`rounded-2xl px-4 py-3 text-left transition duration-150 ${
                  itemIndex === index ? "pill-active" : "surface-card text-navy"
                }`}
              >
                <span className="font-mono text-[11px] uppercase opacity-70">{item.eyebrow}</span>
                <span className="mt-1 block text-sm font-semibold">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.article
              key={insight.slug}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="panel-gradient-rich relative overflow-hidden rounded-[1.8rem] p-8 text-white shadow-sm md:p-10"
            >
              <div className="aurora-soft pointer-events-none absolute -right-10 bottom-0 size-48 rounded-full blur-3xl opacity-50" aria-hidden="true" />
              <div className="relative">
                <p className="font-mono text-[11px] uppercase text-teal">{insight.eyebrow}</p>
                <h3 className="mt-4 font-display text-4xl">{insight.title}</h3>
                <p className="mt-4 text-lg leading-8 text-white/85">{insight.summary}</p>
                <Link href={`/insights/${insight.slug}`} className="draw-link mt-8 inline-flex text-sm font-semibold text-white">
                  Read the note →
                </Link>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
