import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@repo/ui";
import React from "react";
import { HiMiniHome } from "react-icons/hi2";

export interface BreadcrumbMenuProps {
  label: string;
  href: string;
}

const BreadcrumbMenu = ({ items }: { items: BreadcrumbMenuProps[] }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-xs sm:gap-1">
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center gap-1">
            <HiMiniHome className="mb-[0.7px]" />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {items.length > 0 && <BreadcrumbSeparator />}
        {items.length > 0 &&
          items.map(({ label, href }, i) => (
            <React.Fragment key={i}>
              <BreadcrumbItem className={`${i + 1 === items.length ? "font-medium text-black" : "font-normal"}`}>
                <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
              </BreadcrumbItem>
              {i + 1 < items.length && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbMenu;
