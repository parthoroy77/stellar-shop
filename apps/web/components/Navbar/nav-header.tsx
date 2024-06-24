import Container from "../ui/container";
import Logo from "../ui/logo";
import NavIcons from "./nav-icons";
import NavSearchBar from "./nav-search-bar";

const NavHeader = () => {
  return (
    <Container>
      <div className="flex justify-between items-center py-7">
        <Logo />
        <NavSearchBar />
        <NavIcons />
      </div>
    </Container>
  );
};

export default NavHeader;
