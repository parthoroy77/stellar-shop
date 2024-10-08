import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "./auth";

export const useClientSession = () => {
  const session = useSession();
  return {
    isAuthenticated: session.status === "authenticated",
    user: session.data,
    loading: session.status === "loading",
  };
};

export const getServerAuth = async () => {
  const session = await getServerSession(authOptions);
  return {
    user: session?.user,
    isAuthenticated: session?.user ? true : false,
  };
};
