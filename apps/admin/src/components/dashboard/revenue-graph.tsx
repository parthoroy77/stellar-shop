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
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "@ui/recharts";
import { BarChart3 } from "lucide-react";
import { FiFilter } from "react-icons/fi";

const chartData = [
  { month: "January", value: 186 },
  { month: "February", value: 305 },
  { month: "March", value: 237 },
  { month: "April", value: 73 },
  { month: "May", value: 209 },
  { month: "June", value: 214 },
  { month: "July", value: 269 },
  { month: "August", value: 114 },
  { month: "September", value: 314 },
  { month: "October", value: 124 },
  { month: "November", value: 244 },
  { month: "December", value: 154 },
];

const chartConfig = {
  value: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const RevenueGraph = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="w-full space-y-1">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 size={20} />
            Revenue Overtime
          </CardTitle>
          <CardDescription className="text-xs">Revenue breakdown per month</CardDescription>
        </div>
        <Button variant={"accent"}>
          <FiFilter className="mr-2" />
          Filter
        </Button>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart margin={{ top: 16 }} accessibilityLayer data={chartData}>
            <CartesianGrid vertical={true} color="gray" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={!true}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelClassName="font-semibold"
                  color="hsl(var(--secondary))"
                  className="font-semibold"
                />
              }
            />
            <Bar dataKey="value" className="fill-[#2563eb]" radius={8}>
              <LabelList position="top" offset={8} className="fill-foreground font-semibold" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueGraph;
