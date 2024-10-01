import { getAuth } from "@/lib/get-auth";
import { IUser, TSession } from "@repo/utils/types";
import { useEffect, useState } from "react";

type TAuthState = {
  user: IUser | null;
  session: TSession | null;
  isAuthenticated: boolean;
};

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<TAuthState | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchAuth = async () => {
      const { user, session, isAuthenticated } = await getAuth();
      setState({
        user,
        session,
        isAuthenticated,
      });
      setLoading(false);
    };

    fetchAuth();
  }, []);

  return {
    ...state,
    loading,
  };
};
