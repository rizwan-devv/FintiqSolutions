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
    <main className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-36 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="font-mono text-[11px] uppercase text-signal-deep">Contact</p>
        <h1 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">Tell us the channel.</h1>
        <p className="mt-6 text-lg leading-8 text-mist">
          A platform, resource augmentation, or both. We answer with the product, the people, and a delivery shape.
        </p>
        <address className="mt-8 not-italic">
          <p className="text-sm font-medium text-navy">{company.legalName}</p>
          <p className="mt-2 text-sm leading-6 text-mist">
            {company.lines[0]}
            <br />
            {company.lines[1]}
          </p>
        </address>
        <div className="mt-8">
          <ContactEmails />
        </div>
        <p className="mt-6 text-sm leading-6 text-mist">
          Use the form below, or write to the addresses above. The form checks your note; mailbox delivery can be wired on the server.
        </p>
      </div>
      <div className="lg:col-span-7">
        <ContactForm />
      </div>
    </main>
  );
}
