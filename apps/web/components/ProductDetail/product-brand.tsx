import { TProduct } from "@repo/utils/types";
import { Button } from "@ui/index";
import Image from "next/image";

const ProductBrand = ({ brand }: { brand: Partial<TProduct["brand"]> }) => {
  return (
    <div className="flex items-center gap-3">
      <h5 className="text-accent-foreground text-sm font-medium">Brand :</h5>
      <Button variant={"link"} className="flex items-center gap-2 p-0">
        <Image
          src={brand.file?.fileSecureUrl!}
          width={30}
          height={30}
          className="rounded-full border"
          alt={brand.name + " " + "Logo"}
        />
        <span className="font-semibold">{brand.name}</span>
      </Button>
    </div>
  );
};

export default ProductBrand;
