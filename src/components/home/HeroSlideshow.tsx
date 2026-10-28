"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { products } from "@/content/site";
import { getProductTheme } from "@/content/themes";
import { ProductStage } from "@/components/product/ProductStage";
import { HeroVideo } from "@/components/home/HeroVideo";
import { buttonGhostLight, buttonPrimary } from "@/components/ui/styles";

const SLIDE_MS = 7000;

export function HeroSlideshow() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const product = products[index];
  const theme = getProductTheme(product.slug);

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
      aria-label="FintiQ platforms"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <HeroVideo />


      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-6xl items-center gap-8 px-6 pb-24 pt-32 sm:pb-28 sm:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24 lg:pt-40">
        <div>
          <motion.p
            className="font-mono text-[11px] uppercase text-teal"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Fintech platforms · AI solutions
          </motion.p>
          <motion.h1
            className="mt-5 max-w-xl text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[1.02]"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Secure platforms.{" "}
            <span className="text-gradient-light">AI that makes systems faster.</span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-lg text-lg leading-8 text-white/75"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
          >
            Enterprise solutions for cards, corporate banking, payments, cash, remittance, and lending —
            plus AI solutions that accelerate delivery and support intelligent workflows inside those systems.
          </motion.p>
          <motion.ul
            className="mt-5 hidden flex-wrap gap-2 sm:flex"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {["Agentic AI delivery", "Ops copilots", "Smarter UAT cycles"].map((item) => (
              <li
                key={item}
                className="rounded-full border border-teal/35 bg-teal/10 px-3 py-1 text-[11px] font-semibold text-teal"
              >
                {item}
              </li>
            ))}
          </motion.ul>
          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
          >
            <Link href="/contact" className={buttonPrimary}>
              Contact Us
            </Link>
            <Link href="/products" className={buttonGhostLight}>
              Explore solutions
            </Link>
          </motion.div>

          <div className="mt-8 hidden flex-wrap gap-2 md:flex">
            {products.map((item, itemIndex) => {
              const itemTheme = getProductTheme(item.slug);
              const active = itemIndex === index;
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => go(itemIndex)}
                  aria-current={active ? "true" : undefined}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition duration-150 ${
                    active
                      ? "border-transparent text-ink shadow-[0_8px_20px_rgb(0_0_0/0.25)]"
                      : "border-white/20 bg-white/5 text-white/85 hover:bg-white/10"
                  }`}
                  style={active ? { background: itemTheme.accent } : undefined}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-navy/10 bg-white p-4 shadow-[0_16px_40px_rgb(0_0_0/0.25)] lg:hidden">
            <p className="font-mono text-[11px] font-semibold uppercase" style={{ color: theme.accent }}>
              {product.eyebrow}
            </p>
            <h2 className="product-title mt-1 font-display text-xl">{product.name}</h2>
            <span
              className="product-title-accent"
              style={{ backgroundImage: theme.titleGrad }}
              aria-hidden="true"
            />
            <p className="mt-2 text-sm leading-6 text-navy/80">{product.promise}</p>
            <Link
              href={`/products/${product.slug}`}
              className="draw-link mt-3 inline-flex text-sm font-semibold"
              style={{ color: theme.accent }}
            >
              Open {product.name} →
            </Link>
          </div>
        </div>

        <div className="relative mx-auto hidden w-full max-w-[26rem] lg:block xl:max-w-[28rem]">
          <div className="float-card flex w-full flex-col overflow-hidden rounded-[1.8rem] border border-white/15 shadow-[0_30px_80px_rgb(0_0_0/0.4)]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={product.slug}
                custom={direction}
                initial={reduce ? false : { opacity: 0, x: direction * 44 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: direction * -44 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex w-full flex-col"
              >
                <ProductStage slug={product.slug} className="w-full rounded-none" />
                <div className="flex min-h-[9.5rem] w-full flex-col justify-between border-t border-navy/10 bg-gradient-to-b from-white to-[#f3f6fb] px-5 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[11px] font-semibold uppercase" style={{ color: theme.accent }}>
                        {product.eyebrow}
                      </p>
                      <h2 className="product-title mt-1 font-display text-2xl leading-tight">{product.name}</h2>
                      <span
                        className="product-title-accent"
                        style={{ backgroundImage: theme.titleGrad }}
                        aria-hidden="true"
                      />
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-navy/80">{product.promise}</p>
                    </div>
                    <p className="shrink-0 font-mono text-[11px] font-semibold text-navy/45">
                      {String(index + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                    </p>
                  </div>
                  <Link
                    href={`/products/${product.slug}`}
                    className="draw-link mt-3 inline-flex text-sm font-semibold"
                    style={{ color: theme.accent }}
                  >
                    Open {product.name} →
                  </Link>
                </div>
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
          </div>
        </div>

        <div className="mt-2 flex items-center gap-3 lg:hidden">
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white"
            aria-label="Previous platform"
            onClick={() => go(index - 1)}
          >
            ←
          </button>
          <div className="flex flex-1 gap-1.5">
            {products.map((item, itemIndex) => (
              <button
                key={item.slug}
                type="button"
                aria-label={item.name}
                aria-current={itemIndex === index ? "true" : undefined}
                onClick={() => go(itemIndex)}
                className={`h-1.5 flex-1 rounded-full ${itemIndex === index ? "bg-teal" : "bg-white/25"}`}
              />
            ))}
          </div>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white"
            aria-label="Next platform"
            onClick={() => go(index + 1)}
          >
            →
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-5 hidden justify-center sm:flex">
        <span className="scroll-cue font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
          Scroll
        </span>
      </div>
    </section>
  );
}
