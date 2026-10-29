"use client";

import Link from "next/link";
import { buyers } from "@/content/site";
import { ScrollScene } from "@/components/motion/ScrollScene";
import { Magnetic } from "@/components/motion/Magnetic";

const tones = [
  "linear-gradient(145deg, #102458 0%, #0c6484 70%, #00b0a4 140%)",
  "linear-gradient(160deg, #0b1c40 0%, #16366a 55%, #087f78 120%)",
  "linear-gradient(150deg, #071530 0%, #102458 48%, #0d5f6a 100%)",
  "linear-gradient(155deg, #102458 0%, #1a3f72 50%, #00b0a4 130%)",
];

function buyerId(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export function WhoWeServe() {
  return (
    <section className="relative overflow-hidden bg-paper-deep">
      <div className="section-bg-drift pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />

      <ScrollScene scrub={0.7} className="relative mx-auto max-w-6xl px-6 py-16">
        <div data-motion="wipe">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal-deep">Who we serve</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl tracking-tight md:text-5xl">Built for.</h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {buyers.map((buyer, index) => (
            <Magnetic key={buyer.title} strength={11}>
              <article
                id={buyerId(buyer.title)}
                data-motion={index % 2 === 0 ? "slide-left" : "slide-right"}
                data-motion-delay={index * 0.08}
                className="group relative flex min-h-56 scroll-mt-32 flex-col overflow-hidden rounded-[1.6rem] p-7 text-white shadow-[0_20px_50px_rgb(16_36_88/0.18)]"
                style={{ backgroundImage: tones[index % tones.length] }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <div className="absolute -right-10 top-8 size-48 rounded-full bg-teal/25 blur-3xl" />
                </div>
                <p className="relative font-mono text-[11px] uppercase text-teal">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="relative mt-3 font-display text-2xl transition duration-300 group-hover:translate-x-1 motion-reduce:transform-none">
                  {buyer.title}
                </h3>
                <p className="relative mt-2 flex-1 text-sm leading-6 text-white/80">{buyer.body}</p>
                <div className="relative mt-5 flex flex-wrap gap-2">
                  {buyer.platforms.map((platform) => (
                    <Link
                      key={platform.slug}
                      href={`/products/${platform.slug}`}
                      className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-xs text-white transition hover:border-teal hover:bg-teal hover:text-ink"
                    >
                      {platform.label}
                    </Link>
                  ))}
                </div>
              </article>
            </Magnetic>
          ))}
        </div>
      </ScrollScene>
    </section>
  );
}
