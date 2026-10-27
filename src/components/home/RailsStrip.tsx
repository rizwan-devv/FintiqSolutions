import { railPartners } from "@/content/site";

const loop = [...railPartners, ...railPartners, ...railPartners, ...railPartners];

export function RailsStrip() {
  return (
    <section className="bg-navy text-white" aria-label="Rails we connect">
      <div className="marquee-mask overflow-hidden border-b border-white/10">
        <div className="marquee-track flex w-max gap-12 py-3 pr-12">
          {loop.map((rail, index) => (
            <span key={`${rail.name}-${index}`} className="font-mono text-[11px] uppercase text-white/70">
              {rail.name}
              <span className="mx-3 text-teal">·</span>
              {rail.note}
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-px bg-white/10 px-6 py-px sm:grid-cols-2 lg:grid-cols-4">
        {railPartners.map((rail) => (
          <div key={rail.name} className="bg-navy px-5 py-5">
            <p className="font-display text-xl tracking-tight">{rail.name}</p>
            <p className="mt-1 font-mono text-[11px] uppercase text-teal">{rail.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
