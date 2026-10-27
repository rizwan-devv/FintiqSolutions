import type { Metadata } from "next";
import Link from "next/link";
import { ContactEmails } from "@/components/brand/ContactEmails";
import { ContactForm } from "@/components/contact/ContactForm";
import { company, products, services } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Talk to FintiQ Solutions about a platform, a squad, or both.",
};

export default function ContactPage() {
  return (
    <main>
      <header className="relative overflow-hidden bg-ink-raised text-white">
        <div className="hero-video-fallback absolute inset-0 opacity-80" aria-hidden="true" />
        <div className="hero-video-veil absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-36">
          <p className="font-mono text-[11px] uppercase text-teal">Contact Us</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl tracking-tight md:text-6xl">
            Tell us the channel you need live.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">
            A platform, people, or both. We reply with the product fit and a delivery shape.
          </p>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-5">
          <div className="surface-card rounded-[1.6rem] p-6">
            <p className="font-mono text-[11px] uppercase text-signal-deep">Office</p>
            <h2 className="mt-3 font-display text-2xl text-navy">{company.legalName}</h2>
            <p className="mt-3 leading-7 text-mist">
              {company.lines[0]}
              <br />
              {company.lines[1]}
            </p>
            <div className="mt-5">
              <ContactEmails />
            </div>
          </div>

          <div className="surface-card rounded-[1.6rem] p-6">
            <p className="font-mono text-[11px] uppercase text-signal-deep">Start with</p>
            <ul className="mt-4 space-y-3">
              {products.slice(0, 3).map((product) => (
                <li key={product.slug}>
                  <Link href={`/products/${product.slug}`} className="draw-link text-sm font-semibold text-navy hover:text-signal-deep">
                    {product.name}
                  </Link>
                  <p className="text-sm text-mist">{product.promise}</p>
                </li>
              ))}
              {services.slice(0, 2).map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="draw-link text-sm font-semibold text-navy hover:text-signal-deep">
                    {service.name}
                  </Link>
                  <p className="text-sm text-mist">{service.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="surface-card rounded-[1.8rem] p-6 md:p-8">
            <p className="font-mono text-[11px] uppercase text-signal-deep">Send a note</p>
            <h2 className="mt-2 font-display text-3xl">We will route it to the right desk.</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
