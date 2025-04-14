import { Card, CardContent } from "@repo/ui";
import { cn } from "@ui/lib/utils";
import { ClassValue } from "clsx";
import { CheckCircle, Clock, Package, Truck, XCircle } from "lucide-react";

export const OrderMetrics = ({ className, cardStyles }: { className?: ClassValue; cardStyles?: ClassValue }) => {
  return (
    <div className={cn("grid grid-cols-2 gap-3 md:grid-cols-5", className)}>
      <Card className={cn("border drop-shadow", cardStyles)}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-blue-50">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <h3 className="text-2xl font-bold text-gray-900">12</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={cn("border drop-shadow", cardStyles)}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-amber-50">
              <Package className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Processing</p>
              <h3 className="text-2xl font-bold text-gray-900">28</h3>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className={cn("border drop-shadow", cardStyles)}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-yellow-50">
              <Truck className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">In Transit</p>
              <h3 className="text-2xl font-bold text-gray-900">28</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={cn("border drop-shadow", cardStyles)}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-emerald-50">
              <CheckCircle className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <h3 className="text-2xl font-bold text-gray-900">284</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={cn("border drop-shadow", cardStyles)}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-red-50">
              <XCircle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Cancelled</p>
              <h3 className="text-2xl font-bold text-gray-900">18</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
