import { Badge, Button } from "@repo/ui";
import { BsArrowUpRight } from "react-icons/bs";

const DiscountPanel = () => {
  return (
    <div className="bg-muted-foreground flex h-32 items-center justify-between space-y-2 rounded-md px-10">
      <div className="space-y-2">
        <span className="space-x-3">
          <Badge>Trend Products</Badge>
          <Badge variant={"secondary"}>Promotion Prices</Badge>
        </span>
        <h2 className="text-2xl font-medium text-black/80">
          New generation Headphones are at Stellar Shop with limited stocks!
        </h2>
      </div>
      <Button className="flex gap-5 rounded-full px-10 py-4">
        Check Products <BsArrowUpRight />{" "}
      </Button>
    </div>
  );
};

export default DiscountPanel;
