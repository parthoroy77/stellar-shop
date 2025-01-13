"use client";
import { getSellerProfile } from "@/actions/seller.action";
import { useClientSession } from "@/lib/auth-utils";
import { useQueryData } from "@repo/tanstack-query";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const SellerWrapper = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useClientSession();
  const { data: seller, refetch } = useQueryData(["seller"], () => getSellerProfile(), {
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
    enabled: isAuthenticated,
  });

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Redirect to onboarding if seller is null
    if (seller === null) {
      router.push("/onboarding");
      return;
    }

    // Redirect based on seller status
    if (seller && seller.status !== "ACTIVE" && pathname !== "/onboarding") {
      router.push("/onboarding");
    } else if (seller && seller.status === "ACTIVE" && pathname === "/onboarding") {
      router.push("/dashboard");
    }
  }, [seller, pathname, router]);

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated]);

  return <>{children}</>;
};

export default SellerWrapper;
