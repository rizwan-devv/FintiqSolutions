import type { Metadata } from "next";
import Link from "next/link";
import { insights } from "@/content/site";

export const metadata: Metadata = {
  title: "Insights",
  description: "Notes on entity onboarding, merchant collections, and agent channels.",
};

export default function InsightsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-36">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal-deep">Insights</p>
      <h1 className="mt-4 max-w-3xl font-display text-5xl tracking-tight md:text-7xl">Notes from the work.</h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-mist">
        How the platforms are actually used: onboarding, collections, and a channel in front of the core.
      </p>
      <div className="mt-16 grid gap-6">
        {insights.map((insight) => (
          <Link
            key={insight.slug}
            href={`/insights/${insight.slug}`}
            className="group grid gap-4 rounded-[1.6rem] border border-navy/10 p-7 transition duration-150 hover:-translate-y-1 hover:border-navy/25 motion-reduce:transform-none md:grid-cols-12"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal-deep md:col-span-3">
              {insight.eyebrow}
            </p>
            <div className="md:col-span-9">
              <h2 className="font-display text-3xl group-hover:text-signal-deep">{insight.title}</h2>
              <p className="mt-3 leading-7 text-ink/75">{insight.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
