"use client";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  AppButton,
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
  Skeleton,
} from "@repo/ui";
import { useForm, zodResolver } from "@repo/utils/hook-form";
import { loginSchema, TLoginValidation } from "@repo/utils/validations";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useTransition } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { toast } from "sonner";
import OrDivider from "../ui/or-divider";

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

function LoginFormContent() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT;

  const form = useForm<TLoginValidation>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: process.env.NODE_ENV !== "production" ? "partho@gmail.com" : "",
      password: process.env.NODE_ENV !== "production" ? "password123" : "",
    },
  });

  const onSubmit = async (data: TLoginValidation) => {
    const toastId = toast.loading("Sending request to login", { duration: 2000 });
    startTransition(async () => {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl,
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
                  type="password"
                  placeholder="Your Password"
                  className="border-primary h-[45px] w-full border px-5"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <span className="text-accent-foreground flex items-center gap-3">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember Me</Label>
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
        <Link href="/register" className="text-accent-foreground block cursor-pointer text-center hover:underline">
          Don't have an account? Register Now
        </Link>
      </form>
    </Form>
  );
}

function LoginFormFallback() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-40" />
      </div>
      <Skeleton className="h-9 w-full" />
      <OrDivider />
      <div className="flex flex-col items-center gap-3">
        <Skeleton className="h-9 w-[300px]" />
        <Skeleton className="h-9 w-[300px]" />
      </div>
      <Separator />
      <Skeleton className="h-5 w-full" />
    </div>
  );
}

export default function LoginForm() {
  return (
    <Suspense fallback={<LoginFormFallback />}>
      <LoginFormContent />
    </Suspense>
  );
}
