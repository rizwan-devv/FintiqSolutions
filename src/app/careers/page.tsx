import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { buttonPrimary } from "@/components/ui/styles";
import { careers, company, roles } from "@/content/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join FintiQ Solutions — build regulated fintech platforms for cards, payments, cash, remittance, and lending.",
};

export default function CareersPage() {
  return (
    <main>
      <header className="relative overflow-hidden bg-ink-raised text-white">
        <div className="hero-video-fallback absolute inset-0 opacity-80" aria-hidden="true" />
        <div className="hero-video-veil absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal">Careers</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-tight md:text-6xl">
            Build platforms institutions can put in UAT.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{careers.intro}</p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-14">
        <Reveal>
          <p className="font-mono text-[11px] uppercase text-signal-deep">How we work</p>
          <h2 className="mt-2 font-display text-3xl text-navy">Domain-ready. UAT-led. Clean handovers.</h2>
          <p className="mt-4 max-w-2xl leading-7 text-mist">
            You will ship with squads that already know payments, cards, wallets, remittance, and lending —
            and you will measure done by a live journey the institution can sign.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-10">
          <p className="font-mono text-[11px] uppercase text-signal-deep">Open roles</p>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {careers.openRoles.map((role) => (
              <li
                key={role.title}
                className="rounded-[1.4rem] border border-navy/10 bg-white p-6 shadow-[0_12px_30px_rgb(16_36_88/0.05)]"
              >
                <h3 className="font-display text-xl text-navy">{role.title}</h3>
                <p className="mt-2 text-sm leading-6 text-mist">{role.focus}</p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-signal-deep">
                  {role.type}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <p className="font-mono text-[11px] uppercase text-signal-deep">Stacks we place</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {roles.map((role) => (
              <li
                key={role}
                className="rounded-full border border-navy/12 bg-[#f7f9fc] px-3 py-1.5 text-sm font-medium text-navy"
              >
                {role}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          delay={0.12}
          className="mt-14 rounded-[1.6rem] border border-navy/10 bg-navy p-8 text-white md:p-10"
        >
          <p className="font-mono text-[11px] uppercase text-teal">Apply</p>
          <h2 className="mt-2 font-display text-3xl tracking-tight">Send a short, concrete note.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">{careers.howToApply}</p>
          <p className="mt-2 text-sm text-white/50">{company.legalName} · Islamabad</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${company.emails[0].address}?subject=${encodeURIComponent("Careers — FintiQ Solutions")}`}
              className={buttonPrimary}
            >
              Email your CV
            </a>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center rounded-full border border-white/30 px-6 text-sm font-semibold text-white transition hover:border-teal hover:bg-teal hover:text-navy"
            >
              General enquiry
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
