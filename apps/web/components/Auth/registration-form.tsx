import { Button, Input, Label, Separator } from "@repo/ui";
import Link from "next/link";
const RegistrationForm = () => {
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
      <Button className="w-full">Register</Button>
      <Separator />
      <Link href={"/login"} className="text-accent-foreground block cursor-pointer text-center hover:underline">
        Already have an account? Login Now
      </Link>
    </form>
  );
};

export default RegistrationForm;
