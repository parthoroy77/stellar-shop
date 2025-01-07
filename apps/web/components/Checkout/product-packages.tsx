import { AppButton, RadioGroup, RadioGroupItem } from "@ui/index";
import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";

const ProductPackages = () => {
  return (
    <div className="space-y-1.5">
      <h3 className="text-primary-foreground text-lg font-medium">Total Package Packages 2</h3>
      {Array.from({ length: 2 }).map((_x, i) => (
        <div key={i} className="space-y-4 rounded-lg border bg-white p-3.5">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Package 1</h4>
            <div className="flex items-center justify-end gap-2">
              <h6 className="text-accent-foreground text-xs font-medium">Seller & Shipped By</h6>
              <div className="flex items-center gap-1">
                <Image
                  width={20}
                  height={20}
                  alt={"groupedItem.seller.shopName"}
                  src={
                    "https://res.cloudinary.com/dx0iiqjf4/image/upload/v1735808264/shopMedia/nrpn006yyxcdjm8skkzn.png"
                  }
                />
                <h5 className="text-primary-foreground text-sm font-semibold">{"Bashundhara LTD."}</h5>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium">Available Shipping Option</span>
            <RadioGroup className="grid grid-cols-3 gap-3">
              <div className="flex items-start gap-2 rounded-md border px-3 py-1.5">
                <RadioGroupItem value="default" id="r1" className="mt-1" />
                <div className="text-accent-foreground w-full space-y-1 text-sm">
                  <h5 className="text-primary-foreground text-sm font-semibold">{"Standard Shipping"}</h5>
                  <div className="flex justify-between text-xs font-medium">
                    <span>
                      Cost: <b>$10.99</b>
                    </span>
                    <span>
                      Estimated Days: <b>3 - 4 Days</b>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-md border px-3 py-1.5">
                <RadioGroupItem value="default" id="r1" className="mt-1" />
                <div className="text-accent-foreground w-full space-y-1 text-sm">
                  <h5 className="text-primary-foreground text-sm font-semibold">{"Standard Shipping"}</h5>
                  <div className="flex justify-between text-xs font-medium">
                    <span>
                      Cost: <b>$10.99</b>
                    </span>
                    <span>
                      Estimated Days: <b>3 - 4 Days</b>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-md border px-3 py-1.5">
                <RadioGroupItem value="default" id="r1" className="mt-1" />
                <div className="text-accent-foreground w-full space-y-1 text-sm">
                  <h5 className="text-primary-foreground text-sm font-semibold">{"Standard Shipping"}</h5>
                  <div className="flex justify-between text-xs font-medium">
                    <span>
                      Cost: <b>$10.99</b>
                    </span>
                    <span>
                      Estimated Days: <b>3 - 4 Days</b>
                    </span>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 2 }).map((_x, i) => (
              <PackagedProductCard key={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const PackagedProductCard = () => {
  return (
    <div className="bg-accent/30 flex w-full items-start justify-between gap-3 rounded-md border px-2 py-1 lg:items-center">
      <Image
        width={60}
        height={60}
        className="rounded-md border"
        src={"https://res.cloudinary.com/dx0iiqjf4/image/upload/v1735808264/shopMedia/nrpn006yyxcdjm8skkzn.png"}
        alt={"Name"}
      />
      <div className="flex w-full flex-col justify-between gap-2 lg:flex-row lg:items-center">
        <div className="w-full">
          <h5 className="truncate text-sm font-medium">{"Name"}</h5>
          <div className="space-x-2">
            {Array.from({ length: 2 })?.map((_attr, idx) => (
              <span key={idx} className="rounded-md text-xs">
                Blue
              </span>
            ))}
          </div>
        </div>
        <div className="flex-row- flex items-center justify-between gap-5">
          <div className="flex items-center justify-start gap-1 text-xs font-medium text-black lg:justify-center">
            <span>Qty: </span>
            <span> {"2"}</span>
          </div>
          <div className="flex items-center justify-start text-sm font-medium text-black md:min-w-24 lg:justify-center lg:text-sm">
            <TbCurrencyTaka />
            <span>{"30.5"}</span>
          </div>
          <div className="flex items-center">
            <AppButton variant={"destructive"} size={"sm"} className="h-fit w-fit border p-1">
              <RiDeleteBinLine size={15} />
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPackages;
