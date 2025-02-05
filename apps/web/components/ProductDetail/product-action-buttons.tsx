import { useCartContext } from "@/contexts/cart-context";
import { useClientSession } from "@/lib/auth-utils";
import { Button } from "@repo/ui";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo } from "react";
import { toast } from "sonner";
interface Props {
  productId: number;
  quantity: number;
  productVariantId: number | null;
}
const ProductActionButtons: FC<Props> = ({ productId, quantity, productVariantId }) => {
  const { isAuthenticated } = useClientSession();
  const { isInCart, addProductToCart } = useCartContext();
  const router = useRouter();
  const inCart = useMemo(
    () => (isAuthenticated ? isInCart(productId, productVariantId) : false),
    [isInCart, productId, productVariantId]
  );

  const handleAddToCart = useCallback(() => {
    if (inCart) {
      router.push("/cart");
      return;
    }

    if (!isAuthenticated) {
      toast.info("Please log in first!");
      router.push("/login");
      return;
    } else {
      // actually update cart
      addProductToCart({ productId, productVariantId, quantity });
    }
  }, [inCart, isAuthenticated, productId, router, quantity]);

  return (
    <div className="flex gap-5 *:w-full">
      <Button>Buy Now</Button>
      <Button onClick={handleAddToCart} disabled={inCart} variant={"secondary"}>
        {inCart ? "Already in cart" : "Add To Cart"}
      </Button>
    </div>
  );
};

export default ProductActionButtons;
