import FinancialOverviewGraph from "@/components/dashboard/financial-overview-graph";
import KeyMetrics from "@/components/dashboard/key-metrics";
import RevenueGraph from "@/components/dashboard/revenue-graph";
import { Button } from "@ui/index";
import moment from "moment";
import { PiInvoice } from "react-icons/pi";

const DashboardPage = () => {
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
      <KeyMetrics />
      <div className="grid gap-5 lg:grid-cols-2">
        <RevenueGraph />
        <FinancialOverviewGraph />
      </div>
    </div>
  );
};

export default DashboardPage;
