"use client";

import { deleteUserPhoto, updateUserPhoto } from "@/actions/user";
import { useClientSession } from "@/lib/auth-utils";
import { AppButton, FileWithPreview } from "@ui/index";
import Image from "next/image";
import { ChangeEvent, useMemo, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import ProfileFieldsSkeleton from "./profile-fields-skeleton";

const ManageProfilePhoto = () => {
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const { session, loading } = useClientSession();

  const userImage = useMemo(() => session?.user?.avatarUrl ?? "/user-mock.webp", [session, loading]);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileWithPreview = Object.assign(file, { preview: URL.createObjectURL(file) });
      setFile(fileWithPreview);
    }
  };

  const handleDelete = () => {
    if (file) {
      setFile(null);
    } else {
      startTransition(async () => {
        const result = await deleteUserPhoto();
        toast[result.success ? "success" : "error"](result.message);
      });
    }
  };

  const handleSave = () => {
    if (!file) {
      inputRef.current?.click();
      return;
    }
    startTransition(async () => {
      const formData = new FormData();
      formData.append("avatar", file);

      const result = await updateUserPhoto(formData);
      toast[result.success ? "success" : "error"](result.message);
    });
  };

  if (loading) {
    return <ProfileFieldsSkeleton />;
  }

  return (
    <div className="grid flex-grow grid-cols-12 gap-3">
      <div className="col-span-3">
        <h3 className="text-lg font-medium">Your Photo</h3>
        <span className="text-accent-foreground text-wrap text-sm">This will display on your profile.</span>
      </div>
      <div className="col-span-7 flex items-center justify-between">
        <div className="w-full">
          <Image
            src={file?.preview || userImage}
            alt="User image"
            height={100}
            width={100}
            className="size-[100px] rounded-full border object-cover object-center"
          />
        </div>
        <input ref={inputRef} hidden type="file" onChange={onFileChange} />
      </div>
      <div className="col-span-2 flex justify-end gap-3">
        <AppButton
          loading={isPending}
          disabled={isPending}
          onClick={handleDelete}
          variant={"destructive"}
          size={"sm"}
          className="h-fit border px-5 py-2 font-medium"
        >
          Delete
        </AppButton>
        <AppButton
          loading={isPending}
          disabled={isPending}
          onClick={handleSave}
          variant={"accent"}
          size={"sm"}
          className="text-accent-foreground h-fit min-w-20 max-w-20 border px-5 py-2 font-medium"
        >
          {file ? "Save" : "Update"}
        </AppButton>
      </div>
    </div>
  );
};

export default ManageProfilePhoto;
