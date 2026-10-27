import { delivery } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function DeliveryStrip() {
  return (
    <section className="panel-gradient-rich relative overflow-hidden text-white">
      <div className="aurora pointer-events-none absolute right-0 top-0 size-80 rounded-full blur-3xl opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="font-mono text-[11px] uppercase text-teal">How we deliver</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl tracking-tight md:text-5xl">
            Fast ramp. Clear UAT. Live channel.
          </h2>
          <p className="mt-4 max-w-xl text-white/75">
            People who already know the domain, a journey that counts as done, and cover after go-live.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {delivery.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className="glass-panel h-full rounded-[1.5rem] p-6">
                <p className="font-mono text-sm text-teal">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/75">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
