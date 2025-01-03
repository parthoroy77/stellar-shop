import AddToCartButton from "@/components/ui/add-to-cart-button";
import { TWishlistItem } from "@repo/utils/types";
import { Badge, Button } from "@ui/index";
import Image from "next/image";
import Link from "next/link";
import { LuDollarSign } from "react-icons/lu";
import RemoveWishlistButton from "./remove-wishlist-button";
import { getAttributes } from "./wishlist-web-view";

const WishlistMobileView = ({ wishlistItems }: { wishlistItems: TWishlistItem[] }) => {
  return (
    <div className="divide-y *:py-3 md:hidden">
      {wishlistItems.length > 0 ? (
        wishlistItems.map((wishlistItem, idx) => (
          <div key={idx} className="space-y-1.5 px-2">
            <div className="flex items-start gap-3">
              <div className="w-[30%] rounded-md border p-1">
                <Image
                  width={70}
                  height={70}
                  src={wishlistItem.product.images[0]?.file.fileSecureUrl!}
                  alt={wishlistItem.product.productName}
                  className="w-full rounded-md object-cover"
                />
              </div>
              <div className="w-[70%] space-y-1.5">
                <h5 className="truncate font-medium">{wishlistItem.product.productName}</h5>
                {/* If has variant then show here */}
                {getAttributes.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {getAttributes(wishlistItem)?.map((attr, idx) => (
                      <span key={idx} className="rounded-md text-xs font-medium">
                        {attr.name}
                      </span>
                    ))}
                  </div>
                )}

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
                  <RemoveWishlistButton
                    productId={wishlistItem.productId}
                    isMobile
                    productVariantId={wishlistItem.productVariantId || undefined}
                  />
                  <AddToCartButton productId={wishlistItem.product.id} />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-accent-foreground flex h-40 flex-col items-center justify-center gap-3 text-sm">
          <p>Your wishlist is empty</p>
          <Link href={"/"}>
            <Button variant={"accent"}>Return to shop</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistMobileView;
