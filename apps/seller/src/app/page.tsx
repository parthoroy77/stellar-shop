import { CommissionTiers } from "@/components/landing/commission-tiers";
import { ComparisonTable } from "@/components/landing/comparison-table";
import FeatureOfferings from "@/components/landing/feature-offerings";
import Hero from "@/components/landing/hero";
import { IntegrationShowcase } from "@/components/landing/integration-showcase";
import Navbar from "@/components/landing/navbar";
import PlatformBenefits from "@/components/landing/platform-benefits";
import PlatformStats from "@/components/landing/platform-stats";
import { PricingPlans } from "@/components/landing/PricingPlans";
import { SuccessStories } from "@/components/landing/success-stories";
import { Testimonials } from "@/components/landing/testimonials";

const LadingPage = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeatureOfferings />
      <PlatformStats />
      <PlatformBenefits />
      <SuccessStories />
      <PricingPlans />
      <ComparisonTable />
      <CommissionTiers />
      <IntegrationShowcase />
      <Testimonials />
    </main>
  );
};

export default LadingPage;
