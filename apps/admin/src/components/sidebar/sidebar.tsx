import { useState } from "react";
import { GoCircle } from "react-icons/go";
import { SlArrowRight } from "react-icons/sl";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <aside className="custom-scrollbar h-screen w-[20%] space-y-2 overflow-auto border pb-8">
      <div className="remove-scrollbar sticky top-0 flex h-[60px] items-center justify-center border-b backdrop-blur-md">
        <img src="/logo2.svg" alt="" />
      </div>
      <nav className="space-y-1 px-3">
        {Array.from({ length: 5 }).map((_x, i) => (
          <SidebarMenu key={i} />
        ))}
      </nav>
    </aside>
  );
};

const SidebarMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <ul className="space-y-1 text-sm *:rounded-md *:px-6 *:py-2.5">
      <NavLink
        to={"/"}
        onClick={() => setOpen((prev) => !prev)}
        className={({ isActive }) =>
          `flex cursor-pointer items-center justify-between gap-3 duration-200 ${isActive ? "bg-primary hover:bg-primary text-white" : "hover:bg-accent/40"}`
        }
      >
        <div className="flex items-center gap-3">
          <GoCircle size={10} />
          <span>Parent</span>
        </div>
        <SlArrowRight size={12} className={`duration-200 ${open ? "rotate-90" : "rotate-0"}`} />
      </NavLink>
      {open && (
        <>
          {Array.from({ length: 3 }).map((_y, i) => (
            <li key={i} className="hover:bg-accent/30 flex cursor-pointer items-center gap-3 !pl-10 duration-200">
              <GoCircle size={10} />
              <span>Child</span>
            </li>
          ))}
        </>
      )}
    </ul>
  );
};

export default Sidebar;
