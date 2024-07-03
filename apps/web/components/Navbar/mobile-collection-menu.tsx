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
type MobileCollectionMenuProps = {
  collection: Collection;
  isOpen: boolean;
  toggleOpen: () => void;
  openItems: { [key: string]: boolean };
  toggleItemOpen: (key: string) => void;
};
const MobileCollectionMenu = ({
  collection,
  isOpen,
  toggleOpen,
  openItems,
  toggleItemOpen,
}: MobileCollectionMenuProps) => {
  return (
    <div>
      <div
        onClick={toggleOpen}
        className="flex cursor-pointer justify-between px-4 py-3 text-xs font-medium text-gray-600"
      >
        <span className="flex items-center gap-2">
          <CiShoppingCart className="text-xl" />
          {collection.label}
        </span>
        {collection.categories && <BiChevronRight className={`text-xl duration-300 ${isOpen && "rotate-90"}`} />}
      </div>
      {isOpen && (
        <div className="inset-0 divide-y overflow-hidden bg-gray-50 pl-3 transition-all duration-300">
          {collection.categories?.map((category, index) => (
            <MobileCategoryMenu
              key={index}
              category={category}
              isOpen={!!openItems[`${collection.label}-${category.label}`]}
              toggleOpen={() => toggleItemOpen(`${collection.label}-${category.label}`)}
              openItems={openItems}
              toggleItemOpen={toggleItemOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileCollectionMenu;
