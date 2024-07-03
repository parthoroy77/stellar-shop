import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { CiShoppingCart } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { collections } from "../../dummyData/nav-categories";
type Product = {
  label: string;
};

type Subcategory = {
  label: string;
  subcategories?: Subcategory[];
  products?: Product[];
};

type Collection = {
  label: string;
  categories?: Subcategory[];
};

const NavCategory = () => {
  return (
    <div className="group/parent relative h-full w-[250px]">
      <div className="bg-primary flex cursor-pointer items-center justify-between rounded-md px-4 py-3 text-sm font-semibold uppercase text-white">
        <RxHamburgerMenu className="text-xl" />
        All Categories
        <BiChevronDown />
      </div>
      <div className="invisible absolute top-11 z-20 h-fit w-full divide-y rounded-md border bg-white opacity-0 shadow-md duration-300 group-hover/parent:visible group-hover/parent:opacity-100">
        {collections.map((collection: Collection, index: number) => (
          <div key={index} className="group/collection relative">
            <div className="flex cursor-pointer justify-between px-4 py-3 text-sm font-medium text-gray-600">
              <span className="flex items-center gap-2">
                <CiShoppingCart className="text-xl" />
                {collection.label}
              </span>
              {collection.categories && <BiChevronRight className="duration-300 group-hover/collection:rotate-90" />}
            </div>
            {collection?.categories && (
              <div className="invisible absolute left-[251px] top-0 min-w-[250px] divide-y rounded-md border bg-white opacity-0 shadow-md duration-300 group-hover/collection:visible group-hover/collection:opacity-100">
                {collection.categories &&
                  collection.categories.map(({ label: categoryLabel, subcategories }, index) => (
                    <div key={index} className="group/category relative">
                      <div className="flex cursor-pointer justify-between px-4 py-3 text-sm font-medium text-gray-600">
                        <span className="flex items-center gap-2">
                          <CiShoppingCart className="text-xl" />
                          {categoryLabel}
                        </span>
                        {subcategories && <BiChevronRight className="duration-300 group-hover/category:rotate-90" />}
                      </div>
                      {subcategories && (
                        <div
                          className={`invisible absolute left-[251px] top-0 min-w-[600px] rounded-md border bg-white p-4 opacity-0 shadow-md duration-300 group-hover/category:visible group-hover/category:opacity-100 ${subcategories && "space-y-3"}`}
                        >
                          <span>{categoryLabel}</span>
                          <div className="grid grid-cols-5 gap-3 divide-x">
                            {subcategories &&
                              subcategories.map(({ label }, index) => (
                                <div key={index} className="flex flex-col items-center justify-center">
                                  <img
                                    className="size-12 rounded-full"
                                    src="https://img.alicdn.com/imgextra/i1/O1CN01qAJb8h20ZJ5HJQ3S2_!!6000000006863-0-tps-240-240.jpg"
                                    alt="Sub Category Images"
                                  />
                                  <span className="text-center text-xs text-gray-500">{label}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavCategory;
