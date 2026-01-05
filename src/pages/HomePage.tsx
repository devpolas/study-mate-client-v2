import CallToAction from "@/components/sections/CallToAction";
import FAQSection from "@/components/sections/FAQSection";
import HeroSection from "@/components/sections/HeroSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import StatisticsSection from "@/components/sections/StatisticsSection";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <StatisticsSection />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <FAQSection />
    </div>
  );
}
