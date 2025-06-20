import { FC } from "react";
import MobileFilterTrigger from "./mobile-filter-trigger";
import ProductSortOptions from "./product-sort-options";
interface Props {
  totalResults?: number;
}

const ProductHeaderSection: FC<Props> = ({ totalResults = 0 }) => {
  return (
    <div className="flex w-full items-center justify-between">
      <span className="text-accent-foreground inline-block text-xs">Showing all {totalResults} results</span>
      {/* Sort Options */}
      <ProductSortOptions />
      {/* Filter Trigger Button For Mobile View */}
      <MobileFilterTrigger />
    </div>
  );
};

export default ProductHeaderSection;
