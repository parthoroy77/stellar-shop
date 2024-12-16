"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@ui/index";
import { usePathname } from "next/navigation";
import React from "react";
import { TbSmartHome } from "react-icons/tb";

interface BreadcrumbItem {
  label: string;
  href: string;
}

const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const paths = pathname.split("/").filter(Boolean);
  return paths.map((path, index) => ({
    label: path.charAt(0).toUpperCase() + path.slice(1),
    href: "/" + paths.slice(0, index + 1).join("/"),
  }));
};

const AppBreadcrumbs = () => {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-xs font-medium tracking-wide">
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard" className="flex items-center gap-1">
            <TbSmartHome size={17} />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.length > 0 && <BreadcrumbSeparator />}
        {breadcrumbs.length > 0 &&
          breadcrumbs.map(({ label, href }, i) => (
            <React.Fragment key={i}>
              <BreadcrumbItem className={`${i + 1 === breadcrumbs.length ? "font-medium text-black" : "font-normal"}`}>
                <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
              </BreadcrumbItem>
              {i + 1 < breadcrumbs.length && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadcrumbs;
