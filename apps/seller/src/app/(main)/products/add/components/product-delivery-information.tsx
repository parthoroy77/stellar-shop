import { getAllShippingOptions } from "@/actions/shipping.action";
import { useQueryData } from "@repo/tanstack-query";
import { UseFormReturn } from "@repo/utils/hook-form";
import { TCreateProductValidation } from "@repo/utils/validations";
import { Checkbox, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Skeleton } from "@ui/index";
import { cn } from "@ui/lib/utils";

const ProductDeliveryInformation = ({ form }: { form: UseFormReturn<TCreateProductValidation> }) => {
  const { data: shippingOptions = [], isFetching } = useQueryData(["shipping-options"], () => getAllShippingOptions(), {
    staleTime: 1000 * 60 * 5,
  });
  return (
    <div>
      <div className="space-y-1">
        <h3 className="text-lg">Product Delivery Information</h3>
        <p className="text-accent-foreground text-xs">Please fill carefully</p>
      </div>
      <FormField
        control={form.control}
        name="deliveryInformation.packageWeight"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Package Weight (KG)</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                onChange={(e) => field.onChange(Number(e.target.value))}
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
                type="number"
                onChange={(e) => field.onChange(Number(e.target.value))}
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
                type="number"
                onChange={(e) => field.onChange(Number(e.target.value))}
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
                type="number"
                onChange={(e) => field.onChange(Number(e.target.value))}
                placeholder="e.g. 30"
                className="focus:border-secondary h-10 rounded-md px-5 placeholder:text-xs focus:border"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="shippingOptions"
        render={({ field }) => (
          <FormItem className="relative">
            <FormLabel>Select Shipping Option</FormLabel>
            <FormControl>
              <div className="space-y-3">
                {isFetching ? (
                  <ShippingOptionSkeleton />
                ) : shippingOptions.length > 0 ? (
                  shippingOptions.map((option) => {
                    const checked = field.value && field.value?.includes(option.id.toString());

                    return (
                      <div
                        key={option.id}
                        className={cn(
                          "flex cursor-pointer items-start gap-3 rounded-md border p-3 shadow-sm duration-300",
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
                          <h5 className="text-primary-foreground text-sm font-semibold">{option.name}</h5>
                          <div className="flex justify-between text-xs">
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
                  })
                ) : (
                  <div className="text-accent-foreground flex h-20 items-center justify-center text-center text-sm">
                    <span>No shipping option found!</span>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const ShippingOptionSkeleton = () => {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className={cn("flex cursor-pointer items-start gap-3 rounded-md border p-3 shadow-sm")}>
          <Skeleton className="size-5" />
          <div className="w-full space-y-1.5">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDeliveryInformation;
