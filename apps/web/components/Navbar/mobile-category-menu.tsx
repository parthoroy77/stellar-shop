import { collections } from "@/dummyData/nav-categories";
import { ICategory } from "@repo/utils/types";
import { memo, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { CiShoppingCart } from "react-icons/ci";

type TCategory = ICategory & {
  subCategories: TCategory[];
};

const MobileCollectionMenu = memo(({ collection }: { collection: TCategory }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const toggleCategory = () => setIsCategoryOpen((prev) => !prev);

  return (
    <div>
      <div
        onClick={toggleCategory}
        className="flex cursor-pointer justify-between px-4 py-3 text-xs font-medium text-gray-600"
      >
        <span className="flex items-center gap-2">
          <CiShoppingCart className="text-xl" />
          {collection.categoryName}
        </span>
        {collection.subCategories && collection.subCategories.length > 0 && (
          <BiChevronRight className={`text-xl duration-300 ${isCategoryOpen ? "rotate-90" : ""}`} />
        )}
      </div>
      {isCategoryOpen && collection.subCategories.length > 0 && (
        <div className="inset-0 divide-y overflow-hidden bg-gray-50 pl-3 transition-all duration-300">
          {collection.subCategories.map((subCategory, index) => (
            <MobileCollectionMenu key={index} collection={subCategory} />
          ))}
        </div>
      )}
    </div>
  );
});

// Avoid unnecessary re-renders of the entire list by memoizing
const MobileCategoryMenu = () => {
  return (
    <div className="w-full divide-y rounded-md border bg-white duration-300">
      {collections.map((collection, i) => (
        <MobileCollectionMenu key={i} collection={collection as TCategory} />
      ))}
    </div>
  );
};

export default MobileCategoryMenu;
