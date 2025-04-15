import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { BsCurrencyDollar } from "react-icons/bs";
import { LuArrowUpRight, LuDollarSign } from "react-icons/lu";
const KeyMetrics = () => {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      <Card className="relative rounded-2xl drop-shadow">
        <CardHeader className="space-y-0.5 p-3">
          <div className="flex flex-row items-center gap-1 space-y-0">
            <LuDollarSign className="h-4 w-4" />
            <CardTitle className="text-lg font-semibold">Total Sales</CardTitle>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs font-medium">
            <span className="flex items-center text-green-900">
              <LuArrowUpRight className="mr-1 h-4 w-4" color="green" />
              <span className="mr-1 font-medium">+12.5%</span>
            </span>{" "}
            from last month
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="flex items-center text-3xl font-bold tracking-tight">
            <BsCurrencyDollar color="grey" className="mt-1" size={19} />
            <span>12,546</span>
          </div>
        </CardContent>
        <div className="absolute bottom-3 right-3 flex w-fit items-end gap-2">
          <div className="bg-accent h-3.5 w-2.5 rounded-sm"></div>
          <div className="bg-accent h-6 w-2.5 rounded-sm"></div>
          <div className="bg-primary h-4 w-2.5 rounded-sm"></div>
          <div className="bg-accent h-8 w-2.5 rounded-sm"></div>
          <div className="bg-secondary h-12 w-2.5 rounded-sm"></div>
        </div>
      </Card>
      <Card className="relative rounded-2xl drop-shadow">
        <CardHeader className="space-y-0.5 p-3">
          <div className="flex flex-row items-center gap-1 space-y-0">
            <LuDollarSign className="h-4 w-4" />
            <CardTitle className="text-lg font-semibold">Total Sales</CardTitle>
          </div>

          <div className="mt-1 flex items-center gap-1.5 text-xs font-medium">
            <span className="flex items-center text-green-900">
              <LuArrowUpRight className="mr-1 h-4 w-4" color="green" />
              <span className="mr-1 font-medium">+12.5%</span>
            </span>{" "}
            from last month
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="flex items-center text-3xl font-bold tracking-tight">
            <BsCurrencyDollar color="grey" className="mt-1" size={19} />
            <span>12,546</span>
          </div>
        </CardContent>
        <div className="absolute bottom-3 right-3 flex w-fit items-end gap-2">
          <div className="bg-accent h-3.5 w-2.5 rounded-sm"></div>
          <div className="bg-accent h-6 w-2.5 rounded-sm"></div>
          <div className="bg-primary h-4 w-2.5 rounded-sm"></div>
          <div className="bg-accent h-8 w-2.5 rounded-sm"></div>
          <div className="bg-secondary h-12 w-2.5 rounded-sm"></div>
        </div>
      </Card>{" "}
      <Card className="relative rounded-2xl drop-shadow">
        <CardHeader className="space-y-0.5 p-3">
          <div className="flex flex-row items-center gap-1 space-y-0">
            <LuDollarSign className="h-4 w-4" />
            <CardTitle className="text-lg font-semibold">Total Sales</CardTitle>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs font-medium">
            <span className="flex items-center text-green-900">
              <LuArrowUpRight className="mr-1 h-4 w-4" color="green" />
              <span className="mr-1 font-medium">+12.5%</span>
            </span>{" "}
            from last month
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="flex items-center text-3xl font-bold tracking-tight">
            <BsCurrencyDollar color="grey" className="mt-1" size={19} />
            <span>12,546</span>
          </div>
        </CardContent>
        <div className="absolute bottom-3 right-3 flex w-fit items-end gap-2">
          <div className="bg-accent h-3.5 w-2.5 rounded-sm"></div>
          <div className="bg-accent h-6 w-2.5 rounded-sm"></div>
          <div className="bg-primary h-4 w-2.5 rounded-sm"></div>
          <div className="bg-accent h-8 w-2.5 rounded-sm"></div>
          <div className="bg-secondary h-12 w-2.5 rounded-sm"></div>
        </div>
      </Card>{" "}
      <Card className="relative rounded-2xl drop-shadow">
        <CardHeader className="space-y-0.5 p-3">
          <div className="flex flex-row items-center gap-1 space-y-0">
            <LuDollarSign className="h-4 w-4" />
            <CardTitle className="text-lg font-semibold">Total Sales</CardTitle>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs font-medium">
            <span className="flex items-center text-green-900">
              <LuArrowUpRight className="mr-1 h-4 w-4" color="green" />
              <span className="mr-1 font-medium">+12.5%</span>
            </span>{" "}
            from last month
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="flex items-center text-3xl font-bold tracking-tight">
            <BsCurrencyDollar color="grey" className="mt-1" size={19} />
            <span>12,546</span>
          </div>
        </CardContent>
        <div className="absolute bottom-3 right-3 flex w-fit items-end gap-2">
          <div className="bg-accent h-3.5 w-2.5 rounded-sm"></div>
          <div className="bg-accent h-6 w-2.5 rounded-sm"></div>
          <div className="bg-primary h-4 w-2.5 rounded-sm"></div>
          <div className="bg-accent h-8 w-2.5 rounded-sm"></div>
          <div className="bg-secondary h-12 w-2.5 rounded-sm"></div>
        </div>
      </Card>
    </div>
  );
};

export default KeyMetrics;
