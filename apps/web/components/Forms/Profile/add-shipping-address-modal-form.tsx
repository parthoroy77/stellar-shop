"use client";
import { addShippingAddress } from "@/actions/address";
import { useForm } from "@repo/utils/hook-form";
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
import { useState, useTransition } from "react";
import { LuPin, LuPlus } from "react-icons/lu";
import { toast } from "sonner";

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

// TODO: if possible add country dropdown list
const AddShippingAddressModalForm = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<TShippingAddressValidation>({
    defaultValues: { ...defaultValues },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: TShippingAddressValidation) => {
    const toastId = toast.loading("Sending request to process!", { duration: 2000 });
    startTransition(async () => {
      const result = await addShippingAddress(data);
      if (result.success) {
        toast.success(result.message, { id: toastId });
        setOpen(false);
        form.reset();
      } else {
        toast.error(result.message, { id: toastId });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-accent/40 flex size-8 items-center justify-center rounded-full border">
        <LuPlus />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LuPin size={17} />
            Add Address
          </DialogTitle>
          <DialogDescription>Add your address it will use at the time of order placement!</DialogDescription>
        </DialogHeader>
        <hr />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-3">
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
                Add Address
              </AppButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddShippingAddressModalForm;
