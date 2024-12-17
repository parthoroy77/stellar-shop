import Editor from "@ui/components/editor";
import { FormControl, FormField, FormItem, FormLabel, Input } from "@ui/index";

const ProductInformationFields = ({ form }: { form: any }) => {
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
                className="focus:border-secondary h-10s rounded-md px-5 placeholder:text-xs focus:border"
              />
            </FormControl>
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
                  placeholder="Your Best Price"
                  className="focus:border-secondary h-10s rounded-md px-5 placeholder:text-xs focus:border"
                />
              </FormControl>
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
                  placeholder="Your Compare Price"
                  className="focus:border-secondary h-10s rounded-md px-5 placeholder:text-xs focus:border"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Your product base sku"
                  className="focus:border-secondary h-10s rounded-md px-5 placeholder:text-xs focus:border"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="productDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Editor value={field.value} onChangeHandler={field.onChange} className="text-blue-600" />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductInformationFields;