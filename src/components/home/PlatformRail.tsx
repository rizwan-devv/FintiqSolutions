"use client";

import { useRef } from "react";
import Link from "next/link";
import { products } from "@/content/site";
import { ProductMock } from "@/components/product/ProductMock";

export function PlatformRail() {
  const scroller = useRef<HTMLDivElement>(null);

  function scroll(by: number) {
    scroller.current?.scrollBy({ left: by, behavior: "smooth" });
  }

  return (
    <section className="border-b border-navy/10 bg-paper-deep" aria-label="Platform rail">
      <div className="mx-auto max-w-6xl px-6 pt-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase text-signal-deep">Platforms</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">Pick a channel. Open the product.</h2>
          </div>
          <Link href="/products" className="draw-link shrink-0 text-sm font-semibold text-signal-deep">
            See all →
          </Link>
        </div>
      </div>

      <div
        ref={scroller}
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 scrollbar-none md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
      >
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="hover-lift surface-card group w-[min(86vw,20rem)] shrink-0 snap-start overflow-hidden rounded-[1.6rem]"
          >
            <div className="overflow-hidden bg-[linear-gradient(180deg,#dce8f5,#eef4fa)] p-4">
              <div className="transition duration-300 group-hover:scale-[1.03] motion-reduce:transform-none">
                <ProductMock slug={product.slug} />
              </div>
            </div>
            <div className="p-5">
              <p className="font-mono text-[11px] uppercase text-signal-deep">{product.eyebrow}</p>
              <h3 className="mt-2 font-display text-2xl group-hover:text-signal-deep">{product.name}</h3>
              <p className="mt-2 text-sm leading-6 text-mist">{product.promise}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-navy transition group-hover:translate-x-1 group-hover:text-signal-deep motion-reduce:transform-none">
                Open →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 pb-14">
        <button
          type="button"
          aria-label="Scroll platforms left"
          onClick={() => scroll(-340)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-navy/15 bg-white text-navy transition hover:-translate-y-0.5 hover:border-signal-deep hover:text-signal-deep motion-reduce:transform-none"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Scroll platforms right"
          onClick={() => scroll(340)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-navy/15 bg-white text-navy transition hover:-translate-y-0.5 hover:border-signal-deep hover:text-signal-deep motion-reduce:transform-none"
        >
          →
        </button>
      </div>
    </section>
  );
}
