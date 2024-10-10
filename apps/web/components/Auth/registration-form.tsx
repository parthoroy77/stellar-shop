"use client";
import { registerUser } from "@/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Separator } from "@repo/ui";
import { registrationSchema, z } from "@repo/utils/validations";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import AppButton from "../ui/app-button";

type TRegistrationForm = z.infer<typeof registrationSchema>;

const RegistrationForm = () => {
  const [isPending, startTransition] = useTransition();
  const form: UseFormReturn<TRegistrationForm> = useForm<TRegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: process.env.NODE_ENV !== "production" ? "Partho Roy" : "",
      email: "",
      password: process.env.NODE_ENV !== "development" ? "password123" : "",
    },
  });
  const router = useRouter();
  const onSubmit = async (data: TRegistrationForm) => {
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
