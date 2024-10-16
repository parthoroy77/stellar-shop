import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, z } from "@repo/utils/validations";
import AppButton from "@ui/components/ui/app-button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@ui/index";
import { useForm, UseFormReturn } from "react-hook-form";
type TLoginForm = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const form: UseFormReturn<TLoginForm> = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: process.env.NODE_ENV !== "production" ? "password123" : "",
      email: process.env.NODE_ENV !== "production" ? "partho@gmail.com" : "",
    },
  });

  const onSubmit = async () => {};
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
