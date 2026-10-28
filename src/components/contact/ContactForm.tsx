"use client";

import { FormEvent, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { products } from "@/content/site";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done"; message: string; mailto?: string }
  | { kind: "error"; message: string; mailto?: string };

const field =
  "mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink outline-none focus:border-signal-deep";

export function ContactForm() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [interest, setInterest] = useState("platform");
  const showStaff = interest === "resource-augmentation" || interest === "both";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ kind: "sending" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await response.json()) as { message?: string; mailto?: string };
      if (!response.ok) {
        setStatus({
          kind: "error",
          message: body.message ?? "Check the form and try again.",
          mailto: body.mailto,
        });
        return;
      }
      setStatus({
        kind: "done",
        message: body.message ?? "Received.",
        mailto: body.mailto,
      });
      form.reset();
      setInterest("platform");
    } catch {
      setStatus({
        kind: "error",
        message: "The form could not be sent. Try again in a moment.",
        mailto: "info@fintiqsolutions.com",
      });
    }
  }

  if (status.kind === "done") {
    return (
      <motion.div
        className="rounded-3xl bg-navy p-8 text-white"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="inline-flex size-10 items-center justify-center rounded-full bg-teal text-lg font-bold text-navy"
          initial={reduce ? false : { scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.05 }}
          aria-hidden="true"
        >
          ✓
        </motion.span>
        <p className="mt-4 font-mono text-[11px] uppercase text-teal">Received</p>
        <p className="mt-3 font-display text-4xl">Thank you.</p>
        <p className="mt-4 leading-7 text-white/75">{status.message}</p>
        {status.mailto ? (
          <a
            href={`mailto:${status.mailto}`}
            className="mt-6 inline-flex text-sm font-semibold text-teal underline-offset-4 hover:underline"
          >
            Email {status.mailto}
          </a>
        ) : null}
        <button
          type="button"
          className="mt-8 inline-flex h-11 items-center rounded-full border border-white/25 px-5 text-sm font-semibold text-white transition hover:border-teal hover:bg-teal hover:text-navy"
          onClick={() => setStatus({ kind: "idle" })}
        >
          Send another note
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-navy/10 bg-white p-6 text-navy shadow-sm md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block text-sm">
          Name
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block text-sm">
          Work email
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
        <label className="block text-sm">
          Organization
          <input name="organization" required autoComplete="organization" className={field} />
        </label>
        <label className="block text-sm">
          Phone
          <input name="phone" required autoComplete="tel" className={field} />
        </label>
        <label className="block text-sm">
          Interest
          <select
            name="interest"
            value={interest}
            onChange={(event) => setInterest(event.target.value)}
            className={field}
          >
            <option value="platform">A platform</option>
            <option value="resource-augmentation">Resource augmentation</option>
            <option value="both">A platform and people</option>
          </select>
        </label>
        <label className="block text-sm">
          Platform
          <select name="platform" className={field} defaultValue="">
            <option value="">Choose if you know</option>
            {products.map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {showStaff ? (
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="block text-sm">
            Role
            <input name="role" className={field} placeholder="Spring Boot, React, Android, QA" />
          </label>
          <label className="block text-sm">
            Seniority
            <input name="seniority" className={field} />
          </label>
          <label className="block text-sm">
            People
            <input name="count" inputMode="numeric" className={field} />
          </label>
          <label className="block text-sm">
            Start window
            <input name="start" className={field} placeholder="This quarter" />
          </label>
        </div>
      ) : null}

      <label className="mt-5 block text-sm">
        Message
        <textarea name="message" required rows={5} className={field} />
      </label>
      <input name="company_site" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {status.kind === "error" ? (
        <div className="mt-4 space-y-2">
          <p className="text-sm text-red-700">{status.message}</p>
          {status.mailto ? (
            <a href={`mailto:${status.mailto}`} className="text-sm font-semibold text-signal-deep">
              Email {status.mailto}
            </a>
          ) : null}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="mt-6 inline-flex h-12 items-center rounded-full bg-navy px-6 text-sm font-medium text-white transition hover:bg-teal hover:text-navy disabled:opacity-60"
      >
        {status.kind === "sending" ? "Sending" : "Send"}
      </button>
    </form>
  );
}
