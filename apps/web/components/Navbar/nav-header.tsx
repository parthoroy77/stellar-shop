import Container from "../ui/container";
import Logo from "../ui/logo";
import NavIcons from "./nav-icons";
import NavSearchBar from "./nav-search-bar";

const NavHeader = () => {
  return (
    <Container className="flex items-center justify-between py-7">
      <Logo />
      <NavSearchBar />
      <NavIcons />
    </Container>
  );
};

export default NavHeader;
