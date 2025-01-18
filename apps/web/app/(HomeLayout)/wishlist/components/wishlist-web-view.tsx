import AddToCartButton from "@/components/ui/add-to-cart-button";
import { TWishlistItem } from "@repo/utils/types";
import { Badge, ShadTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@ui/index";
import Image from "next/image";
import Link from "next/link";
import { LuDollarSign } from "react-icons/lu";
import RemoveWishlistButton from "./remove-wishlist-button";

export const getAttributes = (wishlistItem: TWishlistItem) => {
  const attributes = wishlistItem.productVariant?.attributes?.map((attr) => ({
    name: attr.attributeValue.value,
  }));
  return attributes;
};
const WishlistWebView = ({ wishlistItems }: { wishlistItems: TWishlistItem[] }) => {
  return (
    <div className="hidden rounded-md border-2 md:block">
      <ShadTable>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Add to cart</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wishlistItems.length > 0 ? (
            wishlistItems.map((wishlistItem, idx) => (
              <TableRow key={idx} className="*:py-2">
                <TableCell>
                  <Link href={`/products/${wishlistItem.product.urlSlug}`}>
                    <div className="flex items-center gap-3">
                      <div className="relative h-20 w-20 flex-none">
                        <Image
                          src={
                            wishlistItem.product.images[0]?.file.fileSecureUrl ||
                            "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/product1-300x300.jpeg"
                          }
                          alt={wishlistItem.product.productName}
                          width={70}
                          height={70}
                          className="size-[70px] rounded-md border object-cover p-1"
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="truncate text-lg font-medium">{wishlistItem.product.productName}</h4>
                        {/* If has variant then show here */}
                        {getAttributes.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {getAttributes(wishlistItem)?.map((attr, idx) => (
                              <Badge key={idx} variant={"accent"} className="rounded-md">
                                {attr.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="text-primary-foreground flex items-center gap-1 text-lg font-semibold">
                    <LuDollarSign />
                    <span>90.99</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className="rounded-md"
                    variant={
                      wishlistItem.product.stock === 0
                        ? "destructive"
                        : wishlistItem.product.stock <= 10
                          ? "accent"
                          : "success"
                    }
                  >
                    {wishlistItem.product.stock === 0
                      ? "Out of stock"
                      : wishlistItem.product.stock <= 10
                        ? "Low stock"
                        : "In Stock"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <AddToCartButton productId={wishlistItem.product.id} />
                </TableCell>
                <TableCell>
                  <RemoveWishlistButton
                    isMobile={false}
                    productId={wishlistItem.productId}
                    productVariantId={wishlistItem.productVariantId || undefined}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </ShadTable>
    </div>
  );
};

export default WishlistWebView;
