"use client";
import { redirect } from "next/navigation";

const Logo = () => {
  return <img onClick={() => redirect("/")} src={"/logo2.svg"} alt="Website Logo" className="w-[150px] lg:w-[200px]" />;
};

export default Logo;
