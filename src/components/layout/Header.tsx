"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { navigation } from "@/content/site";
import { buttonPrimary } from "@/components/ui/styles";

function pathMatches(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState({ path: pathname, open: null as string | null, mobile: false });

  if (menu.path !== pathname) {
    setMenu({ path: pathname, open: null, mobile: false });
  }

  const open = menu.open;
  const mobile = menu.mobile;
  const onHome = pathname === "/";
  const overHero = onHome && !scrolled && !mobile && !open;
  const compact = scrolled && !mobile;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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

  const linkIdle = overHero ? "text-white/75 hover:text-white" : "text-navy/75 hover:text-signal-deep";
  const linkActive = overHero ? "text-white" : "text-navy";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`brand-bar relative overflow-hidden transition-[height] duration-300 ease-out ${
          compact || overHero ? "h-0" : "h-2.5"
        }`}
      />
      <div
        className={`border-b transition-[background-color,box-shadow,border-color] duration-300 ${
          overHero
            ? "border-transparent bg-transparent"
            : scrolled || mobile || open
              ? "border-navy/10 bg-white/98 shadow-[0_8px_30px_rgb(16_36_88/0.06)] backdrop-blur-md"
              : "border-transparent bg-white/92 backdrop-blur-md"
        }`}
      >
        <div
          className={`flex w-full items-center gap-5 pl-3 pr-3 transition-[height] duration-300 ease-out sm:gap-6 sm:pl-4 sm:pr-5 lg:pl-5 lg:pr-6 ${
            compact ? "h-14" : "h-20"
          }`}
        >
          <Logo compact={compact} light={overHero} />
          <nav className="ml-auto hidden items-center gap-1 xl:flex" aria-label="Primary">
            {navigation.map((item) => {
              const active =
                pathMatches(pathname, item.href) ||
                Boolean(item.children?.some((child) => pathMatches(pathname, child.href)));

              if (item.children && item.children.length > 0) {
                return (
                  <div
                    key={item.href}
                    className={`relative transition-[padding] duration-300 ${
                      compact ? "px-2.5 py-1.5" : "px-3 py-2"
                    }`}
                  >
                    <MegaMenu
                      item={{ ...item, children: item.children }}
                      open={open === item.href}
                      active={active}
                      tone={overHero ? "light" : "dark"}
                      onOpen={() => setMenu((current) => ({ ...current, open: item.href }))}
                      onClose={() => setMenu((current) => ({ ...current, open: null }))}
                    />
                    {active ? (
                      <motion.span
                        layoutId="nav-active"
                        className={`absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full ${
                          overHero
                            ? "bg-teal"
                            : "bg-[linear-gradient(90deg,#102458,#00b0a4)]"
                        }`}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm transition duration-150 ${
                    compact ? "px-2.5 py-1.5" : "px-3 py-2"
                  } ${active ? linkActive : linkIdle}`}
                >
                  {item.label}
                  {active ? (
                    <motion.span
                      layoutId="nav-active"
                      className={`absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full ${
                        overHero ? "bg-teal" : "bg-[linear-gradient(90deg,#102458,#00b0a4)]"
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-3 xl:ml-0">
            <Link
              href="/contact"
              className={`shine-sweep hidden items-center justify-center rounded-full px-5 text-sm font-semibold transition duration-300 ease-out hover:-translate-y-0.5 motion-reduce:transform-none xl:inline-flex ${
                compact ? "h-9" : "h-10"
              } ${
                overHero
                  ? "border border-white/40 bg-white/10 text-white hover:border-teal hover:bg-teal hover:text-ink"
                  : "bg-[linear-gradient(110deg,#102458_0%,#0c6484_48%,#00b0a4_115%)] text-white shadow-[0_12px_28px_rgb(16_36_88/0.22)] hover:brightness-110 hover:shadow-[0_16px_32px_rgb(0_176_164/0.25)]"
              }`}
            >
              Contact Us
            </Link>
            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-full border transition-[height,width,border-color,color] duration-300 xl:hidden ${
                compact ? "h-9 w-9" : "h-10 w-10"
              } ${overHero ? "border-white/35 text-white" : "border-navy/15 text-navy"}`}
              aria-expanded={mobile}
              aria-label={mobile ? "Close menu" : "Open menu"}
              onClick={() => setMenu((current) => ({ ...current, mobile: !current.mobile }))}
            >
              <span className="flex w-4 flex-col gap-1.5" aria-hidden="true">
                <span className={`h-px ${overHero ? "bg-white" : "bg-navy"}`} />
                <span className={`h-px ${overHero ? "bg-white" : "bg-navy"}`} />
                <span className={`h-px w-2/3 ${overHero ? "bg-white" : "bg-navy"}`} />
              </span>
            </button>
          </div>
        </div>
        {mobile ? (
          <nav
            className="h-[calc(100svh-6rem)] overflow-y-auto border-t border-navy/10 bg-white px-6 py-6 xl:hidden"
            aria-label="Mobile"
          >
            {navigation.map((item) => {
              const active =
                pathMatches(pathname, item.href) ||
                Boolean(item.children?.some((child) => pathMatches(pathname, child.href)));
              return (
                <div key={item.href} className="border-b border-navy/10 py-4">
                  <Link
                    href={item.href}
                    className={`font-display text-3xl ${active ? "text-signal-deep" : "text-navy"}`}
                  >
                    {item.label}
                  </Link>
                  {item.children ? (
                    <div className="mt-3 flex flex-col gap-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`text-sm ${
                            pathMatches(pathname, child.href) ? "font-semibold text-navy" : "text-mist"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
            <Link href="/contact" className={`${buttonPrimary} mt-6 w-full`}>
              Contact Us
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
