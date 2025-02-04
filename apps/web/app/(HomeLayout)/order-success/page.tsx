import { Button } from "@ui/index";
import { Check } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
const OrderSuccessPage = ({ searchParams }: { searchParams: { orderId: string } }) => {
  const orderId = searchParams.orderId;
  if (!orderId) {
    redirect("/");
  }
  return (
    <div className="flex h-[500px] flex-col">
      {/* Success Message Section */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="mb-6 rounded-full bg-green-900 p-4">
          <Check className="h-12 w-12 text-white" />
        </div>

        <h1 className="mb-2 text-2xl font-semibold text-black md:text-3xl">Order Placed Successfully!</h1>

        <p className="text-accent-foreground mb-8 text-center">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button>
            <Link href="/">Track Order</Link>
          </Button>

          <Button variant="outline">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
