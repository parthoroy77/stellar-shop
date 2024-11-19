import { AppButton } from "@ui/index";
import { HiXMark } from "react-icons/hi2";

const CartActions = () => {
  return (
    <div className="text-accent-foreground flex items-center justify-between rounded-md border px-6 py-4 text-sm">
      {/* Select All */}
      <div className="flex items-center gap-2 font-medium capitalize text-black">
        <span>Your Cart (3 Items)</span>
      </div>
      {/* Delete Action */}
      <AppButton
        size={"sm"}
        variant={"outline"}
        className="hover:bg-accent hover:text-primary flex h-6 items-center gap-1 border-0 text-xs"
      >
        <HiXMark size={18} className="text-primary" />
        <span>Clear</span>
      </AppButton>
    </div>
  );
};

export default CartActions;
