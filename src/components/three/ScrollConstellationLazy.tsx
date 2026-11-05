"use client";

import dynamic from "next/dynamic";

export const ScrollConstellationLazy = dynamic(
  () => import("@/components/three/ScrollConstellation").then((m) => m.ScrollConstellation),
  {
    ssr: false,
    loading: () => (
      <section className="bg-ink-raised px-6 py-24 text-white" aria-hidden="true">
        <div className="mx-auto h-[50vh] max-w-6xl animate-pulse rounded-[1.2rem] border border-white/10 bg-white/[0.03]" />
      </section>
    ),
  },
);
