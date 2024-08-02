import { Button } from "@repo/ui";
// todo: Button Animation
const ProductActionButtons = () => {
  return (
    <div className="flex gap-5 *:w-full">
      <Button>Buy Now</Button>
      <Button variant={"secondary"}>Add To Cart</Button>
    </div>
  );
};

export default ProductActionButtons;
