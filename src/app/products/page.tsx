import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/content/site";
import { getProductTheme } from "@/content/themes";
import { ProductStage } from "@/components/product/ProductStage";
import { buttonGhostLight, buttonPrimary } from "@/components/ui/styles";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Card payments, corporate banking, payment gateway, cash management, remittance, LOS, and LMS.",
};

export default function ProductsPage() {
  return (
    <main>
      <header className="relative overflow-hidden bg-ink-raised text-white">
        <div className="hero-video-fallback absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="hero-video-veil absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-36">
          <p className="font-mono text-[11px] uppercase text-teal">Solutions</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl tracking-tight md:text-6xl">
            Enterprise fintech platforms for{" "}
            <span className="text-gradient-light">banks and institutions.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/85">
            Card payments, corporate banking, gateways, cash, remittance, and lending — with AI
            solutions that help systems move faster.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className={buttonPrimary}>
              Contact Us
            </Link>
            <Link href="/services" className={buttonGhostLight}>
              Services
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl space-y-6 px-6 py-14">
        {products.map((product, index) => {
          const theme = getProductTheme(product.slug);
          const reverse = index % 2 === 1;
          return (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group grid overflow-hidden rounded-[1.8rem] border border-navy/12 bg-white shadow-[0_18px_50px_rgb(16_36_88/0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgb(16_36_88/0.14)] motion-reduce:transform-none lg:grid-cols-2"
            >
              <div className={`relative min-h-64 ${reverse ? "lg:order-2" : ""}`}>
                <ProductStage slug={product.slug} className="h-full rounded-none" />
              </div>
              <div
                className={`flex flex-col justify-center bg-gradient-to-br from-white via-[#f7f9fc] to-[#eef3f9] p-7 md:p-10 ${
                  reverse ? "lg:order-1" : ""
                }`}
              >
                <p className="font-mono text-[11px] font-semibold uppercase" style={{ color: theme.accent }}>
                  {product.eyebrow}
                </p>
                <h2 className="product-title mt-3 font-display text-4xl tracking-tight md:text-5xl">
                  {product.name}
                </h2>
                <span
                  className="product-title-accent"
                  style={{ backgroundImage: theme.titleGrad, width: "3rem", height: "4px" }}
                  aria-hidden="true"
                />
                <p className="mt-4 max-w-md text-base font-medium leading-7 text-navy/85">
                  {product.promise}
                </p>
                <p className="mt-3 max-w-md text-sm leading-6 text-navy/75">{product.summary}</p>
                <span
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition group-hover:translate-x-1 motion-reduce:transform-none"
                  style={{ color: theme.accent }}
                >
                  Open platform →
                </span>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
