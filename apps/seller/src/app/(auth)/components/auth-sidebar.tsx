"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import dashboardMock from "../../../../public/dashboard-1.png";

const AuthSidebar = () => {
  const path = usePathname();
  return (
    <section className="bg-accent/30 hidden h-full w-full flex-col justify-between gap-8 p-4 md:w-[60%] md:p-20 lg:flex">
      <div className="relative h-full w-full">
        <div className="h-[400px] overflow-hidden rounded-2xl border bg-white p-4">
          <Image src={dashboardMock} alt="Dashboard mock image" className="rounded-xl border shadow-lg" />
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-medium md:text-3xl">
          {path === "/register" ? "Start wonderful journey with us!" : "Welcome Back!"}
        </h3>
        <p className="text-accent-foreground text-sm md:text-base">Start managing your store and grow exponentially!</p>
        <p className="text-accent-foreground text-sm md:text-base">
          Check your remaining orders fulfill buyer needs <br /> with your great{" "}
          <i className="text-secondary font-medium capitalize">product</i>.
        </p>
      </div>
    </section>
  );
};

export default AuthSidebar;
