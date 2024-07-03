import { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { CiShoppingCart } from "react-icons/ci";
import MobileCategoryMenu from "./mobile-category-menu";

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
const MobileCollectionMenu = ({ collection }: { collection: Collection }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setIsCategoryOpen((prev) => !prev)}
        className="flex cursor-pointer justify-between px-4 py-3 text-xs font-medium text-gray-600"
      >
        <span className="flex items-center gap-2">
          <CiShoppingCart className="text-xl" />
          {collection.label}
        </span>
        {collection.categories && (
          <BiChevronRight className={`text-xl duration-300 ${isCategoryOpen && "rotate-90"}`} />
        )}
      </div>
      {isCategoryOpen && (
        <div className="inset-0 divide-y overflow-hidden bg-gray-50 pl-3 transition-all duration-300">
          {collection.categories?.map((category, index) => <MobileCategoryMenu key={index} category={category} />)}
        </div>
      )}
    </div>
  );
};

export default MobileCollectionMenu;
