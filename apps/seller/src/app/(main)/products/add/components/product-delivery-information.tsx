import { UseFormReturn } from "@repo/utils/hook-form";
import { TCreateProductValidation } from "@repo/utils/validations";
import { Checkbox, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@ui/index";
import { cn } from "@ui/lib/utils";
const deliveryOptions = [
  {
    id: 1,
    name: "Standard Shipping",
    charge: 5.99,
    estimateDays: "5-7 days",
    status: "ACTIVE",
    createdAt: "2024-12-01T10:00:00Z",
    updatedAt: "2024-12-01T10:00:00Z",
    productDeliveryOptions: [],
  },
  {
    id: 2,
    name: "Express Shipping",
    charge: 12.99,
    estimateDays: "1-3 days",
    status: "ACTIVE",
    createdAt: "2024-12-02T11:30:00Z",
    updatedAt: "2024-12-02T11:30:00Z",
    productDeliveryOptions: [],
  },
  {
    id: 3,
    name: "Same Day Shipping",
    charge: 24.99,
    estimateDays: "1 day",
    status: "ACTIVE",
    createdAt: "2024-12-03T09:15:00Z",
    updatedAt: "2024-12-03T09:15:00Z",
    productDeliveryOptions: [],
  },
  {
    id: 5,
    name: "Local Pickup",
    charge: 3.49,
    estimateDays: "Same day",
    status: "ARCHIVED",
    createdAt: "2024-10-15T14:20:00Z",
    updatedAt: "2024-10-15T14:20:00Z",
    productDeliveryOptions: [],
  },
];

const ProductDeliveryInformation = ({ form }: { form: UseFormReturn<TCreateProductValidation> }) => {
  return (
    <div>
      <div className="space-y-1">
        <h3 className="text-lg">Product Delivery Information</h3>
        <p className="text-accent-foreground text-xs">Please fill carefully</p>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <FormField
          control={form.control}
          name="deliveryInformation.packageWeight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Weight (KG)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. 2"
                  className="focus:border-secondary h-10 rounded-md px-5 placeholder:text-xs focus:border"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deliveryInformation.packageHeight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Height (CM)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. 15"
                  className="focus:border-secondary h-10 rounded-md px-5 placeholder:text-xs focus:border"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deliveryInformation.packageLength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Length (CM)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. 40"
                  className="focus:border-secondary h-10 rounded-md px-5 placeholder:text-xs focus:border"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deliveryInformation.packageWidth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Width (CM)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. 30"
                  className="focus:border-secondary h-10 rounded-md px-5 placeholder:text-xs focus:border"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="deliveryOptions"
        render={({ field }) => (
          <FormItem className="relative">
            <FormLabel>Select Shipping Option</FormLabel>
            <FormControl>
              <div className="grid grid-cols-2 gap-3">
                {deliveryOptions.map((option) => {
                  const checked = field.value && field.value?.includes(option.id.toString());

                  return (
                    <div
                      key={option.id}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-md border p-2 shadow-sm duration-300",
                        checked && "bg-accent/40"
                      )}
                    >
                      <Checkbox
                        className="mt-1"
                        checked={checked}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, option.id.toString()])
                            : field.onChange(field.value?.filter((value) => value !== option.id.toString()));
                        }}
                      />
                      <div className="text-accent-foreground w-full space-y-1 text-sm">
                        <h5 className="text-sm font-medium">{option.name}</h5>
                        <div className="flex justify-between">
                          <span>
                            Estimated Days: <b>{option.estimateDays}</b>
                          </span>
                          <span>
                            Estimated Cost: <b>${option.charge}</b>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductDeliveryInformation;
