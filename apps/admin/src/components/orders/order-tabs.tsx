import { toNormalCase } from "@repo/utils/functions";
import { OrderStatus } from "@repo/utils/types";
import { ScrollArea, ScrollBar, Tabs, TabsList, TabsTrigger } from "@ui/index";
import { FC } from "react";

interface Props {
  onChange: (value: string) => void;
}

const OrderTabs: FC<Props> = ({ onChange }) => {
  return (
    <Tabs defaultValue="default" onValueChange={onChange} className="bg-transparent">
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <TabsList className="bg-background h-auto w-full justify-start rounded-none border-b border-none p-0 pb-3">
          <TabsTrigger
            value="default"
            className="data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-4 py-2.5 capitalize data-[state=active]:bg-transparent"
          >
            All
          </TabsTrigger>
          {Object.keys(OrderStatus).map((key, i) => (
            <TabsTrigger
              value={key.toLowerCase()}
              key={i}
              className="data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-4 py-2.5 capitalize data-[state=active]:bg-transparent"
            >
              {toNormalCase(key.toLowerCase())}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>
    </Tabs>
  );
};

export default OrderTabs;
