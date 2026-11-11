"use client";

import { usePathname } from "next/navigation";
import { BackToTop } from "@/components/motion/BackToTop";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { isTeamSlug } from "@/content/team";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const segment = pathname.replace(/\/+$/, "").split("/").filter(Boolean)[0] ?? "";
  const isHostedCard = Boolean(segment && isTeamSlug(segment));

  if (isHostedCard) {
    return <div id="content">{children}</div>;
  }

  return (
    <>
      <ScrollProgress />
      <SmoothScroll>
        <Header />
        <div id="content">{children}</div>
        <Footer />
        <BackToTop />
      </SmoothScroll>
    </>
  );
}
