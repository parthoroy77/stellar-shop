import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@ui/index";
import { Area, AreaChart, CartesianGrid, XAxis } from "@ui/recharts";
import { DollarSign, TrendingUp } from "lucide-react";
import { FiFilter } from "react-icons/fi";

const chartData = [
  { month: "January", revenue: 156, commission: 90 },
  { month: "February", revenue: 305, commission: 150 },
  { month: "March", revenue: 237, commission: 120 },
  { month: "April", revenue: 273, commission: 190 },
  { month: "May", revenue: 159, commission: 80 },
  { month: "June", revenue: 214, commission: 80 },
  { month: "July", revenue: 254, commission: 160 },
  { month: "August", revenue: 164, commission: 60 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    icon: TrendingUp,
  },
  commission: {
    label: "Commission",
    icon: DollarSign,
  },
} satisfies ChartConfig;

const FinancialOverviewGraph = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="w-full space-y-1">
          <CardTitle className="flex items-center gap-2">
            <DollarSign size={20} />
            Financial Overview
          </CardTitle>
          <CardDescription className="text-xs">Revenue vs Commission breakdown</CardDescription>
        </div>
        <Button variant={"accent"}>
          <FiFilter className="mr-2" />
          Filter
        </Button>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelClassName="font-semibold"
                  color="hsl(var(--secondary))"
                  className="font-semibold capitalize"
                />
              }
            />
            <Area dataKey="revenue" type="natural" fillOpacity={0.4} stackId="a" />
            <Area dataKey="commission" type="natural" stackId="b" />
            {/* <ChartLegend content={<ChartLegendContent className="font-medium" />} /> */}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default FinancialOverviewGraph;
