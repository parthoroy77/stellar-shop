import { getTrendingCategories } from "@/actions/category";
import { Button } from "@repo/ui";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import TrendingCategoriesSlider from "./trending-categories-slider";

const TrendingCategory = async () => {
  const categories = await getTrendingCategories();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h5 className="text-sm font-semibold tracking-wide lg:text-xl">Trending Categories</h5>
        <Link href={"/search"}>
          <Button
            size={"sm"}
            className="border-primary flex items-center gap-3 rounded-3xl text-xs lg:w-[200px] lg:text-sm"
            variant={"outline"}
          >
            All Categories
            <FaArrowRight />
          </Button>
        </Link>
      </div>
      {categories.length > 0 ? (
        <TrendingCategoriesSlider categories={categories} />
      ) : (
        <p className="text-center">No trending categories found.</p>
      )}
    </div>
  );
};

export default TrendingCategory;
