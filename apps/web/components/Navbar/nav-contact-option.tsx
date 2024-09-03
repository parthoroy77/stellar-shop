import { FaWhatsapp } from "react-icons/fa6";

const NavContactOption = () => {
  return (
    <div className="flex items-center gap-2">
      <FaWhatsapp aria-label="Whatsapp" className="text-secondary text-4xl" />
      <div className="text-center text-sm font-semibold uppercase">
        <p>Call Anytime</p>
        <p className="text-secondary">+880 1029450385</p>
      </div>
    </div>
  );
};

export default NavContactOption;
