import { Card, CardContent } from "@repo/ui";
import { cn } from "@ui/lib/utils";
import { ClassValue } from "clsx";
import { CheckCircle, Clock, Package, Truck, XCircle } from "lucide-react";
import { FC } from "react";

interface Props {
  className?: ClassValue;
  cardStyles?: ClassValue;
  pending: number;
  processing: number;
  inTransit: number;
  canceled: number;
  completed: number;
}

export const OrderMetrics: FC<Props> = ({
  className,
  cardStyles,
  pending = 0,
  processing = 0,
  canceled = 0,
  inTransit = 0,
  completed = 0,
}) => {
  return (
    <div className={cn("grid grid-cols-2 gap-3 md:grid-cols-5", className)}>
      <Card className={cn("rounded-xl border", cardStyles)}>
        <CardContent className="p-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <h3 className="text-3xl font-bold text-gray-900">{pending}</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-blue-50">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={cn("rounded-xl border", cardStyles)}>
        <CardContent className="p-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Processing</p>
              <h3 className="text-3xl font-bold text-gray-900">{processing}</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-amber-50">
              <Package className="h-6 w-6 text-amber-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className={cn("rounded-xl border", cardStyles)}>
        <CardContent className="p-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">In Transit</p>
              <h3 className="text-3xl font-bold text-gray-900">{inTransit}</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-yellow-50">
              <Truck className="h-6 w-6 text-amber-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={cn("rounded-xl border", cardStyles)}>
        <CardContent className="p-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <h3 className="text-3xl font-bold text-gray-900">{completed}</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-emerald-50">
              <CheckCircle className="h-6 w-6 text-emerald-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={cn("rounded-xl border", cardStyles)}>
        <CardContent className="p-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Cancelled</p>
              <h3 className="text-3xl font-bold text-gray-900">{canceled}</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-red-50">
              <XCircle className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
