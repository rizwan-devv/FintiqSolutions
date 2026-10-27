import type { Metadata } from "next";
import Link from "next/link";
import { buyers } from "@/content/site";
import { buttonPrimary } from "@/components/ui/styles";

export const metadata: Metadata = {
  title: "Industries",
  description: "Banks, wallets, payment companies, and institutions that collect fees.",
};

const tones = [
  "linear-gradient(145deg, #102458 0%, #0c6484 70%, #00b0a4 140%)",
  "linear-gradient(160deg, #0b1c40 0%, #16366a 55%, #087f78 120%)",
  "linear-gradient(150deg, #071530 0%, #102458 48%, #0d5f6a 100%)",
  "linear-gradient(155deg, #102458 0%, #1a3f72 50%, #00b0a4 130%)",
];

function buyerId(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export default function IndustriesPage() {
  return (
    <main>
      <header className="mx-auto max-w-6xl px-6 pb-16 pt-36">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal-deep">Industries</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl tracking-tight md:text-7xl">
          Built for the institutions that move the money.
        </h1>
      </header>
      <section className="bg-paper-deep">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-20 md:grid-cols-2">
          {buyers.map((buyer, index) => (
            <article
              key={buyer.title}
              id={buyerId(buyer.title)}
              className="group relative flex min-h-72 scroll-mt-32 flex-col overflow-hidden rounded-[1.8rem] p-8 text-white shadow-[0_20px_50px_rgb(16_36_88/0.18)]"
              style={{ backgroundImage: tones[index % tones.length] }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                aria-hidden="true"
              >
                <div className="absolute -right-10 top-8 size-48 rounded-full bg-teal/25 blur-3xl" />
              </div>
              <p className="relative font-mono text-sm text-teal">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="relative mt-3 font-display text-4xl transition duration-300 group-hover:translate-x-1 motion-reduce:transform-none">
                {buyer.title}
              </h2>
              <p className="relative mt-4 flex-1 leading-7 text-white/80">{buyer.body}</p>
              <div className="relative mt-6 flex flex-wrap gap-2">
                {buyer.platforms.map((platform) => (
                  <Link
                    key={platform.slug}
                    href={`/products/${platform.slug}`}
                    className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-sm text-white transition hover:border-teal hover:bg-teal hover:text-ink"
                  >
                    {platform.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-3xl">See which platform fits the desk.</p>
        <Link href="/products" className={buttonPrimary}>
          Platforms
        </Link>
      </div>
    </main>
  );
}
