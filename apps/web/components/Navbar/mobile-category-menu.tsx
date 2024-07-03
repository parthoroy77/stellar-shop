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
type MobileCategoryMenuProps = {
  category: Subcategory;
  isOpen: boolean;
  toggleOpen: () => void;
  openItems: { [key: string]: boolean };
  toggleItemOpen: (key: string) => void;
};

const MobileCategoryMenu = ({ category, isOpen, toggleOpen, openItems, toggleItemOpen }: MobileCategoryMenuProps) => {
  return (
    <div>
      <div
        onClick={toggleOpen}
        className="flex cursor-pointer justify-between px-4 py-3 text-xs font-medium text-gray-600"
      >
        <span className="flex items-center gap-2">
          <CiShoppingCart className="text-xl" />
          {category.label}
        </span>
        {category.subcategories && <BiChevronRight className={`text-xl duration-300 ${isOpen && "rotate-90"}`} />}
      </div>
      {isOpen && (
        <div className="inset-0 divide-y overflow-hidden bg-gray-50 pl-3 transition-all duration-300">
          {category.subcategories?.map((subCategory, index) => (
            <SubCategoryMenu
              key={index}
              subCategory={subCategory}
              isOpen={!!openItems[`${category.label}-${subCategory.label}`]}
              toggleOpen={() => toggleItemOpen(`${category.label}-${subCategory.label}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

type SubCategoryMenuProps = {
  subCategory: Subcategory;
  isOpen: boolean;
  toggleOpen: () => void;
};

const SubCategoryMenu = ({ subCategory }: SubCategoryMenuProps) => {
  return (
    <div className="flex cursor-pointer justify-between px-4 py-3 text-xs font-medium text-gray-600">
      <span className="flex items-center gap-2">
        <CiShoppingCart className="text-xl" />
        {subCategory.label}
      </span>
    </div>
  );
};

export default MobileCategoryMenu;
