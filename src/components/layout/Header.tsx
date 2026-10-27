"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { navigation } from "@/content/site";
import { buttonPrimary } from "@/components/ui/styles";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState({ path: pathname, open: null as string | null, mobile: false });

  if (menu.path !== pathname) {
    setMenu({ path: pathname, open: null, mobile: false });
  }

  const open = menu.open;
  const mobile = menu.mobile;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="brand-bar relative h-2.5" />
      <div
        className={`border-b transition ${
          scrolled || mobile || open
            ? "border-navy/10 bg-white/95 backdrop-blur-md"
            : "border-transparent bg-white/80 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <Logo />
          <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary">
            {navigation.map((item) =>
              item.children && item.children.length > 0 ? (
                <MegaMenu
                  key={item.href}
                  item={{ ...item, children: item.children }}
                  open={open === item.href}
                  onOpen={() => setMenu((current) => ({ ...current, open: item.href }))}
                  onClose={() => setMenu((current) => ({ ...current, open: null }))}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition duration-150 hover:text-signal-deep ${
                    pathname === item.href ? "text-navy" : "text-navy/75"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="shine-sweep hidden h-10 items-center justify-center rounded-full bg-[linear-gradient(110deg,#102458_0%,#0c6484_48%,#00b0a4_115%)] px-5 text-sm font-semibold text-white shadow-[0_12px_28px_rgb(16_36_88/0.22)] transition duration-150 ease-out hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_16px_32px_rgb(0_176_164/0.25)] motion-reduce:transform-none xl:inline-flex"
            >
              Talk to us
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 xl:hidden"
              aria-expanded={mobile}
              aria-label={mobile ? "Close menu" : "Open menu"}
              onClick={() => setMenu((current) => ({ ...current, mobile: !current.mobile }))}
            >
              <span className="flex w-4 flex-col gap-1.5" aria-hidden="true">
                <span className="h-px bg-navy" />
                <span className="h-px bg-navy" />
                <span className="h-px w-2/3 bg-navy" />
              </span>
            </button>
          </div>
        </div>
        {mobile ? (
          <nav
            className="h-[calc(100svh-6rem)] overflow-y-auto border-t border-navy/10 bg-white px-6 py-6 xl:hidden"
            aria-label="Mobile"
          >
            {navigation.map((item) => (
              <div key={item.href} className="border-b border-navy/10 py-4">
                <Link href={item.href} className="font-display text-3xl text-navy">
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="mt-3 flex flex-col gap-2">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} className="text-sm text-mist">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <Link href="/contact" className={`${buttonPrimary} mt-6 w-full`}>
              Talk to us
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
