import { handleApiError, useDeleteCategoryByIdMutation } from "@repo/redux";
import { TCategory } from "@repo/utils/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/index";
import { Row } from "@ui/tanstack-table";
import { AiOutlineDelete } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "sonner";

const CategoryDataTableAction = ({ row }: { row: Row<TCategory> }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-secondary rounded-md border px-3 py-1.5">
        <BsThreeDots />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        <DropdownMenuLabel>Category Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <CategoryDeleteAction categoryId={row?.original?.id} />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 px-3">
          <FaRegEdit />
          <span>Edit Category</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const CategoryDeleteAction = ({ categoryId }: { categoryId: number }) => {
  const [deleteCategory, { isLoading }] = useDeleteCategoryByIdMutation();
  const handleDelete = async () => {
    const toastId = toast.loading("Sending request to delete category", { duration: 3000 });
    try {
      const response = await deleteCategory(categoryId.toString()).unwrap();
      if (response.success) {
        toast.success(response.message, { id: toastId });
      }
    } catch (error) {
      const appError = handleApiError(error);
      toast.error(appError.message, { id: toastId });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={isLoading} asChild>
        <button className="flex items-center gap-2 px-2 text-sm">
          <AiOutlineDelete className="text-base lg:text-lg" />
          <span>Delete category</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CategoryDataTableAction;
