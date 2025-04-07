"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { name: "Jan", total: 4500 },
  { name: "Feb", total: 3800 },
  { name: "Mar", total: 5200 },
  { name: "Apr", total: 3200 },
  { name: "May", total: 6800 },
  { name: "Jun", total: 5400 },
  { name: "Jul", total: 4300 },
  { name: "Aug", total: 5800 },
  { name: "Sep", total: 4900 },
  { name: "Oct", total: 3700 },
  { name: "Nov", total: 5100 },
  { name: "Dec", total: 7200 },
];

const SalesChart = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length > 0) {
                return (
                  <div className="rounded-lg border bg-white p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-accent-foreground text-[0.70rem] uppercase">Month</span>
                        <span className="text-primary font-bold">{payload[0]!.payload.name}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-accent-foreground text-[0.70rem] uppercase">Sales</span>
                        <span className="text-primary font-bold">${payload[0]!.value!.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="total" fill="#4f46e5" radius={[4, 4, 0, 0]} className="cursor-pointer" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
