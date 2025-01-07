"use client";
import { useQueryClient } from "@repo/tanstack-query";
import { useForm } from "@repo/utils/hook-form";
import { IApiResponse, IShippingAddress } from "@repo/utils/types";
import { TShippingAddressValidation } from "@repo/utils/validations";
import {
  AppButton,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PhoneInput,
  RadioGroup,
  RadioGroupItem,
} from "@ui/index";
import { FC, useEffect, useState, useTransition } from "react";
import { LuPenLine, LuPin, LuPlus } from "react-icons/lu";
import { toast } from "sonner";

interface Props {
  submitHandler: (data: TShippingAddressValidation) => Promise<IApiResponse<unknown>>;
  addressData?: IShippingAddress;
  isUpdate: boolean;
}

const AddShippingAddressModalForm: FC<Props> = ({ submitHandler, addressData = {}, isUpdate = true }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<TShippingAddressValidation>({
    defaultValues: { ...defaultValues, ...addressData },
  });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (data: TShippingAddressValidation) => {
    const toastId = toast.loading("Sending request to process!", { duration: 2000 });
    startTransition(async () => {
      const result = await submitHandler(data);
      if (result.success) {
        toast.success(result.message, { id: toastId });
        queryClient.invalidateQueries({ queryKey: ["shipping-addresses"] });
        setOpen(false);
        form.reset();
      } else {
        toast.error(result.message, { id: toastId });
      }
    });
  };

  useEffect(() => {
    if (Object.keys(addressData).length > 0) {
      form.reset({ ...defaultValues, ...addressData });
    }
  }, [addressData, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-accent/40 flex size-8 items-center justify-center rounded-full border">
        {isUpdate ? <LuPenLine /> : <LuPlus />}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LuPin size={17} />
            {isUpdate ? "Update Address" : " Add Address"}
          </DialogTitle>
          <DialogDescription>
            {isUpdate
              ? "Update your address details below."
              : "Add your address; it will be used at the time of order placement!"}
          </DialogDescription>
        </DialogHeader>
        <hr />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-2 gap-3">
            <FormField
              name="fullName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Amazon LTD"
                      type="text"
                      className="bg-accent/40 focus:border-secondary h-10 w-full rounded-md placeholder:text-xs focus:border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phoneNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-3">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="HOME" />
                        </FormControl>
                        <FormLabel className="font-normal">Home</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="WORK" />
                        </FormControl>
                        <FormLabel className="font-normal">Work</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPrimary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Check if this will be your primary address</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      <h5 className="text-sm">Is Primary</h5>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="fullAddress"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Full Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Amazon LTD"
                      type="text"
                      className="bg-accent/40 focus:border-secondary h-10 w-full rounded-md placeholder:text-xs focus:border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="country"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Bangladesh"
                      type="text"
                      className="bg-accent/40 focus:border-secondary h-10 w-full rounded-md placeholder:text-xs focus:border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="state"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Dhaka Division"
                      type="text"
                      className="bg-accent/40 focus:border-secondary h-10 w-full rounded-md placeholder:text-xs focus:border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="city"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Munshiganj"
                      type="text"
                      className="bg-accent/40 focus:border-secondary h-10 w-full rounded-md placeholder:text-xs focus:border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="zipCode"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. 1234"
                      type="text"
                      className="bg-accent/40 focus:border-secondary h-10 w-full rounded-md placeholder:text-xs focus:border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="col-span-2">
              <AppButton loading={isPending} type="submit" size={"sm"} variant={"secondary"} className="border">
                {isUpdate ? "Update Address" : "Add Address"}
              </AppButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddShippingAddressModalForm;

const defaultValues: TShippingAddressValidation = {
  fullAddress: "",
  fullName: "",
  country: "",
  state: "",
  city: "",
  zipCode: "",
  phoneNumber: "",
  type: "HOME",
  isPrimary: false,
};
