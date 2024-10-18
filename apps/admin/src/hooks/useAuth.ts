import { useGetAuthQuery } from "@repo/redux";
import { TUser } from "@repo/utils/types";

type TUseAuthReturn = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: TUser | null;
};

export const useAuth = (): TUseAuthReturn => {
  // Fetch auth data using the provided query
  const { data, isLoading, isSuccess } = useGetAuthQuery(undefined);

  // If there's an error or the data is not loaded, we assume the user is not authenticated
  const isAuthenticated = isSuccess && !!data;

  return {
    isAuthenticated,
    user: data?.data || null, // If data is loaded, return user; otherwise null
    isLoading,
  };
};
