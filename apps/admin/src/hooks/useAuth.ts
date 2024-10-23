import { useGetAuthQuery } from "@repo/redux";
import { TUser } from "@repo/utils/types";

type TUseAuthReturn = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: TUser | null;
  error: boolean;
};

export const useAuth = (): TUseAuthReturn => {
  const { data, isLoading, isSuccess, isError } = useGetAuthQuery(undefined);

  const isAuthenticated = isSuccess && !!data;
  const error = isError; // Add error handling here

  return {
    isAuthenticated,
    user: data?.data || null,
    isLoading,
    error, // Return the error state
  };
};
