"use client";

import { useCartContext } from "@/contexts/cart-context";
import { useClientSession } from "@/lib/auth-utils";
import { AppButton } from "@ui/index";
import { useRouter } from "next/navigation";
import { FC, MouseEvent, useCallback, useMemo } from "react";
import { BsCartCheck } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { toast } from "sonner";

interface Props {
  productId: number;
}

const AddToCartButton: FC<Props> = ({ productId }) => {
  const router = useRouter();
  const { isAuthenticated } = useClientSession();
  const { isInCart, addProductToCart } = useCartContext();

  const inCart = useMemo(() => isInCart(productId), [isInCart, productId]);

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
        router.push("/login");
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
        asChild
        size="sm"
        variant={inCart ? "success" : "accent"}
        className="group/button flex h-fit w-fit items-center justify-center gap-2 rounded-full p-[5px] font-normal transition-all duration-300 lg:rounded-md lg:p-2"
      >
        {inCart ? (
          <>
            <BsCartCheck color="white" className="text-base lg:text-lg" />
            <span className="hidden lg:block">View Cart</span>
          </>
        ) : (
          <>
            <HiOutlineShoppingBag className="text-base lg:text-lg" />
            <span className="hidden lg:block">Add To Cart</span>
          </>
        )}
      </AppButton>
    </div>
  );
};

export default AddToCartButton;
