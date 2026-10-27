"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { work } from "@/content/site";

const SLIDE_MS = 7200;

export function WorkSlideshow() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const items = work.slice(0, 3);
  const item = items[index];

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % items.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, index, items.length]);

  function go(next: number) {
    const normalized = (next + items.length) % items.length;
    const delta = (normalized - index + items.length) % items.length;
    setDirection(delta > 0 && delta <= work.length / 2 ? 1 : -1);
    setIndex(normalized);
  }

  return (
    <section
      className=""
      aria-roledescription="carousel"
      aria-label="Selected work"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase text-signal-deep">Work</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl tracking-tight md:text-5xl">Selected work.</h2>
          </div>
          <Link href="/work" className="draw-link text-sm font-semibold text-signal-deep">
            All work →
          </Link>
        </div>

        <div className="panel-gradient-rich relative mt-12 overflow-hidden rounded-[1.8rem] text-white">
          <div className="aurora pointer-events-none absolute -right-16 top-0 size-64 rounded-full blur-3xl opacity-45" aria-hidden="true" />
          <AnimatePresence mode="wait" custom={direction}>
            <motion.article
              key={item.title}
              custom={direction}
              initial={reduce ? false : { opacity: 0, x: direction * 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: direction * -48 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid gap-8 p-7 md:grid-cols-12 md:p-10"
            >
              <div className="md:col-span-4">
                <p className="font-mono text-sm text-teal">
                  {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-3xl md:text-4xl">{item.title}</h3>
              </div>
              <dl className="grid gap-4 md:col-span-8">
                <div>
                  <dt className="font-mono text-[11px] uppercase text-white/55">Problem</dt>
                  <dd className="mt-1 leading-7 text-white/85">{item.problem}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase text-white/55">Shipped</dt>
                  <dd className="mt-1 leading-7 text-white/85">{item.shipped}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase text-white/55">Result</dt>
                  <dd className="mt-1 leading-7 text-white">{item.result}</dd>
                </div>
              </dl>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-navy/15 bg-white"
            aria-label="Previous engagement"
            onClick={() => go(index - 1)}
          >
            ←
          </button>
          <div className="flex flex-1 gap-2">
            {items.map((study, studyIndex) => (
              <button
                key={study.title}
                type="button"
                aria-label={study.title}
                aria-current={studyIndex === index ? "true" : undefined}
                onClick={() => go(studyIndex)}
                className="h-1.5 flex-1 overflow-hidden rounded-full bg-navy/10"
              >
                {studyIndex === index ? (
                  <span
                    className={`slide-progress block h-full w-full bg-navy ${paused || reduce ? "is-paused" : ""}`}
                    style={{ animationDuration: "7.2s" }}
                  />
                ) : null}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-navy/15 bg-white"
            aria-label="Next engagement"
            onClick={() => go(index + 1)}
          >
            →
          </button>
          <button
            type="button"
            className="hidden h-10 rounded-full px-3 text-xs font-semibold text-navy/70 sm:inline-flex"
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? "Play" : "Pause"}
          </button>
        </div>
      </div>
    </section>
  );
}
