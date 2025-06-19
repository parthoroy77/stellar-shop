import { getAllCategories } from "@/actions/category";
import { useQueryData } from "@repo/tanstack-query";
import { TCategory } from "@repo/utils/types";
import { Skeleton } from "@ui/index";
import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";
import { BiChevronRight } from "react-icons/bi";

const MobileCollectionMenu = memo(({ collection }: { collection: TCategory }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const toggleCategory = () => setIsCategoryOpen((prev) => !prev);

  return (
    <>
      <div
        onClick={toggleCategory}
        className="text-accent-foreground flex cursor-pointer items-center justify-between px-4 py-2 text-xs font-medium"
      >
        <Link href={`/categories/${collection.urlSlug}`}>
          <div className="flex items-center gap-2">
            <Image
              width={30}
              height={30}
              className="size-8 rounded-md"
              src={collection.images[0]?.file.fileSecureUrl!}
              alt={collection.categoryName}
            />
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

const MobileCategoryMenu = () => {
  const { data: collections = [], isFetching } = useQueryData(["categories"], () => getAllCategories(), {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
  if (isFetching) {
    return (
      <div className="space-y-1 py-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-8" />
        ))}
      </div>
    );
  }
  return (
    <div className="w-full divide-y rounded-md border bg-white duration-300">
      {collections.map((collection, i) => (
        <MobileCollectionMenu key={i} collection={collection as unknown as TCategory} />
      ))}
    </div>
  );
};

export default MobileCategoryMenu;
