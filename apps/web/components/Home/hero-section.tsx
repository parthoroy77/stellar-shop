import HeroBanner from "./hero-banner";
import HeroFeatureProducts from "./hero-feature-product";
import HeroSlider from "./hero-slider";

const HeroSection = () => {
  return (
    <div className="flex h-[600px] py-8 gap-8">
      <HeroSlider />
      <HeroBanner />
      <HeroFeatureProducts />
    </div>
  );
};

export default HeroSection;
