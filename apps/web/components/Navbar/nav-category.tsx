import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { CiShoppingCart } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
type Product = {
  label: string;
};

type Subcategory = {
  label: string;
  subcategories?: Subcategory[];
  products?: Product[];
};

type Category = {
  label: string;
  categories?: Subcategory[];
};

const collections: Category[] = [
  {
    label: "All Products",
    categories: [
      {
        label: "Brakes",
        subcategories: [
          {
            label: "Disc Brakes",
            products: [{ label: "Disc Brake Pads" }, { label: "Disc Brake Rotors" }],
          },
          {
            label: "Drum Brakes",
            products: [{ label: "Drum Brake Shoes" }, { label: "Drum Brake Drums" }],
          },
        ],
      },
      {
        label: "Electrical",
        subcategories: [
          {
            label: "Batteries",
            products: [{ label: "Car Batteries" }, { label: "Battery Cables" }],
          },
          {
            label: "Alternators",
            products: [{ label: "Car Alternators" }, { label: "Alternator Belts" }],
          },
        ],
      },
      {
        label: "Engine",
        subcategories: [
          {
            label: "Engine Components",
            products: [{ label: "Spark Plugs" }, { label: "Engine Belts" }],
          },
          {
            label: "Fuel Systems",
            products: [{ label: "Fuel Injectors" }, { label: "Fuel Pumps" }],
          },
        ],
      },
    ],
  },
  {
    label: "Brakes",
    categories: [
      {
        label: "Disc Brakes",
        products: [{ label: "Disc Brake Pads" }, { label: "Disc Brake Rotors" }],
      },
      {
        label: "Drum Brakes",
        products: [{ label: "Drum Brake Shoes" }, { label: "Drum Brake Drums" }],
      },
    ],
  },
  {
    label: "Electrical",
    categories: [
      {
        label: "Batteries",
        products: [{ label: "Car Batteries" }, { label: "Battery Cables" }],
      },
      {
        label: "Alternators",
        products: [{ label: "Car Alternators" }, { label: "Alternator Belts" }],
      },
    ],
  },
  {
    label: "Engine",
    categories: [
      {
        label: "Engine Components",
        products: [{ label: "Spark Plugs" }, { label: "Engine Belts" }],
      },
      {
        label: "Fuel Systems",
        products: [{ label: "Fuel Injectors" }, { label: "Fuel Pumps" }],
      },
    ],
  },
  {
    label: "Steering",
    categories: [
      {
        label: "Steering Wheels",
        products: [{ label: "Leather Steering Wheels" }, { label: "Sport Steering Wheels" }],
      },
      {
        label: "Power Steering",
        products: [{ label: "Power Steering Pumps" }, { label: "Power Steering Hoses" }],
      },
    ],
  },
  {
    label: "Suspension",
    categories: [
      {
        label: "Shock Absorbers",
        products: [{ label: "Hydraulic Shock Absorbers" }, { label: "Gas Shock Absorbers" }],
      },
      {
        label: "Struts",
        products: [{ label: "Front Struts" }, { label: "Rear Struts" }],
      },
    ],
  },
  {
    label: "Wheels",
    categories: [
      {
        label: "Alloy Wheels",
        products: [{ label: "Aluminum Alloy Wheels" }, { label: "Chrome Alloy Wheels" }],
      },
      {
        label: "Steel Wheels",
        products: [{ label: "Standard Steel Wheels" }, { label: "Heavy Duty Steel Wheels" }],
      },
    ],
  },
];

const NavCategory = () => {
  return (
    <div className="group/parent relative h-full w-[250px]">
      <div className="bg-primary flex cursor-pointer items-center justify-between rounded-md px-4 py-3 text-sm font-semibold uppercase text-white">
        <RxHamburgerMenu className="text-xl" />
        All Categories
        <BiChevronDown />
      </div>
      <div className="absolute top-11 z-20 hidden h-fit w-full divide-y rounded-md border bg-white shadow-md group-hover/parent:block">
        {collections.map(({ label, categories }, index) => (
          <div key={index} className="group/collection relative">
            <div className="flex cursor-pointer justify-between px-4 py-3 text-sm font-medium text-gray-600">
              <span className="flex items-center gap-2">
                <CiShoppingCart className="text-xl" />
                {label}
              </span>
              {categories && <BiChevronRight className="duration-300 group-hover/collection:rotate-90" />}
            </div>
            {categories && (
              <div className="absolute left-[251px] top-0 hidden min-w-[250px] divide-y rounded-md border bg-white shadow-md group-hover/collection:block">
                {categories &&
                  categories.map(({ label: categoryLabel, subcategories }, index) => (
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
                          className={`absolute left-[251px] top-0 hidden min-w-[600px] rounded-md border bg-white p-4 shadow-md group-hover/category:block ${subcategories && "space-y-3"}`}
                        >
                          <span>{categoryLabel}</span>
                          <div className="grid grid-cols-5 gap-3">
                            {subcategories &&
                              subcategories.map(({ label }, index) => (
                                <div key={index} className="flex flex-col items-center justify-center">
                                  <img
                                    className="size-12 rounded-full"
                                    src="https://img.alicdn.com/imgextra/i1/O1CN01qAJb8h20ZJ5HJQ3S2_!!6000000006863-0-tps-240-240.jpg"
                                    alt="Sub Category Images"
                                  />
                                  <span className="text-gray-500 text-xs text-center">{label}</span>
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
// const NavCategory = () => {
//   return (
//     <div>
//       <NavigationMenu>
//         <NavigationMenuList>
//           <NavigationMenuItem>
//             <NavigationMenuTrigger className="flex w-[250px] justify-between font-semibold uppercase">
//               <RxHamburgerMenu className="text-xl" />
//               All Categories
//             </NavigationMenuTrigger>
//             <NavigationMenuContent className="flex h-fit min-w-[250px] flex-col divide-y">
//               {categories.map(({ products, label }, index) => (
//                 <NavigationMenuLink
//                   key={index}
//                   href="/"
//                   className={`group flex items-center justify-between gap-2 px-4 py-3 text-sm font-semibold`}
//                 >
//                   <span className="flex items-center gap-2">
//                     <CiShoppingCart className="text-xl" />
//                     {label}
//                   </span>
//                   {products && <BiChevronRight />}
//                 </NavigationMenuLink>
//               ))}
//             </NavigationMenuContent>
//           </NavigationMenuItem>
//         </NavigationMenuList>
//       </NavigationMenu>
//     </div>
//   );
// };

export default NavCategory;
