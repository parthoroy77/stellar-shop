import { collections } from "@/dummyData/nav-categories";
import { ICategory } from "@repo/utils/types";
import Image from "next/image";
import Link from "next/link";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { CiShoppingCart } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";

type TCategory = ICategory & {
  subCategories: TCategory[];
};

const SubcategoryItem = ({ subcategory }: { subcategory: ICategory }) => {
  return (
    <Link href={`/categories/${subcategory.urlSlug}`}>
      <div className="flex flex-col items-center justify-center rounded-md border p-1">
        <Image
          width={50}
          height={50}
          className="size-12 rounded-full"
          src="https://img.alicdn.com/imgextra/i1/O1CN01qAJb8h20ZJ5HJQ3S2_!!6000000006863-0-tps-240-240.jpg"
          alt="Sub Category Images"
        />
        <span className="text-center text-xs text-gray-500">{subcategory?.categoryName}</span>
      </div>
    </Link>
  );
};

const CategoryItem = ({ category }: { category: TCategory }) => {
  return (
    <div className="group/category relative">
      <Link href={`/categories/${category.urlSlug}`}>
        <div className="flex cursor-pointer justify-between px-4 py-3 text-sm font-medium text-gray-600">
          <span className="flex items-center gap-2">
            <CiShoppingCart className="text-xl" />
            {category.categoryName}
          </span>
          {category?.subCategories && <BiChevronRight className="duration-300 group-hover/category:rotate-90" />}
        </div>
      </Link>
      {category.subCategories && (
        <div
          className={`invisible absolute left-[251px] top-0 min-w-[600px] rounded-md border bg-white p-4 opacity-0 shadow-md duration-300 group-hover/category:visible group-hover/category:opacity-100 ${category.subCategories && "space-y-3"}`}
        >
          <span>{category.categoryName}</span>
          <div className="grid grid-cols-5 gap-3">
            {category.subCategories.map((subcategory, index) => (
              <SubcategoryItem key={index} subcategory={subcategory} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CollectionItem = ({ collection }: { collection: TCategory }) => {
  return (
    <div className="group/collection relative">
      <Link href={`/categories/${collection.urlSlug}`}>
        <div className="flex cursor-pointer justify-between px-4 py-3 text-sm font-medium text-gray-600">
          <span className="flex items-center gap-2">
            <CiShoppingCart className="text-xl" />
            {collection.categoryName}
          </span>
          {collection.subCategories && <BiChevronRight className="duration-300 group-hover/collection:rotate-90" />}
        </div>
      </Link>
      {collection.subCategories && (
        <div className="invisible absolute left-[251px] top-0 min-w-[250px] divide-y rounded-md border bg-white opacity-0 shadow-md duration-300 group-hover/collection:visible group-hover/collection:opacity-100">
          {collection.subCategories.map((category, i) => (
            <CategoryItem key={i} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

const NavCategory = () => {
  return (
    <div className="group/parent relative h-full w-[250px]">
      <div className="bg-primary flex cursor-pointer items-center justify-between rounded-md px-4 py-3 text-sm font-semibold uppercase text-white">
        <RxHamburgerMenu className="text-xl" />
        All Categories
        <BiChevronDown />
      </div>
      <div className="invisible absolute top-12 z-20 h-fit w-full divide-y rounded-md border bg-white opacity-0 shadow-md duration-300 group-hover/parent:visible group-hover/parent:opacity-100">
        {collections.map((collection, i) => (
          <CollectionItem key={i} collection={collection as TCategory} />
        ))}
      </div>
    </div>
  );
};

export default NavCategory;
