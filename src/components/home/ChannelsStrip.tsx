import Link from "next/link";
import { channels, getProduct } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function ChannelsStrip() {
  return (
    <section className="section-wash border-y border-navy/10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Reveal variant="blur">
          <p className="font-mono text-[11px] uppercase text-signal-deep">Channels & portals</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl tracking-tight md:text-5xl">
            How customers and businesses meet the platform.
          </h2>
          <p className="mt-4 max-w-xl text-mist">
            Agent, consumer, and wallet banking — plus merchant and corporate portals — on shared books and rails.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {channels.map((channel, index) => {
            const first = getProduct(channel.related[0]);
            return (
              <Reveal key={channel.slug} delay={index * 0.05} variant="scale">
                <Link
                  href={first ? `/products/${first.slug}` : "/products"}
                  className="hover-lift surface-card group flex h-full flex-col rounded-[1.4rem] p-5"
                >
                  <p className="font-mono text-[10px] uppercase text-signal-deep">{channel.eyebrow}</p>
                  <h3 className="mt-2 font-display text-xl group-hover:text-signal-deep">{channel.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-mist">{channel.promise}</p>
                  <span className="mt-4 text-sm font-semibold text-navy transition group-hover:translate-x-1 group-hover:text-signal-deep motion-reduce:transform-none">
                    Related solution →
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
