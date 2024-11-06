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
} from "@ui/index";
import { Row } from "@ui/tanstack-table";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { TfiZoomIn } from "react-icons/tfi";
import { toast } from "sonner";

const CategoryDataTableAction = ({ row }: { row: Row<TCategory> }) => {
  return (
    <div className="flex items-center justify-end gap-3">
      <button>
        <span className="sr-only">Open category edit menu</span>
        <TfiZoomIn className="text-base lg:text-lg" />
      </button>
      <button>
        <span className="sr-only">Open category edit menu</span>
        <FaRegEdit className="text-base lg:text-lg" />
      </button>
      <CategoryDeleteAction categoryId={row?.original?.id} />
    </div>
  );
};

const CategoryDeleteAction = ({ categoryId }: { categoryId: number }) => {
  const [deleteCategory, { isLoading }] = useDeleteCategoryByIdMutation();
  const handleDelete = async () => {
    const toastId = toast.loading("Sending request to delete category", { duration: 3000 });
    try {
      const response = await deleteCategory(categoryId.toString()).unwrap();
      console.log(response);
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
      <AlertDialogTrigger asChild>
        <button disabled={isLoading}>
          <span className="sr-only">Open category edit menu</span>
          <AiOutlineDelete className="text-base lg:text-lg" />
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
