import { reasons } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function WhyFintiq() {
  return (
    <section className="relative overflow-hidden bg-ink-raised text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(0,176,164,0.16),transparent_55%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal">Why FintiQ</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl tracking-tight md:text-5xl">
            Why <span className="text-gradient-light">FintiQ.</span>
          </h2>
          <p className="mt-5 max-w-xl border-l-2 border-teal pl-4 text-lg leading-8 text-white/80 md:text-xl">
            Technology partner. Not a licensee claim.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/10 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 0.06}>
              <article className="h-full bg-ink-raised/90 p-7 transition hover:bg-ink-raised">
                <h3 className="font-display text-2xl tracking-tight">{reason.title}</h3>
                <p className="mt-3 leading-7 text-white/70">{reason.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
