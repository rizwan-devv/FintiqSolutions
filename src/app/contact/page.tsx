import type { Metadata } from "next";
import { ContactEmails } from "@/components/brand/ContactEmails";
import { ContactForm } from "@/components/contact/ContactForm";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Fintiq Solutions about a platform, a squad, or both.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 pt-36 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="font-mono text-[11px] uppercase text-signal-deep">Contact</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight md:text-6xl">Tell us the channel.</h1>
        <p className="mt-4 text-lg leading-8 text-mist">
          A platform, people, or both.
        </p>
        <address className="mt-6 not-italic text-sm leading-6 text-mist">
          <p className="font-medium text-navy">{company.legalName}</p>
          <p className="mt-2">
            {company.lines[0]}
            <br />
            {company.lines[1]}
          </p>
        </address>
        <div className="mt-6">
          <ContactEmails />
        </div>
      </div>
      <div className="lg:col-span-7">
        <ContactForm />
      </div>
    </main>
  );
}
