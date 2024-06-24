import NavHeader from "./nav-header";
import NavigationLinks from "./navigation-links";
const Navbar = () => {
  return (
    <div className="divide-y-[1px] border-b">
      <NavHeader />
      <NavigationLinks />
    </div>
  );
};

export default Navbar;
