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

export default function AboutPage() {
  return (
    <main>
      <header className="mx-auto max-w-6xl px-6 pb-10 pt-36">
        <p className="font-mono text-[11px] uppercase text-signal-deep">About</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-tight md:text-6xl">
          Software for the desk that moves money.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-mist">
          Platforms you can brand, domain-ready engineers, delivery measured by UAT.
          The institution stays the system of record.
        </p>
      </header>
      <section className="bg-paper-deep">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 md:grid-cols-2">
          <Image
            src="/brand/letterhead.png"
            alt="Fintiq Solutions letterhead"
            width={790}
            height={294}
            className="w-full rounded-2xl border border-navy/10 bg-white"
          />
          <div>
            <p className="font-mono text-[11px] uppercase text-signal-deep">Registered office</p>
            <h2 className="mt-3 font-display text-3xl text-navy">{company.legalName}</h2>
            <p className="mt-3 leading-7 text-mist">
              {company.lines[0]}
              <br />
              {company.lines[1]}
            </p>
            <div className="mt-5">
              <ContactEmails />
            </div>
            <Link href="/contact" className={`${buttonPrimary} mt-6`}>
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
