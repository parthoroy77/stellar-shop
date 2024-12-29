import { Button } from "@ui/index";
import Image from "next/image";

const ManageProfilePhoto = () => {
  return (
    <div className="grid flex-grow grid-cols-12 gap-3">
      <div className="col-span-3">
        <h3 className="text-lg font-medium">Your Photo</h3>
        <span className="text-accent-foreground text-wrap text-sm">This will display on your profile.</span>
      </div>
      <div className="col-span-7 flex justify-between">
        <Image
          src={"https://t4.ftcdn.net/jpg/03/26/98/51/360_F_326985142_1aaKcEjMQW6ULp6oI9MYuv8lN9f8sFmj.jpg"}
          alt="User image"
          height={100}
          width={100}
          className="size-[100px] rounded-full object-cover"
        />
      </div>
      <div className="col-span-2 flex justify-end gap-3">
        <Button variant={"destructive"} size={"sm"} className="h-fit w-fit border px-5 py-2 font-medium">
          Delete
        </Button>
        <Button
          variant={"accent"}
          size={"sm"}
          className="text-accent-foreground h-fit w-fit border px-5 py-2 font-medium"
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default ManageProfilePhoto;
