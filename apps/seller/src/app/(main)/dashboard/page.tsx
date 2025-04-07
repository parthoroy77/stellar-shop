import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/index";
import { BiDollar } from "react-icons/bi";
import KeyMetrics from "./components/key-metrcis";
import SalesChart from "./components/sales-chart";

const DashboardPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-5 py-3">
        <h1 className="text-xl font-medium">Dashboard</h1>

        <div>
          <Button className="flex items-center gap-2">
            <BiDollar size={17} />
            Withdraw Earnings
          </Button>
        </div>
      </div>
      <hr />
      <div className="divide-y *:p-5">
        <KeyMetrics />
        {/* Sales Chart & Revenue Split */}
        <div className="grid gap-5 md:grid-cols-3">
          <Card className="rounded-2xl border drop-shadow md:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Sales Overview</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8">
                    Monthly
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8">
                    Weekly
                  </Button>
                </div>
              </div>
              <CardDescription>Your sales performance over the last 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <SalesChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
