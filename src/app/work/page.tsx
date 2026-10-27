import type { Metadata } from "next";
import { CaseStudies } from "@/components/home/CaseStudies";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected Fintiq deployments — problem, what shipped, result.",
};

export default function WorkPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-20 pt-36">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal-deep">Work</p>
      <h1 className="mt-3 max-w-2xl font-display text-5xl tracking-tight md:text-6xl">
        Selected work.
      </h1>
      <p className="mt-4 max-w-lg text-lg leading-8 text-mist">
        Names stay off until approved. Problem, shipped, result.
      </p>
      <div className="mt-12">
        <CaseStudies />
      </div>
    </main>
  );
}
