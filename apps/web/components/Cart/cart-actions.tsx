import { Checkbox } from "@ui/index";
import { MdDelete } from "react-icons/md";

const CartActions = () => {
  return (
    <div className="text-accent-foreground flex items-center justify-between rounded-md border px-6 py-4 text-sm">
      {/* Select All */}
      <div className="flex items-center gap-2 uppercase">
        <Checkbox />
        <span>Select All (0 Items)</span>
      </div>
      {/* Delete Action */}
      <button className="flex items-center gap-1 uppercase">
        <MdDelete size={18} className="text-primary" />
        <span>Delete</span>
      </button>
    </div>
  );
};

export default CartActions;
