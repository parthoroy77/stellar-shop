"use client";
import { deleteCartItem } from "@/actions/cart";
import { useCartContext } from "@/contexts/cart-context";
import {
  AppButton,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/index";
import { cn } from "@ui/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { LuTrash2 } from "react-icons/lu";
import { PiShoppingCartSimple } from "react-icons/pi";
import { toast } from "sonner";

const CartHoverMenu = () => {
  const [isPending, startTransition] = useTransition();
  const { cartItemCount, cartItems } = useCartContext();
  const { invalidateCart } = useCartContext();
  const handleDelete = (id: number) => {
    startTransition(async () => {
      const result = await deleteCartItem(id);
      if (result.success) {
        await invalidateCart();
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative cursor-pointer">
          <PiShoppingCartSimple size={23} aria-label="Shopping Cart" />
          <div className="bg-primary absolute -right-3.5 -top-2.5 flex size-4 items-center justify-center rounded-full text-center text-xs text-white">
            <span>{cartItemCount}</span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] p-2">
        <div className="space-y-3">
          <div className="custom-scrollbar max-h-[300px] divide-y overflow-y-scroll *:py-2">
            {cartItems.length > 0 ? (
              cartItems.map((item, i) => (
                <div key={i} className={cn("relative flex w-full items-start gap-1.5 overflow-hidden")}>
                  <Image
                    className="rounded-md"
                    src={item.product?.images![0]?.file.fileSecureUrl!}
                    alt={item.product?.productName!}
                    width={50}
                    height={50}
                  />
                  <div className="w-full space-y-1 text-xs">
                    <h6 className="w-[200px] truncate text-sm font-medium">{item.product?.productName}</h6>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        <span>{item.quantity} x</span>
                        <span className="text-primary font-semibold">${item.product?.price}</span>
                      </div>
                      <AppButton
                        loading={isPending}
                        hideElement={isPending}
                        size={"icon"}
                        variant={"accent"}
                        onClick={() => handleDelete(item.id)}
                        className="size-6 border"
                      >
                        <LuTrash2 size={17} />
                      </AppButton>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-accent-foreground flex h-[100px] items-center justify-center text-sm">
                <p>No item added yet!</p>
              </div>
            )}
          </div>
          <DropdownMenuSeparator />
          <div className="flex gap-2 *:w-full">
            <Link href={"/cart"} prefetch={false} className="block w-full">
              <Button size={"sm"} variant={"default"} className="w-full">
                View Cart
              </Button>
            </Link>
            <Button size={"sm"} variant={"secondary"}>
              Checkout
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartHoverMenu;
