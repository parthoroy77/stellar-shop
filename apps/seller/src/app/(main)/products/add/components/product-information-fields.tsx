import { UseFormReturn } from "@repo/utils/hook-form";
import { TCreateProductValidation } from "@repo/utils/validations";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@ui/index";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/ui/editor"), { ssr: false });

const ProductInformationFields = ({ form }: { form: UseFormReturn<TCreateProductValidation> }) => {
  return (
    <div>
      <h3 className="text-lg">Product Information</h3>
      <FormField
        control={form.control}
        name="productName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="e.g. Luxury comfortable summer T Shirt"
                className="focus:border-secondary h-10 rounded-md px-5 placeholder:text-xs focus:border"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-3 gap-3">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="Your Best Price"
                  className="focus:border-secondary h-10 rounded-md px-5 placeholder:text-xs focus:border"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comparePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Compare Price</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="Your Compare Price"
                  className="focus:border-secondary h-10 rounded-md px-5 placeholder:text-xs focus:border"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock Keeping Unit</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Your product base sku"
                  className="focus:border-secondary h-10 rounded-md px-5 placeholder:text-xs focus:border"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Editor value={field.value} onChangeHandler={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductInformationFields;
