import { getAllCategories } from "@/actions/category";
import { TCategory } from "@repo/utils/types";
import Image from "next/image";
import Link from "next/link";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { CiShoppingCart } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";

const SubcategoryItem = ({ subcategory }: { subcategory: TCategory }) => {
  return (
    <Link href={`/categories/${subcategory.urlSlug}`}>
      <div className="flex items-center gap-2 py-2">
        <Image
          width={30}
          height={30}
          className="size-8 rounded-md"
          src={subcategory.images[0]?.file.fileSecureUrl!}
          alt="Sub Category Images"
        />
        <span className="line-clamp-1 text-center text-sm text-gray-500">{subcategory?.categoryName}</span>
      </div>
    </Link>
  );
};

const CategoryItem = ({ category }: { category: TCategory }) => {
  return (
    <div className="group/category relative">
      <Link href={`/categories/${category.urlSlug}`}>
        <div className="text-accent-foreground flex cursor-pointer items-center justify-between px-4 py-2 text-sm font-medium">
          <div className="flex items-center gap-2">
            <Image
              width={30}
              height={30}
              className="size-8 rounded-md"
              src={category.images[0]?.file.fileSecureUrl!}
              alt={category.categoryName}
            />
            <span>{category.categoryName}</span>
          </div>
          {category?.subCategories && <BiChevronRight className="duration-300 group-hover/category:rotate-90" />}
        </div>
      </Link>
      {category.subCategories && category.subCategories.length > 0 && (
        <div
          className={`invisible absolute left-[251px] top-0 min-w-[250px] rounded-md border bg-white px-4 py-2 opacity-0 shadow-md duration-300 group-hover/category:visible group-hover/category:opacity-100 ${category.subCategories && "space-y-3"}`}
        >
          <span>{category.categoryName}</span>
          <div className="flex list-disc flex-col divide-y">
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
        <div className="text-accent-foreground flex cursor-pointer items-center justify-between px-4 py-2 text-sm font-medium">
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
          {collection.subCategories && <BiChevronRight className="duration-300 group-hover/collection:rotate-90" />}
        </div>
      </Link>
      {collection.subCategories && collection.subCategories.length > 0 && (
        <div className="invisible absolute left-[251px] top-0 min-w-[250px] divide-y rounded-md border bg-white opacity-0 shadow-md duration-300 group-hover/collection:visible group-hover/collection:opacity-100">
          {collection.subCategories.map((category, i) => (
            <CategoryItem key={i} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

const NavCategory = async () => {
  const collections = await getAllCategories();
  return (
    <div className="group/parent relative h-full w-[250px]">
      <div className="bg-primary flex cursor-pointer items-center justify-between rounded-md px-4 py-3 text-sm font-semibold uppercase text-white">
        <RxHamburgerMenu className="text-xl" />
        All Categories
        <BiChevronDown />
      </div>
      <div className="invisible absolute top-12 z-20 h-fit w-full divide-y rounded-md border bg-white opacity-0 shadow-md duration-300 group-hover/parent:visible group-hover/parent:opacity-100">
        <Link href={`/search`}>
          <div className="text-accent-foreground flex cursor-pointer justify-between px-4 py-2 text-sm font-medium">
            <span className="flex items-center gap-2">
              <CiShoppingCart size={30} />
              All Products
            </span>
          </div>
        </Link>
        {collections.map((collection, i) => (
          <CollectionItem key={i} collection={collection as unknown as TCategory} />
        ))}
      </div>
    </div>
  );
};

export default NavCategory;
