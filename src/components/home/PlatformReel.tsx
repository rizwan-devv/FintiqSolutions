"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { products } from "@/content/site";
import { ProductMock } from "@/components/product/ProductMock";
import { buttonGhostLight } from "@/components/ui/styles";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function PlatformReel() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const active = products[index];

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * products.length}`,
          pin: pin.current,
          scrub: 0.45,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.min(
              products.length - 1,
              Math.floor(self.progress * products.length * 0.999),
            );
            if (next !== indexRef.current) {
              indexRef.current = next;
              setIndex(next);
            }
          },
        });
      });
      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="platforms" className="relative bg-navy text-white">
      <div ref={pin} className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-6 py-24 lg:h-svh lg:py-0">
        <div className="hidden lg:block">
          <div className="mb-8 flex items-end justify-between gap-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">Six platforms</p>
            <p className="font-mono text-xs text-white/60">
              {String(index + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
            </p>
          </div>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/60">{active.eyebrow}</p>
              <h2 className="mt-3 font-display text-5xl tracking-tight xl:text-6xl">{active.name}</h2>
              <p className="mt-5 max-w-md text-lg leading-8 text-white/70">{active.promise}</p>
              <Link href={`/products/${active.slug}`} className={`${buttonGhostLight} mt-8`}>
                Open {active.name}
              </Link>
              <div className="mt-10 flex gap-2">
                {products.map((product, productIndex) => (
                  <button
                    key={product.slug}
                    type="button"
                    aria-label={product.name}
                    onClick={() => {
                      indexRef.current = productIndex;
                      setIndex(productIndex);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      productIndex === index ? "w-10 bg-signal" : "w-4 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
            <ProductMock slug={active.slug} />
          </div>
        </div>
        <div className="space-y-16 lg:hidden">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">Six platforms</p>
          {products.map((product) => (
            <article key={product.slug}>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/60">{product.eyebrow}</p>
              <h2 className="mt-3 font-display text-4xl">{product.name}</h2>
              <p className="mt-3 text-white/70">{product.promise}</p>
              <div className="mt-6">
                <ProductMock slug={product.slug} />
              </div>
              <Link href={`/products/${product.slug}`} className={`${buttonGhostLight} mt-6`}>
                Open {product.name}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
