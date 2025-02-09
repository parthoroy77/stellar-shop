import { toNormalCase } from "@repo/utils/functions";
import { OrderStatus } from "@repo/utils/types";
import { Tabs, TabsList, TabsTrigger } from "@ui/index";
import { FC } from "react";

interface Props {
  onChange: (value: string) => void;
}

const OrderTabs: FC<Props> = ({ onChange }) => {
  return (
    <Tabs
      defaultValue="default"
      onValueChange={onChange}
      className="horizontal-scrollbar overflow-hidden overflow-x-scroll"
    >
      <TabsList className="h-9 text-xs *:h-7 *:min-w-36">
        <TabsTrigger value="default">All</TabsTrigger>
        {Object.keys(OrderStatus).map((key, i) => (
          <TabsTrigger value={key.toLowerCase()} key={i} className="capitalize">
            {toNormalCase(key.toLowerCase())}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default OrderTabs;
