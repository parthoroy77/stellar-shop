import HeroBanner from "./hero-banner";
import HeroFeatureProducts from "./hero-feature-product";
import HeroSlider from "./hero-slider";

const HeroSection = () => {
  return (
    <div className="flex flex-col gap-8 lg:h-[550px] lg:flex-row-reverse">
      <HeroFeatureProducts />
      <HeroBanner />
      <HeroSlider />
    </div>
  );
};

export default HeroSection;
