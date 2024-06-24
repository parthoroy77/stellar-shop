import { Badge } from "@repo/ui";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import Container from "./container";
const QuickAccessBar = () => {
  return (
    <div className="border">
      <Container>
        <div className="py-2 flex gap-5">
          <div className="flex items-center gap-5 cursor-pointer">
            <RxHamburgerMenu className="text-2xl" />
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <FaWhatsapp />
          </div>
          <Badge className="text-white hover:bg-primary bg-secondary rounded-sm">
            FREE SHIPPING FOR ALL ORDERS OF $340
          </Badge>
        </div>
      </Container>
    </div>
  );
};

export default QuickAccessBar;
