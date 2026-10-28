import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { AiStrip } from "@/components/home/AiStrip";
import { PlatformRail } from "@/components/home/PlatformRail";
import { DeliveryStrip } from "@/components/home/DeliveryStrip";
import { WhoWeServe } from "@/components/home/WhoWeServe";
import { WorkSlideshow } from "@/components/home/WorkSlideshow";
import { HomeContact } from "@/components/home/HomeContact";

export function HomeView() {
  return (
    <main>
      <HeroSlideshow />
      <AiStrip />
      <PlatformRail />
      <DeliveryStrip />
      <WhoWeServe />
      <WorkSlideshow />
      <HomeContact />
    </main>
  );
}
