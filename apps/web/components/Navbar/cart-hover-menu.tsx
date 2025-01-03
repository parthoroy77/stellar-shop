"use client";
import { useCartContext } from "@/contexts/cart-context";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@ui/index";
import Image from "next/image";
import Link from "next/link";
import { PiShoppingCartSimple } from "react-icons/pi";

const CartHoverMenu = () => {
  const { cartItemCount, cartItems } = useCartContext();
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
          <div className="custom-scrollbar max-h-[300px] min-h-[120px] space-y-2 overflow-hidden overflow-y-scroll">
            {cartItems.length > 0 ? (
              cartItems.map((item, i) => (
                <div key={i} className="flex w-full items-center gap-1.5 rounded-md border p-1">
                  <Image
                    className="rounded-md"
                    src={item.product?.images![0]?.file.fileSecureUrl!}
                    alt={item.product?.productName!}
                    width={50}
                    height={50}
                  />
                  <div className="space-y-0.5 text-xs">
                    <h6 className="w-[200px] truncate font-medium">{item.product?.productName}</h6>
                    <div className="flex gap-1">
                      <span>{item.quantity} x</span>
                      <span className="text-primary font-semibold">${item.product?.price}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-accent-foreground flex h-[120px] items-center justify-center text-sm">
                <p>No item added yet!</p>
              </div>
            )}
          </div>
          <DropdownMenuSeparator />
          <div className="flex gap-1 text-sm font-medium">
            <span>Subtotal:</span>
            <span className="text-primary-foreground">$600</span>
          </div>
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
