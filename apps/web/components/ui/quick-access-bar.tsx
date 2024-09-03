import { Badge } from "@repo/ui";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa6";
import Container from "./container";
const QuickAccessBar = () => {
  return (
    <div className="border">
      <Container>
        <div className="flex gap-5 py-2">
          <div className="flex cursor-pointer items-center gap-5">
            <FaFacebook aria-label="Facebook" />
            <FaInstagram aria-label="Instagram" />
            <FaTwitter aria-label="Twitter" />
            <FaWhatsapp aria-label="Whatsapp" />
          </div>
          <Badge className="hover:bg-primary bg-secondary rounded-sm text-white">
            FREE SHIPPING FOR ALL ORDERS OF $340
          </Badge>
        </div>
      </Container>
    </div>
  );
};

export default QuickAccessBar;
