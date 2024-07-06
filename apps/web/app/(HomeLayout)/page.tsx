import BestSellers from "../../components/Home/best-sellers";
import DiscountPanel from "../../components/Home/discount-panel";
import HeroSection from "../../components/Home/hero-section";
import PopularBrands from "../../components/Home/popular-brands";
import PromotionBanner from "../../components/Home/promotion-banner";
import TodayHotDeals from "../../components/Home/today-hot-deals";
import TrendingCategory from "../../components/Home/trending-category";

export default function Home() {
  return (
    <div className="space-y-10 py-8">
      <HeroSection />
      <TrendingCategory />
      <DiscountPanel />
      <TodayHotDeals />
      <DiscountPanel />
      <PromotionBanner />
      <BestSellers />
      <PopularBrands />
    </div>
  );
}
