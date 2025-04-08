import { Badge, Progress } from "@ui/index";
import { LuAlertCircle } from "react-icons/lu";

const inventoryItems = [
  {
    id: 1,
    name: "Premium Headphones",
    stock: 5,
    total: 50,
    status: "low",
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    stock: 2,
    total: 30,
    status: "critical",
  },
  {
    id: 3,
    name: "Smart Watch",
    stock: 8,
    total: 40,
    status: "low",
  },
];
const InventoryReview = () => {
  return (
    <div className="space-y-4">
      {inventoryItems.map((item) => (
        <div key={item.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{item.name}</span>
              {item.status === "critical" && (
                <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
                  <LuAlertCircle className="mr-1 h-3 w-3" />
                  Critical
                </Badge>
              )}
            </div>
            <span className="text-sm text-gray-500">
              {item.stock} / {item.total}
            </span>
          </div>
          <Progress
            value={(item.stock / item.total) * 100}
            className="h-2 bg-gray-100"
            indicatorClass={item.status === "critical" ? "bg-red-500" : "bg-amber-500"}
          />
        </div>
      ))}
    </div>
  );
};

export default InventoryReview;
