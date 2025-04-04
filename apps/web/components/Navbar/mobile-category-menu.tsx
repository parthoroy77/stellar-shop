import { collections } from "@/dummyData/nav-categories";
import { TCategory } from "@repo/utils/types";
import Link from "next/link";
import { memo, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { CiShoppingCart } from "react-icons/ci";

const MobileCollectionMenu = memo(({ collection }: { collection: TCategory }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const toggleCategory = () => setIsCategoryOpen((prev) => !prev);

  return (
    <>
      <div
        onClick={toggleCategory}
        className="text-accent-foreground flex cursor-pointer justify-between px-4 py-3 text-xs font-medium"
      >
        <Link href={`/categories/${collection.urlSlug}`}>
          <div className="flex items-center gap-2">
            <CiShoppingCart className="text-xl" />
            <span>{collection.categoryName}</span>
          </div>
        </Link>
        {collection.subCategories && collection?.subCategories?.length > 0 && (
          <BiChevronRight className={`text-xl duration-300 ${isCategoryOpen ? "rotate-90" : ""}`} />
        )}
      </div>
      {isCategoryOpen && collection.subCategories && collection?.subCategories?.length > 0 && (
        <div className="bg-accent/40 inset-0 divide-y overflow-hidden pl-3 transition-all duration-300">
          {collection.subCategories.map((subCategory, index) => (
            <MobileCollectionMenu key={index} collection={subCategory} />
          ))}
        </div>
      )}
    </>
  );
});

// Avoid unnecessary re-renders of the entire list by memoizing
const MobileCategoryMenu = () => {
  return (
    <div className="w-full divide-y rounded-md border bg-white duration-300">
      {collections.map((collection, i) => (
        <MobileCollectionMenu key={i} collection={collection as unknown as TCategory} />
      ))}
    </div>
  );
};

export default MobileCategoryMenu;
