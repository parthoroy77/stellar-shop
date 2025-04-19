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
import { Cell, Label, LabelList, Pie, PieChart } from "@ui/recharts";
import { DollarSign } from "lucide-react";
import { useMemo } from "react";
import { FiFilter } from "react-icons/fi";

const chartData = [
  { category: "Clothings", value: 200 },
  { category: "Electronics", value: 275 },
  { category: "Sneakers", value: 287 },
  { category: "other", value: 190 },
];

const chartConfig = {
  value: {
    label: "Sales",
  },
} satisfies ChartConfig;
const COLORS = ["#2563eb", "#60a8fb", "#3b86f7", "#90c7fe", "#bedcfe"];

const SalesByCategoryChart = () => {
  const totalValue = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

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
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="value" hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="category"
              innerRadius={60}
              outerRadius={100}
              strokeWidth={0}
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    className="text-sm font-medium"
                  >
                    {payload.value}
                  </text>
                );
              }}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              <LabelList dataKey="category" className="truncate fill-white font-medium" stroke="none" fontSize={10} />
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-primary text-base font-semibold"
                        >
                          Total Sales
                        </tspan>
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalValue.toLocaleString()}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SalesByCategoryChart;
