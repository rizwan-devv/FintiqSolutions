import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { TrustMetrics } from "@/components/home/TrustMetrics";
import { ScrollConstellationLazy } from "@/components/three/ScrollConstellationLazy";
import { EnergyRibbonLazy } from "@/components/three/EnergyRibbonLazy";
import { PlatformRail } from "@/components/home/PlatformRail";
import { DeliveryStrip } from "@/components/home/DeliveryStrip";
import { WhoWeServe } from "@/components/home/WhoWeServe";
import { WhyFintiq } from "@/components/home/WhyFintiq";
import { WorkSlideshow } from "@/components/home/WorkSlideshow";
import { InsightsShelf } from "@/components/home/InsightsShelf";
import { HomeContact } from "@/components/home/HomeContact";

export function HomeView() {
  return (
    <main>
      <HeroSlideshow />
      <TrustMetrics />
      <ScrollConstellationLazy />
      <PlatformRail />
      <EnergyRibbonLazy />
      <DeliveryStrip />
      <WhoWeServe />
      <WhyFintiq />
      <WorkSlideshow />
      <InsightsShelf />
      <HomeContact />
    </main>
  );
}
