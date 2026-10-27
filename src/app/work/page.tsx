import type { Metadata } from "next";
import { CaseStudies } from "@/components/home/CaseStudies";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected Fintiq deployments, described by the problem, what shipped, and the result.",
};

export default function WorkPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-36">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal-deep">Selected work</p>
      <h1 className="mt-4 max-w-3xl font-display text-5xl tracking-tight md:text-7xl">
        What the platforms do once they are live.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-mist">
        Names and logos stay off until the institution approves them. Each engagement is the problem, what we shipped, and the result.
      </p>
      <div className="mt-16">
        <CaseStudies />
      </div>
    </main>
  );
}
