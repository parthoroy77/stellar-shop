import { Badge, Button } from "@repo/ui";
import { BsArrowUpRight } from "react-icons/bs";

const DiscountPanel = () => {
  return (
    <div className="bg-muted-foreground h-32 rounded-md flex items-center justify-between px-10 space-y-2">
      <div className="space-y-2">
        <span className="space-x-3">
          <Badge>Trend Products</Badge>
          <Badge variant={"secondary"}>Promotion Prices</Badge>
        </span>
        <h2 className="text-2xl text-black/80 font-medium">
          New generation Headphones are at Stellar Shop with limited stocks!
        </h2>
      </div>
      <Button className="px-10 py-4 rounded-full flex gap-5">
        Check Products <BsArrowUpRight />{" "}
      </Button>
    </div>
  );
};

export default DiscountPanel;
