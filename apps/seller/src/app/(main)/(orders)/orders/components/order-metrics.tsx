import { Card, CardContent } from "@repo/ui";
import { CheckCircle, Clock, Package, Truck, XCircle } from "lucide-react";
const OrderMetrics = () => {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      <Card className="rounded-2xl border drop-shadow">
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

      <Card className="rounded-2xl border drop-shadow">
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
      <Card className="rounded-2xl border drop-shadow">
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

      <Card className="rounded-2xl border drop-shadow">
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

      <Card className="rounded-2xl border drop-shadow">
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

export default OrderMetrics;
