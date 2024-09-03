import { aboutItems, corporateLinks, quickLinks, usefulLinks } from "@/constants/footer-data";
import { Button, Input, Separator } from "@repo/ui";
import Image from "next/image";
import Link from "next/link";
import { BsShop } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { PiTelegramLogo } from "react-icons/pi";
import Container from "../ui/container";
import Logo from "../ui/logo";

const Footer = () => {
  return (
    <div className="bg-accent/55 lg:mt-10">
      <Container>
        <div className="relative flex h-full flex-col justify-between">
          <NewsletterSection />
          <LinksSection />
          <Separator className="bg-gray-300" />
          <FooterBottom />
        </div>
      </Container>
    </div>
  );
};

const NewsletterSection = () => (
  <div className="lg:bg-accent flex w-full flex-col gap-5 pt-5 lg:absolute lg:-top-10 lg:flex-row lg:justify-between lg:rounded-full lg:px-10 lg:py-5">
    <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-5">
      <PiTelegramLogo size={40} className="text-primary" />
      <h1 className="text-2xl font-semibold">Sign Up to Newsletter</h1>
      <span className="text-gray-600">...and receive $20 coupon for first shopping</span>
    </div>
    <div className="flex h-[40px] items-center">
      <Input
        className="h-full rounded-full rounded-r-none px-5 placeholder:text-gray-500 lg:w-[350px]"
        placeholder="Your E-mail"
      />
      <Button className="h-full rounded-full rounded-l-none px-8">Submit</Button>
    </div>
  </div>
);

const LinksSection = () => (
  <div className="flex items-center justify-center py-10 lg:h-[400px]">
    <div className="grid gap-8 *:space-y-3 md:grid-cols-3 lg:grid-cols-5">
      <FooterInfo />
      <FooterLinks title="About Us" items={aboutItems} />
      <FooterLinks title="Useful Links" items={usefulLinks} />
      <FooterLinks title="Corporate" items={corporateLinks} />
      <FooterLinks title="Quick Links" items={quickLinks} />
    </div>
  </div>
);

const FooterInfo = () => (
  <div>
    <Logo />
    <p className="text-sm text-gray-600">
      Discover the best deals on a wide range of top-quality products, from electronics and fashion to home goods and
      beauty essentials.
    </p>
    <span className="flex items-center gap-2">
      <BsShop /> Dhaka, Bangladesh
    </span>
    <span className="flex items-center gap-2">
      <MdOutlineEmail /> support@stellarshop.com
    </span>
  </div>
);

const FooterLinks = ({ title, items }: { title: string; items: { id: number; label: string; href: string }[] }) => (
  <div>
    <h4 className="text-lg font-medium">{title}</h4>
    <Separator className="bg-gray-300" />
    <ul className="space-y-2">
      {items.map((item) => (
        <ListItem key={item.id} {...item} />
      ))}
    </ul>
  </div>
);

const ListItem = ({ label, href }: { label: string; href: string }) => (
  <li className="hover:text-primary duration-300">
    <Link href={href}>{label}</Link>
  </li>
);

const FooterBottom = () => (
  <div className="flex flex-col items-center justify-between gap-5 py-5 text-sm font-medium lg:flex-row">
    <span>All Right Reserved. Copyright 2024</span>
    <Image
      width={300}
      height={300}
      src="https://ninetheme.com/themes/fitment/wp-content/uploads/2023/08/payment-300x26.webp"
      alt="Payment Methods"
    />
    <div className="flex items-center gap-2">
      <span>Stay Connected:</span>
      <FaFacebook aria-label="Facebook" />
      <FaInstagram aria-label="Instagram" />
      <FaTwitter aria-label="Twitter" />
      <FaWhatsapp aria-label="Whatsapp" />
    </div>
  </div>
);

export default Footer;
