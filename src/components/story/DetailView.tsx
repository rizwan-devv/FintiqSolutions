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
  return (
    <article>
      <header className="tone-mesh relative overflow-hidden border-b border-navy/15">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-36 lg:grid-cols-2 lg:pt-40">
          <div>
            <p className="font-mono text-[11px] uppercase text-signal-deep">{eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl tracking-tight md:text-7xl">{title}</h1>
            <p className="mt-6 text-lg leading-8 text-mist">{lede}</p>
          </div>
          {children}
        </div>
      </header>

      <div className="text-ink">
        <div className="mx-auto max-w-6xl px-6">
          <nav className="sticky top-[5.75rem] z-30 flex gap-6 overflow-x-auto border-b border-ink/10 bg-paper-deep/95 py-4 text-sm backdrop-blur" aria-label="On this page">
            <a href="#who" className="shrink-0 hover:text-signal-deep">Who it is for</a>
            <a href="#detail" className="shrink-0 hover:text-signal-deep">In detail</a>
            <a href="#journey" className="shrink-0 hover:text-signal-deep">How it happens</a>
          </nav>

          <section id="who" className="scroll-mt-32 grid gap-10 py-16 md:grid-cols-2">
            <Reveal>
              <h2 className="font-display text-4xl">Who it is for</h2>
              <p className="mt-4 leading-7 text-ink/75">{audience}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl">What you leave with</h2>
              <p className="mt-4 leading-7 text-ink/75">{outcome}</p>
            </Reveal>
          </section>

          <section id="detail" className="scroll-mt-32 pb-8">
            <h2 className="font-display text-4xl">In detail</h2>
            <ol className="mt-8">
              {blocks.map((block, index) => (
                <li key={block.title} className="grid gap-4 border-t border-ink/10 py-8 md:grid-cols-12">
                  <span className="font-mono text-sm text-signal-deep md:col-span-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-3xl md:col-span-4">{block.title}</h3>
                  <p className="leading-7 text-ink/75 md:col-span-6">{block.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="journey" className="scroll-mt-32 border-t border-ink/10 py-16">
            <h2 className="font-display text-4xl">How it happens</h2>
            <ol className="mt-10 space-y-8">
              {steps.map((step, index) => (
                <li key={step.title} className="grid gap-3 md:grid-cols-12">
                  <span className="font-mono text-sm text-signal-deep md:col-span-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="md:col-span-10">
                    <h3 className="font-display text-2xl">{step.title}</h3>
                    <p className="mt-2 max-w-2xl leading-7 text-ink/75">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      <aside className="border-t border-navy/10 bg-paper-deep">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase text-signal-deep">Continue</p>
            <ul className="mt-4 flex flex-col gap-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="draw-link text-lg hover:text-signal-deep">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/contact" className={buttonPrimary}>
            Talk to us
          </Link>
        </div>
      </aside>
    </article>
  );
}
