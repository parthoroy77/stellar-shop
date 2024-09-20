"use client";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@ui/index";
import Image from "next/image";
import Link from "next/link";
import { PiShoppingCartSimple } from "react-icons/pi";

const CartHoverMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative cursor-pointer">
          <PiShoppingCartSimple size={23} aria-label="Shopping Cart" />
          <div className="bg-primary absolute -right-3 -top-2 flex size-[14px] items-center justify-center rounded-full text-center text-[9px] text-xs text-white">
            <span>0</span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] p-2">
        <div className="space-y-3">
          <div className="custom-scrollbar h-[300px] space-y-2 overflow-hidden overflow-y-scroll">
            {Array.from({ length: 8 }).map((_x, i) => (
              <div key={i} className="flex w-full items-center gap-1 border p-1">
                <Image
                  src={"https://klbtheme.com/bevesi/wp-content/uploads/2024/04/1-23.jpg"}
                  alt="Product Image"
                  width={50}
                  height={50}
                />
                <div className="text-xs">
                  <span className="font-medium">100% Apple Juice – 64 fl oz Bottle</span>
                  <div className="flex">
                    <span>2x</span>
                    <span className="text-primary font-semibold">$7.99</span>
                  </div>
                </div>
              </div>
            ))}
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
