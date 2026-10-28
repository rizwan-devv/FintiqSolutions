import Link from "next/link";
import { delivery, railPartners } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { buttonGhostLight, buttonPrimary } from "@/components/ui/styles";

export function DeliveryStrip() {
  return (
    <section className="panel-gradient-rich relative overflow-hidden text-white">
      <div className="aurora pointer-events-none absolute right-0 top-0 size-80 rounded-full blur-3xl opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <Reveal variant="blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase text-teal">How we deliver</p>
              <h2 className="mt-3 max-w-2xl font-display text-4xl tracking-tight md:text-5xl">
                Faster delivery. Clear time.
              </h2>
              <p className="mt-3 max-w-xl text-white/75">
                Domain-ready people. UAT as the clock. Cover after go-live. Connected to the rails your
                institution already runs.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/delivery" className={buttonPrimary}>
                Delivery model
              </Link>
              <Link href="/contact" className={buttonGhostLight}>
                Talk to us
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {delivery.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06} variant="scale">
              <article className="glass-panel h-full rounded-[1.5rem] p-6 transition duration-300 hover:-translate-y-1">
                <p className="font-mono text-sm text-teal">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/75">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="font-mono text-[11px] uppercase text-teal">Connected infrastructure</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {railPartners.map((rail) => (
              <div
                key={rail.name}
                className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4"
              >
                <p className="font-display text-lg tracking-tight">{rail.name}</p>
                <p className="mt-1 font-mono text-[11px] uppercase text-teal/90">{rail.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
