"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { products } from "@/content/site";
import { getProductTheme } from "@/content/themes";
import { ProductStage } from "@/components/product/ProductStage";
import { buttonGhostLight, buttonPrimary } from "@/components/ui/styles";
import { Reveal } from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function PlatformScene() {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-platform-card]");

        cards.forEach((card) => {
          const mediaBox = card.querySelector<HTMLElement>("[data-platform-media]");
          const copy = card.querySelector<HTMLElement>("[data-platform-copy]");
          const chips = card.querySelectorAll<HTMLElement>("[data-platform-chip]");
          const glow = card.querySelector<HTMLElement>("[data-platform-glow]");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              end: "top 28%",
              scrub: 0.65,
            },
          });

          tl.fromTo(
            card,
            { opacity: 0.35, y: 72 },
            { opacity: 1, y: 0, ease: "none", duration: 1 },
            0,
          );

          if (copy) {
            tl.fromTo(
              copy,
              { opacity: 0, y: 36, clipPath: "inset(18% 0 0 0)" },
              { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", ease: "none", duration: 1 },
              0,
            );
          }

          if (mediaBox) {
            tl.fromTo(
              mediaBox,
              { opacity: 0, y: 48, scale: 0.92, rotate: 1.2 },
              { opacity: 1, y: 0, scale: 1, rotate: 0, ease: "none", duration: 1 },
              0.05,
            );
          }

          if (glow) {
            tl.fromTo(
              glow,
              { opacity: 0, scale: 0.7 },
              { opacity: 0.75, scale: 1, ease: "none", duration: 1 },
              0,
            );
          }

          if (chips.length) {
            tl.fromTo(
              chips,
              { opacity: 0, y: 18, scale: 0.9 },
              { opacity: 1, y: 0, scale: 1, stagger: 0.08, ease: "none", duration: 0.7 },
              0.2,
            );
          }
        });
      });

      return () => media.revert();
    },
    { scope: root, dependencies: [reduce] },
  );

  return (
    <section ref={root} id="platforms" className="relative overflow-hidden bg-[#071530] text-white">
      <div className="section-bg-drift pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-8">
        <Reveal variant="diagonal">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal">Solutions</p>
          <h2 className="mt-2 max-w-2xl font-display text-4xl tracking-tight md:text-5xl">
            Seven platforms.{" "}
            <span className="text-gradient-light">One operating model.</span>
          </h2>
          <p className="mt-4 max-w-xl text-white/70">
            Scroll through each product — every scene builds as you move.
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 pb-20 pt-6 md:gap-12">
        {products.map((product, index) => {
          const theme = getProductTheme(product.slug);
          const reverse = index % 2 === 1;
          const chips = [product.eyebrow, "Secure ops", "UAT-led"];

          return (
            <article
              key={product.slug}
              data-platform-card
              className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.04] px-5 py-8 shadow-[0_24px_60px_rgb(0_0_0/0.28)] sm:px-8 sm:py-10 lg:px-10"
            >
              <div
                data-platform-glow
                className="pointer-events-none absolute -right-16 top-0 size-72 rounded-full blur-3xl"
                style={{ background: `${theme.accent}44` }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `radial-gradient(ellipse at ${reverse ? "20%" : "80%"} 30%, ${theme.accent}22, transparent 55%)`,
                }}
                aria-hidden="true"
              />

              <div
                className={`relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div data-platform-copy>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: theme.accent }}>
                    {String(index + 1).padStart(2, "0")} · {product.eyebrow}
                  </p>
                  <h3 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl lg:text-5xl">
                    {product.name}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                    {product.promise}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {chips.map((chip) => (
                      <span
                        key={chip}
                        data-platform-chip
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href={`/products/${product.slug}`} className={buttonPrimary}>
                      Open {product.name}
                    </Link>
                    {index === 0 ? (
                      <Link href="/products" className={buttonGhostLight}>
                        All platforms
                      </Link>
                    ) : null}
                  </div>
                </div>

                <div data-platform-media className="relative mx-auto w-full max-w-[26rem]">
                  <div
                    className="prod-float-pill pointer-events-none absolute -left-3 top-6 z-10 hidden rounded-full border border-white/20 bg-white/12 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md sm:inline-flex"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    Live desk
                  </div>
                  <div
                    className="prod-float-pill pointer-events-none absolute -right-2 bottom-10 z-10 hidden rounded-full border border-white/20 bg-white/12 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md sm:inline-flex"
                    style={{ animationDelay: `${index * 0.2 + 0.6}s` }}
                  >
                    Audit-ready
                  </div>
                  <div className="overflow-hidden rounded-[1.6rem] border border-white/15 shadow-[0_28px_70px_rgb(0_0_0/0.4)]">
                    <ProductStage slug={product.slug} tall className="w-full rounded-none" />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
