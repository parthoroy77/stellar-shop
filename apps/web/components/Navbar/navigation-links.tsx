import Link from "next/link";
import { AiOutlineProduct } from "react-icons/ai";
import { CiShop } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { SlArrowDown } from "react-icons/sl";
import Container from "../ui/container";
import NavCategory from "./nav-category";
const navLinks = [
  { id: 1, label: "Featured Products", href: "/", Icon: CiShop },
  { id: 1, label: "Today's Deals", href: "/", Icon: AiOutlineProduct },
  { id: 1, label: "Best Sellers", href: "/", Icon: IoHomeOutline },
];

const NavigationLinks = () => {
  return (
    <Container className="py-3 flex justify-between items-center">
      <div className="flex items-center gap-5">
        <NavCategory />
        <nav className="flex gap-5">
          {navLinks.map(({ label, href, Icon }, index) => (
            <Link href={href} className="flex items-center gap-3 group" key={index}>
              <span className="flex items-center gap-1">
                <Icon />
                {label}
              </span>
              <SlArrowDown className="text-sm group-hover:rotate-90" />
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex  items-center gap-2">
        <FaWhatsapp className="text-4xl text-secondary" />
        <div className="uppercase font-semibold text-center text-sm ">
          <p>Call Anytime</p>
          <p className="text-secondary">0468543345</p>
        </div>
      </div>
    </Container>
  );
};

export default NavigationLinks;
