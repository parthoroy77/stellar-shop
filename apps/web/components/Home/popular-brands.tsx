import { getAllBrands } from "@/actions/brand";
import "swiper/css";
import "swiper/css/navigation";
import "../../styles/slider.css";
import BrandSlider from "./brand-slider";

const PopularBrands = async () => {
  const brands = await getAllBrands();
  return (
    <div className="space-y-5">
      <h3 className="text-xl font-medium">Search By Brands</h3>
      {brands && brands?.length > 0 ? <BrandSlider brands={brands || []} /> : <p> No Brands found</p>}
    </div>
  );
};

export default PopularBrands;
