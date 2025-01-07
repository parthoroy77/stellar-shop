import { RadioGroup } from "@ui/index";
import { MdOutlinePayments } from "react-icons/md";

const PaymentMethod = () => {
  return (
    <div className="space-y-2 rounded-lg border-2 p-4 shadow-sm">
      <h3 className="text-primary-foreground text-lg font-medium">Select Payment Method</h3>
      <RadioGroup className="grid grid-cols-2 gap-3">
        {Array.from({
          length: 3,
        }).map((_x, i) => (
          <div key={i} className="flex flex-col rounded-md border bg-neutral-50 px-3 py-2 shadow">
            <MdOutlinePayments size={25} />
            <span className="text-primary-foreground font-medium">Cash On Delivery</span>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PaymentMethod;
