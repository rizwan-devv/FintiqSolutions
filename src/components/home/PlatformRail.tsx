"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { products } from "@/content/site";
import { getProductTheme } from "@/content/themes";
import { ProductStage } from "@/components/product/ProductStage";

const loop = [...products, ...products];

export function PlatformRail() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    let offset = 0;
    const speed = 0.32;

    const tick = () => {
      offset += speed;
      const half = track.scrollWidth / 2;
      if (half > 0 && offset >= half) offset -= half;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [reduce, paused]);

  return (
    <section className="border-b border-navy/10 bg-[#eef2f8]" aria-label="Platform rail">
      <div className="mx-auto max-w-6xl px-6 pt-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase text-signal-deep">Solutions</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-navy md:text-4xl">
              Seven platforms.{" "}
              <span className="text-gradient">One operating model.</span>
            </h2>
          </div>
          <Link href="/products" className="draw-link shrink-0 text-sm font-semibold text-signal-deep">
            See all →
          </Link>
        </div>
      </div>

      <div
        className="mt-10 overflow-hidden pb-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div ref={trackRef} className="flex w-max gap-5 px-6 will-change-transform">
          {loop.map((product, index) => {
            const theme = getProductTheme(product.slug);
            return (
              <Link
                key={`${product.slug}-${index}`}
                href={`/products/${product.slug}`}
                className="hover-lift group w-[min(82vw,20.5rem)] shrink-0 overflow-hidden rounded-[1.6rem] border border-navy/12 bg-white shadow-[0_16px_40px_rgb(16_36_88/0.1)]"
              >
                <ProductStage slug={product.slug} compact className="rounded-none" />
                <div className="border-t border-navy/8 bg-gradient-to-b from-white to-[#f5f8fc] p-5">
                  <p className="font-mono text-[11px] font-semibold uppercase" style={{ color: theme.accent }}>
                    {product.eyebrow}
                  </p>
                  <h3 className="product-title mt-2 font-display text-2xl">{product.name}</h3>
                  <span
                    className="product-title-accent"
                    style={{ backgroundImage: theme.titleGrad }}
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-sm leading-6 text-navy/80">{product.promise}</p>
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
