import BestSellers from "@/components/Home/best-sellers";
import DiscountPanel from "@/components/Home/discount-panel";
import ElectronicProducts from "@/components/Home/electronic-products";
import FashionProducts from "@/components/Home/fashion-products";
import FeaturedBanners from "@/components/Home/featured-banners";
import GroceryProducts from "@/components/Home/grocery-products";
import HeroSection from "@/components/Home/hero-section";
import NewArrivals from "@/components/Home/new-arrivals";
import PopularBrands from "@/components/Home/popular-brands";
import PromotionBanner from "@/components/Home/promotion-banner";
import TrendingCategory from "@/components/Home/trending-category";

export default function Home() {
  return (
    <div className="space-y-10 py-8">
      <HeroSection />
      <ElectronicProducts />
      <DiscountPanel />
      <TrendingCategory />
      <GroceryProducts />
      <FeaturedBanners />
      <FashionProducts />
      <PromotionBanner />
      <NewArrivals />
      <DiscountPanel />
      <BestSellers />
      <DiscountPanel />
      <PopularBrands />
    </div>
  );
}
