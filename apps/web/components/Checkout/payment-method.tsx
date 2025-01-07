import { RadioGroup, RadioGroupItem } from "@ui/index";

const PaymentMethod = () => {
  return (
    <div className="space-y-2 rounded-lg border-2 p-4 shadow-sm">
      <h3 className="text-primary-foreground text-lg font-medium">Select Payment Method</h3>
      <RadioGroup className="space-y-2">
        {Array.from({
          length: 3,
        }).map((_x, i) => (
          <div key={i} className="flex items-start gap-2 rounded-md border px-4 py-2 shadow-sm">
            <RadioGroupItem value="default" id="r1" className="mt-0.5" />
            <h5 className="text-primary-foreground text-sm font-semibold">{"Cash On Delivery"}</h5>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PaymentMethod;
