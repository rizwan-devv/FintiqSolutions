"use client";

import dynamic from "next/dynamic";

export const HeroNodeGraphLazy = dynamic(
  () => import("@/components/three/HeroNodeGraph").then((m) => m.HeroNodeGraph),
  { ssr: false, loading: () => null },
);
