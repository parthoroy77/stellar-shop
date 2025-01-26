"use client";

import { updateUserProfile } from "@/actions/user";
import ProfileFieldsSkeleton from "@/components/AccountSettings/Profile/profile-fields-skeleton";
import { useClientSession } from "@/lib/auth-utils";
import { useForm } from "@repo/utils/hook-form";
import { TUserProfileValidation } from "@repo/utils/validations";
import {
  AppButton,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  getCountryCode,
  Input,
  Label,
  PhoneInput,
} from "@ui/index";
import { useEffect, useState, useTransition } from "react";
import { LuPenLine, LuSave } from "react-icons/lu";
import { VscUnverified, VscVerifiedFilled } from "react-icons/vsc";
import { toast } from "sonner";

const ProfileInformationForm = () => {
  const { session, loading } = useClientSession();
  const [isEdit, setIsEdit] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<TUserProfileValidation>({
    defaultValues: {
      fullName: session?.user?.fullName || "",
      phoneNumber: session?.user?.phoneNumber || "",
    },
  });

  // Sync form with session data when session changes
  useEffect(() => {
    if (session?.user) {
      form.reset({
        fullName: session.user.fullName || "",
        phoneNumber: session.user.phoneNumber ? "+" + session.user.phonePrefixCode + session.user.phoneNumber : "",
      });
    }
  }, [session, form]);

  const onSubmit = ({ phoneNumber, fullName }: TUserProfileValidation) => {
    const phonePrefixCode = phoneNumber ? getCountryCode(phoneNumber) || "" : "";
    phoneNumber = phoneNumber?.replace(`+${phonePrefixCode}`, "");
    // Check if the fields are unchanged
    if (
      session?.user?.fullName === fullName &&
      session?.user?.phonePrefixCode === phonePrefixCode &&
      session?.user?.phoneNumber === phoneNumber
    ) {
      toast.info("No changes detected!");
      return;
    }
    const toastId = toast.loading("Sending request to process!", { duration: 2000 });
    startTransition(async () => {
      const result = await updateUserProfile({ fullName, phonePrefixCode, phoneNumber });
      if (result.success) {
        toast.success(result.message, { id: toastId });
        setIsEdit(false);
      } else {
        toast.error(result.message, { id: toastId });
      }
    });
  };

  if (loading) {
    return <ProfileFieldsSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid flex-grow grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-3">
          <h3 className="text-sm font-medium lg:text-lg">Personal Information</h3>
          <span className="text-accent-foreground text-wrap text-xs lg:text-sm">
            Here update your personal information
          </span>
        </div>
        <div className="col-span-10 grid gap-3 lg:col-span-7 lg:grid-cols-2">
          {/* Full Name Field */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="lg:col-span-2">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. John Doe"
                    className="bg-accent/40 h-10 w-full border px-5 placeholder:text-xs"
                    disabled={!isEdit}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Email Field */}
          <div className="relative space-y-1">
            <Label>Email</Label>
            <Input className="border-none px-6 font-semibold" disabled value={session?.user.email} />
            {session?.user.emailVerified ? (
              <VscVerifiedFilled size={20} color="green" className="absolute bottom-3" />
            ) : (
              <VscUnverified size={20} color="red" className="absolute bottom-3" />
            )}
          </div>
          {/* Phone Number Field */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput
                    {...field}
                    placeholder="e.g. +880 1XXXXXXXX"
                    className="*:bg-accent/40 h-10 w-full placeholder:text-xs"
                    international
                    defaultCountry="BD"
                    disabled={!isEdit}
                    onChange={(value) => form.setValue("phoneNumber", value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-2 flex flex-col items-end gap-3 lg:flex-row lg:items-start lg:justify-end">
          <Button
            onClick={() => setIsEdit((prev) => !prev)}
            type="button"
            variant={"ghost"}
            size={"icon"}
            className="rounded-full border"
          >
            <LuPenLine size={20} />
          </Button>
          <AppButton
            loading={isPending}
            hideElement={isPending}
            type="submit"
            variant={"accent"}
            size={"icon"}
            className="rounded-full border"
            disabled={isPending || !form.formState.isDirty}
          >
            <LuSave size={20} />
          </AppButton>
        </div>
      </form>
    </Form>
  );
};

export default ProfileInformationForm;
