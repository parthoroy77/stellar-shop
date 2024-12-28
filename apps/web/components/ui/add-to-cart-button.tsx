"use client";
import { addToCart } from "@/actions/cart";
import { useClientSession } from "@/lib/auth-utils";
import { AppButton } from "@ui/index";
import { useRouter } from "next/navigation";
import { FC, MouseEvent, useTransition } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { toast } from "sonner";

interface Props {
  productId: number;
}
// TODO: use optimistic
const AddToCartButton: FC<Props> = ({ productId }) => {
  const router = useRouter();
  const { isAuthenticated } = useClientSession();
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      router.push("/login");
      toast.info("Please log in first!");
    } else {
      const toastId = toast.loading("Sending request to process!", { duration: 2000 });
      startTransition(async () => {
        const result = await addToCart({ productId });
        console.log(result);
        if (result.success) {
          toast.success(result.message, { id: toastId });
        } else {
          toast.error(result.message, { id: toastId });
        }
      });
    }
  };
  return (
    <div onClick={handleClick}>
      <AppButton
        asChild
        loading={isPending}
        hideElement={isPending}
        size={"sm"}
        variant={"accent"}
        className="group/button flex h-fit w-fit items-center justify-center gap-2 rounded-full p-[5px] font-normal transition-all duration-300 lg:rounded-md lg:p-2"
      >
        <HiOutlineShoppingBag className="text-base lg:text-lg" />
        <span className="hidden lg:block">Add To Cart</span>
      </AppButton>
    </div>
  );
};

export default AddToCartButton;
