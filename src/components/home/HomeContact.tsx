import { ContactEmails } from "@/components/brand/ContactEmails";
import { ContactForm } from "@/components/contact/ContactForm";

export function HomeContact() {
  return (
    <section className="bg-navy text-white" id="talk">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal">Talk to us</p>
          <h2 className="mt-4 font-display text-5xl tracking-tight">Tell us the channel you need live.</h2>
          <p className="mt-4 leading-7 text-white/75">
            A platform, people, or both. Write to info@fintiqsolutions.com or use the form.
          </p>
          <div className="mt-8">
            <ContactEmails tone="dark" />
          </div>
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
