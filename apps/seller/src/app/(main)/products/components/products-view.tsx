"use client";
import { columns } from "@/components/data-table/product/column";
import ProductDataTable from "@/components/data-table/product/data-table";
import { TProduct } from "@repo/utils/types";
import { FC } from "react";
interface Props {
  products: TProduct[];
}

const ProductsView: FC<Props> = ({ products }) => {
  return (
    <div>
      <ProductDataTable columns={columns} data={products} />
    </div>
  );
};

export default ProductsView;
