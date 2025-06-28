import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { TSellerAnalytics } from "@repo/utils/types";
import { AiOutlineProduct } from "react-icons/ai";
import { LiaFileInvoiceDollarSolid, LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { LuArrowUpRight, LuDollarSign } from "react-icons/lu";

const KeyMetrics = ({ totalActiveProducts = 0, totalOrders = 0, totalSales = 0, netEarning = 0 }: TSellerAnalytics) => {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      <Card className="relative rounded-2xl drop-shadow">
        <CardHeader className="space-y-0.5 p-3 pb-1.5">
          <div className="flex flex-row items-center justify-between gap-1 space-y-0">
            <CardTitle className="text-base font-medium">Total Sales</CardTitle>
            <LuDollarSign className="absolute right-2 top-2" size={24} color="gray" />
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="space-y-1">
            <span className="text-4xl font-bold tracking-tight">{totalSales}</span>
            <div className="flex items-center text-xs">
              <span className="flex items-center text-green-900">
                <LuArrowUpRight className="mr-1 h-4 w-4" color="green" />
                <span className="mr-1 font-medium">+12.5%</span>
              </span>{" "}
              from last month
            </div>
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
        <CardHeader className="space-y-0.5 p-3 pb-1.5">
          <div className="flex flex-row items-center justify-between gap-1 space-y-0">
            <CardTitle className="text-base font-medium">Total Earning</CardTitle>
            <LiaMoneyBillWaveAltSolid className="absolute right-2 top-2" size={24} color="gray" />
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="space-y-1">
            <span className="text-4xl font-bold tracking-tight">{netEarning}</span>
            <div className="flex items-center text-xs">
              <span className="flex items-center text-green-900">
                <LuArrowUpRight className="mr-1 h-4 w-4" color="green" />
                <span className="mr-1 font-medium">+12.5%</span>
              </span>{" "}
              from last month
            </div>
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
        <CardHeader className="space-y-0.5 p-3 pb-1.5">
          <div className="flex flex-row items-center justify-between gap-1 space-y-0">
            <CardTitle className="text-base font-medium">Total Orders</CardTitle>
            <LiaFileInvoiceDollarSolid className="absolute right-2 top-2" size={24} color="gray" />
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="space-y-1">
            <span className="text-4xl font-bold tracking-tight">{totalOrders}</span>
            <div className="flex items-center text-xs">
              <span className="flex items-center text-green-900">
                <LuArrowUpRight className="mr-1 h-4 w-4" color="green" />
                <span className="mr-1 font-medium">+12.5%</span>
              </span>{" "}
              from last month
            </div>
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
        <CardHeader className="space-y-0.5 p-3 pb-1.5">
          <div className="flex flex-row items-center justify-between gap-1 space-y-0">
            <CardTitle className="text-base font-medium">Active Products</CardTitle>
            <AiOutlineProduct className="absolute right-2 top-2" size={24} color="gray" />
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="space-y-1">
            <span className="text-4xl font-bold tracking-tight">{totalActiveProducts}</span>
            <div className="flex items-center text-xs">
              <span className="flex items-center text-green-900">
                <LuArrowUpRight className="mr-1 h-4 w-4" color="green" />
                <span className="mr-1 font-medium">+12.5%</span>
              </span>{" "}
              from last month
            </div>
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
