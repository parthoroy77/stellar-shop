import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "./auth-option";

export const useClientSession = () => {
  const session = useSession();
  return {
    isAuthenticated: session.status === "authenticated",
    session: session.data,
    loading: session.status === "loading",
  };
};

export const getServerAuth = async () => {
  const session = await getServerSession(authOptions);
  return {
    session: session,
    isAuthenticated: session?.user ? true : false,
  };
};
