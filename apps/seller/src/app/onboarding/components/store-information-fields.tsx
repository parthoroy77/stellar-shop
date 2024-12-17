import { UseFormReturn } from "@repo/utils/hook-form";
import { TSellerOnboardingValidation } from "@repo/utils/validations";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  ImageDropzone,
  Input,
  Label,
  PhoneInput,
  Textarea,
} from "@ui/index";
import { cn } from "@ui/lib/utils";

const ShopInformationFields = ({ form }: { form: UseFormReturn<TSellerOnboardingValidation> }) => {
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h6 className="text-accent-foreground text-xs">Step 1</h6>
        <h3 className="text-lg font-medium text-black">Shop Information</h3>
      </div>
      <hr />
      <div className="space-y-2">
        <Label>Shop Banner</Label>
        <ImageDropzone
          onFilesChange={(file) => form.setValue("banner", file)}
          containerClassName=" hover:border-secondary"
        />
      </div>
      <div className="flex w-full flex-col-reverse items-start gap-5 *:space-y-2 lg:flex-row">
        <div className="w-full !space-y-3 lg:w-[65%]">
          <FormField
            control={form.control}
            name="shopName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shop Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. Stellar Shop"
                    className="bg-accent/40 h-10 w-full border px-5 placeholder:text-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shopDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shop Short Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Max 70 words"
                    className="bg-accent/40 min-h-[70px] w-full border px-5 placeholder:text-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="h-full w-full lg:w-[35%]">
          <Label>Shop Logo</Label>
          <ImageDropzone
            onFilesChange={(file) => form.setValue("logo", file)}
            containerClassName="hover:border-secondary"
          />
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <PhoneInput
                  placeholder="e.g. +880 1XXXXXXXX"
                  className="*:bg-accent/40 h-10 w-full placeholder:text-xs"
                  {...field}
                  international
                  defaultCountry="BD"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Email (Optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. example@shop.com"
                  type="email"
                  className={cn("bg-accent/40 h-10 w-full border px-5 placeholder:text-xs")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ShopInformationFields;
