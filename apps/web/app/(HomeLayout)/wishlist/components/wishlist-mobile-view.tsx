import { AppButton, Badge } from "@ui/index";
import Image from "next/image";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { LuDollarSign } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";

const WishlistMobileView = () => {
  return (
    <div className="divide-y *:py-3 md:hidden">
      {Array.from({ length: 4 }).map((_x, idx) => (
        <div key={idx} className="space-y-2 px-2">
          <div className="flex items-start gap-3">
            <div className="rounded-md border p-1">
              <Image
                width={70}
                height={70}
                src={"https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/product1-300x300.jpeg"}
                alt={"product image"}
                className="rounded-md object-cover"
              />
            </div>
            <div className="space-y-1.5">
              <h5 className="truncate font-medium">DNA Motoring TOOLS-00266 Green</h5>
              {/* If has variant then show here */}
              <div className="text-accent-foreground flex items-center gap-2 text-xs">
                <span>Color: Black</span>
                <span>Size: Small</span>
              </div>

              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="text-primary-foreground flex items-center gap-1 font-medium">
                  <LuDollarSign />
                  <span>90.99</span>
                </div>
                <Badge variant={"success"} className="rounded-md">
                  In stock
                </Badge>
              </div>
              <div className="flex items-center justify-between gap-2 text-xs">
                <AppButton variant={"ghost"} size={"icon"} className="h-fit w-fit border p-1.5">
                  <RiDeleteBinLine size={20} />
                </AppButton>
                <AppButton
                  size={"sm"}
                  variant={"accent"}
                  className="flex w-[130px] items-center rounded-md border font-normal"
                >
                  <HiOutlineShoppingBag size={20} className="-mr-1" /> <span>Add To Cart</span>
                </AppButton>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistMobileView;
