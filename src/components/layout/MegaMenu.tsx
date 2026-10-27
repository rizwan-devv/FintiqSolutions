"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ProductMock } from "@/components/product/ProductMock";
import { getProduct, type NavItem } from "@/content/site";

type Child = NonNullable<NavItem["children"]>[number];

export function MegaMenu({
  item,
  open,
  onOpen,
  onClose,
}: {
  item: NavItem & { children: Child[] };
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const [activeHref, setActiveHref] = useState(item.children[0]?.href ?? "");
  const activeChild = item.children.find((child) => child.href === activeHref) ?? item.children[0];
  const productSlug = activeChild?.href.startsWith("/products/")
    ? activeChild.href.replace("/products/", "")
    : null;
  const product = productSlug ? getProduct(productSlug) : undefined;
  const isPlatforms = item.href === "/products";
  const isIndustries = item.href === "/industries";

  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        className={`inline-flex items-center gap-1.5 text-sm transition duration-150 ${
          open ? "text-signal-deep" : "text-navy/75 hover:text-signal-deep"
        }`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => (open ? onClose() : onOpen())}
      >
        {item.label}
        <span className={`text-[10px] transition ${open ? "rotate-180" : ""}`} aria-hidden="true">
          ▾
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            key={`${item.href}-panel`}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: 6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-full z-50 w-[min(92vw,56rem)] -translate-x-1/2 pt-4"
          >
            <div className="overflow-hidden rounded-[1.6rem] border border-navy/10 bg-white shadow-[0_28px_80px_rgb(16_36_88/0.18)]">
              <div className={`grid ${isPlatforms ? "lg:grid-cols-[0.95fr_1.05fr]" : "lg:grid-cols-[0.7fr_1.3fr]"}`}>
                <div className="panel-gradient-rich relative overflow-hidden p-7 text-white">
                  <div className="aurora pointer-events-none absolute -right-16 top-0 size-48 rounded-full blur-3xl opacity-60" aria-hidden="true" />
                  <p className="relative font-mono text-[11px] uppercase text-teal">{item.label}</p>
                  <p className="relative mt-3 font-display text-3xl tracking-tight">
                    {isPlatforms
                      ? "Six platforms. Brand one."
                      : isIndustries
                        ? "Built for the institution."
                        : "Delivery, people, and support."}
                  </p>
                  {isPlatforms && product ? (
                    <div className="relative mt-6 max-h-64 overflow-hidden rounded-2xl bg-white/95 p-3 text-navy">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={product.slug}
                          initial={reduce ? false : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduce ? undefined : { opacity: 0, y: -8 }}
                          transition={{ duration: 0.25 }}
                        >
                          <p className="font-mono text-[10px] uppercase text-signal-deep">{product.eyebrow}</p>
                          <p className="mt-1 text-sm font-semibold">{product.name}</p>
                          <div className="mt-3 origin-top scale-[0.88]">
                            <ProductMock slug={product.slug} />
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  ) : (
                    <p className="mt-5 text-sm leading-7 text-white/70">
                      {isIndustries
                        ? "Banks, wallets, payment companies, and institutions that collect fees."
                        : "Implementation, integration, compliance engineering, resource augmentation, and production support."}
                    </p>
                  )}
                  <Link
                    href={item.href}
                    className="relative mt-6 inline-flex text-sm font-semibold text-teal transition hover:text-white"
                  >
                    All {item.label.toLowerCase()} →
                  </Link>
                </div>

                <div className="grid gap-1 p-4 sm:grid-cols-2 sm:p-5">
                  {item.children.map((child) => {
                    const active = child.href === activeHref;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onMouseEnter={() => setActiveHref(child.href)}
                        onFocus={() => setActiveHref(child.href)}
                        className={`group relative rounded-2xl px-4 py-3.5 transition duration-150 ${
                          active ? "bg-paper-deep" : "hover:bg-paper-deep/70"
                        }`}
                      >
                        <span className="block text-sm font-semibold text-navy group-hover:text-signal-deep">
                          {child.label}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-mist">{child.note}</span>
                        <span
                          className={`mt-3 block h-1.5 w-1.5 rounded-full bg-teal transition ${
                            active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          }`}
                          aria-hidden="true"
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
