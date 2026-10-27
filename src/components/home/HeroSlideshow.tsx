"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { products } from "@/content/site";
import { ProductMock } from "@/components/product/ProductMock";
import { buttonGhostLight, buttonPrimary } from "@/components/ui/styles";

const SLIDE_MS = 7000;

export function HeroSlideshow() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const product = products[index];

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % products.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, index]);

  function go(next: number) {
    const normalized = (next + products.length) % products.length;
    const delta = (normalized - index + products.length) % products.length;
    setDirection(delta > 0 && delta <= products.length / 2 ? 1 : -1);
    setIndex(normalized);
  }

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-ink-raised text-white"
      aria-roledescription="carousel"
      aria-label="Fintiq platforms"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={`bg-${product.slug}`}
          className={`hero-bleed absolute inset-0 ${reduce ? "" : "ken-burns"}`}
          style={{ backgroundImage: bleedFor(index) }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />
      </AnimatePresence>
      <div className="hero-grid hero-grid-on-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-raised via-ink-raised/85 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-raised to-transparent" aria-hidden="true" />
      <div className="aurora pointer-events-none absolute -right-10 top-28 size-[28rem] rounded-full blur-3xl opacity-70" aria-hidden="true" />
      <div className="aurora-soft pointer-events-none absolute -left-20 bottom-10 size-[22rem] rounded-full blur-3xl opacity-50" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-10 px-6 pb-28 pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-40">
        <div>
          <motion.p
            className="font-mono text-[11px] uppercase text-teal"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Fintiq Solutions
          </motion.p>
          <motion.h1
            className="mt-5 max-w-xl text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[1.02]"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Banking and payments platforms,{" "}
            <span className="text-gradient-light">ready to brand as yours.</span>
          </motion.h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-white/75">
            Collections, onboarding, cards, agent banking, and the switch in front of the core. Staffed by people who already build them.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className={buttonPrimary}>
              Talk to us
            </Link>
            <Link href="/products" className={buttonGhostLight}>
              All platforms
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {products.map((item, itemIndex) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => go(itemIndex)}
                aria-current={itemIndex === index ? "true" : undefined}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition duration-150 ${
                  itemIndex === index
                    ? "border-transparent bg-[linear-gradient(110deg,#00b0a4,#7be0d8)] text-ink shadow-[0_8px_20px_rgb(0_176_164/0.35)]"
                    : "border-white/20 bg-white/5 text-white/85 hover:border-teal hover:bg-white/10"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="glass-panel glass-panel-ring float-card overflow-hidden rounded-[1.8rem] p-5">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={product.slug}
                custom={direction}
                initial={reduce ? false : { opacity: 0, x: direction * 44 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: direction * -44 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[11px] uppercase text-teal">{product.eyebrow}</p>
                  <p className="font-mono text-[11px] text-white/55">
                    {String(index + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                  </p>
                </div>
                <h2 className="mt-3 font-display text-3xl">{product.name}</h2>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/70">{product.promise}</p>
                <div className="mt-5 rounded-2xl bg-white p-1 text-navy">
                  <ProductMock slug={product.slug} />
                </div>
                <Link
                  href={`/products/${product.slug}`}
                  className="draw-link mt-4 inline-flex text-sm font-semibold text-white"
                >
                  Open {product.name} →
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:border-teal hover:bg-teal hover:text-ink"
              aria-label="Previous platform"
              onClick={() => go(index - 1)}
            >
              ←
            </button>
            <div className="flex flex-1 gap-2">
              {products.map((item, itemIndex) => (
                <button
                  key={item.slug}
                  type="button"
                  aria-label={item.name}
                  aria-current={itemIndex === index ? "true" : undefined}
                  onClick={() => go(itemIndex)}
                  className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/20"
                >
                  {itemIndex === index ? (
                    <span
                      className={`slide-progress block h-full w-full ${paused || reduce ? "is-paused" : ""}`}
                      style={{ animationDuration: "7s" }}
                    />
                  ) : null}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:border-teal hover:bg-teal hover:text-ink"
              aria-label="Next platform"
              onClick={() => go(index + 1)}
            >
              →
            </button>
            <button
              type="button"
              className="hidden h-10 rounded-full px-3 text-xs font-semibold text-white/70 sm:inline-flex"
              onClick={() => setPaused((value) => !value)}
            >
              {paused ? "Play" : "Pause"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function bleedFor(index: number) {
  const palettes = [
    "radial-gradient(ellipse at 80% 20%, rgb(0 176 164 / 0.45), transparent 42%), linear-gradient(145deg, #0b1c40 0%, #102458 48%, #0a4f5c 100%)",
    "radial-gradient(ellipse at 70% 30%, rgb(16 36 88 / 0.2), transparent 40%), linear-gradient(160deg, #071530 0%, #123a6b 55%, #087f78 120%)",
    "radial-gradient(ellipse at 85% 15%, rgb(0 176 164 / 0.35), transparent 45%), linear-gradient(150deg, #0b1c40 0%, #16366a 50%, #0c6484 100%)",
    "radial-gradient(ellipse at 75% 25%, rgb(0 140 150 / 0.4), transparent 44%), linear-gradient(155deg, #061228 0%, #102458 46%, #0d5f6a 100%)",
    "radial-gradient(ellipse at 90% 10%, rgb(0 176 164 / 0.3), transparent 40%), linear-gradient(140deg, #0a1838 0%, #1a3f72 52%, #087f78 110%)",
    "radial-gradient(ellipse at 65% 20%, rgb(16 36 88 / 0.35), transparent 42%), linear-gradient(165deg, #071530 0%, #102458 40%, #0c6484 100%)",
  ];
  return palettes[index % palettes.length];
}
