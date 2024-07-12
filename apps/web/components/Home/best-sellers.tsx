import {
  Button,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui";
import { BsArrowRight } from "react-icons/bs";
import ProductCard from "../ui/product-card";

const BestSellers = () => {
  return (
    <div className="space-y-5 border-b-2 pb-5">
      <div className="flex items-center justify-between">
        <h5 className="text-sm font-medium lg:text-xl">Best Sellers</h5>
        <Button variant={"outline"} size={"sm"} className="flex gap-2 rounded-full text-xs">
          Check All Products <BsArrowRight />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
        {Array.from({ length: 10 }).map((_x, index) => (
          <ProductCard key={index} />
        ))}
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default BestSellers;
