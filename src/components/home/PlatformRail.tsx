"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { products } from "@/content/site";
import { getProductTheme } from "@/content/themes";
import { ProductStage } from "@/components/product/ProductStage";

const loop = [...products, ...products];

export function PlatformRail() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const speedRef = useRef(0.38);
  const frameRef = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const track = trackRef.current;
    if (!track) return;

    const tick = () => {
      offsetRef.current += speedRef.current;
      const half = track.scrollWidth / 2;
      if (half > 0 && offsetRef.current >= half) offsetRef.current -= half;
      if (half > 0 && offsetRef.current < 0) offsetRef.current += half;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameRef.current);
  }, [reduce]);

  function nudge(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const step = Math.min(360, track.clientWidth * 0.35);
    offsetRef.current += direction * step;
    const half = track.scrollWidth / 2;
    if (half > 0) {
      while (offsetRef.current >= half) offsetRef.current -= half;
      while (offsetRef.current < 0) offsetRef.current += half;
    }
    track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
  }

  return (
    <section className="border-b border-navy/10 bg-[#eef2f8]" aria-label="Platform rail">
      <div className="mx-auto max-w-6xl px-6 pt-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase text-signal-deep">Solutions</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-navy md:text-4xl">
              Seven platforms.{" "}
              <span className="text-gradient">One operating model.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => nudge(-1)}
                className="inline-flex size-11 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-sm transition hover:border-teal hover:bg-teal hover:text-ink"
                aria-label="Scroll products left"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                className="inline-flex size-11 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-sm transition hover:border-teal hover:bg-teal hover:text-ink"
                aria-label="Scroll products right"
              >
                →
              </button>
            </div>
            <Link href="/products" className="draw-link shrink-0 text-sm font-semibold text-signal-deep">
              See all →
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 overflow-hidden pb-14">
        <div ref={trackRef} className="flex w-max gap-5 px-6 will-change-transform">
          {loop.map((product, index) => {
            const theme = getProductTheme(product.slug);
            return (
              <Link
                key={`${product.slug}-${index}`}
                href={`/products/${product.slug}`}
                className="hover-lift group flex w-[min(82vw,20.5rem)] shrink-0 flex-col overflow-hidden rounded-[1.6rem] border border-navy/12 bg-white shadow-[0_16px_40px_rgb(16_36_88/0.1)]"
              >
                <ProductStage slug={product.slug} compact className="w-full rounded-none" />
                <div className="flex min-h-[10.25rem] w-full flex-col border-t border-navy/8 bg-gradient-to-b from-white to-[#f5f8fc] p-5">
                  <p className="font-mono text-[11px] font-semibold uppercase" style={{ color: theme.accent }}>
                    {product.eyebrow}
                  </p>
                  <h3 className="product-title mt-2 font-display text-2xl leading-tight">{product.name}</h3>
                  <span
                    className="product-title-accent"
                    style={{ backgroundImage: theme.titleGrad }}
                    aria-hidden="true"
                  />
                  <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-navy/80">{product.promise}</p>
                  <span
                    className="mt-4 inline-flex text-sm font-semibold transition group-hover:translate-x-1 motion-reduce:transform-none"
                    style={{ color: theme.accent }}
                  >
                    Open →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
