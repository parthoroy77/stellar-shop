import { Button, Checkbox, Input, Label, Separator } from "@repo/ui";
import Link from "next/link";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import OrDivider from "../ui/or-divider";

const LoginForm = () => {
  return (
    <form className="space-y-5">
      <span className="block space-y-2">
        <Label>Your Email *</Label>
        <Input placeholder="example@gmail.com" className="border-primary h-[45px] w-full border px-5" />
      </span>
      <span className="block space-y-2">
        <Label>Your Password *</Label>
        <Input placeholder="example@gmail.com" className="border-primary h-[45px] w-full border px-5" />
      </span>
      <div className="flex items-center justify-between">
        <span className="text-accent-foreground flex items-center gap-3">
          <Checkbox />
          <Label>Remember Me</Label>
        </span>
        <span className="text-accent-foreground cursor-pointer text-xs underline">Forgot Your Password?</span>
      </div>
      <Button className="w-full">Login</Button>
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
  );
};

export default LoginForm;
