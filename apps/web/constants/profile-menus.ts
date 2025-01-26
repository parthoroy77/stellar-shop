import { BiPurchaseTagAlt } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi2";
import { MdOutlineManageHistory } from "react-icons/md";
import { RiUserLocationLine, RiUserSettingsLine } from "react-icons/ri";
import { VscFeedback } from "react-icons/vsc";
export const profileMenus = [
  {
    label: "Profile",
    Icon: RiUserSettingsLine,
    href: "/profile",
  },
  {
    label: "Manage Address",
    Icon: RiUserLocationLine,
    href: "/profile#manage-address",
  },
  {
    label: "Manage Order",
    Icon: MdOutlineManageHistory,
    href: "/",
  },
  {
    label: "My Purchases",
    Icon: BiPurchaseTagAlt,
    href: "/",
  },
  {
    label: "My Reviews",
    Icon: VscFeedback,
    href: "/",
  },
  {
    label: "Refund & Return",
    Icon: HiOutlineReceiptRefund,
    href: "/",
  },
];
