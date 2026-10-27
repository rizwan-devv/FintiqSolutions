import Link from "next/link";
import { work } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function CaseStudies({ limit }: { limit?: number }) {
  const items = limit ? work.slice(0, limit) : work;

  return (
    <div className="grid gap-6">
      {items.map((item, index) => (
        <Reveal key={item.title} delay={index * 0.04}>
          <article className="grid gap-6 rounded-[1.6rem] border border-navy/10 bg-white p-7 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="font-mono text-sm text-signal-deep">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 font-display text-3xl">{item.title}</h3>
            </div>
            <dl className="grid gap-5 md:col-span-8">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-mist">Problem</dt>
                <dd className="mt-2 leading-7 text-ink/80">{item.problem}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-mist">What we shipped</dt>
                <dd className="mt-2 leading-7 text-ink/80">{item.shipped}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-mist">Result</dt>
                <dd className="mt-2 leading-7 text-navy">{item.result}</dd>
              </div>
            </dl>
          </article>
        </Reveal>
      ))}
      {limit && work.length > limit ? (
        <Link href="/work" className="draw-link text-sm font-semibold text-signal-deep hover:text-navy">
          All {work.length} engagements
        </Link>
      ) : null}
    </div>
  );
}
