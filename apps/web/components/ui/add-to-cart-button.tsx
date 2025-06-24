"use client";

import { useCartContext } from "@/contexts/cart-context";
import useAuthRedirect from "@/hooks/use-auth-redirect";
import { useClientSession } from "@/lib/auth-utils";
import { AppButton } from "@ui/index";
import { usePathname, useRouter } from "next/navigation";
import { FC, MouseEvent, useCallback, useMemo } from "react";
import { BsCartCheck } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { toast } from "sonner";

interface Props {
  productId: number;
}

const AddToCartButton: FC<Props> = ({ productId }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated } = useClientSession();
  const { isInCart, addProductToCart } = useCartContext();

  const inCart = useMemo(() => isInCart(productId, null), [isInCart, productId]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (inCart) {
        router.push("/cart");
        return;
      }

      if (!isAuthenticated) {
        toast.info("Please log in first!");
        useAuthRedirect(router, pathname);
        return;
      } else {
        // actually update cart
        addProductToCart({ productId });
      }
    },
    [inCart, isAuthenticated, productId, router]
  );

  return (
    <div onClick={handleClick}>
      <AppButton
        size="sm"
        variant={inCart ? "success" : "accent"}
        className="group/button flex h-fit w-fit items-center justify-center gap-2 rounded-md p-2 font-normal transition-all duration-300"
      >
        {inCart ? (
          <>
            <BsCartCheck color="white" className="text-base lg:text-lg" />
            <span className="">View Cart</span>
          </>
        ) : (
          <>
            <HiOutlineShoppingBag className="text-base lg:text-lg" />
            <span className="">Add To Cart</span>
          </>
        )}
      </AppButton>
    </div>
  );
};

export default AddToCartButton;
