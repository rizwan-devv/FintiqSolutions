import Link from "next/link";
import type { Block } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { buttonPrimary } from "@/components/ui/styles";

export function DetailView({
  eyebrow,
  title,
  lede,
  audience,
  outcome,
  blocks,
  steps,
  links,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  audience: string;
  outcome: string;
  blocks: Block[];
  steps: Block[];
  links: { href: string; label: string }[];
  children?: React.ReactNode;
}) {
  const highlights = blocks.slice(0, 3);
  const path = steps.slice(0, 3);

  return (
    <article>
      <header className="tone-mesh relative overflow-hidden border-b border-navy/15">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-36 lg:grid-cols-2 lg:pt-40">
          <div>
            <p className="font-mono text-[11px] uppercase text-signal-deep">{eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">{title}</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-mist">{lede}</p>
          </div>
          {children}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-14 text-ink">
        <section className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl">For</h2>
            <p className="mt-3 leading-7 text-ink/75">{audience}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display text-2xl">You leave with</h2>
            <p className="mt-3 leading-7 text-ink/75">{outcome}</p>
          </Reveal>
        </section>

        <section className="mt-14 border-t border-ink/10 pt-12">
          <h2 className="font-display text-3xl">Highlights</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {highlights.map((block, index) => (
              <li key={block.title} className="rounded-[1.4rem] border border-navy/10 bg-white p-6">
                <p className="font-mono text-sm text-signal-deep">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-display text-xl">{block.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/75">{block.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 border-t border-ink/10 pt-12">
          <h2 className="font-display text-3xl">How it lands</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {path.map((step, index) => (
              <li key={step.title}>
                <p className="font-mono text-sm text-signal-deep">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/75">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <aside className="border-t border-navy/10 bg-paper-deep">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
          {links.length > 0 ? (
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {links.slice(0, 3).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="draw-link text-sm font-semibold hover:text-signal-deep">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-mono text-[11px] uppercase text-signal-deep">Next</p>
          )}
          <Link href="/contact" className={buttonPrimary}>
            Talk to us
          </Link>
        </div>
      </aside>
    </article>
  );
}
