import type { Metadata } from "next";
import Link from "next/link";
import { company, delivery, engagements, roles } from "@/content/site";
import { buttonGhost, buttonGhostLight, buttonPrimary } from "@/components/ui/styles";

export const metadata: Metadata = {
  title: "Delivery",
  description:
    "How FintiQ Solutions ships platforms and people — specialist, squad, build-then-stay, or retainer.",
};

export default function DeliveryPage() {
  return (
    <main>
      <header className="relative overflow-hidden bg-ink-raised text-white">
        <div className="hero-video-fallback absolute inset-0 opacity-80" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-raised/85 via-ink-raised/55 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-36">
          <p className="font-mono text-[11px] uppercase text-teal">Delivery</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl tracking-tight md:text-6xl">
            How we ship — and how we stay.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
            Domain-ready engineers. Agentic AI where it speeds the build. UAT as the clock. Production
            cover after go-live. {company.shortName} builds platforms; licensed institutions keep funds
            and regulated decisions.
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
        <p className="font-mono text-[11px] uppercase text-signal-deep">Principles</p>
        <h2 className="mt-3 font-display text-4xl tracking-tight text-navy">What sets the pace</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {delivery.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[1.5rem] border border-navy/10 bg-white p-6 shadow-[0_12px_30px_rgb(16_36_88/0.05)]"
            >
              <p className="font-mono text-sm text-signal-deep">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 font-display text-xl text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-mist">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-navy/10 bg-[#f7f9fc]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="font-mono text-[11px] uppercase text-signal-deep">Engagement shapes</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl tracking-tight text-navy">
            Pick how you work with us.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {engagements.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.6rem] border border-navy/10 bg-white p-7 shadow-[0_12px_30px_rgb(16_36_88/0.05)]"
              >
                <h3 className="font-display text-2xl text-navy">{item.title}</h3>
                <p className="mt-3 leading-7 text-mist">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="font-mono text-[11px] uppercase text-signal-deep">Capabilities</p>
        <h2 className="mt-3 font-display text-4xl tracking-tight text-navy">Roles we place</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-mist">
          Specialists and squads fluent in payments, cards, remittance, and lending — with AI-assisted
          delivery where it helps, and humans accountable for release.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {roles.map((role) => (
            <li
              key={role}
              className="rounded-full border border-navy/12 bg-white px-4 py-2 text-sm font-medium text-navy"
            >
              {role}
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/contact" className={buttonPrimary}>
            Start a conversation
          </Link>
          <Link href="/services" className={buttonGhost}>
            Browse services
          </Link>
        </div>
      </section>
    </main>
  );
}
