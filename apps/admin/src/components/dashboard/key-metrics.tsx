import { BarChart3, DollarSign, Package, ShoppingCart, Store, Tag, Users } from "lucide-react";
import React from "react";
import MetricCard from "../ui/metric-card";

export const summaryMetrics = {
  totalSales: {
    today: 12450,
    month: 345670,
    allTime: 4578900,
  },
  totalRevenue: {
    today: 9850,
    month: 278430,
    allTime: 3654320,
  },
  totalOrders: {
    today: 87,
    month: 2436,
    allTime: 32456,
  },
  activeVendors: 128,
  newVendors7Days: 12,
  totalCustomers: 8756,
  pendingOrders: 147,
  returnedOrders: 41,
  averageOrderValue: 142.5,
  totalProducts: 8765,
  platformCommission: 72450,
};

const KeyMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <MetricCard
        title="Total Sales (Today)"
        value={`$${summaryMetrics.totalSales.today.toLocaleString()}`}
        change="+12% from yesterday"
        trend="up"
        icon={<DollarSign size={23} />}
      />

      <MetricCard
        title="Total Orders"
        value={summaryMetrics.totalOrders.today.toLocaleString()}
        change="+8% from yesterday"
        trend="up"
        icon={<ShoppingCart size={23} />}
      />

      <MetricCard
        title="Active Vendors"
        value={summaryMetrics.activeVendors.toLocaleString()}
        change="+3 this week"
        trend="up"
        icon={<Store size={23} />}
      />

      <MetricCard
        title="Pending Orders"
        value={summaryMetrics.pendingOrders.toLocaleString()}
        change="-5% from yesterday"
        trend="down"
        icon={<Package size={23} />}
      />

      <MetricCard
        title="Total Customers"
        value={summaryMetrics.totalCustomers.toLocaleString()}
        change="+24 today"
        trend="up"
        icon={<Users size={23} />}
      />

      <MetricCard
        title="Average Order Value"
        value={`$${summaryMetrics.averageOrderValue.toFixed(2)}`}
        change="+5% this month"
        trend="up"
        icon={<BarChart3 size={23} />}
      />

      <MetricCard
        title="Total Products"
        value={summaryMetrics.totalProducts.toLocaleString()}
        change="+45 this week"
        trend="up"
        icon={<Tag size={23} />}
      />

      <MetricCard
        title="Platform Commission"
        value={`$${summaryMetrics.platformCommission.toLocaleString()}`}
        change="+15% this month"
        trend="up"
        icon={<DollarSign size={23} />}
      />
    </div>
  );
};

export default KeyMetrics;
