import { useState } from "react";
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
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleOpen = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full divide-y rounded-md border bg-white duration-300">
      {collections.map((collection: Collection, index: number) => (
        <MobileCollectionMenu
          key={index}
          collection={collection}
          isOpen={!!openItems[collection.label]}
          toggleOpen={() => toggleOpen(collection.label)}
          openItems={openItems}
          toggleItemOpen={toggleOpen}
        />
      ))}
    </div>
  );
};

export default MobileAllCategoryMenu;
