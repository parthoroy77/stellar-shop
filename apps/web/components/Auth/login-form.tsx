"use client";
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
import AppButton from "@ui/components/ui/app-button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { toast } from "sonner";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import OrDivider from "../ui/or-divider";

type TLoginForm = z.infer<typeof loginSchema>;

export const getSafeRedirectUrl = (url = "") => {
  if (!url) {
    return null;
  }
  const urlParsed = new URL(url);

  // Avoid open redirection security vulnerability
  if (![process.env.DOMAIN_URL as string].some((u) => new URL(u).origin === urlParsed.origin)) {
    url = `http://localhost:3000/`;
  }

  return url;
};

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const form: UseFormReturn<TLoginForm> = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: process.env.NODE_ENV !== "production" ? "password123" : "",
      email: process.env.NODE_ENV !== "production" ? "partho@gmail.com" : "",
    },
  });
  const searchParams = useSearchParams();
  const router = useRouter();

  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT;

  const onSubmit = async (data: TLoginForm) => {
    const toastId = toast.loading("Sending request to login", { duration: 2000 });
    startTransition(async () => {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (!result?.ok) {
        const parsedError: { message: string; status: number } = JSON.parse(result?.error!);
        if (parsedError.status === 406) {
          toast.info(parsedError.message, { id: toastId });
          router.push(`/verification-request?email=${data.email}`);
        }
        if (parsedError.status === 401) {
          toast.info(parsedError.message, { id: toastId });
        }
      } else {
        toast.success("User logged in successfully", { id: toastId });
        console.log(callbackUrl);
        router.push(callbackUrl);
        form.reset({ email: "", password: "" });
      }
    });
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
        <AppButton disabled={isPending} loading={isPending} type="submit" className="w-full">
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
