"use client";
import { TProduct } from "@repo/utils/types";
import { Button } from "@ui/index";
import { Row } from "@ui/tanstack-table";
import Link from "next/link";
import { SlMagnifierAdd } from "react-icons/sl";

const ProductDataTableActions = ({ row }: { row: Row<TProduct> }) => {
  return (
    <div className="flex w-fit justify-center gap-1">
      <Link href={`/products/` + row.original.id}>
        <Button size={"sm"} className="flex h-7 w-fit gap-1" variant={"link"}>
          <SlMagnifierAdd />
          View
        </Button>
      </Link>
    </div>
  );
};

export default ProductDataTableActions;
