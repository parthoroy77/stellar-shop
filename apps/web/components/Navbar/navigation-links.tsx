import Link from "next/link";
import { AiOutlineProduct } from "react-icons/ai";
import { CiShop } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import Container from "../ui/container";
import NavCategory from "./nav-category";
const navLinks = [
  { id: 1, label: "Featured Products", href: "/", Icon: CiShop },
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
      <div className="flex items-center gap-2">
        <FaWhatsapp className="text-secondary text-4xl" />
        <div className="text-center text-sm font-semibold uppercase">
          <p>Call Anytime</p>
          <p className="text-secondary">0468543345</p>
        </div>
      </div>
    </Container>
  );
};

export default NavigationLinks;
