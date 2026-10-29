import type { Metadata } from "next";
import Link from "next/link";
import { PrintOverviewButton } from "@/components/overview/PrintOverview";
import { company, products, services } from "@/content/site";

export const metadata: Metadata = {
  title: "Platforms overview",
  description:
    "One-page overview of FintiQ Solutions platforms and delivery model for banks and financial institutions.",
  robots: { index: false, follow: false },
};

export default function OverviewPage() {
  return (
    <main className="bg-white text-navy">
      <div className="mx-auto max-w-4xl px-6 py-10 print:max-w-none print:px-0 print:py-0">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-navy/15 pb-6 print:pb-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal-deep">
              {company.brandName}
            </p>
            <h1 className="mt-2 font-display text-3xl tracking-tight md:text-4xl">
              Platforms overview
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-mist">
              Secure fintech platforms for cards, corporate banking, payments, cash, remittance, and
              lending — delivered as a technology partner to licensed institutions.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <PrintOverviewButton />
            <Link href="/contact" className="text-sm font-semibold text-signal-deep print:hidden">
              Contact →
            </Link>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="font-display text-xl">Platforms</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {products.map((product) => (
              <li key={product.slug} className="rounded-xl border border-navy/10 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal-deep">
                  {product.eyebrow}
                </p>
                <p className="mt-1 font-semibold">{product.name}</p>
                <p className="mt-1 text-sm leading-5 text-mist">{product.promise}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-xl">Services</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service.slug} className="text-sm leading-6">
                <span className="font-semibold">{service.name}</span>
                <span className="text-mist"> — {service.summary}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 grid gap-4 border-t border-navy/15 pt-6 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal-deep">Delivery</p>
            <p className="mt-2 text-sm leading-6 text-mist">
              Domain-ready squads. UAT as the clock. Support after go-live.
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal-deep">Governance</p>
            <p className="mt-2 text-sm leading-6 text-mist">{company.disclaimer}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal-deep">Contact</p>
            <p className="mt-2 text-sm leading-6 text-mist">
              {company.emails[0].address}
              <br />
              {company.lines[1]}
              <br />
              Reply: {company.responseSla}
            </p>
          </div>
        </section>

        <p className="mt-8 text-xs text-mist print:mt-6">
          © 2026 {company.legalName}. Confidential — for institutional evaluation.
        </p>
      </div>
    </main>
  );
}
