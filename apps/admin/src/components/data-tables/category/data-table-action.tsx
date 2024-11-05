import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@ui/index";
import { BiDotsHorizontal } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";

const CategoryDataTableAction = () => {
  return (
    <div className="flex items-center gap-3">
      <button>
        <span className="sr-only">Open category edit menu</span>
        <FaRegEdit className="text-base lg:text-lg" />
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <span className="sr-only">Open menu</span>
            <BiDotsHorizontal className="text-base lg:text-lg" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CategoryDataTableAction;
