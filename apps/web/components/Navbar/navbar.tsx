import MobileNav from "./mobile-nav";
import NavHeader from "./nav-header";
import NavigationLinks from "./navigation-links";
const Navbar = () => {
  return (
    <>
      <div className="hidden divide-y-[1px] border-b lg:block">
        <NavHeader />
        <NavigationLinks />
      </div>
      <div className="lg:hidden border-b-2 shadow-sm">
        <MobileNav />
      </div>
    </>
  );
};

export default Navbar;
