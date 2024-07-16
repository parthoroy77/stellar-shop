import ProductsSlider from "./products-slider";
import SideBanner from "./side-banner";

const FeatureProducts = () => {
  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="w-full lg:w-[20%]">
        <SideBanner
          heading="Featured Products"
          subHeading="Grab Before Stock Out"
          image="https://ninetheme.com/themes/fitment/wp-content/uploads/2024/01/2-300x300.png"
        />
      </div>
      <div className="w-full space-y-5 lg:w-[80%]">
        <ProductsSlider />
      </div>
    </div>
  );
};

export default FeatureProducts;
