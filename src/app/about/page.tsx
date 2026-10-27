import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactEmails } from "@/components/brand/ContactEmails";
import { company } from "@/content/site";
import { buttonPrimary } from "@/components/ui/styles";

export const metadata: Metadata = {
  title: "About",
  description: "Fintiq Solutions builds and staffs digital banking and payments platforms.",
};

const paragraphs = [
  "Fintiq Solutions is a product and engineering company for institutions that move money.",
  "We build platforms we can brand for a client, and we place engineers into a team that already has a backlog.",
  "The work spans merchant collections, entity onboarding, cards, agent banking, and the integration layer in front of a core.",
  "We work with compliance, operations, and the vendors already in the room. The regulated institution remains the institution.",
];

export default function AboutPage() {
  return (
    <main>
      <header className="mx-auto max-w-6xl px-6 pb-16 pt-36">
        <p className="font-mono text-[11px] uppercase text-signal-deep">About</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl tracking-tight md:text-7xl">
          Software for the desk that has to move the money.
        </h1>
      </header>
      <section className="text-ink">
        <div className="mx-auto max-w-3xl space-y-6 px-6 py-20 text-lg leading-8">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
      <section className="bg-paper-deep">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2">
          <Image
            src="/brand/letterhead.png"
            alt="Fintiq Solutions letterhead"
            width={790}
            height={294}
            className="w-full rounded-2xl border border-navy/10 bg-white"
          />
          <div>
            <p className="font-mono text-[11px] uppercase text-signal-deep">Registered office</p>
            <h2 className="mt-3 font-display text-4xl text-navy">{company.legalName}</h2>
            <p className="mt-4 text-lg leading-8 text-mist">
              {company.lines[0]}
              <br />
              {company.lines[1]}
            </p>
            <div className="mt-6">
              <ContactEmails />
            </div>
            <Link href="/contact" className={`${buttonPrimary} mt-8`}>
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
