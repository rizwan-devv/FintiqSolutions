"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type TouchEvent,
} from "react";
import { products } from "@/content/site";
import { getProductTheme } from "@/content/themes";
import { ProductStage } from "@/components/product/ProductStage";
import { buttonGhostLight, buttonPrimary } from "@/components/ui/styles";

const labels: Record<string, string> = {
  "card-management-system": "CMS",
  "corporate-banking": "Corporate",
  "payment-gateway": "Gateway",
  "cash-management-system": "Cash",
  "remittance-system": "Remit",
  "loan-origination-system": "LOS",
  "loan-management-system": "LMS",
};

export function ProductsExplorer() {
  const reduce = useReducedMotion();
  const shellRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const product = products[active] ?? products[0];
  const theme = getProductTheme(product.slug);
  const prev = products[(active - 1 + products.length) % products.length];
  const next = products[(active + 1) % products.length];

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const tiltX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const tiltY = useTransform(sx, [-0.5, 0.5], [-8, 8]);

  const select = useCallback((index: number, direction = 1) => {
    setDir(direction);
    setActive(((index % products.length) + products.length) % products.length);
  }, []);

  const onTouchStart = (e: TouchEvent) => {
    const t = e.changedTouches[0];
    if (!t) return;
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: TouchEvent) => {
    const start = touchStart.current;
    const t = e.changedTouches[0];
    touchStart.current = null;
    if (!start || !t) return;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.15) return;
    select(active + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  };

  useEffect(() => {
    const el = shellRef.current;
    if (!el || reduce) return;

    let locked = false;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 18) return;
      e.preventDefault();
      if (locked) return;
      locked = true;
      select(active + (e.deltaY > 0 ? 1 : -1), e.deltaY > 0 ? 1 : -1);
      window.setTimeout(() => {
        locked = false;
      }, 650);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [active, reduce, select]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        select(active + 1, 1);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        select(active - 1, -1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, select]);

  const onMove = (e: MouseEvent) => {
    if (reduce || !shellRef.current) return;
    const r = shellRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={shellRef}
      className="relative h-[calc(100svh-4.75rem)] min-h-[34rem] overflow-hidden bg-[#050d1c] text-white md:h-[calc(100svh-5rem)]"
      aria-label="Solutions spotlight"
      onMouseMove={onMove}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${product.slug}`}
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            background: `
              radial-gradient(ellipse 85% 70% at 70% 45%, ${theme.accent}40, transparent 58%),
              radial-gradient(ellipse 55% 45% at 8% 85%, rgb(0 176 164 / 0.22), transparent 50%),
              linear-gradient(160deg, #050d1c 0%, #0a1a38 52%, #071a24 100%)
            `,
          }}
          aria-hidden="true"
        />
      </AnimatePresence>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255 / 0.035) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 50% 40%, black 20%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* Giant index watermark */}
      <AnimatePresence mode="wait">
        <motion.p
          key={`num-${product.slug}`}
          className="pointer-events-none absolute -right-6 top-[18%] select-none font-display text-[38vw] font-bold leading-none text-white/[0.04] md:right-[2%] md:text-[22rem]"
          initial={reduce ? false : { opacity: 0, x: dir * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -30 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          {String(active + 1).padStart(2, "0")}
        </motion.p>
      </AnimatePresence>

      <div className="relative z-[1] mx-auto flex h-full max-w-7xl flex-col px-6 pb-24 pt-8 md:pb-28 md:pt-10">
        <div className="mb-3 flex items-center justify-between gap-4 md:mb-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-teal">Solutions</p>
          <p className="font-mono text-xs tabular-nums text-white/40">
            <span style={{ color: theme.accent }}>{String(active + 1).padStart(2, "0")}</span>
            <span className="mx-1.5 text-white/25">/</span>
            {String(products.length).padStart(2, "0")}
          </p>
        </div>

        <div className="grid min-h-0 flex-1 items-center gap-6 pb-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
          <div className="relative z-[2] max-w-xl">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={product.slug}
                custom={dir}
                initial={reduce ? false : { opacity: 0, y: dir * 36 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: dir * -28 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: theme.accent }}
                >
                  {product.eyebrow}
                </p>
                <h1 className="mt-3 font-display text-4xl leading-[0.95] tracking-tight md:text-5xl lg:text-[3.75rem]">
                  {product.name}
                </h1>
                <p className="mt-5 text-base font-semibold leading-7 text-white/90 md:text-lg md:leading-8">
                  {product.promise}
                </p>
                <p className="mt-3 max-w-md text-sm leading-7 text-white/55 line-clamp-2">
                  {product.summary}
                </p>

                <ul className="mt-6 space-y-2">
                  {product.capabilities.slice(0, 3).map((cap) => (
                    <li key={cap.title} className="flex items-center gap-3 text-sm text-white/75">
                      <span
                        className="size-1.5 shrink-0 rounded-full"
                        style={{ background: theme.accent }}
                        aria-hidden="true"
                      />
                      {cap.title}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link href={`/products/${product.slug}`} className={buttonPrimary}>
                    Open platform
                  </Link>
                  <Link href="/contact" className={buttonGhostLight}>
                    Talk to us
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floating holographic stage */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <motion.div
              className="relative"
              style={
                reduce
                  ? undefined
                  : {
                      rotateX: tiltX,
                      rotateY: tiltY,
                      transformPerspective: 1100,
                    }
              }
            >
              <div
                className="pointer-events-none absolute -inset-10 rounded-full blur-3xl"
                style={{ background: `${theme.accent}33` }}
                aria-hidden="true"
              />
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={`stage-${product.slug}`}
                  custom={dir}
                  initial={reduce ? false : { opacity: 0, scale: 0.92, rotate: dir * 3 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.94, rotate: dir * -2 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="relative overflow-hidden rounded-[2rem] border border-white/15 shadow-[0_50px_120px_rgb(0_0_0/0.55)]"
                >
                  <div
                    className="absolute inset-x-0 top-0 z-[1] h-[3px]"
                    style={{ background: `linear-gradient(90deg, ${theme.accent}, #00b0a4)` }}
                    aria-hidden="true"
                  />
                  <ProductStage slug={product.slug} tall className="w-full rounded-none" />
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex items-center justify-between border-t border-white/10 bg-[#071530]/80 px-5 py-3.5 backdrop-blur-md transition hover:bg-[#0a1f45]/90"
                  >
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                        Live desk
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-white">{product.name}</p>
                    </div>
                    <span
                      className="inline-flex size-10 items-center justify-center rounded-full text-sm font-bold text-[#071530]"
                      style={{ background: theme.accent }}
                    >
                      →
                    </span>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Edge peeks */}
            <button
              type="button"
              onClick={() => select(active - 1, -1)}
              className="absolute -left-2 top-1/2 z-[3] hidden -translate-y-1/2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left backdrop-blur-md transition hover:border-white/25 hover:bg-white/10 md:block lg:-left-4"
              aria-label={`Previous: ${prev.name}`}
            >
              <span className="block font-mono text-[10px] text-white/40">Prev</span>
              <span className="block max-w-[5.5rem] truncate text-xs font-semibold text-white/75">
                {labels[prev.slug]}
              </span>
            </button>
            <button
              type="button"
              onClick={() => select(active + 1, 1)}
              className="absolute -right-2 top-1/2 z-[3] hidden -translate-y-1/2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-right backdrop-blur-md transition hover:border-white/25 hover:bg-white/10 md:block lg:-right-4"
              aria-label={`Next: ${next.name}`}
            >
              <span className="block font-mono text-[10px] text-white/40">Next</span>
              <span className="block max-w-[5.5rem] truncate text-xs font-semibold text-white/75">
                {labels[next.slug]}
              </span>
            </button>
          </div>
        </div>

      </div>

      {/* Floating constellation dock */}
      <nav
        className="absolute inset-x-0 bottom-5 z-[4] px-4 md:bottom-7"
        aria-label="Platforms"
      >
        <div className="mx-auto max-w-3xl rounded-[1.4rem] border border-white/12 bg-[#071530]/75 px-4 py-3 shadow-[0_24px_60px_rgb(0_0_0/0.45)] backdrop-blur-xl md:px-6 md:py-3.5">
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-[5%] right-[5%] top-[0.55rem] hidden h-6 md:block"
              viewBox="0 0 100 8"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0 4 Q 25 0 50 4 T 100 4"
                fill="none"
                stroke="rgb(255 255 255 / 0.14)"
                strokeWidth="0.4"
              />
              <motion.path
                d="M0 4 Q 25 0 50 4 T 100 4"
                fill="none"
                stroke={theme.accent}
                strokeWidth="0.5"
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: (active + 1) / products.length }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>

            <ul className="relative flex items-start justify-between gap-1">
              {products.map((p, i) => {
                const t = getProductTheme(p.slug);
                const on = i === active;
                return (
                  <li key={p.slug} className="flex flex-1 flex-col items-center">
                    <button
                      type="button"
                      onClick={() => select(i, i > active ? 1 : -1)}
                      className="group flex flex-col items-center gap-2"
                      aria-current={on ? "true" : undefined}
                    >
                      <span
                        className={`rounded-full transition duration-300 ${
                          on
                            ? "size-3.5 shadow-[0_0_24px_var(--glow)]"
                            : "size-2.5 bg-white/30 group-hover:bg-white/60"
                        }`}
                        style={
                          on
                            ? ({
                                background: t.accent,
                                ["--glow" as string]: `${t.accent}88`,
                              } as CSSProperties)
                            : undefined
                        }
                      />
                      <span
                        className={`max-w-[4.5rem] truncate text-center font-mono text-[10px] uppercase tracking-[0.12em] transition md:max-w-none ${
                          on ? "font-semibold text-white" : "text-white/40 group-hover:text-white/70"
                        }`}
                        style={on ? { color: t.accent } : undefined}
                      >
                        {labels[p.slug]}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
}
