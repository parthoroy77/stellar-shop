import BestSellers from "../../components/Home/best-sellers";
import DiscountPanel from "../../components/Home/discount-panel";
import FeatureProducts from "../../components/Home/feature-products";
import HeroSection from "../../components/Home/hero-section";
import NewArrivals from "../../components/Home/new-arrivals";
import PopularBrands from "../../components/Home/popular-brands";
import PromotionBanner from "../../components/Home/promotion-banner";
import TodayHotDeals from "../../components/Home/today-hot-deals";
import TrendingCategory from "../../components/Home/trending-category";

export default function Home() {
  return (
    <div className="space-y-10 py-8">
      <HeroSection />
      <TodayHotDeals />
      <DiscountPanel />
      <FeatureProducts />
      <TrendingCategory />
      <PromotionBanner />
      <NewArrivals />
      <DiscountPanel />
      <BestSellers />
      <DiscountPanel />
      <PopularBrands />
    </div>
  );
}
