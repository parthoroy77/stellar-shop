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

const NavCategory = () => {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-primary text-white w-[250px] flex justify-between uppercase font-semibold">
              <RxHamburgerMenu className="text-xl" />
              All Categories
            </NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[250px] h-fit flex flex-col divide-y">
              {Array.from({
                length: 5,
              }).map((x) => (
                <NavigationMenuLink className="py-3 px-4 flex items-center gap-2 font-semibold text-sm text-muted-foreground">
                  <CiShoppingCart className="text-xl" />
                  All Products
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
