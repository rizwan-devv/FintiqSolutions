import { ChapterNav } from "@/components/home/ChapterNav";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { PlatformRail } from "@/components/home/PlatformRail";
import { RailsStrip } from "@/components/home/RailsStrip";
import { WhoWeServe } from "@/components/home/WhoWeServe";
import { WhyFintiq } from "@/components/home/WhyFintiq";
import { IntegrateStrip } from "@/components/home/IntegrateStrip";
import { HowWeWork } from "@/components/home/HowWeWork";
import { ServiceSlideshow } from "@/components/home/ServiceSlideshow";
import { AugmentationBlock } from "@/components/home/AugmentationBlock";
import { WorkSlideshow } from "@/components/home/WorkSlideshow";
import { InsightsShelf } from "@/components/home/InsightsShelf";
import { HomeContact } from "@/components/home/HomeContact";

export function HomeView() {
  return (
    <main>
      <ChapterNav />
      <div id="platforms" data-chapter="platforms">
        <HeroSlideshow />
        <PlatformRail />
        <RailsStrip />
      </div>
      <div id="buyers" data-chapter="buyers">
        <WhoWeServe />
        <WhyFintiq />
        <IntegrateStrip />
        <HowWeWork />
      </div>
      <div id="proof" data-chapter="proof">
        <ServiceSlideshow />
        <AugmentationBlock />
        <WorkSlideshow />
        <InsightsShelf />
        <HomeContact />
      </div>
    </main>
  );
}
