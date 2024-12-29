import { AppButton, ShadTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@ui/index";
import Image from "next/image";
import Link from "next/link";
import { LuDollarSign } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
const WishlistWebView = () => {
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
          {Array.from({ length: 4 }).map((_x, idx) => (
            <TableRow key={idx} className="*:py-2">
              <TableCell>
                <Link href="#">
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 flex-none">
                      <Image
                        src={"https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/product1-300x300.jpeg"}
                        alt={"Product Name"}
                        width={70}
                        height={70}
                        className="size-[70px] rounded-md border object-cover p-1"
                      />
                    </div>
                    <div>
                      <h4 className="truncate text-lg font-medium">{"DNA Motoring TOOLS-00266 Green"}</h4>
                      {/* If has variant then show here */}
                      <div className="text-accent-foreground flex items-center gap-2 text-sm">
                        <span>Color: Black</span>
                        <span>Size: Small</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                <div className="text-primary-foreground flex items-center gap-1 font-medium">
                  <LuDollarSign />
                  <span>90.99</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-medium text-green-600">In stock</span>
              </TableCell>
              <TableCell>
                <AppButton size={"sm"} variant={"accent"}>
                  Add To Cart
                </AppButton>
              </TableCell>
              <TableCell>
                <AppButton variant={"accent"} size={"sm"} className="h-fit w-fit border p-1.5">
                  <RiDeleteBinLine size={20} />
                </AppButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ShadTable>
    </div>
  );
};

export default WishlistWebView;
