import Link from "next/link";
import { buttonGhostLight, buttonPrimary } from "@/components/ui/styles";

const pillars = [
  {
    title: "AI for banking systems",
    body: "Assist underwriting queues, reconciliation, and ops triage inside your existing platforms.",
  },
  {
    title: "Agentic delivery",
    body: "Speed analysis, tests, and documentation so squads reach UAT sooner — with humans on release.",
  },
  {
    title: "Intelligent automation",
    body: "Workflow copilots for payments, remittance, and lending desks — governed, auditable, optional.",
  },
];

export function AiStrip() {
  return (
    <section className="relative overflow-hidden bg-ink-raised text-white">
      <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true">
        <div className="aurora absolute -left-20 top-0 size-72 rounded-full blur-3xl" />
        <div className="aurora-soft absolute -right-16 bottom-0 size-80 rounded-full blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase text-teal">AI solutions</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              AI that strengthens systems — not replaces governance.
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-white/75">
              We provide AI solutions for financial systems: agentic delivery on the build side, and
              practical automation inside cards, payments, cash, remittance, and lending platforms.
              Licensed institutions keep the decision.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Link href="/contact" className={buttonPrimary}>
              Discuss AI solutions
            </Link>
            <Link href="/products" className={buttonGhostLight}>
              See platforms
            </Link>
          </div>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-[1.4rem] border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm"
            >
              <h3 className="font-display text-xl">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">{pillar.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
