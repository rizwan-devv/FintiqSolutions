"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { products } from "@/content/site";
import { getProductTheme } from "@/content/themes";
import { ProductStage } from "@/components/product/ProductStage";
import { HeroVideo } from "@/components/home/HeroVideo";
import { buttonGhostLight, buttonPrimary } from "@/components/ui/styles";

const SLIDE_MS = 7000;
const easeOut = [0.22, 1, 0.36, 1] as const;

export function HeroSlideshow() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const dragStartX = useRef<number | null>(null);
  const product = products[index];
  const theme = getProductTheme(product.slug);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % products.length);
    }, paused ? SLIDE_MS * 1.6 : SLIDE_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, index]);

  function go(next: number) {
    const normalized = (next + products.length) % products.length;
    const delta = (normalized - index + products.length) % products.length;
    setDirection(delta > 0 && delta <= products.length / 2 ? 1 : -1);
    setIndex(normalized);
  }

  function onPointerDown(clientX: number) {
    dragStartX.current = clientX;
    setPaused(true);
  }

  function onPointerUp(clientX: number) {
    if (dragStartX.current == null) return;
    const dx = clientX - dragStartX.current;
    dragStartX.current = null;
    setPaused(false);
    if (Math.abs(dx) < 48) return;
    if (dx < 0) go(index + 1);
    else go(index - 1);
  }

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-ink-raised text-white"
      aria-roledescription="carousel"
      aria-label="FintiQ platforms"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <HeroVideo accent={theme.accent} />

      <div
        className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-r from-ink-raised via-ink-raised/55 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-32 bg-gradient-to-t from-ink-raised/90 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-16 pt-32 sm:pb-20 sm:pt-36 lg:justify-center lg:pb-24 lg:pt-40">
        <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">
          <div className="max-w-2xl">
            <motion.p
              className="font-mono text-[11px] uppercase tracking-[0.28em] text-teal"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              FintiQ Solutions
            </motion.p>

            <motion.h1
              className="mt-5 font-display text-[clamp(2.85rem,6.2vw,5.25rem)] leading-[0.98] tracking-[-0.03em]"
              initial={reduce ? false : { opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.05, ease: easeOut }}
            >
              Secure platforms.
              <span className="mt-1 block text-gradient-light">Real financial ops.</span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-md text-base leading-7 text-white/70 sm:text-lg sm:leading-8"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12 }}
            >
              Enterprise fintech for banks — cards, payments, cash, wallets, lending, and digital
              channels. Technology partner only.
            </motion.p>

            <div className="relative mt-5 h-7 overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.p
                  key={product.slug}
                  custom={direction}
                  className="absolute inset-x-0 font-mono text-[12px] uppercase tracking-[0.16em]"
                  style={{ color: theme.accent }}
                  initial={reduce ? false : { opacity: 0, x: direction * 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: direction * -28 }}
                  transition={{ duration: 0.35, ease: easeOut }}
                >
                  Now featuring · {product.name}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
            >
              <Link href="/contact" className={buttonPrimary}>
                Talk to us
              </Link>
              <Link href="/products" className={buttonGhostLight}>
                Explore platforms
              </Link>
              <a
                href="/FintiQ-Solutions-Company-Profile.pdf"
                download="FintiQ-Solutions-Company-Profile.pdf"
                className="text-sm font-semibold text-white/55 underline-offset-4 transition hover:text-teal hover:underline"
              >
                Company profile
              </a>
            </motion.div>
          </div>

          {/* Horizontal product rail — desktop */}
          <div className="relative mx-auto hidden w-full max-w-[28rem] lg:block">
            <motion.div
              className="absolute -inset-10 -z-10 rounded-full opacity-60 blur-3xl"
              animate={{
                background: `radial-gradient(circle at 50% 45%, ${theme.accent}44, transparent 68%)`,
              }}
              transition={{ duration: 0.65 }}
              aria-hidden="true"
            />

            <div
              className="overflow-hidden rounded-[1.25rem] border border-white/10 shadow-[0_40px_100px_rgb(0_0_0/0.45)] touch-pan-y"
              onPointerDown={(e) => onPointerDown(e.clientX)}
              onPointerUp={(e) => onPointerUp(e.clientX)}
              onPointerCancel={() => {
                dragStartX.current = null;
                setPaused(false);
              }}
              onPointerLeave={(e) => {
                if (dragStartX.current != null) onPointerUp(e.clientX);
              }}
            >
              <motion.div
                className="flex"
                animate={{ x: `${-index * 100}%` }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 280, damping: 32, mass: 0.85 }
                }
              >
                {products.map((item) => {
                  const itemTheme = getProductTheme(item.slug);
                  return (
                    <div key={item.slug} className="w-full shrink-0 basis-full">
                      <ProductStage slug={item.slug} className="w-full rounded-none" />
                      <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-ink-raised/90 px-5 py-4 backdrop-blur-md">
                        <div className="min-w-0">
                          <p
                            className="font-mono text-[10px] uppercase tracking-[0.16em]"
                            style={{ color: itemTheme.accent }}
                          >
                            {item.eyebrow}
                          </p>
                          <p className="font-display text-lg tracking-tight text-white">{item.name}</p>
                          <p className="mt-0.5 truncate text-sm text-white/55">{item.promise}</p>
                        </div>
                        <Link
                          href={`/products/${item.slug}`}
                          className="shrink-0 text-sm font-semibold text-teal"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Open →
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-teal hover:bg-teal hover:text-ink"
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
                    className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15"
                  >
                    {itemIndex === index ? (
                      <motion.span
                        key={`${item.slug}-progress`}
                        className={`slide-progress block h-full w-full rounded-full ${paused || reduce ? "is-paused" : ""}`}
                        style={{
                          animationDuration: "7s",
                          backgroundImage: `linear-gradient(90deg, ${theme.accent}, #7be0d8)`,
                        }}
                      />
                    ) : null}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-teal hover:bg-teal hover:text-ink"
                aria-label="Next platform"
                onClick={() => go(index + 1)}
              >
                →
              </button>
            </div>
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
              Drag sideways · {index + 1} / {products.length}
            </p>
          </div>
        </div>

        {/* Horizontal product rail — mobile */}
        <div className="mt-10 lg:hidden">
          <div
            className="overflow-hidden rounded-[1.25rem] border border-white/12 touch-pan-y"
            onPointerDown={(e) => onPointerDown(e.clientX)}
            onPointerUp={(e) => onPointerUp(e.clientX)}
            onPointerCancel={() => {
              dragStartX.current = null;
              setPaused(false);
            }}
          >
            <motion.div
              className="flex"
              animate={{ x: `${-index * 100}%` }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 300, damping: 34, mass: 0.8 }
              }
            >
              {products.map((item) => (
                <div key={item.slug} className="w-full shrink-0 basis-full">
                  <ProductStage slug={item.slug} className="w-full rounded-none" />
                  <div className="border-t border-white/10 bg-ink-raised/95 px-4 py-4">
                    <p className="font-display text-lg text-white">{item.name}</p>
                    <p className="mt-1 text-sm text-white/60">{item.promise}</p>
                    <Link
                      href={`/products/${item.slug}`}
                      className="mt-3 inline-flex text-sm font-semibold text-teal"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Open {item.name} →
                    </Link>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white"
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
                  className={`h-1 flex-1 rounded-full transition ${
                    itemIndex === index ? "bg-teal" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white"
              aria-label="Next platform"
              onClick={() => go(index + 1)}
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden justify-center sm:flex">
        <span className="scroll-cue font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
          Scroll
        </span>
      </div>
    </section>
  );
}
