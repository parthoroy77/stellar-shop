import { handleApiError, useUserLogOutMutation } from "@repo/redux";
import { IApiResponse } from "@repo/utils/types";
import AppButton from "@ui/components/ui/app-button";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "sonner";

const LogoutButton = () => {
  const [logoutUser, { isLoading }] = useUserLogOutMutation();
  const handleLogout = async () => {
    const id = toast.loading("Sending request to logout...", { duration: 3000 });
    try {
      const response: IApiResponse<{}> = await logoutUser(undefined).unwrap();
      if (response.success) {
        toast.success(response.message, { id });
      }
    } catch (error) {
      const appError = handleApiError(error);
      toast.error(appError.message, { id });
    }
  };
  return (
    <AppButton
      type="button"
      loading={isLoading}
      hideElement={isLoading}
      size={"sm"}
      onClick={handleLogout}
      className="flex h-7 w-full items-center justify-center gap-2"
    >
      <span>Logout</span>
      <IoIosLogOut />
    </AppButton>
  );
};

export default LogoutButton;
