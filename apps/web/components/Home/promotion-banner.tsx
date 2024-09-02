import { Badge } from "@repo/ui";
import Image from "next/image";

const PromotionBanner = () => {
  return (
    <div className="flex flex-col gap-5 *:w-full lg:h-[300px] lg:flex-row *:lg:w-[50%]">
      <div className="flex h-full w-full flex-col overflow-hidden rounded-md *:w-full lg:flex-row *:lg:w-[50%]">
        <div className="bg-secondary-foreground text-primary-foreground flex h-[300px] flex-col items-center justify-center gap-3 text-xs">
          <Badge variant={"default"}>New Product</Badge>
          <h4 className="text-2xl font-semibold">BMW Accessories</h4>
          <span>Up to 40% off Accessories</span>
          <span>Check Details</span>
        </div>
        <Image
          height={300}
          width={300}
          className="h-[300px] object-cover object-center"
          src="https://ninetheme.com/themes/fitment/wp-content/uploads/2023/10/A0006.jpg"
          alt="Promoted Product Banner Image"
        />
      </div>
      <div className="flex h-full w-full flex-col overflow-hidden rounded-md *:w-full lg:flex-row *:lg:w-[50%]">
        <div className="bg-muted-foreground text-primary-foreground flex h-[300px] flex-col items-center justify-center gap-3 text-xs">
          <Badge variant={"default"}>New Product</Badge>
          <h4 className="text-2xl font-semibold">BMW Accessories</h4>
          <span>Up to 40% off Accessories</span>
          <span>Check Details</span>
        </div>
        <Image
          height={300}
          width={300}
          className="h-[300px] object-cover object-center"
          src="https://ninetheme.com/themes/fitment/wp-content/uploads/2023/08/blog-post-6.png"
          alt="Promoted Product Banner Image"
        />
      </div>
    </div>
  );
};

export default PromotionBanner;
