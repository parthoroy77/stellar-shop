import React from "react";

const ProductPrice = () => {
  return (
    <div>
      <p className="flex items-end gap-2 text-xs font-medium lg:text-xl">
        <span className="text-primary text-sm font-semibold lg:text-4xl">$9.99</span>
        <strike className="text-gray-400">$9.99</strike>
      </p>
    </div>
  );
};

export default ProductPrice;
