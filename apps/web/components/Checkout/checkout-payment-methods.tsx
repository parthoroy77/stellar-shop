import { IPaymentMethod } from "@repo/utils/types";
import { RadioGroup, RadioGroupItem } from "@ui/index";

const CheckoutPaymentMethods = ({
  paymentMethods,
  selectedPaymentMethod,
}: {
  paymentMethods: IPaymentMethod[];
  selectedPaymentMethod: number | null;
}) => {
  return (
    <RadioGroup defaultValue={selectedPaymentMethod?.toString()} className="space-y-2">
      {paymentMethods.map((p, i) => (
        <div key={i} className="flex items-start gap-2.5 rounded-md border px-3 py-2 shadow-sm">
          <RadioGroupItem value={p.id.toString()} className="mt-1" />
          <div>
            <h5 className="text-primary-foreground text-sm font-semibold">{p.name}</h5>
            <p className="text-accent-foreground text-xs">{p.description}</p>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};

export default CheckoutPaymentMethods;
