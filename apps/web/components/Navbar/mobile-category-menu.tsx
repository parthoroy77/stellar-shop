import { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { CiShoppingCart } from "react-icons/ci";
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
const MobileCategoryMenu = ({ category }: { category: Subcategory }) => {
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setIsSubCategoryOpen((prev) => !prev)}
        className="flex cursor-pointer justify-between px-4 py-3 text-xs font-medium text-gray-600"
      >
        <span className="flex items-center gap-2">
          <CiShoppingCart className="text-xl" />
          {category.label}
        </span>
        {category.subcategories && (
          <BiChevronRight className={`text-xl duration-300 ${isSubCategoryOpen && "rotate-90"}`} />
        )}
      </div>
      {isSubCategoryOpen && (
        <div className="inset-0 divide-y overflow-hidden bg-gray-50 pl-3 transition-all duration-300">
          {category.subcategories?.map((subCategory, index) => (
            <div
              key={index}
              className="flex cursor-pointer justify-between px-4 py-3 text-xs font-medium text-gray-600"
            >
              <span className="flex items-center gap-2">
                <CiShoppingCart className="text-xl" />
                {subCategory.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileCategoryMenu;
