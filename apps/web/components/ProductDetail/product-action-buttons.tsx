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
}
const ProductActionButtons: FC<Props> = ({ productId, quantity, productVariantId }) => {
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

    if (!productVariantId || !productId || quantity === 0) {
      toast.info("Please please select desired variant!");
      return;
    }

    startTransition(async () => {
      await initiateCheckout({ checkoutProduct: { productId, productVariantId, quantity } }, "product");
    });
  }, [isAuthenticated, productId, router, quantity, productVariantId, quantity]);

  return (
    <div className="flex gap-5 *:w-full">
      <AppButton loading={isPending} onClick={handleProductBuy}>
        Buy Now
      </AppButton>
      <Button onClick={handleAddToCart} disabled={inCart} variant={"secondary"}>
        {inCart ? "Already in cart" : "Add To Cart"}
      </Button>
    </div>
  );
};

export default ProductActionButtons;
