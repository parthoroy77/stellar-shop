"use client";
import { registerUser } from "@/actions/auth";
import { AppButton, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Separator } from "@repo/ui";
import { useForm, UseFormReturn, zodResolver } from "@repo/utils/hook-form";
import { registrationSchema, TRegistrationValidation } from "@repo/utils/validations";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const RegistrationForm = () => {
  const [isPending, startTransition] = useTransition();
  const form: UseFormReturn<TRegistrationValidation> = useForm<TRegistrationValidation>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const onSubmit = async (data: TRegistrationValidation) => {
    const toastId = toast.loading("Registering your account", { duration: 2000 });
    startTransition(async () => {
      const response = await registerUser(data);
      if (response.success) {
        toast.success(response.message, { id: toastId });
        router.push(`/verification-request?email=${data.email}`);
        form.reset({ email: "", fullName: "", password: "" });
      } else {
        toast.error(response.message, { id: toastId });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Full Name *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  name="fullName"
                  type="text"
                  placeholder="e.g. John Doe"
                  className="border-primary h-[45px] w-full border px-5"
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
              <FormLabel>Your Email *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  name="email"
                  placeholder="example@gmail.com"
                  type="email"
                  className="border-primary h-[45px] w-full border px-5"
                />
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
              <FormLabel>Your Password *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  name="password"
                  type="password"
                  placeholder="You Password"
                  className="border-primary h-[45px] w-full border px-5"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <AppButton disabled={isPending} loading={isPending} type="submit" className="w-full">
          Register
        </AppButton>
        <Separator />
        <Link href={"/login"} className="text-accent-foreground block cursor-pointer text-center hover:underline">
          Already have an account? Login Now
        </Link>
      </form>
    </Form>
  );
};

export default RegistrationForm;
