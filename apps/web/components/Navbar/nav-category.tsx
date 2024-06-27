import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@repo/ui";
import { CiShoppingCart } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";

const categories = [
  { label: "All Products" },
  { label: "Brakes" },
  { label: "Electrical" },
  { label: "Engine" },
  { label: "Steering" },
  { label: "Suspension" },
  { label: "Wheels" },
];

const NavCategory = () => {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-primary flex w-[250px] justify-between font-semibold uppercase text-white">
              <RxHamburgerMenu className="text-xl" />
              All Categories
            </NavigationMenuTrigger>
            <NavigationMenuContent className="flex h-fit min-w-[250px] flex-col divide-y">
              {categories.map((x, index) => (
                <NavigationMenuLink
                  key={index}
                  className="text-muted-foreground flex items-center gap-2 px-4 py-3 text-sm font-semibold"
                >
                  <CiShoppingCart className="text-xl" />
                  {x.label}
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavCategory;
