"use client";
import { getSellerProfile } from "@/actions/seller.action";
import { useQueryData } from "@repo/tanstack-query";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const SellerWrapper = ({ children }: { children: ReactNode }) => {
  const { data: seller } = useQueryData(["seller"], () => getSellerProfile(), {
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
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

  return <>{children}</>;
};

export default SellerWrapper;
