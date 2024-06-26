import DiscountPanel from "../../components/Home/discount-panel";
import HeroSection from "../../components/Home/hero-section";
import TrendingCategory from "../../components/Home/trending-category";

export default function Home() {
  return (
    <main className="space-y-10 py-8 ">
      <HeroSection />
      <TrendingCategory />
      <DiscountPanel />
    </main>
  );
}
