import { Card } from "@repo/ui";
import { cn } from "@ui/lib/utils";
import React from "react";
import { LuArrowUpRight } from "react-icons/lu";

export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string | number;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend = "neutral", icon }) => {
  return (
    <Card className="rounded-xl bg-white p-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-primary-foreground text-sm font-medium">{title}</h3>
          <p className="mt-2.5 text-3xl font-semibold">{value}</p>
        </div>
        {icon && <div className="text-accent-foreground rounded-xl bg-neutral-50 p-2">{icon}</div>}
      </div>

      {change && (
        <div className="mt-0.5 flex items-center text-xs">
          <span className="flex items-center">
            <LuArrowUpRight
              className={cn("mr-1 h-4 w-4", trend === "up" ? "" : "rotate-180")}
              color={trend === "up" ? "green" : "red"}
            />
            <span className={cn("mr-1 font-medium", trend === "up" ? "text-green-900" : "text-red-500")}>{change}</span>
          </span>{" "}
        </div>
      )}
    </Card>
  );
};

export default MetricCard;
