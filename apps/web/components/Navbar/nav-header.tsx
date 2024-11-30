import { Container } from "@repo/ui";
import Link from "next/link";
import Logo from "../ui/logo";
import NavIcons from "./nav-icons";
import NavSearchBar from "./nav-search-bar";

const NavHeader = () => {
  return (
    <Container className="flex items-center justify-between py-7">
      <Link href={"/"}>
        <Logo />
      </Link>
      <NavSearchBar />
      <NavIcons />
    </Container>
  );
};

export default NavHeader;
