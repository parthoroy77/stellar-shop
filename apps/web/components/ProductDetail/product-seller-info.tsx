import { Button } from "@ui/index";
import Image from "next/image";

const seller = {
  id: 402,
  userId: 202,
  storeName: "LuxuryFashions",
  storeDescription: "Premium fashion with a touch of elegance.",
  storeLogoUrl: "https://example.com/images/luxuryfashions-logo.jpg",
  storeBannerUrl: "https://example.com/images/luxuryfashions-banner.jpg",
  businessAddress: "456 Fashion Ave, New York, NY",
  contactNumber: "555-234-5678",
  status: "active",
  createdAt: "2024-08-15T12:34:56Z",
  updatedAt: "2024-08-20T12:34:56Z",
};
const ProductSellerInfo = () => {
  return (
    <div className="bg-accent/40 divide-y-2 rounded-md border *:p-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h6 className="text-xs">Sold By</h6>
          <h5 className="font-semibold">{seller.storeName}</h5>
        </div>
        <Image
          height={100}
          width={100}
          src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsDnx4-DWajzu4pdSlpxFMepqvfdgXhqqAhw&s"}
          className="size-16 rounded-full object-cover object-center"
          alt={`${seller.storeName} Store Logo`}
        />
      </div>
      <p className="text-accent-foreground text-sm">{seller.storeDescription}</p>
      <div className="text-accent-foreground grid grid-cols-2 gap-2 text-center lg:grid-cols-3">
        <div className="flex flex-col items-center justify-between gap-2">
          <span className="block text-xs">Order Completion</span>
          <span className="text-primary block text-2xl">90 %</span>
        </div>
        <div className="flex flex-col items-center justify-between gap-2">
          <span className="block text-xs">Average Product Ratings</span>
          <span className="text-primary block text-2xl">100 %</span>
        </div>
        <div className="flex flex-col items-center justify-between gap-2">
          <span className="block text-xs">Chat Response Time</span>
          <span className="text-primary block text-2xl">100 %</span>
        </div>
      </div>
      <Button variant={"outline"} size={"sm"} className="w-full rounded-t-none border-none">
        View Store
      </Button>
    </div>
  );
};

export default ProductSellerInfo;
