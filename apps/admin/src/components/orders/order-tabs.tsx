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
      <ScrollArea className="w-full whitespace-nowrap rounded-xl border">
        <TabsList className="bg-background h-auto w-full justify-start rounded-none border-b border-none p-1">
          <TabsTrigger
            value="default"
            className="data-[state=active]:bg-accent/70 rounded-lg border-b-2 border-transparent px-7 py-1.5 capitalize"
          >
            All
          </TabsTrigger>
          {Object.keys(OrderStatus).map((key, i) => (
            <TabsTrigger
              value={key.toLowerCase()}
              key={i}
              className="data-[state=active]:bg-accent/70 rounded-lg border-b-2 border-transparent px-7 py-1.5 capitalize"
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
