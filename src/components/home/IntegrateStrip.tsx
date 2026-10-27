import Link from "next/link";
import { integrations } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function IntegrateStrip() {
  return (
    <section className="section-wash">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal-deep">How you integrate</p>
          <h2 className="mt-4 max-w-2xl font-display text-5xl tracking-tight">A contract the other team can run.</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {integrations.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <Link
                href={item.href}
                className="hover-lift surface-card shine-sweep group flex h-full flex-col rounded-[1.6rem] p-7 motion-reduce:transform-none"
              >
                <h3 className="font-display text-2xl group-hover:text-signal-deep">{item.title}</h3>
                <p className="mt-3 flex-1 leading-7 text-ink/75">{item.body}</p>
                <span className="draw-link mt-6 text-sm font-semibold text-signal-deep">See the platform</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
