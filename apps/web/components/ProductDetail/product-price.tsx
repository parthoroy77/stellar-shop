import { FC } from "react";

interface PriceProps {
  price: number;
  comparePrice: number;
}

const ProductPrice: FC<PriceProps> = ({ price, comparePrice }) => {
  return (
    <div>
      <p className="flex items-end gap-2 text-xs font-medium lg:text-xl">
        <span className="text-primary text-sm font-semibold lg:text-4xl">${price}</span>
        {comparePrice && <strike className="text-gray-400">${comparePrice}</strike>}
      </p>
    </div>
  );
};

export default ProductPrice;
