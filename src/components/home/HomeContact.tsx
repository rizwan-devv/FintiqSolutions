"use client";

import { ContactEmails } from "@/components/brand/ContactEmails";
import { ContactForm } from "@/components/contact/ContactForm";
import { ScrollScene } from "@/components/motion/ScrollScene";

export function HomeContact() {
  return (
    <section className="relative overflow-hidden bg-navy text-white" id="talk">
      <div className="section-bg-drift pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <ScrollScene scrub={0.6} className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-12">
        <div data-motion="wipe" className="lg:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal">Talk to us</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
            Tell us the channel you need live.
          </h2>
          <p className="mt-3 leading-7 text-white/75">A platform, people, or both.</p>
          <div className="mt-6">
            <ContactEmails tone="dark" />
          </div>
        </div>
        <div data-motion="slide-right" data-motion-delay={0.08} className="lg:col-span-7">
          <ContactForm />
        </div>
      </ScrollScene>
    </section>
  );
}
