"use client";
import { placeOrder } from "@/actions/order";
import { useCartContext } from "@/contexts/cart-context";
import { TCheckoutSessionData } from "@repo/utils/types";
import { AppButton } from "@ui/index";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const CheckoutButton = ({ shippingAddress, paymentMethod }: TCheckoutSessionData) => {
  const [isPending, startTransition] = useTransition();
  const { invalidateCart } = useCartContext();
  const router = useRouter();
  const handleCheckout = async () => {
    if (!shippingAddress) {
      toast.info("Please select shipping option!");
      return;
    }
    if (!paymentMethod) {
      toast.info("Please select payment method option!");
      return;
    }
    const toastId = toast.loading("Sending request to place your order!", { duration: 2000 });
    startTransition(async () => {
      const result = await placeOrder();
      if (result.success) {
        toast.success(result.message, { id: toastId });
        await invalidateCart();
        router.push(result.data?.redirectUrl || "/");
      }
    });
  };

  return (
    <div>
      <AppButton loading={isPending} onClick={handleCheckout} disabled={isPending} className="w-full">
        Checkout
      </AppButton>
    </div>
  );
};

export default CheckoutButton;
