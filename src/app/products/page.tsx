import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/content/site";
import { ProductMock } from "@/components/product/ProductMock";

export const metadata: Metadata = {
  title: "Platforms",
  description: "Six platforms for collections, onboarding, cards, agent banking, core integration, and operations.",
};

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-36">
      <p className="font-mono text-[11px] uppercase text-signal-deep">Platforms</p>
      <h1 className="mt-4 max-w-3xl font-display text-5xl tracking-tight md:text-7xl">
        Six platforms. Brand one.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-mist">
        Skin it, connect your core, hand it to operations.
      </p>
      <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => {
          const featured = index < 2;
          return (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className={`hover-lift surface-card shine-sweep group flex h-full flex-col rounded-[1.6rem] p-6 motion-reduce:transform-none ${
                featured ? "lg:col-span-2" : ""
              }`}
            >
              <ProductMock slug={product.slug} />
              <p className="mt-6 font-mono text-[11px] uppercase text-signal-deep">{product.eyebrow}</p>
              <h2 className={`mt-2 font-display group-hover:text-signal-deep ${featured ? "text-4xl" : "text-2xl"}`}>
                {product.name}
              </h2>
              <p className="mt-3 text-sm leading-6 text-mist">{product.promise}</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
