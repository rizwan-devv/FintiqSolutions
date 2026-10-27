import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Implementation, integration, compliance engineering, resource augmentation, and production support.",
};

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-36">
      <p className="font-mono text-[11px] uppercase text-signal-deep">Services</p>
      <h1 className="mt-4 max-w-3xl font-display text-5xl tracking-tight md:text-7xl">
        Make a platform yours, staff it, and keep it live.
      </h1>
      <div className="mt-16 divide-y divide-navy/10 border-y border-navy/10">
        {services.map((service, index) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group grid gap-4 py-10 md:grid-cols-12"
          >
            <span className="font-mono text-sm text-mist md:col-span-1">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="md:col-span-4">
              <span className="block font-mono text-[11px] uppercase text-signal-deep">
                {service.eyebrow}
              </span>
              <span className="mt-2 block font-display text-4xl group-hover:text-signal-deep">{service.name}</span>
            </span>
            <span className="leading-7 text-mist md:col-span-7">{service.summary}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
