import Link from "next/link";
import type { Block } from "@/content/site";
import { getProductTheme } from "@/content/themes";
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
  themeSlug,
  architecture,
  uat,
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
  themeSlug?: string;
  architecture?: Block[];
  uat?: Block;
  children?: React.ReactNode;
}) {
  const highlights = blocks.slice(0, 3);
  const path = steps.slice(0, 3);
  const theme = themeSlug ? getProductTheme(themeSlug) : null;
  const accent = theme?.accent ?? "#087f78";
  const headerBg =
    theme?.mode === "dark"
      ? `${theme.glow}, ${theme.mesh}`
      : theme
        ? `radial-gradient(ellipse at 80% 10%, ${theme.accent}33, transparent 45%), linear-gradient(145deg, #0b1528 0%, #102458 52%, #16366a 100%)`
        : "radial-gradient(ellipse at 70% 20%, rgb(0 176 164 / 0.28), transparent 45%), linear-gradient(145deg, #071530 0%, #102458 48%, #0c6484 100%)";

  return (
    <article>
      <header
        className="relative overflow-hidden border-b border-navy/15 text-white"
        style={{ backgroundImage: headerBg }}
      >
        <div className="hero-grid hero-grid-on-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-36 lg:grid-cols-2 lg:pt-40">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase" style={{ color: theme?.accentSoft ?? "#7be0d8" }}>
              {eyebrow}
            </p>
            <h1 className="mt-4 font-display text-5xl tracking-tight text-white md:text-6xl">
              <span className="text-gradient-light">{title}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/90">{lede}</p>
          </div>
          <div className="relative">
            {themeSlug ? (
              <div className="rounded-[1.8rem] border border-white/15 bg-white/5 p-2 shadow-[0_30px_80px_rgb(0_0_0/0.35)] backdrop-blur-sm">
                {children}
              </div>
            ) : (
              children
            )}
          </div>
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
              <li
                key={block.title}
                className="rounded-[1.4rem] border border-navy/10 bg-white p-6 shadow-[0_12px_30px_rgb(16_36_88/0.06)]"
              >
                <p className="font-mono text-sm" style={{ color: accent }}>
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-xl">{block.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/75">{block.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {architecture && architecture.length > 0 ? (
          <section className="mt-14 border-t border-ink/10 pt-12">
            <p className="font-mono text-[11px] uppercase" style={{ color: accent }}>
              Architecture
            </p>
            <h2 className="mt-2 font-display text-3xl">How the stack sits</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/70">
              Channels on top. Platform controls in the middle. Institution core and rails underneath —
              funds and regulated decisions stay with the licensed institution.
            </p>
            <ol className="mt-8 grid gap-4 md:grid-cols-3">
              {architecture.map((layer, index) => (
                <li
                  key={layer.title}
                  className="relative overflow-hidden rounded-[1.4rem] border border-navy/10 bg-[#f7f9fc] p-6"
                >
                  <p className="font-mono text-sm" style={{ color: accent }}>
                    Layer {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-xl text-navy">{layer.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/75">{layer.body}</p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <section className="mt-14 border-t border-ink/10 pt-12">
          <h2 className="font-display text-3xl">How it lands</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {path.map((step, index) => (
              <li key={step.title} className="rounded-[1.3rem] bg-paper-deep/60 p-5">
                <p className="font-mono text-sm" style={{ color: accent }}>
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/75">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {uat ? (
          <section className="mt-14 overflow-hidden rounded-[1.8rem] border border-navy/10 bg-navy p-8 text-white md:p-10">
            <p className="font-mono text-[11px] uppercase text-teal">What UAT looks like</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">{uat.title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">{uat.body}</p>
            <p className="mt-6 text-sm text-white/55">
              Done means a real journey signed by your operators — not a deck alone.
            </p>
          </section>
        ) : null}
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
            Contact Us
          </Link>
        </div>
      </aside>
    </article>
  );
}
