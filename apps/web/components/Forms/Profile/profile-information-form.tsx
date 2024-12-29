"use client";
import { useForm } from "@repo/utils/hook-form";
import { Button, Form, Input } from "@ui/index";
import { LuPenLine, LuSave } from "react-icons/lu";

const ProfileInformationForm = () => {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="grid flex-grow grid-cols-12 gap-3">
        <div className="col-span-3">
          <h3 className="text-lg font-medium">Personal Information</h3>
          <span className="text-accent-foreground text-wrap text-sm">Here update your personal information</span>
        </div>
        <div className="col-span-7 grid grid-cols-2 gap-3">
          <Input placeholder="First Name" />
          <Input placeholder="Last Name" />
          <Input placeholder="Email" />
          <Input placeholder="Phone Number" />
        </div>
        <div className="col-span-2 flex justify-end gap-3">
          <Button variant={"ghost"} size={"icon"} className="rounded-full border">
            <LuPenLine size={20} />
          </Button>
          <Button variant={"accent"} size={"icon"} className="rounded-full border">
            <LuSave size={20} />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileInformationForm;
