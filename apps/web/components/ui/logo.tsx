"use client";
import Image from "next/image";
import { redirect } from "next/navigation";

const Logo = () => {
  return (
    <Image
      width={150}
      height={60}
      onClick={() => redirect("/")}
      src={"/logo2.svg"}
      alt="Website Logo"
      className="w-[150px] lg:w-[200px]"
    />
  );
};

export default Logo;
