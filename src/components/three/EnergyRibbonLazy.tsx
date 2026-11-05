"use client";

import dynamic from "next/dynamic";

export const EnergyRibbonLazy = dynamic(
  () => import("@/components/three/EnergyRibbon").then((m) => m.EnergyRibbon),
  {
    ssr: false,
    loading: () => (
      <section className="border-y border-white/8 bg-[#06101c] px-6 py-16" aria-hidden="true">
        <div className="mx-auto h-[38vh] max-w-6xl animate-pulse rounded-[1.2rem] bg-white/[0.03]" />
      </section>
    ),
  },
);
