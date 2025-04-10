import { columns } from "@/components/data-table/order/column";
import OrderDataTable from "@/components/data-table/order/data-table";

const RecentOrders = () => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-semibold leading-none">Recent Orders</span>
        <span className="text-accent-foreground text-sm">Your most recent orders and their status</span>
      </div>
      <div>
        <OrderDataTable columns={columns} isLoading={false} data={[]} />
      </div>
    </div>
  );
};

export default RecentOrders;
