import { Badge, Button } from "@repo/ui";
import { BsArrowUpRight } from "react-icons/bs";

const DiscountPanel = () => {
  return (
    <div className="bg-muted-foreground flex h-52 flex-col justify-between space-y-2 rounded-md p-5 lg:h-32 lg:flex-row lg:items-center lg:px-10">
      <div className="flex flex-col gap-6 lg:gap-3">
        <span className="space-x-3">
          <Badge>Trend Products</Badge>
          <Badge variant={"secondary"}>Promotion Prices</Badge>
        </span>
        <h4 className="text-base font-medium text-black/80">
          New generation Headphones are at Stellar Shop with limited stocks!
        </h4>
      </div>
      <Button variant={"outline"} className="border-primary text-primary flex gap-5 rounded-full border px-10 py-4">
        Check Products <BsArrowUpRight />{" "}
      </Button>
    </div>
  );
};

export default DiscountPanel;
