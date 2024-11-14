import { FC } from "react";

interface PriceProps {
  price: number;
  comparePrice: number;
}

const ProductPrice: FC<PriceProps> = ({ price, comparePrice }) => {
  return (
    <p className="flex items-end gap-2 text-base font-medium lg:text-xl">
      <span className="text-primary text-3xl font-semibold lg:text-4xl">${price}</span>
      {comparePrice && <strike className="text-gray-400">${comparePrice}</strike>}
    </p>
  );
};

export default ProductPrice;
