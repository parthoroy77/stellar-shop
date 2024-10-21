import { zodResolver } from "@hookform/resolvers/zod";
import { handleApiError, useUserLoginMutation } from "@repo/redux";
import { IApiResponse, TLoginResponse } from "@repo/utils/types";
import { loginSchema, z } from "@repo/utils/validations";
import { AppButton, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@ui/index";
import { useForm, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
type TLoginForm = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const form: UseFormReturn<TLoginForm> = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: process.env.NODE_ENV !== "production" ? "password123" : "",
      email: process.env.NODE_ENV !== "production" ? "partho@gmail.com" : "",
    },
  });

  const navigate = useNavigate();
  const [loginUser] = useUserLoginMutation();
  const onSubmit = async (data: TLoginForm) => {
    const toastId = toast.loading("Sending request to login...", { duration: 2000 });
    try {
      const response: IApiResponse<TLoginResponse> = await loginUser(data).unwrap();
      if (response.success) {
        toast.success(response.message, { id: toastId });
        form.reset();
        navigate("/");
      }
    } catch (error) {
      const appError = handleApiError(error);
      toast.error(appError.message, { id: toastId });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-accent-foreground text-sm">Email *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  name="email"
                  placeholder="example@gmail.com"
                  type="email"
                  className="border-primary h-[40px] w-full border px-5"
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
              <FormLabel className="text-accent-foreground text-sm">Password *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  name="password"
                  placeholder="example@gmail.com"
                  type="password"
                  className="border-primary h-[40px] w-full border px-5"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <AppButton className="w-full" type="submit">
          Login
        </AppButton>
      </form>
    </Form>
  );
};

export default LoginForm;
