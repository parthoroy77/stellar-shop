import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  ImageDropzone,
  Input,
  Label,
  Textarea,
} from "@ui/index";

// TODO: remove any add corresponding types
const StoreInformationForm = ({ form }: { form: any }) => {
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h6 className="text-accent-foreground text-xs">Step 1</h6>
        <h3 className="text-lg font-medium text-black">Store Information</h3>
      </div>
      <hr />
      <div className="space-y-2">
        <Label>Store Banner</Label>
        <ImageDropzone onFilesChange={() => {}} containerClassNames=" hover:border-secondary" />
      </div>
      <div className="flex w-full items-start gap-5 *:space-y-2">
        <div className="w-[65%] !space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. Stellar Shop"
                    type="email"
                    className="bg-accent/40 h-10 w-full border px-5 placeholder:text-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Short Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Max 70 words"
                    className="bg-accent/40 w-full border px-5 placeholder:text-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-[35%]">
          <Label>Store Logo</Label>
          <ImageDropzone onFilesChange={() => {}} containerClassNames=" hover:border-secondary" />
        </div>
      </div>
    </div>
  );
};

export default StoreInformationForm;
