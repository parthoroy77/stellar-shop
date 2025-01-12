"use client";

import { getSellerProfile } from "@/actions/seller.action";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useForm, zodResolver } from "@repo/utils/hook-form";
import { loginSchema, TLoginValidation } from "@repo/utils/validations";
import AuthFormFallback from "@ui/components/auth-form-fallback";
import { AppButton, Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@ui/index";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useTransition } from "react";
import { HiOutlineEyeOff, HiOutlineMail } from "react-icons/hi";
import { HiOutlineEye, HiOutlineLockClosed } from "react-icons/hi2";
import { toast } from "sonner";

const LoginFormContent = () => {
  const [eyeEnable, setEyeEnable] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT;
  const form = useForm<TLoginValidation>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: process.env.NODE_ENV !== "production" ? "seller@gmail.com" : "",
      password: process.env.NODE_ENV !== "production" ? "password123" : "",
    },
  });

  const onSubmit = async (data: TLoginValidation) => {
    const toastId = toast.loading("Sending request to login!", {
      duration: 2000,
    });
    startTransition(async () => {
      // Next auth signin method
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl,
        redirect: false,
      });

      if (result?.ok) {
        // Get seller profile and determine onboarding completion
        const result = await getSellerProfile();

        if (result && result.status === "ACTIVE") {
          router.push(callbackUrl);
        } else {
          router.push("/onboarding");
        }

        toast.success("User logged in successfully", { id: toastId });
        // reset form
        form.reset({ email: "", password: "" });
      } else {
        // Parse the error sent from auth option
        const parsedError: { message: string; status: number } = JSON.parse(result?.error!);
        // If account not verified send for verification
        if (parsedError.status === 406) {
          toast.info(parsedError.message, { id: toastId });
          router.push(`/verification-request?email=${data.email}`);
        }
        // If invalid cred
        if (parsedError.status === 401) {
          toast.info(parsedError.message, { id: toastId });
        }
        // Or show the error directly!
        toast.error(parsedError.message, { id: toastId });
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="space-y-2">
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
                      name="email"
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

        <div className="flex justify-end">
          <Button variant={"link"} type="button" className="h-fit p-0" size={"sm"}>
            <span>Forgot Password?</span>
          </Button>
        </div>
        <AppButton disabled={isPending} loading={isPending} variant={"secondary"} type="submit" className="w-full">
          Login
        </AppButton>
        <div className="flex justify-center gap-1">
          <span className="text-accent-foreground text-xs font-medium">Don't you have an account?</span>
          <Button
            onClick={() => router.push("/register")}
            variant={"link"}
            type="button"
            className="h-fit p-0"
            size={"sm"}
          >
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
};

const LoginForm = () => {
  return (
    <Suspense fallback={<AuthFormFallback />}>
      <LoginFormContent />
    </Suspense>
  );
};

export default LoginForm;
