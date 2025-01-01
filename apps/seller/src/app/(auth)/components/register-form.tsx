"use client";

import { registerUser } from "@/actions/auth.action";
import { useForm, zodResolver } from "@repo/utils/hook-form";
import { registrationSchema, TRegistrationValidation } from "@repo/utils/validations";
import { AppButton, Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@ui/index";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { HiOutlineEyeOff, HiOutlineMail } from "react-icons/hi";
import { HiOutlineEye, HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi2";
import { toast } from "sonner";

const RegisterForm = () => {
  const [eyeEnable, setEyeEnable] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<TRegistrationValidation>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TRegistrationValidation) => {
    const toastId = toast.loading("Registering your account", { duration: 2000 });
    startTransition(async () => {
      const response = await registerUser(data);
      if (response.success) {
        toast.success(response.message, { id: toastId });
        // router.push(`/verification-request?email=${data.email}`);
        // form.reset({ email: "", fullName: "", password: "" });
      } else {
        toast.error(response.message, { id: toastId });
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-accent-foreground text-xs">Your Full Name *</FormLabel>
                <FormControl className="relative">
                  <div className="relative h-10">
                    <Input
                      {...field}
                      placeholder="e.g. John Doe"
                      name="text"
                      type="fullName"
                      className="bg-accent/40 focus:border-secondary h-full w-full rounded-md pl-12 placeholder:text-xs focus:border"
                    />
                    <span className="text-secondary absolute left-2 top-[6.5px] rounded-md bg-white p-1.5">
                      <HiOutlineUser size={15} />
                    </span>
                  </div>
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
                <FormLabel className="text-accent-foreground text-xs">Your Email *</FormLabel>
                <FormControl className="relative">
                  <div className="relative h-10">
                    <Input
                      {...field}
                      placeholder="you@example.com"
                      name="userEmail"
                      type="email"
                      className="bg-accent/40 focus:border-secondary h-full w-full rounded-md pl-12 placeholder:text-xs focus:border"
                    />
                    <span className="text-secondary absolute left-2 top-[6.5px] rounded-md bg-white p-1.5">
                      <HiOutlineMail size={15} />
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-accent-foreground text-xs">Your Password *</FormLabel>
                <FormControl className="relative">
                  <div className="relative h-10">
                    <Input
                      {...field}
                      name="password"
                      placeholder="At least 8 character with special characters"
                      type={eyeEnable ? "text" : "password"}
                      className="bg-accent/40 focus:border-secondary h-full w-full rounded-md pl-12 placeholder:text-xs focus:border"
                    />
                    <span className="text-secondary absolute left-2 top-[6.5px] rounded-md bg-white p-1.5">
                      <HiOutlineLockClosed size={15} />
                    </span>
                    <button
                      type="button"
                      onClick={() => setEyeEnable((prev) => !prev)}
                      className="text-secondary absolute right-2 top-[6.5px] rounded-md bg-white p-1.5"
                    >
                      {eyeEnable ? <HiOutlineEyeOff size={15} /> : <HiOutlineEye size={15} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <AppButton disabled={isPending} loading={isPending} variant={"secondary"} type="submit" className="w-full">
          Register
        </AppButton>
        <div className="flex justify-center gap-1">
          <span className="text-accent-foreground text-xs font-medium">Already have an account?</span>
          <Button
            onClick={() => router.push("/login")}
            variant={"link"}
            type="button"
            className="h-fit p-0"
            size={"sm"}
          >
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
