import { reasons } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function WhyFintiq() {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal">Why Fintiq</p>
          <h2 className="mt-4 max-w-2xl font-display text-5xl tracking-tight">What an institution can rely on.</h2>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 0.06}>
              <article className="glass-panel hover-lift h-full rounded-[1.6rem] p-7">
                <h3 className="font-display text-2xl">{reason.title}</h3>
                <p className="mt-3 leading-7 text-white/75">{reason.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
