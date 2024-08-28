"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";
import ProductDescription from "./product-description";
import ProductFAQ from "./product-faq";
import ProductReview from "./product-reviews";
import ProductSpecification from "./product-specification";

const ProductTabNavigation = () => {
  const tabItems = [
    { label: "Review", value: "review", Component: <ProductReview /> },
    { label: "Description", value: "description", Component: <ProductDescription /> },
    { label: "Specification", value: "specification", Component: <ProductSpecification /> },
    { label: "FAQ", value: "faq", Component: <ProductFAQ /> },
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
