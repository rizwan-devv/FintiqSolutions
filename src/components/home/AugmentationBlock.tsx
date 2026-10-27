import Link from "next/link";
import { engagements, roles } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { buttonPrimary } from "@/components/ui/styles";

export function AugmentationBlock() {
  return (
    <section className="bg-ink-raised text-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal">Resource augmentation</p>
            <h2 className="mt-4 font-display text-5xl tracking-tight">People who already know the domain.</h2>
            <p className="mt-4 max-w-xl leading-7 text-white/75">
              On your backlog and tools. First month ships work — not MDR or KYC training.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.08}>
            <Link href="/services/resource-augmentation" className={buttonPrimary}>
              See how a team lands
            </Link>
          </Reveal>
        </div>
        <ul className="mt-10 flex flex-wrap gap-2">
          {roles.map((role) => (
            <li key={role} className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white">
              {role}
            </li>
          ))}
        </ul>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {engagements.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className="glass-panel hover-lift h-full rounded-[1.6rem] p-6">
                <p className="font-mono text-sm text-teal">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/75">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
