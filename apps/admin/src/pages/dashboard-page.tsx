import FinancialOverviewGraph from "@/components/dashboard/financial-overview-graph";
import KeyMetrics, { summaryMetrics } from "@/components/dashboard/key-metrics";
import OrderChart from "@/components/dashboard/order-chart";
import RevenueGraph from "@/components/dashboard/revenue-graph";
import SalesByCategoryChart from "@/components/dashboard/sales-by-category-chart";
import { useGetPlatformInsightsQuery } from "@repo/redux";
import { TPlatformInsights } from "@repo/utils/types";
import { Button } from "@ui/index";
import moment from "moment";
import { PiInvoice } from "react-icons/pi";

const DashboardPage = () => {
  const { data } = useGetPlatformInsightsQuery();
  const {
    avgOrderValue = 0,
    pendingOrders = 0,
    totalActiveSellers = 0,
    totalCustomers = 0,
    totalOrders = 0,
    totalPlatformCommission = 0,
    totalProducts = 0,
    totalSales = 0,
  } = (data?.data as TPlatformInsights) || { ...summaryMetrics };
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium leading-none">Dashboard</h1>
          <span className="text-accent-foreground text-xs font-medium">{moment(new Date()).format("LLLL")}</span>
        </div>

        <div>
          <Button variant={"outline"} className="flex items-center gap-2 border">
            Analytics Report
            <PiInvoice />
          </Button>
        </div>
      </div>
      <KeyMetrics
        avgOrderValue={avgOrderValue}
        pendingOrders={pendingOrders}
        totalActiveSellers={totalActiveSellers}
        totalCustomers={totalCustomers}
        totalOrders={totalOrders}
        totalPlatformCommission={totalPlatformCommission}
        totalProducts={totalProducts}
        totalSales={totalSales}
      />
      <div className="grid gap-5 lg:grid-cols-2">
        <RevenueGraph />
        <FinancialOverviewGraph />
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OrderChart />
        </div>
        <SalesByCategoryChart />
      </div>
    </div>
  );
};

export default DashboardPage;
