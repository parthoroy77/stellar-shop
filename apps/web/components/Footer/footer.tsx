import { Button, Input, Separator } from "@repo/ui";
import Link from "next/link";
import { BsShop } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaPinterest, FaTwitter } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { PiTelegramLogo } from "react-icons/pi";
import { aboutItems, corporateLinks, quickLinks, usefulLinks } from "../../constants/footer-data";
import Container from "../ui/container";
import Logo from "../ui/logo";

const Footer = () => {
  return (
    <div className="bg-accent/55 mt-20">
      <Container>
        <div className="relative flex h-full flex-col justify-between">
          <div className="bg-accent absolute -top-10 flex w-full justify-between gap-5 rounded-full px-10 py-5">
            <div className="flex items-center gap-5">
              <PiTelegramLogo size={40} className="text-primary" />
              <h1 className="text-2xl font-semibold">Sign Up to Newsletter </h1>
              <span className="text-gray-600">...and receive $20 coupon for first shopping</span>
            </div>
            <div className="flex h-[45px] items-center">
              <Input
                className="h-full w-[350px] rounded-full rounded-r-none px-5 placeholder:text-gray-500"
                placeholder="Your E-mail"
              />
              <Button className="h-full rounded-full rounded-l-none px-8">Submit</Button>
            </div>
          </div>
          <div className="flex h-[400px] items-center justify-center">
            <div className="grid grid-cols-5 gap-8 *:space-y-3">
              <div>
                <Logo />
                <p className="text-sm text-gray-600">
                  Discover the best deals on a wide range of top-quality products, from electronics and fashion to home
                  goods and beauty essentials.
                </p>
                <span className="flex items-center gap-2">
                  <BsShop /> Dhaka, Bangladesh
                </span>
                <span className="flex items-center gap-2">
                  <MdOutlineEmail /> support@stellarshop.com
                </span>
              </div>
              <div>
                <h3 className="text-lg font-medium">About Us</h3>
                <Separator className="bg-gray-300" />
                <ul className="space-y-2">
                  {aboutItems.map((x) => (
                    <ListItem key={x.id} {...x} />
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium">Useful Links</h3>
                <Separator className="bg-gray-300" />
                <ul className="space-y-2">
                  {usefulLinks.map((x) => (
                    <ListItem key={x.id} {...x} />
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium">Corporate</h3>
                <Separator className="bg-gray-300" />
                <ul className="space-y-2">
                  {corporateLinks.map((x) => (
                    <ListItem key={x.id} {...x} />
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium">Quick Links</h3>
                <Separator className="bg-gray-300" />
                <ul className="space-y-2">
                  {quickLinks.map((x) => (
                    <ListItem key={x.id} {...x} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <Separator className="bg-gray-300" />
          <div className="flex items-center justify-between py-5 text-sm font-medium">
            <span>All Right Reserved. Copyright 2024</span>
            <img src="https://ninetheme.com/themes/fitment/wp-content/uploads/2023/08/payment-300x26.webp" alt="" />
            <div className="flex items-center gap-2">
              <span>Stay Connected:</span>
              <FaFacebook />
              <FaInstagram />
              <FaTwitter />
              <FaPinterest />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const ListItem = ({ label }: { label: string; href: string }) => {
  return (
    <li className="hover:text-primary duration-300">
      <Link href={"/"}>{label}</Link>
    </li>
  );
};

export default Footer;
