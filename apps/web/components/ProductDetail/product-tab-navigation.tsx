"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";
import { TProduct } from "@repo/utils/types";
import ProductDescription from "./product-description";
import ProductQAndA from "./product-q-and-a";
import ProductReviewContainer from "./product-review-container";

const ProductTabNavigation = ({ product }: { product: TProduct }) => {
  const tabItems = [
    { label: "Review", value: "review", Component: <ProductReviewContainer product={product} /> },
    { label: "Description", value: "description", Component: <ProductDescription description={product.description} /> },
    // Specification not required In future if needed then will add
    // { label: "Specification", value: "specification", Component: <ProductSpecification /> },
    { label: "Q & A", value: "q-and-a", Component: <ProductQAndA /> },
  ];
  return (
    <div>
      <Tabs defaultValue="review" className="w-full">
        <TabsList className="text-accent-foreground flex w-full justify-start rounded-none border-0 border-b bg-white p-0">
          {tabItems.map(({ label, value }, i) => (
            <TabsTrigger className="w-[180px]" key={i} value={value}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabItems.map(({ value, Component }, i) => (
          <TabsContent key={i} value={value}>
            {Component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ProductTabNavigation;
