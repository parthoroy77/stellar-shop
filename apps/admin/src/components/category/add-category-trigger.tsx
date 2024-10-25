import OffCanvas from "@ui/components/off-canvas";
import { Button } from "@ui/index";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

const AddCategoryTrigger = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen((prev) => !prev)} variant={"default"} size={"sm"}>
        Add New Category
      </Button>
      <OffCanvas open={open} setOpen={setOpen}>
        <div className="divide-y *:px-5 *:py-3">
          <div className="flex items-center justify-between">
            <span>Add Category</span>
            <Button
              onClick={() => setOpen(false)}
              variant={"ghost"}
              size={"sm"}
              className="hover:bg-accent flex size-10 items-center justify-center rounded-full duration-300"
            >
              <RxCross1 size={16} />
            </Button>
          </div>
          <div></div>
        </div>
      </OffCanvas>
    </>
  );
};

export default AddCategoryTrigger;
