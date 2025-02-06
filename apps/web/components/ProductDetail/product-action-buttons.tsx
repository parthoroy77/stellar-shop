import { initiateCheckout } from "@/actions/checkout";
import { useCartContext } from "@/contexts/cart-context";
import { useClientSession } from "@/lib/auth-utils";
import { AppButton, Button } from "@repo/ui";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo, useTransition } from "react";
import { toast } from "sonner";
interface Props {
  productId: number;
  quantity: number;
  productVariantId: number | null;
  outOfStock: boolean;
}
const ProductActionButtons: FC<Props> = ({ productId, quantity, productVariantId, outOfStock }) => {
  const { isAuthenticated } = useClientSession();
  const [isPending, startTransition] = useTransition();
  const { isInCart, addProductToCart } = useCartContext();
  const router = useRouter();

  const inCart = useMemo(
    () => (isAuthenticated ? isInCart(productId, productVariantId) : false),
    [isInCart, productId, productVariantId, isAuthenticated]
  );

  const handleAddToCart = useCallback(() => {
    if (!isAuthenticated) {
      toast.info("Please log in first!");
      router.push("/login");
      return;
    } else {
      // actually update cart
      addProductToCart({ productId, productVariantId, quantity });
    }
  }, [inCart, isAuthenticated, productId, router, quantity]);

  const handleProductBuy = useCallback(() => {
    if (!isAuthenticated) {
      toast.info("Please log in first!");
      router.push("/login");
      return;
    }

    if (outOfStock) {
      toast.info("This product is out of stock!");
      return;
    }

    startTransition(async () => {
      await initiateCheckout({ checkoutProduct: { productId, productVariantId, quantity } }, "product");
    });
  }, [isAuthenticated, productId, router, quantity, productVariantId, quantity, outOfStock]);

  return (
    <div className="flex gap-5 *:w-full">
      <AppButton disabled={outOfStock} loading={isPending} onClick={handleProductBuy}>
        {outOfStock ? "Out of stock" : "Buy now"}
      </AppButton>
      <Button onClick={handleAddToCart} disabled={inCart || outOfStock} variant={"secondary"}>
        {outOfStock ? "Out of stock " : inCart ? "Already in cart" : "Add To Cart"}
      </Button>
    </div>
  );
};

export default ProductActionButtons;
