import ProductCard from "@/components/ui/product-card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@repo/ui";
import { productsPerViewOptions, sortOptions } from "@repo/utils/constants";
const ProductListing = () => {
  return (
    <div className="w-[80%] space-y-5">
      <div className="flex w-full items-center justify-between rounded-md">
        <span className="text-accent-foreground inline-block text-xs">Showing all 7 results</span>
        <div className="flex gap-5">
          <div className="flex items-center gap-2">
            <span className="text-accent-foreground block text-xs">Show:</span>
            <Select>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Show" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {productsPerViewOptions.map((op) => (
                    <SelectItem key={op.value} value={op.value.toString()}>
                      {op.label} Item
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent-foreground block text-xs">Sort:</span>
            <Select>
              <SelectTrigger className="w-[180px]">
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
      </div>
      <div className="grid grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_x, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
