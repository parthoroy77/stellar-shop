import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { LuArrowUp, LuDollarSign, LuPackage, LuShoppingCart } from "react-icons/lu";
const KeyMetrics = () => {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      <Card className="rounded-2xl drop-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-accent-foreground text-sm font-medium">Total Sales</CardTitle>
          <LuDollarSign className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$12,546.00</div>
          <div className="mt-1 flex items-center text-xs">
            <LuArrowUp className="mr-1 h-4 w-4" color="green" />
            <span className="mr-1 font-medium">+12.5%</span> from last month
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl drop-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-accent-foreground text-sm font-medium">Your Earnings</CardTitle>
          <LuDollarSign className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$11,291.40</div>
          <div className="mt-1 text-xs">After 10% platform fee</div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl drop-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-accent-foreground text-sm font-medium">Total Orders</CardTitle>
          <LuShoppingCart className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">342</div>
          <div className="mt-1 flex items-center text-xs">
            <LuArrowUp className="mr-1 h-4 w-4" color="green" />
            <span className="mr-1 font-medium">+8.2%</span> from last month
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl drop-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-accent-foreground text-sm font-medium">Active Products</CardTitle>
          <LuPackage className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">28</div>
          <div className="mt-1 flex items-center text-xs">
            <LuArrowUp className="mr-1 h-4 w-4" color="green" />
            <span className="mr-1 font-medium">+3</span> new this month
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyMetrics;
