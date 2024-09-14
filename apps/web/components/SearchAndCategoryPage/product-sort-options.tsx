import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@repo/ui";
import { productsPerViewOptions, sortOptions } from "@repo/utils/constants";
const ProductSortOptions = ({ productsCount }: { productsCount: number }) => {
  return (
    <div className="hidden gap-5 lg:flex">
      <div className="flex items-center gap-2">
        <span className="text-accent-foreground block text-xs">Show:</span>
        <Select>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Show" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {productsPerViewOptions.map((op) => (
                <SelectItem className="text-xs" key={op.value} value={op.value.toString()}>
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
  );
};

export default ProductSortOptions;
