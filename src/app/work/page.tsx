import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudies } from "@/components/home/CaseStudies";
import { Reveal } from "@/components/ui/Reveal";
import { buttonPrimary } from "@/components/ui/styles";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected FintiQ engagements across payments, cards, corporate banking, and lending — problem, what shipped, UAT result.",
};

export default function WorkPage() {
  return (
    <main>
      <header className="relative overflow-hidden bg-ink-raised text-white">
        <div className="hero-video-fallback absolute inset-0 opacity-80" aria-hidden="true" />
        <div className="hero-video-veil absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal">Work</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-tight md:text-6xl">
            Selected engagements.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
            Licensed institutions keep the ledger and regulated decisions. We ship the platform path —
            measured by a live UAT journey, not a deck alone.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-14">
        <Reveal>
          <p className="max-w-2xl text-sm leading-6 text-mist">{company.disclaimer}</p>
        </Reveal>
        <Reveal delay={0.06} className="mt-10">
          <CaseStudies />
        </Reveal>
        <Reveal delay={0.1} className="mt-14 flex flex-col gap-4 rounded-[1.6rem] border border-navy/10 bg-navy p-8 text-white md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="font-mono text-[11px] uppercase text-teal">Next engagement</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight">Tell us the channel you need live.</h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-white/70">
              Cards, payments, corporate, cash, remittance, or lending — we reply with product fit and
              delivery shape.
            </p>
          </div>
          <Link href="/contact" className={buttonPrimary}>
            Contact Us
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
