"use client";
import { loginUser } from "@/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Separator,
} from "@repo/ui";
import { loginSchema, z } from "@repo/utils/validations";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { toast } from "sonner";
import AppButton from "../ui/app-button";
import OrDivider from "../ui/or-divider";

type TLoginForm = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const form: UseFormReturn<TLoginForm> = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "password123",
    },
  });

  const router = useRouter();
  const onSubmit = async (data: TLoginForm) => {
    setLoading(true);
    const response = await loginUser(data);
    console.log(response);
    // if (response.success) {
    //   toast.success(response.message);
    //   router.push(`/verification-request?email=${data.email}`);
    //   form.reset({ email: "", password: "" });
    // } else {
    //   toast.error(response.message);
    // }
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
        <div className="flex items-center justify-between">
          <span className="text-accent-foreground flex items-center gap-3">
            <Checkbox />
            <Label>Remember Me</Label>
          </span>
          <span className="text-accent-foreground cursor-pointer text-xs underline">Forgot Your Password?</span>
        </div>
        <AppButton disabled={loading} loading={loading} type="submit" className="w-full">
          Login
        </AppButton>
        <OrDivider />
        <div className="flex flex-col items-center gap-3">
          <Button className="flex w-[300px] gap-3">
            <FaGoogle />
            <span>Sign up With Google</span>
          </Button>
          <Button className="flex w-[300px] gap-3">
            <FaFacebook />
            <span>Sign up With Facebook</span>
          </Button>
        </div>
        <Separator />
        <Link href={"/register"} className="text-accent-foreground block cursor-pointer text-center hover:underline">
          Don't have an account? Register Now
        </Link>
      </form>
    </Form>
  );
};

export default LoginForm;
