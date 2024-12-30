"use client";
import { useForm } from "@repo/utils/hook-form";
import { TShippingAddressValidation } from "@repo/utils/validations";
import {
  AppButton,
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
} from "@ui/index";
import { useState, useTransition } from "react";
import { LuPin, LuPlus } from "react-icons/lu";
import { toast } from "sonner";

const AddShippingAddressModalForm = () => {
  const form = useForm<TShippingAddressValidation>({
    defaultValues: {},
  });
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: TShippingAddressValidation) => {
    const toastId = toast.loading("Sending request to upload!", { duration: 2000 });

    // startTransition(async () => {
    //   const result = await createBrand(formData);
    //   if (result.success) {
    //     toast.success(result.message, { id: toastId });
    //     if (result.success && result.data) {
    //       // set updated data
    //       handleSetNewBrand(result.data.id.toString());

    //       // close the modal
    //       onClose();

    //       // Invalidate and refetch the brands query
    //       queryClient.invalidateQueries({ queryKey: ["brands"] });

    //       // reset form
    //       form.reset();
    //     }
    //   } else {
    //     toast.error(result.message, { id: toastId });
    //   }
    // });
  };
  console.log(form.watch("country"));
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <AppButton variant={"accent"} size={"icon"} className="size-8 rounded-full border">
          <LuPlus />
        </AppButton>
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
            <DialogFooter>
              <AppButton loading={isPending} type="submit" size={"sm"} variant={"secondary"} className="border">
                Upload Brand
              </AppButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddShippingAddressModalForm;
