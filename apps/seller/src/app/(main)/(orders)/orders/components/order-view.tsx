import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/index";

const orderTabs = [
  {
    label: "New Orders",
    elements: <div>New Order</div>,
  },
  {
    label: "Processing ",
    elements: <div>New Order</div>,
  },
  {
    label: "Packed ",
    elements: <div>New Order</div>,
  },
  {
    label: "Shipped ",
    elements: <div>New Order</div>,
  },
];

const OrderView = () => {
  return (
    <div>
      <Tabs defaultValue={orderTabs[0]?.label.toLocaleLowerCase()}>
        <TabsList>
          {orderTabs.map((tab, i) => (
            <TabsTrigger key={i} value={tab.label.toLowerCase()}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {orderTabs.map((tab, i) => (
          <TabsContent key={i} value={tab.label.toLowerCase()}>
            {tab.elements}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default OrderView;
