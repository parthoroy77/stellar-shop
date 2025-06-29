import { TPlatformInsights } from "@repo/utils/types";
import { BarChart3, DollarSign, Package, ShoppingCart, Store, Tag, Users } from "lucide-react";
import { FC } from "react";
import MetricCard from "../ui/metric-card";

export const summaryMetrics = {
  totalSales: 12345,
  totalRevenue: 9850,
  totalOrders: 85,
  totalActiveSellers: 128,
  totalCustomers: 8756,
  pendingOrders: 147,
  avgOrderValue: 142.5,
  totalProducts: 8765,
  totalPlatformCommission: 72450,
};
const KeyMetrics: FC<TPlatformInsights> = ({
  avgOrderValue = 0,
  pendingOrders = 0,
  totalActiveSellers = 0,
  totalCustomers = 0,
  totalOrders = 0,
  totalPlatformCommission = 0,
  totalProducts = 0,
  totalSales = 0,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <MetricCard
        title="Total Sales (Today)"
        value={`$${totalSales.toLocaleString()}`}
        change="+12% from yesterday"
        trend="up"
        icon={<DollarSign size={23} />}
      />

      <MetricCard
        title="Total Orders"
        value={totalOrders.toLocaleString()}
        change="+8% from yesterday"
        trend="up"
        icon={<ShoppingCart size={23} />}
      />

      <MetricCard
        title="Active Sellers"
        value={totalActiveSellers.toLocaleString()}
        change="+3 this week"
        trend="up"
        icon={<Store size={23} />}
      />

      <MetricCard
        title="Pending Orders"
        value={pendingOrders.toLocaleString()}
        change="-5% from yesterday"
        trend="down"
        icon={<Package size={23} />}
      />

      <MetricCard
        title="Total Customers"
        value={totalCustomers.toLocaleString()}
        change="+24 today"
        trend="up"
        icon={<Users size={23} />}
      />

      <MetricCard
        title="Average Order Value"
        value={`$${avgOrderValue}`}
        change="+5% this month"
        trend="up"
        icon={<BarChart3 size={23} />}
      />

      <MetricCard
        title="Total Products"
        value={totalProducts.toLocaleString()}
        change="+45 this week"
        trend="up"
        icon={<Tag size={23} />}
      />

      <MetricCard
        title="Platform Commission"
        value={`$${totalPlatformCommission.toLocaleString()}`}
        change="+15% this month"
        trend="up"
        icon={<DollarSign size={23} />}
      />
    </div>
  );
};

export default KeyMetrics;
