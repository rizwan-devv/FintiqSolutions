import Link from "next/link";
import { company, work } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function CaseStudies({ limit }: { limit?: number }) {
  const items = limit ? work.slice(0, limit) : work;

  return (
    <div className="grid gap-6">
      {items.map((item, index) => (
        <Reveal key={item.title} delay={index * 0.04}>
          <article className="overflow-hidden rounded-[1.6rem] border border-navy/10 bg-white shadow-[0_12px_36px_rgb(16_36_88/0.05)]">
            <div className="grid gap-0 md:grid-cols-12">
              <div className="border-b border-navy/10 bg-[#f7f9fc] p-7 md:col-span-4 md:border-b-0 md:border-r">
                <p className="font-mono text-sm text-signal-deep">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-2xl tracking-tight text-navy md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-mist">
                  {item.sector}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.platforms.map((platform) => (
                    <li
                      key={platform}
                      className="rounded-full border border-navy/12 bg-white px-2.5 py-1 text-[11px] font-semibold text-navy/70"
                    >
                      {platform}
                    </li>
                  ))}
                </ul>
              </div>
              <dl className="grid gap-6 p-7 md:col-span-8 md:gap-7">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-mist">
                    Problem
                  </dt>
                  <dd className="mt-2 leading-7 text-ink/80">{item.problem}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-mist">
                    What we shipped
                  </dt>
                  <dd className="mt-2 leading-7 text-ink/80">{item.shipped}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-mist">
                    Result
                  </dt>
                  <dd className="mt-2 font-medium leading-7 text-navy">{item.result}</dd>
                </div>
              </dl>
            </div>
          </article>
        </Reveal>
      ))}

      {!limit ? (
        <p className="rounded-[1.2rem] border border-dashed border-navy/15 bg-[#f7f9fc] px-5 py-4 text-sm leading-6 text-mist">
          Client names stay confidential until approved. {company.disclaimer}
        </p>
      ) : null}

      {limit && work.length > limit ? (
        <Link href="/work" className="draw-link text-sm font-semibold text-signal-deep hover:text-navy">
          All {work.length} engagements →
        </Link>
      ) : null}
    </div>
  );
}
