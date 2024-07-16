import ProductsSlider from "./products-slider";
import SideBanner from "./side-banner";

const NewArrivals = () => {
  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="w-full lg:w-[20%]">
        <SideBanner
          heading="Newly Arrived"
          subHeading="Free Shipping Over $50"
          image="https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/TSW-SNETTERTON-300x300.png"
        />
      </div>
      <div className="w-full space-y-5 lg:w-[80%]">
        <ProductsSlider />
      </div>
    </div>
  );
};

export default NewArrivals;
