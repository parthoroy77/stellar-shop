import Link from "next/link";
import { AiOutlineProduct } from "react-icons/ai";
import { CiShop } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import Container from "../ui/container";
import NavCategory from "./nav-category";
import NavContactOption from "./nav-contact-option";
const navLinks = [
  { id: 1, label: "Featured Products", href: "/", Icon: CiShop },
  { id: 1, label: "Popular Brands", href: "/", Icon: CiShop },
  { id: 1, label: "Today's Deals", href: "/", Icon: AiOutlineProduct },
  { id: 1, label: "Best Sellers", href: "/", Icon: IoHomeOutline },
];

const NavigationLinks = () => {
  return (
    <Container className="flex items-center justify-between py-3">
      <div className="flex items-center gap-5">
        <NavCategory />
        <nav className="flex gap-5">
          {navLinks.map(({ label, href, Icon }, index) => (
            <Link href={href} className="flex items-center gap-1" key={index}>
              <Icon />
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <NavContactOption />
    </Container>
  );
};

export default NavigationLinks;
