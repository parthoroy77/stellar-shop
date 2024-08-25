import SideFilters from "@/components/ProductSearchPage/side-filters";
import ProductCard from "@/components/ui/product-card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@repo/ui";
import { productsPerViewOptions, sortOptions } from "@repo/utils/constants";
import { FC } from "react";
interface ProductSearchPageProps {
  params: {
    collections: string[];
  };
}
const ProductSearchPage: FC<ProductSearchPageProps> = ({ params }) => {
  return (
    <div className="flex gap-5 py-10">
      <div className="w-[21%]">
        <SideFilters />
      </div>
      <div className="w-[79%] space-y-5">
        <div className="flex w-full items-center justify-between rounded-md">
          <span>0 items found</span>
          <div className="flex gap-5">
            <Select>
              <SelectTrigger className="min-w-[100px]">
                <SelectValue placeholder="Show" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {productsPerViewOptions.map((op) => (
                    <SelectItem key={op.value} value={op.value.toString()}>
                      {op.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="min-w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sortOptions.map((op) => (
                    <SelectItem key={op.value} value={op.value}>
                      {op.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_x, index) => (
            <ProductCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSearchPage;
