"use client";

import { FormEvent, useState } from "react";
import { products } from "@/content/site";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "done"; message: string } | { kind: "error"; message: string };

const field =
  "mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink outline-none focus:border-signal-deep";

export function ContactForm() {
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
      const body = (await response.json()) as { message?: string };
      if (!response.ok) {
        setStatus({ kind: "error", message: body.message ?? "Check the form and try again." });
        return;
      }
      setStatus({ kind: "done", message: body.message ?? "Received." });
      form.reset();
      setInterest("platform");
    } catch {
      setStatus({ kind: "error", message: "The form could not be sent. Try again in a moment." });
    }
  }

  if (status.kind === "done") {
    return (
      <div className="rounded-3xl bg-navy p-8 text-white">
        <p className="font-display text-4xl">Received.</p>
        <p className="mt-4 leading-7 text-white/75">{status.message}</p>
      </div>
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

      {status.kind === "error" ? <p className="mt-4 text-sm text-red-700">{status.message}</p> : null}

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
