import { useCallback, useState } from "react";
import { collections } from "../../dummyData/nav-categories";
import MobileCollectionMenu from "./mobile-collection-menu";
export type Product = {
  label: string;
};

export type Subcategory = {
  label: string;
  subcategories?: Subcategory[];
  products?: Product[];
};

export type Collection = {
  label: string;
  categories?: Subcategory[];
};
const MobileAllCategoryMenu = () => {


  return (
    <div className="w-full divide-y rounded-md border bg-white duration-300">
      {collections.map((collection: Collection, index: number) => (
        <MobileCollectionMenu key={index} collection={collection} />
      ))}
    </div>
  );
};

export default MobileAllCategoryMenu;
