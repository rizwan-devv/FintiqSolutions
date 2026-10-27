import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactEmails } from "@/components/brand/ContactEmails";
import { company, delivery, reasons } from "@/content/site";
import { buttonGhost, buttonGhostLight, buttonPrimary } from "@/components/ui/styles";

export const metadata: Metadata = {
  title: "About Us",
  description: "FintiQ Solutions builds secure, scalable fintech platforms for regulated institutions.",
};

export default function AboutPage() {
  return (
    <main>
      <header className="relative overflow-hidden bg-ink-raised text-white">
        <div className="hero-video-fallback absolute inset-0 opacity-80" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-raised/80 via-ink-raised/50 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-36">
          <p className="font-mono text-[11px] uppercase text-teal">About Us</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl tracking-tight md:text-6xl">
            {company.tagline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
            FintiQ works with financial institutions and fintech companies to build secure, scalable
            digital financial platforms — with structured architecture, secure integrations, and
            governance-aware delivery.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className={buttonPrimary}>
              Contact Us
            </Link>
            <Link href="/products" className={buttonGhostLight}>
              Solutions
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[1.6rem] bg-navy p-8 text-white">
            <p className="font-mono text-[11px] uppercase text-teal">Mission</p>
            <p className="mt-4 text-lg leading-8 text-white/85">
              Support financial institutions and fintech organisations with secure, modern, and scalable
              digital platforms that strengthen operational workflows and enable responsible financial
              innovation — aligned with real-world processes and long-term objectives.
            </p>
          </article>
          <article className="rounded-[1.6rem] border border-navy/10 bg-white p-8">
            <p className="font-mono text-[11px] uppercase text-signal-deep">Vision</p>
            <p className="mt-4 text-lg leading-8 text-mist">
              Be a trusted fintech technology partner for organisations navigating digital financial
              transformation — delivering adaptable, integration-ready platforms that evolve with
              regulation, transaction growth, and market change.
            </p>
          </article>
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-7 text-mist">{company.disclaimer}</p>
      </section>

      <section className="bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="font-mono text-[11px] uppercase text-signal-deep">Why FintiQ</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight">Built for regulated environments.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {reasons.map((reason) => (
              <article key={reason.title} className="surface-card rounded-[1.4rem] p-6">
                <h3 className="font-display text-2xl">{reason.title}</h3>
                <p className="mt-2 text-sm leading-6 text-mist">{reason.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="panel-gradient-rich text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="font-mono text-[11px] uppercase text-teal">How we deliver</p>
          <h2 className="mt-3 max-w-xl font-display text-4xl tracking-tight">
            Domain expertise. Agentic AI. Clear UAT.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {delivery.map((item, index) => (
              <article key={item.title} className="glass-panel rounded-[1.4rem] p-5">
                <p className="font-mono text-sm text-teal">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-display text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2">
          <Image
            src="/brand/letterhead.png"
            alt="FintiQ Solutions letterhead"
            width={790}
            height={294}
            className="w-full rounded-2xl border border-navy/10 bg-white"
          />
          <div>
            <p className="font-mono text-[11px] uppercase text-signal-deep">Registered office</p>
            <h2 className="mt-3 font-display text-3xl text-navy">{company.legalName}</h2>
            <p className="mt-3 leading-7 text-mist">
              {company.lines[0]}
              <br />
              {company.lines[1]}
            </p>
            <div className="mt-5">
              <ContactEmails />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className={buttonPrimary}>
                Contact Us
              </Link>
              <Link href="/work" className={buttonGhost}>
                See work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
