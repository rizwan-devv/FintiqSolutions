import Link from "next/link";
import { ContactEmails } from "@/components/brand/ContactEmails";
import { Logo } from "@/components/brand/Logo";
import { company, products, services } from "@/content/site";

export function Footer() {
  return (
    <footer>
      <div className="brand-bar relative h-3" />
      <div className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-4 text-sm font-medium text-navy">{company.legalName}</p>
            <div className="mt-4">
              <ContactEmails />
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase text-signal-deep">Platforms</p>
            <ul className="mt-3 space-y-2">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link href={`/products/${product.slug}`} className="draw-link text-sm text-navy/75 hover:text-signal-deep">
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase text-signal-deep">Services</p>
            <ul className="mt-3 space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="draw-link text-sm text-navy/75 hover:text-signal-deep">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="font-mono text-[11px] uppercase text-signal-deep">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-navy/75">
              <li><Link href="/work" className="draw-link hover:text-signal-deep">Work</Link></li>
              <li><Link href="/about" className="draw-link hover:text-signal-deep">About</Link></li>
              <li><Link href="/contact" className="draw-link hover:text-signal-deep">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-navy/10">
          <p className="mx-auto max-w-6xl px-6 py-4 text-xs leading-5 text-mist">
            The institution remains the system of record for funds and account decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
