import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/index";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "@ui/recharts";
import { BarChart3 } from "lucide-react";
import { useState } from "react";

const chartData = [
  { date: "2024-04-01", value: 222 },
  { date: "2024-04-02", value: 97 },
  { date: "2024-04-03", value: 167 },
  { date: "2024-04-04", value: 242 },
  { date: "2024-04-05", value: 373 },
  { date: "2024-04-06", value: 301 },
  { date: "2024-04-07", value: 245 },
  { date: "2024-04-08", value: 409 },
  { date: "2024-04-09", value: 59 },
  { date: "2024-04-10", value: 261 },
  { date: "2024-04-11", value: 327 },
  { date: "2024-04-12", value: 292 },
  { date: "2024-04-13", value: 342 },
  { date: "2024-04-14", value: 137 },
  { date: "2024-04-15", value: 120 },
  { date: "2024-04-16", value: 138 },
  { date: "2024-04-17", value: 446 },
  { date: "2024-04-18", value: 364 },
  { date: "2024-04-19", value: 243 },
  { date: "2024-04-20", value: 89 },
  { date: "2024-04-21", value: 137 },
  { date: "2024-04-22", value: 224 },
  { date: "2024-04-23", value: 138 },
  { date: "2024-04-24", value: 387 },
  { date: "2024-04-25", value: 215 },
  { date: "2024-04-26", value: 75 },
  { date: "2024-04-27", value: 383 },
  { date: "2024-04-28", value: 122 },
  { date: "2024-04-29", value: 315 },
  { date: "2024-04-30", value: 454 },
  { date: "2024-05-01", value: 165 },
  { date: "2024-05-02", value: 293 },
  { date: "2024-05-03", value: 247 },
  { date: "2024-05-04", value: 385 },
  { date: "2024-05-05", value: 481 },
  { date: "2024-05-06", value: 498 },
  { date: "2024-05-07", value: 388 },
  { date: "2024-05-08", value: 149 },
  { date: "2024-05-09", value: 227 },
  { date: "2024-05-10", value: 293 },
  { date: "2024-05-11", value: 335 },
  { date: "2024-05-12", value: 197 },
  { date: "2024-05-13", value: 197 },
  { date: "2024-05-14", value: 448 },
  { date: "2024-05-15", value: 473 },
  { date: "2024-05-16", value: 338 },
  { date: "2024-05-17", value: 499 },
  { date: "2024-05-18", value: 315 },
  { date: "2024-05-19", value: 235 },
  { date: "2024-05-20", value: 177 },
  { date: "2024-05-21", value: 82 },
  { date: "2024-05-22", value: 81 },
  { date: "2024-05-23", value: 252 },
  { date: "2024-05-24", value: 294 },
  { date: "2024-05-25", value: 201 },
  { date: "2024-05-26", value: 213 },
  { date: "2024-05-27", value: 420 },
  { date: "2024-05-28", value: 233 },
  { date: "2024-05-29", value: 78 },
  { date: "2024-05-30", value: 340 },
  { date: "2024-05-31", value: 178 },
  { date: "2024-06-01", value: 178 },
  { date: "2024-06-02", value: 470 },
  { date: "2024-06-03", value: 103 },
  { date: "2024-06-04", value: 439 },
  { date: "2024-06-05", value: 88 },
  { date: "2024-06-06", value: 294 },
  { date: "2024-06-07", value: 323 },
  { date: "2024-06-08", value: 385 },
  { date: "2024-06-09", value: 438 },
  { date: "2024-06-10", value: 155 },
  { date: "2024-06-11", value: 92 },
  { date: "2024-06-12", value: 492 },
  { date: "2024-06-13", value: 81 },
  { date: "2024-06-14", value: 426 },
  { date: "2024-06-15", value: 307 },
];
const chartConfig = {
  views: {
    label: "Order Count",
  },
  value: {
    label: "value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const OrderChart = () => {
  const [timeRange, setTimeRange] = useState("90d");

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="w-full space-y-1">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 size={20} />
            Order
          </CardTitle>
          <CardDescription className="text-xs">Showing total order for the last 3 months</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="h-9 w-[160px] text-xs sm:ml-auto" aria-label="Select a value">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="text-xs">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="text-xs">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="text-xs">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -30,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <YAxis />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px] font-semibold"
                  labelClassName="font-semibold"
                  color="hsl(var(--secondary))"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={"value"} className="fill-secondary" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default OrderChart;
