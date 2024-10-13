import { sidebarItems } from "@/constants/sidebar-items";
import SidebarMenu from "./sidebar-menu";

const Sidebar = () => {
  return (
    <aside className="custom-scrollbar h-screen w-[250px] space-y-2 overflow-auto border pb-8">
      <div className="remove-scrollbar sticky top-0 flex items-center justify-center border-b py-2 backdrop-blur-md">
        <img src="/logo2.svg" alt="" />
      </div>
      <nav className="space-y-1 px-3">
        {sidebarItems.map((x, i) => (
          <SidebarMenu key={i} item={x} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
