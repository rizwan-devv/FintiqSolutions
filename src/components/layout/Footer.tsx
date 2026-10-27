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
            <p className="mt-2 text-sm leading-6 text-mist">
              {company.lines[0]}
              <br />
              {company.lines[1]}
            </p>
            <div className="mt-4">
              <ContactEmails />
            </div>
            {company.linkedin ? (
              <a
                href={company.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="draw-link mt-4 inline-flex text-sm font-semibold text-navy hover:text-signal-deep"
              >
                LinkedIn
              </a>
            ) : null}
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
              <li>
                <Link href="/delivery" className="draw-link hover:text-signal-deep">
                  Delivery
                </Link>
              </li>
              <li>
                <Link href="/work" className="draw-link hover:text-signal-deep">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/about" className="draw-link hover:text-signal-deep">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="draw-link hover:text-signal-deep">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-navy/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-mist">{company.disclaimer}</p>
            <p className="shrink-0 text-xs text-mist">© 2026 {company.shortName}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
